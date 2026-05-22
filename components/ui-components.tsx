'use client'

import { archetypes } from '@/lib/data'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`font-serif italic text-lg text-[var(--muted)] ${className}`}>
      Frases <span className="text-[var(--rose-l)]">Discretas</span>
    </div>
  )
}

interface PillProps {
  variant?: 'rose' | 'gold' | 'green'
  children: React.ReactNode
  dot?: boolean
  className?: string
}

export function Pill({ variant = 'rose', children, dot, className = '' }: PillProps) {
  const variants = {
    rose: 'bg-[rgba(200,80,106,0.1)] border-[rgba(200,80,106,0.28)] text-[var(--rose-l)]',
    gold: 'bg-[rgba(212,164,90,0.1)] border-[rgba(212,164,90,0.25)] text-[var(--gold-l)]',
    green: 'bg-[rgba(46,204,113,0.1)] border-[rgba(46,204,113,0.22)] text-[var(--green)]'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase border ${variants[variant]} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-dot" />}
      {children}
    </span>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-br from-[var(--rose)] to-[var(--rose-d)] text-white shadow-[0_8px_28px_rgba(200,80,106,0.3)] hover:shadow-[0_12px_36px_rgba(200,80,106,0.4)]',
    gold: 'bg-gradient-to-br from-[var(--gold)] to-[#8a6020] text-white shadow-[0_8px_28px_rgba(212,164,90,0.25)] hover:shadow-[0_12px_36px_rgba(212,164,90,0.35)]',
    outline: 'bg-transparent border border-[rgba(255,255,255,0.12)] text-[var(--muted)] hover:border-[rgba(255,255,255,0.22)] hover:text-[var(--text)]'
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 w-full px-4 py-4 font-sans text-[15px] font-semibold rounded-lg border-none cursor-pointer transition-all duration-200 tracking-[0.02em] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface IntroCardProps {
  icon: string
  iconVariant: 'rose' | 'gold' | 'blue' | 'green'
  title: string
  description: string
}

export function IntroCard({ icon, iconVariant, title, description }: IntroCardProps) {
  const iconVariants = {
    rose: 'bg-[rgba(200,80,106,0.12)] border-[rgba(200,80,106,0.18)]',
    gold: 'bg-[rgba(212,164,90,0.1)] border-[rgba(212,164,90,0.18)]',
    blue: 'bg-[rgba(122,184,212,0.1)] border-[rgba(122,184,212,0.18)]',
    green: 'bg-[rgba(46,204,113,0.1)] border-[rgba(46,204,113,0.18)]'
  }

  return (
    <div className="bg-[var(--card)] border border-[rgba(255,255,255,0.06)] rounded-[10px] p-4 flex gap-3.5 items-start">
      <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-lg border ${iconVariants[iconVariant]}`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-[var(--white)] mb-0.5">{title}</div>
        <div className="text-xs text-[var(--muted)] leading-[1.55]">{description}</div>
      </div>
    </div>
  )
}

interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
}

export function ProgressBar({ progress, label, showPercentage }: ProgressBarProps) {
  return (
    <div>
      <div className="bg-[rgba(255,255,255,0.07)] h-[3px] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {(label || showPercentage) && (
        <div className="flex justify-between text-[11px] text-[var(--muted)] mt-1">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(progress)}%</span>}
        </div>
      )}
    </div>
  )
}

interface OptionProps {
  letter: string
  text: string
  selected?: boolean
  onClick?: () => void
}

export function Option({ letter, text, selected, onClick }: OptionProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[var(--card)] border rounded-[9px] p-3.5 cursor-pointer transition-all duration-200 flex items-start gap-3 ${
        selected 
          ? 'border-[var(--rose)] bg-[rgba(200,80,106,0.12)]' 
          : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(200,80,106,0.35)] hover:bg-[rgba(200,80,106,0.07)]'
      }`}
    >
      <div className={`w-[26px] h-[26px] flex-shrink-0 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-200 mt-0.5 ${
        selected 
          ? 'bg-[var(--rose)] border-[var(--rose)] text-white' 
          : 'border-[1.5px] border-[rgba(200,80,106,0.3)] text-[var(--rose-l)]'
      }`}>
        {letter}
      </div>
      <div className={`text-[13.5px] leading-[1.55] ${selected ? 'text-[var(--white)]' : 'text-[var(--text)]'}`}>
        {text}
      </div>
    </div>
  )
}

interface DayCardProps {
  day: number
  title: string
  icon: string
  status: 'done' | 'active' | 'locked'
  onClick?: () => void
}

export function DayCard({ day, title, icon, status, onClick }: DayCardProps) {
  const isLocked = status === 'locked'
  
  return (
    <div 
      onClick={isLocked ? undefined : onClick}
      className={`bg-[var(--card)] border rounded-[10px] p-3.5 flex items-center gap-3.5 cursor-pointer transition-all duration-200 relative overflow-hidden ${
        status === 'done' 
          ? 'border-[rgba(46,204,113,0.2)] bg-[rgba(46,204,113,0.04)]' 
          : status === 'active'
            ? 'border-[var(--rose)] bg-[rgba(200,80,106,0.07)]'
            : 'border-[rgba(255,255,255,0.06)] opacity-40 cursor-not-allowed'
      } ${!isLocked && status !== 'done' ? 'hover:border-[rgba(200,80,106,0.25)]' : ''}`}
    >
      {status === 'active' && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--rose)]" />
      )}
      <div className={`w-10 h-10 rounded-[10px] flex-shrink-0 flex items-center justify-center font-serif text-xl font-semibold ${
        status === 'active'
          ? 'bg-gradient-to-br from-[var(--rose)] to-[var(--rose-d)] text-white'
          : status === 'done'
            ? 'bg-[rgba(46,204,113,0.15)] border border-[rgba(46,204,113,0.25)] text-[var(--green)]'
            : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[var(--faint)]'
      }`}>
        {status === 'done' ? '✓' : day}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-[var(--white)] mb-0.5">{icon} Dia {day} — {title}</div>
        <div className="text-xs text-[var(--muted)]">
          {status === 'done' ? 'Concluído · +100 XP' : status === 'active' ? 'Disponível agora' : 'Bloqueado'}
        </div>
      </div>
      <div className="text-xl flex-shrink-0">
        {status === 'done' ? '✓' : status === 'active' ? '→' : '🔒'}
      </div>
    </div>
  )
}

