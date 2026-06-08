import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════

// Secret definido no painel da Lastlink (campo "Secret")
const WEBHOOK_SECRET = 'frases_discretas_wh_2026_xK9mP3qL7nR2'

// Senha padrão criada para o aluno no primeiro acesso
const SENHA_PADRAO = 'discreta2025'

// Eventos da Lastlink que liberam acesso
const EVENTOS_PAGOS = [
  'Pix Paid',
  'Card Paid',
  'Purchase_Order_Confirmed',
  'purchase.approved',
  'payment.approved',
  'approved',
]

// ═══════════════════════════════════════════════
// MAPEAMENTO POR NOME DO PRODUTO
// (mais confiável que ID — usamos os nomes exatos do painel)
// ═══════════════════════════════════════════════
const PRODUCT_NAME_MAP: Record<string, string> = {
  'frases discretas': 'main',
  'frases proibidas': 'fp',
  'protocolo de reconexao': 'pr',
  'sistema de calibracao avancado': 'sc',
  'amplificadores de presenca': 'ap',
  'a arte da abertura segura': 'ab',
}

// Fallback por ID, caso a Lastlink envie só o Id (preencher se necessário)
const PRODUCT_ID_MAP: Record<string, string> = {}

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
  let payload: any
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[v0][Webhook] Recebido:', JSON.stringify(payload))

  // 2. Identificar evento (a Lastlink usa "Event")
  const evento: string = payload.Event || payload.event || payload.status || ''

  // 3. Teste do painel — responde sucesso para a Lastlink aprovar a integração
  const isTest = payload.IsTest === true || evento === 'test' || !evento
  if (isTest) {
    return NextResponse.json(
      { ok: true, msg: 'Webhook ativo!' },
      { status: 200 }
    )
  }

  // 4. Validar secret (a Lastlink pode mandar no header ou no corpo)
  const incomingSecret =
    req.headers.get('x-lastlink-signature') ||
    req.headers.get('x-webhook-secret') ||
    payload.Secret ||
    payload.secret ||
    ''

  if (WEBHOOK_SECRET && incomingSecret !== WEBHOOK_SECRET) {
    console.error('[v0][Webhook] Secret inválido')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 5. Só processa eventos pagos
  if (!EVENTOS_PAGOS.includes(evento)) {
    console.log('[v0][Webhook] Evento ignorado:', evento)
    return NextResponse.json({ ok: true, msg: 'evento ignorado: ' + evento })
  }

  // 6. Extrair email (vários formatos possíveis)
  const data = payload.Data || payload.data || payload
  const email = (
    data?.Buyer?.Email ||
    data?.buyer?.email ||
    payload.customer?.email ||
    payload.buyer?.email ||
    payload.email ||
    ''
  )
    .toString()
    .toLowerCase()
    .trim()

  if (!email) {
    console.error('[v0][Webhook] Email ausente no payload')
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  // 7. Extrair lista de produtos
  const rawProducts: any[] =
    data?.Products ||
    data?.products ||
    payload.products ||
    (payload.product ? [payload.product] : [])

  // 8. Resolver módulos a partir dos produtos
  const modulos = new Set<string>()
  for (const p of rawProducts) {
    const nome = normalize(p?.Name || p?.name || '')
    const id = (p?.Id || p?.id || '').toString()

    const byName = nome ? PRODUCT_NAME_MAP[nome] : undefined
    const byId = id ? PRODUCT_ID_MAP[id] : undefined

    if (byName) modulos.add(byName)
    else if (byId) modulos.add(byId)
    else console.warn('[v0][Webhook] Produto não mapeado:', { nome, id })
  }

  if (modulos.size === 0) {
    console.error('[v0][Webhook] Nenhum produto mapeado para:', email)
    return NextResponse.json(
      { ok: false, msg: 'nenhum produto mapeado' },
      { status: 400 }
    )
  }

  try {
    // Garante usuário + perfil quando há produto principal,
    // ou cria o básico mesmo se vier só upsell (caso raro)
    await ensureUser(email)

    for (const modulo of modulos) {
      if (modulo === 'main') {
        await handleMainPurchase(email)
      } else {
        await handleUpsellPurchase(email, modulo)
      }
    }

    console.log('[v0][Webhook] Liberado:', email, Array.from(modulos))
    return NextResponse.json({ ok: true, email, modulos: Array.from(modulos) })
  } catch (err) {
    console.error('[v0][Webhook] Erro ao processar:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

// ═══════════════════════════════════════════════
// GARANTIR USUÁRIO AUTH + PROFILE BASE
// ═══════════════════════════════════════════════
async function ensureUser(email: string) {
  // Criar usuário no Supabase Auth (se não existir)
  try {
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = listData?.users?.find((u) => u.email === email)

    if (!existingUser) {
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: SENHA_PADRAO,
        email_confirm: true,
      })
      if (authError) console.error('[v0][Webhook] Erro auth:', authError)
      else console.log('[v0][Webhook] Usuário auth criado:', email)
    }
  } catch (err) {
    console.error('[v0][Webhook] Erro auth.admin:', err)
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

  // Criar progresso inicial (só se não existir)
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
