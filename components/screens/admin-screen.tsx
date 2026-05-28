'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { upsells, type ArchetypeKey } from '@/lib/data'
import { ArrowLeft, Search, Check, X, Users, Package, UserPlus } from 'lucide-react'

interface UserData {
  id: string
  email: string
  created_at: string
  arq: ArchetypeKey | null
  unlocked_modules: string[]
}

interface UpsellStatus {
  [upsellId: string]: boolean
}

interface AdminScreenProps {
  onBack: () => void
}

// Lista de todos os upsells disponíveis
const allUpsells = [
  { id: 'proibidas', name: 'Frases Proibidas' },
  { id: 'reconexao', name: 'Protocolo Reconexão' },
  { id: 'calibragem', name: 'Sistema Calibração' },
  { id: 'amplificadores', name: 'Amplificadores Presença' },
  { id: 'abertura', name: 'Arte da Abertura' },
]

export function AdminScreen({ onBack }: AdminScreenProps) {
  const [users, setUsers] = useState<UserData[]>([])
  const [userUpsells, setUserUpsells] = useState<{ [email: string]: UpsellStatus }>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [addingUser, setAddingUser] = useState(false)
  const [addUserError, setAddUserError] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      // Carregar todos os usuários da tabela profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, created_at, arq, unlocked_modules')
        .order('created_at', { ascending: false })

      if (error) throw error

      setUsers(profiles || [])

      // Carregar upsells de cada usuário
      const { data: upsellsData } = await supabase
        .from('app_upsells')
        .select('user_email, upsell_id')

      const upsellMap: { [email: string]: UpsellStatus } = {}
      profiles?.forEach(p => {
        upsellMap[p.email] = {}
        allUpsells.forEach(u => {
          upsellMap[p.email][u.id] = false
        })
      })

      upsellsData?.forEach(u => {
        if (upsellMap[u.user_email]) {
          upsellMap[u.user_email][u.upsell_id] = true
        }
      })

      // Verificar também unlocked_modules
      profiles?.forEach(p => {
        if (p.unlocked_modules && Array.isArray(p.unlocked_modules)) {
          p.unlocked_modules.forEach((moduleId: string) => {
            if (upsellMap[p.email]) {
              upsellMap[p.email][moduleId] = true
            }
          })
        }
      })

      setUserUpsells(upsellMap)
    } catch (err) {
      console.error('Erro ao carregar usuários:', err)
    }
    setIsLoading(false)
  }

  const toggleUpsell = async (email: string, upsellId: string, currentStatus: boolean) => {
    setUpdatingUser(`${email}-${upsellId}`)
    try {
      if (currentStatus) {
        // Remover upsell
        await supabase
          .from('app_upsells')
          .delete()
          .eq('user_email', email)
          .eq('upsell_id', upsellId)

        // Atualizar unlocked_modules no profile
        const user = users.find(u => u.email === email)
        if (user) {
          const newModules = (user.unlocked_modules || []).filter(m => m !== upsellId)
          await supabase
            .from('profiles')
            .update({ unlocked_modules: newModules })
            .eq('email', email)
        }
      } else {
        // Adicionar upsell
        await supabase
          .from('app_upsells')
          .upsert({ user_email: email, upsell_id: upsellId }, { onConflict: 'user_email,upsell_id' })

        // Atualizar unlocked_modules no profile
        const user = users.find(u => u.email === email)
        if (user) {
          const newModules = [...(user.unlocked_modules || []), upsellId]
          await supabase
            .from('profiles')
            .update({ unlocked_modules: newModules })
            .eq('email', email)
        }
      }

      // Atualizar estado local
      setUserUpsells(prev => ({
        ...prev,
        [email]: {
          ...prev[email],
          [upsellId]: !currentStatus
        }
      }))

      // Atualizar users local
      setUsers(prev => prev.map(u => {
        if (u.email === email) {
          const newModules = currentStatus
            ? (u.unlocked_modules || []).filter(m => m !== upsellId)
            : [...(u.unlocked_modules || []), upsellId]
          return { ...u, unlocked_modules: newModules }
        }
        return u
      }))
    } catch (err) {
      console.error('Erro ao atualizar upsell:', err)
    }
    setUpdatingUser(null)
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      setAddUserError('Preencha todos os campos')
      return
    }

    if (newUserPassword.length < 6) {
      setAddUserError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setAddingUser(true)
    setAddUserError('')

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail.toLowerCase().trim(),
        password: newUserPassword,
      })

      if (authError) {
        setAddUserError(authError.message)
        setAddingUser(false)
        return
      }

      // Criar perfil na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: newUserEmail.toLowerCase().trim(),
          created_at: new Date().toISOString(),
          unlocked_modules: [],
          is_admin: false
        })

      if (profileError && !profileError.message.includes('duplicate')) {
        console.error('Erro ao criar perfil:', profileError)
      }

      // Recarregar lista
      await loadUsers()

      // Limpar campos
      setNewUserEmail('')
      setNewUserPassword('')
      setShowAddUser(false)
    } catch (err) {
      console.error('Erro ao criar usuário:', err)
      setAddUserError('Erro ao criar usuário')
    }

    setAddingUser(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[rgba(255,255,255,0.06)]">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] border-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--muted)]" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-[var(--white)]">Painel Administrativo</h1>
            <p className="text-[12px] text-[var(--muted)]">Gestão de Usuários e Upsells</p>
          </div>
        </div>

        {/* Busca */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Buscar por e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[var(--white)] text-[14px] placeholder:text-[var(--muted)] outline-none focus:border-[var(--rose)]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(212,164,90,0.15)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <div>
              <div className="text-[18px] font-bold text-[var(--white)]">{users.length}</div>
              <div className="text-[11px] text-[var(--muted)]">Usuários</div>
            </div>
          </div>
          <div className="flex-1 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(194,140,148,0.15)] flex items-center justify-center">
              <Package className="w-5 h-5 text-[var(--rose)]" />
            </div>
            <div>
              <div className="text-[18px] font-bold text-[var(--white)]">{allUpsells.length}</div>
              <div className="text-[11px] text-[var(--muted)]">Upsells</div>
            </div>
          </div>
        </div>

        {/* Botão Cadastrar Usuário */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowAddUser(true)}
            className="w-full py-3 text-[13px] font-semibold text-[var(--gold)] bg-[rgba(212,164,90,0.1)] border border-[rgba(212,164,90,0.3)] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(212,164,90,0.2)] flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Cadastrar Novo Usuário
          </button>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-[var(--muted)]">Carregando usuários...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[var(--muted)]">Nenhum usuário encontrado</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map(user => (
              <div 
                key={user.id}
                className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden"
              >
                {/* Info do Usuário */}
                <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="text-[14px] font-medium text-[var(--white)] truncate">{user.email}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-[var(--muted)]">
                      Cadastro: {formatDate(user.created_at)}
                    </span>
                    {user.arq && (
                      <span className="text-[11px] px-2 py-0.5 bg-[rgba(194,140,148,0.15)] text-[var(--rose)] rounded-full">
                        Arquétipo: {user.arq}
                      </span>
                    )}
                  </div>
                </div>

                {/* Upsells */}
                <div className="p-3">
                  <div className="text-[11px] text-[var(--muted)] mb-2 uppercase tracking-wider">Upsells</div>
                  <div className="flex flex-wrap gap-2">
                    {allUpsells.map(upsell => {
                      const isActive = userUpsells[user.email]?.[upsell.id] || false
                      const isUpdating = updatingUser === `${user.email}-${upsell.id}`
                      
                      return (
                        <button
                          key={upsell.id}
                          onClick={() => toggleUpsell(user.email, upsell.id, isActive)}
                          disabled={isUpdating}
                          className={`
                            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                            border cursor-pointer transition-all duration-200
                            ${isActive 
                              ? 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#81C784]' 
                              : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[var(--muted)]'
                            }
                            ${isUpdating ? 'opacity-50' : 'hover:border-[var(--rose)]'}
                          `}
                        >
                          <div className={`
                            w-4 h-4 rounded flex items-center justify-center
                            ${isActive ? 'bg-[#4CAF50]' : 'bg-[rgba(255,255,255,0.1)]'}
                          `}>
                            {isActive && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="truncate max-w-[100px]">{upsell.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Cadastro de Usuário */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md bg-[var(--card-bg)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-[var(--white)]">Cadastrar Usuário</h2>
              <button
                onClick={() => {
                  setShowAddUser(false)
                  setNewUserEmail('')
                  setNewUserPassword('')
                  setAddUserError('')
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] border-none cursor-pointer"
              >
                <X className="w-4 h-4 text-[var(--muted)]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-[var(--muted)] mb-2">E-mail</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="usuario@email.com"
                  className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[var(--white)] text-[14px] placeholder:text-[var(--muted)] outline-none focus:border-[var(--rose)]"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[var(--muted)] mb-2">Senha</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[var(--white)] text-[14px] placeholder:text-[var(--muted)] outline-none focus:border-[var(--rose)]"
                />
              </div>

              {addUserError && (
                <div className="text-[12px] text-[var(--rose)] bg-[rgba(200,80,106,0.1)] px-3 py-2 rounded-lg">
                  {addUserError}
                </div>
              )}

              <button
                onClick={handleAddUser}
                disabled={addingUser}
                className={`
                  w-full py-3 text-[14px] font-semibold rounded-xl cursor-pointer transition-all duration-200 border-none
                  ${addingUser 
                    ? 'bg-[var(--muted)] text-[var(--bg)] cursor-not-allowed' 
                    : 'bg-[var(--gold)] text-[var(--bg)] hover:opacity-90'
                  }
                `}
              >
                {addingUser ? 'Cadastrando...' : 'Cadastrar Usuário'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
