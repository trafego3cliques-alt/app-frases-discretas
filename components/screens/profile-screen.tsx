'use client'

import { useState, useEffect } from 'react'
import { useAppState } from '@/lib/context'
import { archetypes } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import { Shield } from 'lucide-react'

interface ProfileScreenProps {
  onOpenAdmin?: () => void
}

export function ProfileScreen({ onOpenAdmin }: ProfileScreenProps) {
  const { state, user, logout } = useAppState()
  const arq = archetypes[state.arq]
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Email exibido na tela
  const displayEmail = user?.email || state.email

  const level = Math.floor(state.xp / 100) + 1
  const xpToNext = 100 - (state.xp % 100)
  const daysCompleted = state.done.length
  const daysRemaining = 7 - daysCompleted

  // Verificar se é admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!displayEmail) return
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('email', displayEmail.toLowerCase())
        .single()
      
      // Aceita true (boolean) ou "TRUE"/"true" (string)
      const adminValue = profile?.is_admin
      const isAdminUser = adminValue === true || adminValue === 'true' || adminValue === 'TRUE' || String(adminValue).toLowerCase() === 'true'
      setIsAdmin(isAdminUser)
    }
    checkAdmin()
  }, [displayEmail])

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  const handleOpenAdmin = () => {
    if (onOpenAdmin) {
      onOpenAdmin()
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)] pb-28">
      <header className="px-6 pt-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
        <h1 className="font-serif text-2xl font-semibold text-[var(--white)]">Perfil</h1>
      </header>

      <div className="flex-1 px-5 py-5 overflow-y-auto">
        {/* Arquetipo Card */}
        <div className="bg-gradient-to-br from-[rgba(200,80,106,0.12)] to-[rgba(212,164,90,0.08)] border border-[rgba(200,80,106,0.2)] rounded-xl p-5 mb-5 text-center">
          <div className="text-5xl mb-3">{arq.emoji}</div>
          <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--rose-l)] mb-1">
            Seu Arquetipo
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[var(--white)] mb-2">
            {arq.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-1.5">
            {arq.traits.map((trait, i) => (
              <span 
                key={i}
                className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--gold-l)] bg-[rgba(212,164,90,0.12)] px-2 py-0.5 rounded"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-3 flex items-center gap-2">
          Estatisticas
          <span className="flex-1 h-px bg-[rgba(200,80,106,0.15)]" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[var(--gold-l)] mb-1">{level}</div>
            <div className="text-[11px] text-[var(--muted)]">Nivel atual</div>
          </div>
          <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[var(--rose-l)] mb-1">{state.xp}</div>
            <div className="text-[11px] text-[var(--muted)]">XP total</div>
          </div>
          <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[var(--white)] mb-1">{daysCompleted}</div>
            <div className="text-[11px] text-[var(--muted)]">Dias completos</div>
          </div>
          <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[var(--faint)] mb-1">{daysRemaining}</div>
            <div className="text-[11px] text-[var(--muted)]">Dias restantes</div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] mb-3 flex items-center gap-2">
          Progresso
          <span className="flex-1 h-px bg-[rgba(200,80,106,0.15)]" />
        </div>

        <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-6">
          <div className="flex justify-between text-[12px] mb-2">
            <span className="text-[var(--muted)]">Jornada de 7 dias</span>
            <span className="text-[var(--white)]">{Math.round((daysCompleted / 7) * 100)}%</span>
          </div>
          <div className="bg-[rgba(255,255,255,0.07)] h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] rounded-full transition-all duration-500"
              style={{ width: `${(daysCompleted / 7) * 100}%` }}
            />
          </div>
          {daysRemaining > 0 && (
            <p className="text-[11px] text-[var(--muted)] mt-2">
              Faltam {daysRemaining} dias para completar sua jornada
            </p>
          )}
          {daysRemaining === 0 && (
            <p className="text-[11px] text-[var(--gold-l)] mt-2">
              Parabens! Voce completou a jornada!
            </p>
          )}
        </div>

        {/* Account */}
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--faint)] mb-3 flex items-center gap-2">
          Conta
          <span className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
        </div>

        <div className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-4">
          <div className="text-[12px] text-[var(--muted)] mb-1">Email</div>
          <div className="text-[14px] text-[var(--white)]">{displayEmail}</div>
        </div>

        {/* Botao Admin - sempre visivel para teste */}
        <button
          onClick={handleOpenAdmin}
          className="w-full py-3 mb-3 text-[13px] font-semibold text-[var(--gold)] bg-transparent border border-[rgba(212,164,90,0.3)] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(212,164,90,0.1)] flex items-center justify-center gap-2"
        >
          <Shield className="w-4 h-4" />
          Painel Administrativo
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 text-[13px] font-semibold text-[var(--rose-l)] bg-transparent border border-[rgba(200,80,106,0.3)] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(200,80,106,0.1)]"
        >
          Sair da conta
        </button>
      </div>
    </div>
  )
}
