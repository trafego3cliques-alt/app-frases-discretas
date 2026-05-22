'use client'

import { useAppState } from '@/lib/context'
import { daysContent, dayTitles, archetypes, type ArchetypeKey } from '@/lib/data'

interface ContentScreenProps {
  onOpenDay: (day: number) => void
}

export function ContentScreen({ onOpenDay }: ContentScreenProps) {
  const { state } = useAppState()
  const arq = archetypes[state.arq]
  const content = daysContent[state.arq]

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)] pb-28">
      <header className="px-6 pt-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
        <h1 className="font-serif text-2xl font-semibold text-[var(--white)]">Conteudo</h1>
        <p className="text-[13px] text-[var(--muted)] mt-1">
          Todo o material da sua jornada
        </p>
      </header>

      <div className="flex-1 px-5 py-5 overflow-y-auto">
        {/* Dias Desbloqueados */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-3 flex items-center gap-2">
          Dias Completados
          <span className="flex-1 h-px bg-[rgba(200,80,106,0.15)]" />
        </div>

        {state.done.length > 0 ? (
          <div className="flex flex-col gap-3 mb-6">
            {state.done.sort((a, b) => a - b).map(day => {
              const dayData = content[day - 1]
              return (
                <div 
                  key={day}
                  onClick={() => onOpenDay(day)}
                  className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-[rgba(200,80,106,0.3)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--rose)] to-[var(--gold)] flex items-center justify-center text-white font-bold text-sm">
                      {day}
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--gold-l)] mb-0.5">
                        {dayData.tag}
                      </div>
                      <div className="font-serif text-base font-semibold text-[var(--white)]">
                        {dayTitles[day - 1]}
                      </div>
                    </div>
                    <div className="text-[var(--rose-l)]">→</div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-[13px] text-[var(--muted)]">
            Complete o Dia 1 para desbloquear seu primeiro conteudo.
          </div>
        )}

        {/* Dias Pendentes */}
        {state.done.length < 7 && (
          <>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--faint)] mb-3 flex items-center gap-2">
              Proximos Dias
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[var(--faint)] font-bold text-sm">
                        {day}
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--faint)] mb-0.5">
                          Bloqueado
                        </div>
                        <div className="font-serif text-base font-semibold text-[var(--faint)]">
                          {dayTitles[day - 1]}
                        </div>
                      </div>
                      <div className="text-[var(--faint)]">🔒</div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
