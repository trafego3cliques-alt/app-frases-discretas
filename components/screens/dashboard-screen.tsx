'use client'

import { Logo, ProgressBar, DayCard, ArchetypePill } from '@/components/ui-components'
import { archetypes, dayTitles, dayIcons, upsells, type ArchetypeKey } from '@/lib/data'
import { useAppState } from '@/lib/context'

interface DashboardScreenProps {
  onOpenDay: (day: number) => void
  onShowUpsell: (id: string) => void
  onOpenModule?: (moduleId: string) => void
  onOpenBonus?: (bonusId: 'manual' | 'mapa') => void
}

export function DashboardScreen({ onOpenDay, onShowUpsell, onOpenModule, onOpenBonus }: DashboardScreenProps) {
  const { state, hasModule } = useAppState()
  const arq = archetypes[state.arq]
  
  const xpPct = Math.min((state.xp / 700) * 100, 100)
  const level = Math.floor(state.xp / 100) + 1

  // Debug logs
  console.log('[v0] Dashboard - unlockedModules:', state.unlockedModules)
  console.log('[v0] Dashboard - purchasedUpsells:', state.purchasedUpsells)

  // Separate purchased modules from available upsells
  const allUpsells = upsells[state.arq] || []
  const purchasedModules = allUpsells.filter(u => {
    const has = hasModule(u.id)
    console.log('[v0] hasModule:', u.id, '=', has)
    return has
  })
  
  // Módulos bloqueados - mostrar todos que não foram desbloqueados
  const lockedModules = allUpsells.filter(u => !hasModule(u.id))

  const getDayStatus = (day: number): 'done' | 'active' | 'locked' => {
    if (state.done.includes(day)) return 'done'
    if (day === state.day) return 'active'
    return 'locked'
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)]">
      <header className="px-6 pt-4.5 pb-3.5 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between mb-2.5">
          <Logo />
          <ArchetypePill archetype={state.arq} />
        </div>
        <div className="bg-[rgba(255,255,255,0.07)] h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] rounded-full transition-all duration-800"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <div className="text-[11px] text-[var(--muted)] mt-1">
          Nível {level} · {state.xp} / 700 XP
        </div>
      </header>

      <div className="flex-1 px-5 py-5 pb-28 overflow-y-auto">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-3 flex items-center gap-2">
          Plano de Acao 7 Dias
          <span className="flex-1 h-px bg-[rgba(200,80,106,0.15)]" />
        </div>

        <div className="flex flex-col gap-2 mb-7">
          {Array.from({ length: 7 }, (_, i) => i + 1).map(day => (
            <DayCard
              key={day}
              day={day}
              title={dayTitles[day - 1]}
              icon={dayIcons[day - 1]}
              status={getDayStatus(day)}
              onClick={() => onOpenDay(day)}
            />
          ))}
        </div>

        {/* Purchased Modules Section */}
        {purchasedModules.length > 0 && (
          <>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--gold)] mb-3 flex items-center gap-2">
              Seus Modulos Desbloqueados
              <span className="flex-1 h-px bg-[rgba(212,164,90,0.15)]" />
            </div>

            {purchasedModules.map(u => (
              <div 
                key={u.id}
                onClick={() => onOpenModule?.(u.id)}
                className="bg-gradient-to-br from-[rgba(212,164,90,0.15)] to-[rgba(212,164,90,0.05)] border border-[rgba(212,164,90,0.35)] rounded-xl p-4.5 mb-3 cursor-pointer transition-all duration-200 hover:border-[rgba(212,164,90,0.5)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--gold-l)] bg-[rgba(212,164,90,0.15)] px-2 py-0.5 rounded">
                    Desbloqueado
                  </span>
                </div>
                <div className="font-serif text-xl font-semibold text-[var(--white)] mb-1">
                  {u.title}
                </div>
                <div className="text-xs text-[var(--muted)] leading-[1.55] mb-2.5">
                  {u.sub}
                </div>
                <div className="text-[13px] font-semibold text-[var(--gold-l)]">
                  Acessar conteudo →
                </div>
              </div>
            ))}
          </>
        )}

        {/* Locked Modules Section - mostrar todos os módulos bloqueados */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-3 flex items-center gap-2">
          Modulos Extras
          <span className="flex-1 h-px bg-[rgba(200,80,106,0.15)]" />
        </div>

        {lockedModules.length > 0 ? (
          lockedModules.map(u => (
            <div 
              key={u.id}
              onClick={() => onShowUpsell(u.id)}
              className="bg-gradient-to-br from-[rgba(100,100,100,0.1)] to-[rgba(80,80,80,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4.5 mb-3 cursor-pointer transition-all duration-200 hover:border-[rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--muted)] bg-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded">
                  Bloqueado
                </span>
              </div>
              <div className="font-serif text-xl font-semibold text-[var(--muted)] mb-1">
                {u.title}
              </div>
              <div className="text-xs text-[var(--muted)] leading-[1.55] mb-2.5 opacity-70">
                {u.sub}
              </div>
              <div className="text-[13px] font-semibold text-[var(--muted)]">
                Saiba mais →
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-[13px] text-[var(--muted)]">
            Todos os modulos extras foram desbloqueados!
          </div>
        )}

        {/* Bonus Section */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--gold)] mb-3 mt-6 flex items-center gap-2">
          Bonus Incluidos
          <span className="flex-1 h-px bg-[rgba(212,164,90,0.15)]" />
        </div>

        <div 
          onClick={() => onOpenBonus?.('manual')}
          className="bg-gradient-to-br from-[rgba(212,164,90,0.08)] to-[rgba(200,80,106,0.04)] border border-[rgba(212,164,90,0.2)] rounded-xl p-4.5 mb-3 cursor-pointer transition-all duration-200 hover:border-[rgba(212,164,90,0.35)] hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">📖</div>
            <div className="flex-1">
              <div className="font-serif text-lg font-semibold text-[var(--white)] mb-1">
                Manual da Comunicacao Irresistivel
              </div>
              <div className="text-xs text-[var(--muted)] leading-[1.55]">
                As 17 frases que criam conexao emocional profunda
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onOpenBonus?.('mapa')}
          className="bg-gradient-to-br from-[rgba(212,164,90,0.08)] to-[rgba(200,80,106,0.04)] border border-[rgba(212,164,90,0.2)] rounded-xl p-4.5 mb-3 cursor-pointer transition-all duration-200 hover:border-[rgba(212,164,90,0.35)] hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🗺️</div>
            <div className="flex-1">
              <div className="font-serif text-lg font-semibold text-[var(--white)] mb-1">
                Mapa do Comportamento Masculino
              </div>
              <div className="text-xs text-[var(--muted)] leading-[1.55]">
                Decodificando os padroes que ele nunca vai te explicar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
