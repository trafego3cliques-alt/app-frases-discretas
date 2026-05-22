'use client'

type Tab = 'home' | 'content' | 'phrases' | 'profile'

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'content', icon: '📖', label: 'Conteudo' },
    { id: 'phrases', icon: '✨', label: 'Frases' },
    { id: 'profile', icon: '👤', label: 'Perfil' },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[rgba(10,8,8,0.95)] backdrop-blur-[12px] border-t border-[rgba(255,255,255,0.06)] px-2 pt-2.5 pb-5 flex items-center justify-around z-50">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-lg border-none bg-transparent cursor-pointer"
        >
          <div className={`text-[22px] ${activeTab === tab.id ? 'text-[var(--rose-l)]' : 'text-[var(--faint)]'}`}>
            {tab.icon}
          </div>
          <div className={`text-[10px] font-semibold tracking-[0.06em] uppercase ${activeTab === tab.id ? 'text-[var(--rose-l)]' : 'text-[var(--faint)]'}`}>
            {tab.label}
          </div>
        </button>
      ))}
    </nav>
  )
}
