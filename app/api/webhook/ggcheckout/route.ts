import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// ═══════════════════════════════════════════════
// MAPEAMENTO — preencher com os IDs reais dos produtos na GGCheckout
// A chave é o product.id que a GGCheckout envia no payload do webhook.
// ═══════════════════════════════════════════════
const PRODUCT_MAP: Record<string, string> = {
  // Produto principal - FRASES DISCRETAS
  // 'prod_xxxxx': 'main',

  // Upsells / módulos extras
  // 'prod_xxxxx': 'fp',   // FRASES PROIBIDAS
  // 'prod_xxxxx': 'pr',   // PROTOCOLO RECONEXÃO
  // 'prod_xxxxx': 'sc',   // SISTEMA DE CALIBRAÇÃO AVANÇADO
  // 'prod_xxxxx': 'ap',   // AMPLIFICADORES DE PRESENÇA
  // 'prod_xxxxx': 'ab',   // A ARTE DA ABERTURA SEGURA

  // O TROCO - checkout em pagamento.frasesdiscretas.shop
  'p7a3xL0p4DLGVc6wY9iw': 'tr',  // O TROCO
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
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export async function POST(req: NextRequest) {
  // Ler o corpo bruto (necessário para validar a assinatura HMAC)
  const rawBody = await req.text()

  // Verificar assinatura da GGCheckout (opcional - defina GGCHECKOUT_WEBHOOK_SECRET para ativar)
  const secret = process.env.GGCHECKOUT_WEBHOOK_SECRET
  if (secret) {
    const signatureHeader = req.headers.get('x-webhook-signature') || ''
    const expected =
      'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
    if (signatureHeader !== expected) {
      console.error('[Webhook] Assinatura inválida')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Parsear payload
  let payload: any
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[Webhook] Recebido:', JSON.stringify(payload))

  // A GGCheckout aninha os dados em "payment". Suportamos também formato achatado.
  const payment = payload.payment || payload

  // Só processar pagamentos confirmados
  const evento = (payload.event || '').toString()
  const status = (payment.status || payload.status || '').toString().toLowerCase()
  const aprovado =
    evento === 'payment.paid' ||
    ['paid', 'approved', 'completed'].includes(status)

  if (!aprovado) {
    console.log('[Webhook] Evento ignorado:', evento || status)
    return NextResponse.json({ ok: true, msg: 'evento ignorado' })
  }

  // Extrair email do cliente
  const email = (
    payment.customer?.email ||
    payload.customer?.email ||
    payload.email ||
    ''
  )
    .toLowerCase()
    .trim()

  // Extrair ID do produto
  const productId = (
    payment.product?.id ||
    payload.product?.id ||
    payload.product_id ||
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
      await handleMainPurchase(email)
    } else {
      await handleUpsellPurchase(email, modulo)
    }

    return NextResponse.json({ ok: true, email, modulo })
  } catch (err) {
    console.error('[Webhook] Erro ao processar:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

// ═══════════════════════════════════════════════
// COMPRA PRODUTO PRINCIPAL
// ═══════════════════════════════════════════════
async function handleMainPurchase(email: string) {
  console.log('[Webhook] Processando compra principal para:', email)

  // 1. Criar usuário no Supabase Auth (se não existir)
  try {
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = listData?.users?.find((u) => u.email === email)

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
