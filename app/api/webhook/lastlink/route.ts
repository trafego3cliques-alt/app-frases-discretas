import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// ═══════════════════════════════════════════════
// MAPEAMENTO — preencher com IDs reais da Lastlink
// ═══════════════════════════════════════════════
const PRODUCT_MAP: Record<string, string> = {
  // Produto principal - FRASES DISCRETAS
  'CA6FD38F4':  'main',
  
  // Upsells - IDs extraídos dos links de checkout da Lastlink
  'C80C4E7D4':  'fp',   // FRASES PROIBIDAS
  'CE4431112':  'pr',   // PROTOCOLO RECONEXÃO
  'C60C7E44A':  'sc',   // SISTEMA DE CALIBRAÇÃO AVANÇADO
  'C800BE5DE':  'ap',   // AMPLIFICADORES DE PRESENÇA
  'C3B667D54':  'ab',   // A ARTE DA ABERTURA SEGURA
}

const SENHA_PADRAO = 'discreta2025'

// Supabase URL e service role key vindos das variáveis de ambiente
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error(
    'Variáveis de ambiente do Supabase ausentes. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.'
  )
}

// Cliente Supabase com service role (bypass de RLS e criação de usuários auth)
const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY
)

export async function POST(req: NextRequest) {
  // Verificar assinatura da Lastlink (opcional - descomente em produção)
  // const secret = process.env.LASTLINK_SECRET
  // if (secret) {
  //   const signature = req.headers.get('x-lastlink-signature') || ''
  //   if (signature !== secret) {
  //     console.error('[Webhook] Assinatura inválida')
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  //   }
  // }

  // Parsear payload
  let payload: any
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[Webhook] Recebido:', JSON.stringify(payload))

  // Ignorar eventos que não são de pagamento confirmado
  const evento = payload.event || payload.status || ''
  if (!['purchase.approved', 'payment.approved', 'approved'].includes(evento)) {
    console.log('[Webhook] Evento ignorado:', evento)
    return NextResponse.json({ ok: true, msg: 'evento ignorado' })
  }

  // Extrair dados do payload
  // Adaptar conforme estrutura real da Lastlink
  const email = (
    payload.customer?.email ||
    payload.buyer?.email ||
    payload.email ||
    ''
  ).toLowerCase().trim()

  const productId = (
    payload.product?.id ||
    payload.product_id ||
    payload.item?.id ||
    ''
  ).toString()

  if (!email || !productId) {
    console.error('[Webhook] Email ou productId ausente', { email, productId })
    return NextResponse.json({ error: 'Missing data' }, { status: 400 })
  }

  // Identificar módulo
  const modulo = PRODUCT_MAP[productId]
  if (!modulo) {
    console.error('[Webhook] Produto não mapeado:', productId)
    return NextResponse.json(
      { ok: false, msg: 'produto não mapeado: ' + productId },
      { status: 400 }
    )
  }

  try {
    if (modulo === 'main') {
      // ═══ COMPRA DO PRODUTO PRINCIPAL ═══
      await handleMainPurchase(email)
    } else {
      // ═══ COMPRA DE UPSELL ═══
      await handleUpsellPurchase(email, modulo)
    }

    return NextResponse.json({ ok: true, email, modulo })
  } catch (err) {
    console.error('[Webhook] Erro ao processar:', err)
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    )
  }
}

// ═══════════════════════════════════════════════
// COMPRA PRODUTO PRINCIPAL
// ═══════════════════════════════════════════════
async function handleMainPurchase(email: string) {
  console.log('[Webhook] Processando compra principal para:', email)

  // 1. Criar usuário no Supabase Auth (se não existir)
  try {
    // Buscar usuário existente via listUsers com filtro
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = listData?.users?.find(u => u.email === email)
    
    if (!existingUser) {
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: SENHA_PADRAO,
        email_confirm: true,
      })
      if (authError) {
        console.error('[Webhook] Erro ao criar usuário auth:', authError)
      } else {
        console.log('[Webhook] Usuário auth criado:', email)
      }
    } else {
      console.log('[Webhook] Usuário auth já existe:', email)
    }
  } catch (err) {
    console.error('[Webhook] Erro ao acessar auth.admin:', err)
  }

  // 2. Criar ou atualizar em profiles
  const { data: existingProfile } = await supabaseAdmin
    .from('profiles')
    .select('id, unlocked_modules')
    .eq('email', email)
    .single()

  if (!existingProfile) {
    await supabaseAdmin.from('profiles').insert({
      email,
      unlocked_modules: ['main'],
      is_admin: false,
    })
    console.log('[Webhook] Profile criado:', email)
  } else {
    // Garantir que 'main' está nos módulos desbloqueados
    const modules = existingProfile.unlocked_modules || []
    if (!modules.includes('main')) {
      await supabaseAdmin
        .from('profiles')
        .update({ unlocked_modules: [...modules, 'main'] })
        .eq('email', email)
      console.log('[Webhook] Profile atualizado com main:', email)
    }
  }

  // 3. Criar ou atualizar em app_users
  await supabaseAdmin.from('app_users').upsert(
    {
      email,
      last_access: new Date().toISOString(),
    },
    { onConflict: 'email' }
  )

  // 4. Criar progresso inicial (só se não existir)
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
    console.log('[Webhook] Progress criado:', email)
  }
}

// ═══════════════════════════════════════════════
// COMPRA DE UPSELL
// ═══════════════════════════════════════════════
async function handleUpsellPurchase(email: string, modulo: string) {
  console.log('[Webhook] Processando upsell:', modulo, 'para:', email)

  // 1. Adicionar módulo em profiles.unlocked_modules
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('unlocked_modules')
    .eq('email', email)
    .single()

  if (profile) {
    const modules = profile.unlocked_modules || []
    if (!modules.includes(modulo)) {
      await supabaseAdmin
        .from('profiles')
        .update({ unlocked_modules: [...modules, modulo] })
        .eq('email', email)
    }
  } else {
    // Criar profile se não existir (caso raro)
    await supabaseAdmin.from('profiles').insert({
      email,
      unlocked_modules: [modulo],
      is_admin: false,
    })
  }

  // 2. Registrar em app_upsells como comprado
  await supabaseAdmin.from('app_upsells').upsert(
    {
      email,
      upsell_id: modulo,
      purchased: true,
      shown_at: new Date().toISOString(),
    },
    { onConflict: 'email,upsell_id' }
  )

  console.log('[Webhook] Upsell liberado:', modulo, 'para:', email)
}
