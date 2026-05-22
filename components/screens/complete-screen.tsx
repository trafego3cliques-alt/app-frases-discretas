'use client'

import { Button } from '@/components/ui-components'

interface CompleteScreenProps {
  day: number
  totalXp: number
  onContinue: () => void
}

export function CompleteScreen({ day, totalXp, onContinue }: CompleteScreenProps) {
  const isProtocolComplete = day >= 7

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-7 py-10 relative z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(46,204,113,0.12),transparent_60%),var(--bg)]">
      <div className="max-w-[360px] animate-scale-in">
        <div className="w-20 h-20 rounded-[20px] bg-[rgba(46,204,113,0.12)] border-2 border-[rgba(46,204,113,0.3)] flex items-center justify-center text-4xl mx-auto mb-5 animate-float">
          ✓
        </div>

        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--green)] mb-2">
          Dia {day} Concluído
        </div>

        <h2 className="font-serif text-[clamp(28px,7vw,38px)] font-semibold text-[var(--white)] mb-2 leading-[1.1]">
          {isProtocolComplete ? (
            <>Protocolo<br /><em className="italic text-[var(--gold-l)]">completo.</em></>
          ) : (
            <>Mais um passo<br /><em className="italic text-[var(--gold-l)]">dado.</em></>
          )}
        </h2>

        <p className="text-sm text-[var(--muted)] leading-[1.75] mb-6">
          {isProtocolComplete 
            ? 'Você completou os 7 dias. O que mudou não é o que você diz — é de onde você fala.'
            : `Dia ${day + 1} desbloqueado. Continue o momentum.`
          }
        </p>

        <div className="inline-flex items-center gap-1.5 bg-[rgba(212,164,90,0.1)] border border-[rgba(212,164,90,0.22)] rounded-full px-3.5 py-1 text-xs font-semibold text-[var(--gold-l)] mb-6">
          +100 XP · {totalXp} total
        </div>

        <Button onClick={onContinue}>Continuar →</Button>
      </div>
    </div>
  )
}
