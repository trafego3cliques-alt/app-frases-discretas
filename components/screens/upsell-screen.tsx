'use client'

import { Logo, Pill, Button } from '@/components/ui-components'
import { upsells, type ArchetypeKey, type Upsell } from '@/lib/data'

// Mapeamento de IDs de upsell para URLs de checkout da Lastlink
const CHECKOUT_URLS: Record<string, string> = {
  // Frases Proibidas - prefixo 'fp'
  'fp-e': 'https://lastlink.com/p/C80C4E7D4/checkout-payment/',
  'fp-i': 'https://lastlink.com/p/C80C4E7D4/checkout-payment/',
  'fp-c': 'https://lastlink.com/p/C80C4E7D4/checkout-payment/',
  'fp-p': 'https://lastlink.com/p/C80C4E7D4/checkout-payment/',
  // Protocolo Reconexao - prefixo 'pr'
  'pr-e': 'https://lastlink.com/p/CE4431112/checkout-payment/',
  'pr-i': 'https://lastlink.com/p/CE4431112/checkout-payment/',
  'pr-c': 'https://lastlink.com/p/CE4431112/checkout-payment/',
  'pr-p': 'https://lastlink.com/p/CE4431112/checkout-payment/',
  // Sistema de Calibracao - prefixo 'sc'
  'sc-e': 'https://lastlink.com/p/C60C7E44A/checkout-payment/',
  'sc-i': 'https://lastlink.com/p/C60C7E44A/checkout-payment/',
  'sc-c': 'https://lastlink.com/p/C60C7E44A/checkout-payment/',
  'sc-p': 'https://lastlink.com/p/C60C7E44A/checkout-payment/',
  // Amplificadores de Presenca - prefixo 'ap'
  'ap-e': 'https://lastlink.com/p/C800BE5DE/checkout-payment/',
  'ap-i': 'https://lastlink.com/p/C800BE5DE/checkout-payment/',
  'ap-c': 'https://lastlink.com/p/C800BE5DE/checkout-payment/',
  'ap-p': 'https://lastlink.com/p/C800BE5DE/checkout-payment/',
  // Arte da Abertura Segura - prefixo 'ab'
  'ab-e': 'https://lastlink.com/p/C3B667D54/checkout-payment/',
  'ab-i': 'https://lastlink.com/p/C3B667D54/checkout-payment/',
  'ab-c': 'https://lastlink.com/p/C3B667D54/checkout-payment/',
  'ab-p': 'https://lastlink.com/p/C3B667D54/checkout-payment/',
}

interface UpsellScreenProps {
  archetype: ArchetypeKey
  upsellId: string
  onBuy: () => void
  onSkip: () => void
}

export function UpsellScreen({ archetype, upsellId, onBuy, onSkip }: UpsellScreenProps) {
  const allUpsells = [...upsells.E, ...upsells.I, ...upsells.C, ...upsells.P]
  const upsell = allUpsells.find(u => u.id === upsellId) as Upsell

  if (!upsell) return null

  const handleBuy = () => {
    const checkoutUrl = CHECKOUT_URLS[upsellId]
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank')
    }
    onBuy()
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(212,164,90,0.12),transparent_55%),var(--bg)]">
      <header className="px-6 pt-4.5 pb-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
        <button 
          onClick={onSkip}
          className="w-[34px] h-[34px] rounded-lg bg-[rgba(255,255,255,0.06)] border-none cursor-pointer flex items-center justify-center text-base text-[var(--muted)] flex-shrink-0"
        >
          ←
        </button>
        <div className="flex-1 text-center">
          <Logo />
        </div>
        <div className="w-[34px]" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 text-center">
        <div className="text-5xl mb-3.5">{upsell.cel}</div>
        
        <h2 
          className="font-serif text-[28px] font-semibold text-[var(--white)] mb-2 leading-[1.15] [&_em]:italic [&_em]:text-[var(--gold-l)]"
          dangerouslySetInnerHTML={{ __html: upsell.congrats }}
        />
        
        <p className="text-sm text-[var(--muted)] leading-[1.75] mb-5.5">
          {upsell.bridge}
        </p>

        <div className="bg-[var(--card)] border border-[rgba(212,164,90,0.25)] rounded-[14px] p-5.5 mb-4.5 text-left">
          <Pill variant="gold">🔥 Módulo Extra</Pill>
          
          <div className="font-serif text-[26px] font-semibold text-[var(--white)] mt-2.5 mb-1.5 leading-[1.15]">
            {upsell.title}
          </div>
          
          <div className="text-[13px] text-[var(--muted)] leading-[1.65] mb-4">
            {upsell.sub}
          </div>

          <div className="flex flex-col gap-2 mb-4.5">
            {upsell.items.map((item, i) => (
              <div key={i} className="flex gap-2.5 text-[13px] text-[var(--text)] leading-[1.5]">
                <span className="text-[var(--gold)] font-bold flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-baseline gap-2.5 mb-4">
            <span className="text-[13px] text-[var(--muted)] line-through">{upsell.de}</span>
            <span className="font-serif text-[42px] font-semibold text-[var(--white)]">
              <sup className="text-lg align-super">R$</sup>
              {upsell.por.replace('R$', '')}
            </span>
            <span className="text-xs text-[var(--muted)]">pagamento único</span>
          </div>

          <Button variant="gold" onClick={handleBuy}>
            Quero este modulo →
          </Button>
        </div>

        <span 
          onClick={onSkip}
          className="text-xs text-[var(--muted)] cursor-pointer py-2.5 block underline underline-offset-[3px]"
        >
          Continuar sem este módulo
        </span>
      </div>
    </div>
  )
}
