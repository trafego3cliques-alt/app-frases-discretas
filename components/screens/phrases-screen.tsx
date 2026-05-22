'use client'

import { useAppState } from '@/lib/context'
import { daysContent, archetypes, type ArchetypeKey } from '@/lib/data'

export function PhrasesScreen() {
  const { state } = useAppState()
  const arq = archetypes[state.arq]
  const content = daysContent[state.arq]

  // Coletar todas as frases dos dias completados
  const collectedPhrases = state.done
    .sort((a, b) => a - b)
    .map(day => ({
      day,
      tag: content[day - 1].tag,
      phrase: content[day - 1].frase.text,
      why: content[day - 1].frase.why
    }))

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)] pb-28">
      <header className="px-6 pt-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
        <h1 className="font-serif text-2xl font-semibold text-[var(--white)]">Suas Frases</h1>
        <p className="text-[13px] text-[var(--muted)] mt-1">
          {collectedPhrases.length} de 7 frases coletadas
        </p>
      </header>

      <div className="flex-1 px-5 py-5 overflow-y-auto">
        {collectedPhrases.length > 0 ? (
          <div className="flex flex-col gap-4">
            {collectedPhrases.map(({ day, tag, phrase, why }) => (
              <div 
                key={day}
                className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--gold-l)] bg-[rgba(212,164,90,0.15)] px-2 py-0.5 rounded">
                    Dia {day}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--rose-l)]">
                    {tag}
                  </span>
                </div>
                
                <blockquote className="font-serif text-lg text-[var(--white)] leading-[1.5] mb-3 pl-3 border-l-2 border-[var(--rose)]">
                  {phrase}
                </blockquote>
                
                <p className="text-[12px] text-[var(--muted)] leading-[1.55]">
                  {why}
                </p>

                <button 
                  onClick={() => navigator.clipboard.writeText(phrase.replace(/"/g, ''))}
                  className="mt-3 text-[12px] font-semibold text-[var(--rose-l)] bg-transparent border-none cursor-pointer hover:text-[var(--rose)]"
                >
                  Copiar frase
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-serif text-xl text-[var(--white)] mb-2">
              Nenhuma frase ainda
            </h3>
            <p className="text-[13px] text-[var(--muted)] max-w-[280px] mx-auto">
              Complete o Dia 1 para desbloquear sua primeira frase personalizada.
            </p>
          </div>
        )}

        {/* Frases bloqueadas */}
        {collectedPhrases.length > 0 && collectedPhrases.length < 7 && (
          <div className="mt-6">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--faint)] mb-3 flex items-center gap-2">
              Proximas Frases
              <span className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
            </div>

            <div className="flex flex-col gap-2">
              {Array.from({ length: 7 }, (_, i) => i + 1)
                .filter(day => !state.done.includes(day))
                .map(day => (
                  <div 
                    key={day}
                    className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--faint)] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">
                        Dia {day}
                      </span>
                      <span className="text-[12px] text-[var(--faint)]">
                        🔒 Complete para desbloquear
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
