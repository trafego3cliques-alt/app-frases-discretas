'use client'

import { Pill, Button, Trait } from '@/components/ui-components'
import { archetypes, type ArchetypeKey } from '@/lib/data'

interface RevealScreenProps {
  archetype: ArchetypeKey
  onContinue: () => void
}

export function RevealScreen({ archetype, onContinue }: RevealScreenProps) {
  const arq = archetypes[archetype]

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-7 py-10 relative z-10 bg-[radial-gradient(ellipse_100%_60%_at_50%_50%,rgba(200,80,106,0.15),transparent_60%),var(--bg)]">
      <div className="max-w-[380px] animate-scale-in">
        <span className="text-[52px] mb-4.5 block animate-float">{arq.emoji}</span>
        
        <Pill variant="rose">Seu Arquétipo</Pill>
        
        <h2 className="font-serif text-[clamp(34px,8vw,50px)] font-semibold leading-none my-3 text-[var(--white)]">
          O Arquétipo d{arq.art}<br />
          <em className="italic text-[var(--rose-l)]">{arq.nome}</em>
        </h2>
        
        <p className="text-[13px] text-[var(--muted)] leading-[1.7] mb-5">
          {arq.sub}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {arq.traits.map((trait, i) => (
            <Trait key={i}>{trait}</Trait>
          ))}
        </div>

        <div className="bg-[var(--card)] border border-[rgba(200,80,106,0.18)] rounded-[10px] p-4 mb-5.5 text-left">
          <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-2">
            O que isso significa para você
          </div>
          <div 
            className="text-[13.5px] text-[var(--text)] leading-[1.75] [&_strong]:text-[var(--white)] [&_strong]:font-medium"
            dangerouslySetInnerHTML={{ __html: arq.diag }}
          />
        </div>

        <Button onClick={onContinue}>Ver meu Plano de 7 Dias →</Button>
      </div>
    </div>
  )
}
