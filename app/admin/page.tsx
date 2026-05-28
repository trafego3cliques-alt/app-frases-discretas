'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Check, X, Search, Shield, RefreshCw, Users } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface UserWithUpsells {
  email: string
  created_at: string
  unlocked_modules: string[]
  upsells: {
    upsell_id: string
    purchased: boolean
  }[]
}

// Mapeamento de IDs de upsells para nomes amigáveis
const UPSELL_NAMES: Record<string, string> = {
  'fp': 'Frases Proibidas',
  'fp-e': 'Frases Proibidas (E)',
  'fp-i': 'Frases Proibidas (I)',
  'fp-c': 'Frases Proibidas (C)',
  'fp-p': 'Frases Proibidas (P)',
  'pr': 'Protocolo Reconexão',
  'pr-e': 'Protocolo Reconexão (E)',
  'sc': 'Sistema Calibração',
  'sc-i': 'Sistema Calibração (I)',
  'ap': 'Amplificadores Presença',
  'ap-c': 'Amplificadores Presença (C)',
  'ab': 'Arte da Abertura',
  'ab-c': 'Arte da Abertura (C)',
  'main': 'Produto Principal',
}

// Lista de todos os upsells possíveis
const ALL_UPSELLS = ['fp', 'pr', 'sc', 'ap', 'ab']

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<UserWithUpsells[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)

  // Verificar se é admin ao montar
  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    setIsLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user?.email) {
        setIsAdmin(false)
        setIsLoading(false)
        return
      }

      // Verificar se o usuário é admin na tabela profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('email', session.user.email.toLowerCase())
        .single()

      if (profile?.is_admin) {
        setIsAdmin(true)
        await loadUsers()
      } else {
        setIsAdmin(false)
      }
    } catch (err) {
      console.error('Erro ao verificar admin:', err)
      setIsAdmin(false)
    }
    setIsLoading(false)
  }

  const loadUsers = async () => {
    try {
      // Carregar todos os profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('email, created_at, unlocked_modules')
        .order('created_at', { ascending: false })

      if (!profiles) return

      // Para cada profile, carregar os upsells
      const usersWithUpsells: UserWithUpsells[] = await Promise.all(
        profiles.map(async (profile) => {
          const { data: upsells } = await supabase
            .from('app_upsells')
            .select('upsell_id, purchased')
            .eq('email', profile.email)

          return {
            email: profile.email,
            created_at: profile.created_at,
            unlocked_modules: profile.unlocked_modules || [],
            upsells: upsells || []
          }
        })
      )

      setUsers(usersWithUpsells)
    } catch (err) {
      console.error('Erro ao carregar usuários:', err)
    }
  }

  const toggleUpsell = async (email: string, upsellId: string, currentlyPurchased: boolean) => {
    setUpdatingUser(email + '-' + upsellId)
    
    try {
      if (currentlyPurchased) {
        // Remover upsell
        await supabase
          .from('app_upsells')
          .update({ purchased: false })
          .eq('email', email)
          .eq('upsell_id', upsellId)

        // Remover do unlocked_modules
        const user = users.find(u => u.email === email)
        if (user) {
          const newModules = user.unlocked_modules.filter(m => !m.startsWith(upsellId))
          await supabase
            .from('profiles')
            .update({ unlocked_modules: newModules })
            .eq('email', email)
        }
      } else {
        // Adicionar upsell
        await supabase
          .from('app_upsells')
          .upsert({
            email,
            upsell_id: upsellId,
            purchased: true,
            shown_at: new Date().toISOString()
          }, { onConflict: 'email,upsell_id' })

        // Adicionar ao unlocked_modules
        const user = users.find(u => u.email === email)
        if (user) {
          const newModules = [...user.unlocked_modules]
          if (!newModules.includes(upsellId)) {
            newModules.push(upsellId)
          }
          await supabase
            .from('profiles')
            .update({ unlocked_modules: newModules })
            .eq('email', email)
        }
      }

      // Recarregar usuários
      await loadUsers()
    } catch (err) {
      console.error('Erro ao atualizar upsell:', err)
    }
    
    setUpdatingUser(null)
  }

  const isUpsellPurchased = (user: UserWithUpsells, upsellId: string): boolean => {
    // Verificar em upsells comprados
    const inUpsells = user.upsells.some(u => u.upsell_id === upsellId && u.purchased)
    // Verificar em módulos desbloqueados
    const inModules = user.unlocked_modules.some(m => m === upsellId || m.startsWith(upsellId + '-'))
    return inUpsells || inModules
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-[var(--muted)] flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Verificando acesso...</span>
        </div>
      </div>
    )
  }

  // Acesso negado
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <Shield className="w-12 h-12 text-[var(--rose)] mx-auto mb-4" />
          <h1 className="text-xl font-medium text-[var(--white)] mb-2">Acesso Restrito</h1>
          <p className="text-[var(--muted)] mb-6">Apenas administradores podem acessar esta página.</p>
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-[var(--rose)] hover:text-[var(--rose-l)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="border-b border-[var(--faint)] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[var(--rose)]" />
            <h1 className="text-lg font-medium text-[var(--white)]">Painel Administrativo</h1>
          </div>
          <a 
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--white)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Stats */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'var(--card)' }}>
            <Users className="w-5 h-5 text-[var(--gold)]" />
            <span className="text-[var(--white)] font-medium">{users.length}</span>
            <span className="text-[var(--muted)]">usuários</span>
          </div>
          <Button
            onClick={loadUsers}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-[var(--faint)] text-[var(--muted)] hover:text-[var(--white)] hover:bg-[var(--card)]"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
          <Input
            type="text"
            placeholder="Buscar por e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[var(--card)] border-[var(--faint)] text-[var(--white)] placeholder:text-[var(--muted)]"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[var(--faint)] overflow-hidden" style={{ background: 'var(--card)' }}>
          <ScrollArea className="w-full">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_repeat(5,100px)] gap-2 px-4 py-3 border-b border-[var(--faint)]" style={{ background: 'var(--card2)' }}>
                <div className="text-sm font-medium text-[var(--muted)]">E-mail</div>
                {ALL_UPSELLS.map(upsell => (
                  <div key={upsell} className="text-sm font-medium text-[var(--muted)] text-center">
                    {UPSELL_NAMES[upsell] || upsell}
                  </div>
                ))}
              </div>

              {/* Table Body */}
              {filteredUsers.length === 0 ? (
                <div className="px-4 py-8 text-center text-[var(--muted)]">
                  {searchTerm ? 'Nenhum usuário encontrado.' : 'Nenhum usuário cadastrado.'}
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div 
                    key={user.email}
                    className="grid grid-cols-[1fr_repeat(5,100px)] gap-2 px-4 py-3 border-b border-[var(--faint)] last:border-b-0 hover:bg-[var(--card2)]/50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--white)] truncate">{user.email}</span>
                      <span className="text-xs text-[var(--muted)]">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    {ALL_UPSELLS.map(upsell => {
                      const isPurchased = isUpsellPurchased(user, upsell)
                      const isUpdating = updatingUser === user.email + '-' + upsell
                      
                      return (
                        <div key={upsell} className="flex items-center justify-center">
                          <button
                            onClick={() => toggleUpsell(user.email, upsell, isPurchased)}
                            disabled={isUpdating}
                            className={`
                              w-8 h-8 rounded-md flex items-center justify-center transition-all
                              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
                              ${isPurchased 
                                ? 'bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30' 
                                : 'bg-[var(--faint)]/50 text-[var(--muted)] border border-[var(--faint)] hover:border-[var(--muted)]'
                              }
                            `}
                          >
                            {isUpdating ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : isPurchased ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-[var(--muted)]">Liberado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[var(--faint)]/50 text-[var(--muted)] border border-[var(--faint)]">
              <X className="w-3 h-3" />
            </div>
            <span className="text-[var(--muted)]">Bloqueado</span>
          </div>
          <span className="text-[var(--muted)]">• Clique para alternar</span>
        </div>
      </div>
    </div>
  )
}