interface BlockProps {
  variant: 'intro' | 'concept' | 'frase' | 'action' | 'result'
  label: string
  labelColor?: 'rose' | 'gold' | 'green' | 'blue'
  title?: string
  children: React.ReactNode
}

export function ContentBlock({ variant, label, labelColor = 'rose', title, children }: BlockProps) {
  const labelColors = {
    rose: 'text-[var(--rose)]',
    gold: 'text-[var(--gold-l)]',
    green: 'text-[var(--green)]',
    blue: 'text-[var(--blue)]'
  }

  const variants = {
    intro: 'bg-gradient-to-br from-[rgba(200,80,106,0.08)] to-[rgba(212,164,90,0.04)] border-[rgba(200,80,106,0.18)]',
    concept: 'bg-[var(--card)] border-[rgba(255,255,255,0.06)]',
    frase: 'bg-[var(--deep)] border-l-[3px] border-l-[var(--rose)] border-t-0 border-r-0 border-b-0 rounded-l-none rounded-r-lg',
    action: 'bg-[rgba(46,204,113,0.06)] border-[rgba(46,204,113,0.18)]',
    result: 'bg-[rgba(122,184,212,0.06)] border-[rgba(122,184,212,0.18)]'
  }

  return (
    <div className={`rounded-[10px] p-4 mb-3 border ${variants[variant]}`}>
      <div className={`text-[10px] font-semibold tracking-[0.12em] uppercase mb-2 ${labelColors[labelColor]}`}>
        {label}
      </div>
      {title && (
        <div className="font-serif text-[21px] font-semibold text-[var(--white)] mb-2 leading-tight">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

interface TraitProps {
  children: React.ReactNode
}

export function Trait({ children }: TraitProps) {
  return (
    <span className="bg-[var(--card)] border border-[rgba(255,255,255,0.07)] rounded-full px-3.5 py-1 text-xs text-[var(--text)]">
      {children}
    </span>
  )
}

interface ArchetypePillProps {
  archetype: keyof typeof archetypes
}

export function ArchetypePill({ archetype }: ArchetypePillProps) {
  const arq = archetypes[archetype]
  return (
    <Pill variant="rose">
      {arq.pill}
    </Pill>
  )
}
