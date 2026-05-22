'use client'

import { Logo, Pill } from '@/components/ui-components'
import { upsells, type ArchetypeKey, type Upsell } from '@/lib/data'
import { upsellContent } from '@/lib/upsell-content'

interface ModuleScreenProps {
  archetype: ArchetypeKey
  moduleId: string
  onBack: () => void
}

export function ModuleScreen({ archetype, moduleId, onBack }: ModuleScreenProps) {
  const allUpsells = [...upsells.E, ...upsells.I, ...upsells.C, ...upsells.P]
  const module = allUpsells.find(u => u.id === moduleId) as Upsell

  if (!module) return null

  // Get base module ID (e.g., 'fp' from 'fp-e')
  const baseModuleId = moduleId.split('-')[0]
  const content = upsellContent[baseModuleId]

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)]">
      <header className="px-6 pt-4.5 pb-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
        <button 
          onClick={onBack}
          className="w-[34px] h-[34px] rounded-lg bg-[rgba(255,255,255,0.06)] border-none cursor-pointer flex items-center justify-center text-base text-[var(--muted)] flex-shrink-0"
        >
          ←
        </button>
        <div className="flex-1 text-center">
          <Logo />
        </div>
        <div className="w-[34px]" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        <div className="text-center mb-6">
          <Pill variant="gold">Modulo Desbloqueado</Pill>
          
          <h1 className="font-serif text-[28px] font-semibold text-[var(--white)] mt-4 mb-2 leading-[1.15]">
            {module.title}
          </h1>
          
          <p className="text-sm text-[var(--muted)] leading-[1.65]">
            {module.sub}
          </p>

          <div className="h-[2px] mt-5 rounded-full bg-gradient-to-r from-[var(--rose)] via-[var(--gold)] to-[var(--rose)]" />
        </div>

        {content ? (
          <div className="flex flex-col gap-6">
            {content.sections.map((section, i) => (
              <div 
                key={i}
                className="bg-[var(--card)] border border-[rgba(255,255,255,0.08)] rounded-[14px] p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[rgba(212,164,90,0.15)] text-[var(--gold)] text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--white)] leading-[1.3]">
                    {section.title}
                  </h3>
                </div>
                
                <div 
                  className="text-[14px] text-[var(--text)] leading-[1.75] mb-4 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />

                {section.frase && (
                  <div className="bg-gradient-to-br from-[rgba(212,164,90,0.12)] to-[rgba(200,80,106,0.08)] border border-[rgba(212,164,90,0.25)] rounded-xl p-4 mt-4">
                    <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-2">
                      Frase-Chave
                    </div>
                    <p className="font-serif text-[17px] italic text-[var(--white)] leading-[1.5] mb-3">
                      {section.frase.text}
                    </p>
                    <div className="text-[13px] text-[var(--muted)] leading-[1.65]">
                      {section.frase.context}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[rgba(255,255,255,0.08)] rounded-[14px] p-5 mb-5">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--gold)] mb-4">
              Conteudo do Modulo
            </div>
            
            <div className="flex flex-col gap-4">
              {module.items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgba(212,164,90,0.15)] text-[var(--gold)] text-xs font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[var(--text)] leading-[1.6]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,164,90,0.1)] border border-[rgba(212,164,90,0.2)]">
            <span className="text-lg">{module.cel}</span>
            <span className="text-xs text-[var(--gold)]">Modulo Completo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
