'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { ArchetypeKey } from '@/lib/data'
import type { User } from '@supabase/supabase-js'

export interface AppState {
  email: string
  arq: ArchetypeKey | null
  day: number
  done: number[]
  xp: number
  shownUpsells: string[]
  unlockedModules: string[]
  purchasedUpsells: string[]
}

interface AppContextType {
  state: AppState
  user: User | null
  isLoading: boolean
  error: string
  login: (email: string, password: string) => Promise<{ success: boolean; hasArchetype: boolean }>
  setArchetype: (arq: ArchetypeKey) => Promise<void>
  completeDay: (day: number) => Promise<void>
  markUpsellShown: (id: string) => Promise<void>
  registerUpsellPurchase: (id: string) => Promise<void>
  hasModule: (moduleId: string) => boolean
  logout: () => Promise<void>
  resetState: () => void
}

const defaultState: AppState = {
  email: '',
  arq: null,
  day: 1,
  done: [],
  xp: 0,
  shownUpsells: [],
  unlockedModules: [],
  purchasedUpsells: []
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await loadUserData(session.user.email!)
      }
    }
    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadUserData(session.user.email!)
      } else {
        setState(defaultState)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserData = async (email: string) => {
    try {
      // Load from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('unlocked_modules')
        .eq('email', email.toLowerCase())
        .single()

      // Load from app_progress table
      const { data: progress } = await supabase
        .from('app_progress')
        .select('arquetipo, day_progress, completed_days, xp')
        .eq('email', email.toLowerCase())
        .single()

      // Load purchased upsells
      const { data: upsells } = await supabase
        .from('app_upsells')
        .select('upsell_id')
        .eq('email', email.toLowerCase())
        .eq('purchased', true)

      setState({
        email: email.toLowerCase(),
        arq: progress?.arquetipo || null,
        day: progress?.day_progress || 1,
        done: progress?.completed_days || [],
        xp: progress?.xp || 0,
        shownUpsells: [],
        unlockedModules: profile?.unlocked_modules || [],
        purchasedUpsells: upsells?.map(u => u.upsell_id) || []
      })
    } catch (err) {
      console.error('Error loading user data:', err)
      setState(prev => ({ ...prev, email: email.toLowerCase() }))
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; hasArchetype: boolean }> => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setError('E-mail invalido')
      return { success: false, hasArchetype: false }
    }

    if (!password) {
      setError('Senha obrigatoria')
      return { success: false, hasArchetype: false }
    }

    setIsLoading(true)
    setError('')

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password
      })

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha incorretos')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('E-mail nao confirmado. Verifique sua caixa de entrada.')
        } else {
          setError('Erro ao conectar. Tente novamente.')
        }
        return { success: false, hasArchetype: false }
      }

      if (data.user) {
        setUser(data.user)
        
        // Load user data and check if has archetype
        const { data: progress } = await supabase
          .from('app_progress')
          .select('arquetipo, day_progress, completed_days, xp')
          .eq('email', email.toLowerCase())
          .single()
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('unlocked_modules')
          .eq('email', email.toLowerCase())
          .single()
        
        const { data: upsells } = await supabase
          .from('app_upsells')
          .select('upsell_id')
          .eq('email', email.toLowerCase())
          .eq('purchased', true)
        
        const hasArchetype = !!progress?.arquetipo
        
        setState({
          email: email.toLowerCase(),
          arq: progress?.arquetipo || null,
          day: progress?.day_progress || 1,
          done: progress?.completed_days || [],
          xp: progress?.xp || 0,
          shownUpsells: [],
          unlockedModules: profile?.unlocked_modules || [],
          purchasedUpsells: upsells?.map(u => u.upsell_id) || []
        })
        
        return { success: true, hasArchetype }
      }

      return { success: false, hasArchetype: false }
    } catch (err) {
      console.error('Login error:', err)
      setError('Erro ao conectar. Tente novamente.')
      return { success: false, hasArchetype: false }
    } finally {
      setIsLoading(false)
    }
  }

  const setArchetype = async (arq: ArchetypeKey) => {
    setState(prev => ({ ...prev, arq }))

    if (!state.email) return

    try {
      // Update or create app_progress with archetype
      const { error } = await supabase
        .from('app_progress')
        .upsert({
          email: state.email,
          arquetipo: arq,
          day_progress: state.day,
          completed_days: state.done,
          xp: state.xp,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' })

      if (error) console.error('Error saving archetype:', error)
    } catch (err) {
      console.error('Error saving archetype:', err)
    }
  }

  const completeDay = async (day: number) => {
    const newDone = [...state.done, day].filter((v, i, a) => a.indexOf(v) === i)
    const newXp = state.xp + 100
    const newDay = Math.max(state.day, day + 1)

    setState(prev => ({
      ...prev,
      done: newDone,
      xp: newXp,
      day: newDay
    }))

    if (!state.email) return

    try {
      const { error } = await supabase
        .from('app_progress')
        .upsert({
          email: state.email,
          arquetipo: state.arq,
          day_progress: newDay,
          completed_days: newDone,
          xp: newXp,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' })

      if (error) console.error('Error saving progress:', error)
    } catch (err) {
      console.error('Error saving progress:', err)
    }
  }

  const markUpsellShown = async (id: string) => {
    if (state.shownUpsells.includes(id)) return

    const newShownUpsells = [...state.shownUpsells, id]
    setState(prev => ({
      ...prev,
      shownUpsells: newShownUpsells
    }))

    if (!state.email) return

    try {
      // Record upsell shown (not purchased)
      await supabase
        .from('app_upsells')
        .upsert({
          email: state.email,
          upsell_id: id,
          shown_at: new Date().toISOString(),
          purchased: false
        }, { onConflict: 'email,upsell_id' })
    } catch (err) {
      console.error('Error marking upsell shown:', err)
    }
  }

  const registerUpsellPurchase = async (id: string) => {
    if (!state.email) return

    try {
      await supabase
        .from('app_upsells')
        .upsert({
          email: state.email,
          upsell_id: id,
          shown_at: new Date().toISOString(),
          purchased: true
        }, { onConflict: 'email,upsell_id' })

      setState(prev => ({
        ...prev,
        purchasedUpsells: [...prev.purchasedUpsells, id]
      }))
    } catch (err) {
      console.error('Error registering upsell purchase:', err)
    }
  }

  // Check if user has a specific module unlocked
  // moduleId can be full (fp-e) or short (fp) - checks if user has the base module
  const hasModule = (moduleId: string): boolean => {
    // Extract base module (e.g., 'fp' from 'fp-e')
    const baseModule = moduleId.split('-')[0]
    
    // Check if base module is in unlockedModules or purchasedUpsells
    const hasInUnlocked = state.unlockedModules.some(m => m === baseModule || m === moduleId)
    const hasInPurchased = state.purchasedUpsells.some(p => p === baseModule || p === moduleId || p.startsWith(baseModule + '-'))
    
    return hasInUnlocked || hasInPurchased
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setState(defaultState)
  }

  const resetState = () => {
    setState(defaultState)
  }

  return (
    <AppContext.Provider value={{ 
      state, 
      user,
      isLoading, 
      error, 
      login, 
      setArchetype, 
      completeDay, 
      markUpsellShown, 
      registerUpsellPurchase,
      hasModule,
      logout,
      resetState 
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}
