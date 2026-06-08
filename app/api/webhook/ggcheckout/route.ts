import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════

// Secret definido no painel da GGCheckout (campo "Secret")
const WEBHOOK_SECRET = 'frases_discretas_wh_2026_xK9mP3qL7nR2'

// Senha padrão criada para o aluno no primeiro acesso
const SENHA_PADRAO = 'discreta2025'

// Eventos da GGCheckout que liberam acesso
const EVENTOS_PAGOS = ['Pix Paid', 'Card Paid']

// ═══════════════════════════════════════════════
// MAPEAMENTO POR NOME DO PRODUTO
// (usamos os nomes exatos cadastrados no painel da GGCheckout)
// ═══════════════════════════════════════════════
const PRODUCT_NAME_MAP: Record<string, string> = {
  'frases discretas': 'main',
  'frases proibidas': 'fp',
  'protocolo de reconexao': 'pr',
  'sistema de calibracao avancado': 'sc',
  'amplificadores de presenca': 'ap',
  'a arte da abertura segura': 'ab',
}

// Normaliza nome: minúsculo, sem acento, sem espaços extras
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ═══════════════════════════════════════════════
// SUPABASE ADMIN
// ═══════════════════════════════════════════════
const SUPABASE_URL = 'https://gyiauyqkjukbabtxnkdn.supabase.co'
const SUPABASE_SERVICE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5aWF1eXFranVrYmFidHhua2RuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM4MDAxMSwiZXhwIjoyMDkyOTU2MDExfQ.kHztEIwqBfXTuT9J1iuONL9YTJ1NZveRTYid5H-Lghg'

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ═══════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════
export async function POST(req: NextRequest) {
  // 1. Parsear payload
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[v0][Webhook GG] Recebido:', JSON.stringify(body))

  // 2. Salvar histórico bruto em webhook_logs (não bloqueia o fluxo se falhar)
  try {
    await supabaseAdmin.from('webhook_logs').insert({
      method: 'POST',
      headers: Object.fromEntries(req.headers.entries()),
      body,
      status: 'received',
    })
  } catch (err) {
    console.error('[v0][Webhook GG] Erro ao salvar log:', err)
  }

  const evento: string = body.event || body.Event || ''

  // 3. Teste do painel — responde sucesso para a GGCheckout aprovar a integração
  if (evento === 'test' || !evento) {
    return NextResponse.json(
      { success: true, message: 'Webhook ativo!' },
      { status: 200 }
    )
  }

  // 4. Validar secret (header ou corpo)
  const incomingSecret =
    req.headers.get('x-webhook-secret') ||
    req.headers.get('x-ggcheckout-signature') ||
    body.secret ||
    body.Secret ||
    ''

  if (WEBHOOK_SECRET && incomingSecret !== WEBHOOK_SECRET) {
    console.error('[v0][Webhook GG] Secret inválido')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 5. Só processa eventos pagos
  if (!EVENTOS_PAGOS.includes(evento)) {
    console.log('[v0][Webhook GG] Evento ignorado:', evento)
    return NextResponse.json({ success: true, msg: 'evento ignorado: ' + evento })
  }

  // 6. Extrair email e nome do cliente
  const email = (body.customer?.email || body.email || '')
    .toString()
    .toLowerCase()
    .trim()
  const name = body.customer?.name || 'Aluno Frases Discretas'

  if (!email) {
    console.error('[v0][Webhook GG] Email ausente no payload')
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  // 7. Extrair lista de produtos (vários formatos possíveis)
  const rawProducts: any[] = body.products
    ? body.products
    : body.product
      ? [body.product]
      : []

  // 8. Resolver módulos a partir dos produtos
  const modulos = new Set<string>()
  for (const p of rawProducts) {
    const nome = normalize(p?.title || p?.name || p?.Name || '')
    const byName = nome ? PRODUCT_NAME_MAP[nome] : undefined
    if (byName) modulos.add(byName)
    else console.warn('[v0][Webhook GG] Produto não mapeado:', nome)
  }

  // Se nenhum produto veio mapeado, libera ao menos o principal
  if (modulos.size === 0) {
    console.warn('[v0][Webhook GG] Nenhum produto mapeado, liberando "main" como fallback')
    modulos.add('main')
  }

  try {
    await ensureUser(email, name)

    for (const modulo of modulos) {
      if (modulo === 'main') {
        await handleMainPurchase(email)
      } else {
        await handleUpsellPurchase(email, modulo)
      }
    }

    console.log('[v0][Webhook GG] Liberado:', email, Array.from(modulos))
    return NextResponse.json({
      success: true,
      email,
      modulos: Array.from(modulos),
    })
  } catch (err) {
    console.error('[v0][Webhook GG] Erro ao processar:', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}

// ═══════════════════════════════════════════════
// GARANTIR USUÁRIO AUTH + PROFILE BASE
// ═══════════════════════════════════════════════
async function ensureUser(email: string, name: string) {
  try {
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = listData?.users?.find((u) => u.email === email)

    if (!existingUser) {
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: SENHA_PADRAO,
        email_confirm: true,
        user_metadata: { name },
      })
      if (authError) console.error('[v0][Webhook GG] Erro auth:', authError)
      else console.log('[v0][Webhook GG] Usuário auth criado:', email)
    }
  } catch (err) {
    console.error('[v0][Webhook GG] Erro auth.admin:', err)
  }

  // Garantir profile base
  const { data: existingProfile } = await supabaseAdmin
    .from('profiles')
    .select('id, unlocked_modules')
    .eq('email', email)
    .single()

  if (!existingProfile) {
    await supabaseAdmin.from('profiles').insert({
      email,
      full_name: name,
      unlocked_modules: [],
      is_admin: false,
    })
  }

  // Registrar acesso
  await supabaseAdmin
    .from('app_users')
    .upsert(
      { email, last_access: new Date().toISOString() },
      { onConflict: 'email' }
    )
}

// ═══════════════════════════════════════════════
// COMPRA PRODUTO PRINCIPAL
// ═══════════════════════════════════════════════
async function handleMainPurchase(email: string) {
  await unlockModule(email, 'main')

  const { data: existingProgress } = await supabaseAdmin
    .from('app_progress')
    .select('id')
    .eq('email', email)
    .single()

  if (!existingProgress) {
    await supabaseAdmin.from('app_progress').insert({
      email,
      day_progress: 1,
      completed_days: [],
      xp: 0,
    })
  }
}

// ═══════════════════════════════════════════════
// COMPRA DE UPSELL
// ═══════════════════════════════════════════════
async function handleUpsellPurchase(email: string, modulo: string) {
  await unlockModule(email, modulo)

  await supabaseAdmin.from('app_upsells').upsert(
    {
      email,
      upsell_id: modulo,
      purchased: true,
      shown_at: new Date().toISOString(),
    },
    { onConflict: 'email,upsell_id' }
  )
}

// ═══════════════════════════════════════════════
// LIBERAR MÓDULO EM profiles.unlocked_modules
// ═══════════════════════════════════════════════
async function unlockModule(email: string, modulo: string) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('unlocked_modules')
    .eq('email', email)
    .single()

  const modules: string[] = profile?.unlocked_modules || []
  if (!modules.includes(modulo)) {
    await supabaseAdmin
      .from('profiles')
      .update({ unlocked_modules: [...modules, modulo] })
      .eq('email', email)
  }
}
