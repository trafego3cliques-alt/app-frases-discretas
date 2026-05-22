'use client'

import { Button, ContentBlock } from '@/components/ui-components'
import { daysContent, dayTitles, type ArchetypeKey } from '@/lib/data'

interface DayScreenProps {
  archetype: ArchetypeKey
  day: number
  onBack: () => void
  onComplete: () => void
}

export function DayScreen({ archetype, day, onBack, onComplete }: DayScreenProps) {
  const content = daysContent[archetype][day - 1]

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)]">
      <header className="px-5 pt-4 pb-3.5 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-[34px] h-[34px] rounded-lg bg-[rgba(255,255,255,0.06)] border-none cursor-pointer flex items-center justify-center text-base text-[var(--muted)] flex-shrink-0"
        >
          ←
        </button>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-0.5">
            Dia {day} · {content.tag}
          </div>
          <div className="text-[15px] font-medium text-[var(--white)]">
            {dayTitles[day - 1]}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
        <ContentBlock 
          variant="intro" 
          label="Contexto Psicológico"
          labelColor="rose"
        >
          <p className="text-[13.5px] text-[var(--text)] leading-[1.82]">
            {content.intro}
          </p>
        </ContentBlock>

        <ContentBlock 
          variant="concept" 
          label="O Conceito"
          labelColor="gold"
          title={content.concept.title}
        >
          <div 
            className="text-[13.5px] text-[var(--text)] leading-[1.82] [&_strong]:text-[var(--white)] [&_strong]:font-medium [&_em]:italic [&_em]:text-[var(--rose-l)]"
            dangerouslySetInnerHTML={{ __html: content.concept.text }}
          />
        </ContentBlock>

        <ContentBlock 
          variant="frase" 
          label="⚡ A Frase do Dia"
          labelColor="rose"
        >
          <p className="font-serif text-xl italic text-[var(--white)] leading-[1.45] mb-2">
            {content.frase.text}
          </p>
          <p className="text-xs text-[var(--muted)] leading-[1.6]">
            {content.frase.why}
          </p>
        </ContentBlock>

        <ContentBlock 
          variant="action" 
          label="Suas Ações de Hoje"
          labelColor="green"
        >
          <div className="flex flex-col gap-2">
            {content.actions.map((action, i) => (
              <div key={i} className="flex gap-2.5 text-[13.5px] text-[var(--text)] leading-[1.6]">
                <span className="text-[var(--rose)] font-semibold flex-shrink-0 mt-0.5">→</span>
                <span 
                  className="[&_strong]:text-[var(--white)] [&_strong]:font-medium"
                  dangerouslySetInnerHTML={{ __html: action }}
                />
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock 
          variant="result" 
          label="O Que Você Vai Perceber"
          labelColor="blue"
        >
          <p className="text-[13px] text-[rgba(180,220,240,0.85)] leading-[1.65]">
            {content.result}
          </p>
        </ContentBlock>

        <div className="pt-2">
          <Button onClick={onComplete}>
            ✓ Concluir Dia {day}
          </Button>
        </div>
      </div>
    </div>
  )
}
