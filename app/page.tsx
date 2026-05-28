'use client'

import { useState, useEffect } from 'react'
import { AppProvider, useAppState } from '@/lib/context'
import { upsells, type ArchetypeKey } from '@/lib/data'

import { LoginScreen } from '@/components/screens/login-screen'
import { IntroScreen } from '@/components/screens/intro-screen'
import { DiagnosticScreen } from '@/components/screens/diagnostic-screen'
import { RevealScreen } from '@/components/screens/reveal-screen'
import { DashboardScreen } from '@/components/screens/dashboard-screen'
import { DayScreen } from '@/components/screens/day-screen'
import { CompleteScreen } from '@/components/screens/complete-screen'
import { UpsellScreen } from '@/components/screens/upsell-screen'
import { ModuleScreen } from '@/components/screens/module-screen'
import { ContentScreen } from '@/components/screens/content-screen'
import { PhrasesScreen } from '@/components/screens/phrases-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { ManualScreen } from '@/components/screens/manual-screen'
import { MapaScreen } from '@/components/screens/mapa-screen'
import { AdminScreen } from '@/components/screens/admin-screen'
import { BottomNav } from '@/components/bottom-nav'

type Screen = 'login' | 'intro' | 'diagnostic' | 'reveal' | 'dashboard' | 'day' | 'complete' | 'upsell' | 'module' | 'content' | 'phrases' | 'profile' | 'manual' | 'mapa' | 'admin'
type Tab = 'home' | 'content' | 'phrases' | 'profile'

function FrasesDiscretasApp() {
  const { state, user, hasModule, setArchetype, completeDay, markUpsellShown, registerUpsellPurchase } = useAppState()
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [completedDay, setCompletedDay] = useState<number>(1)
  const [currentUpsellId, setCurrentUpsellId] = useState<string | null>(null)
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<Tab>('home')
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    if (user) {
      if (state.arq) {
        setCurrentScreen('dashboard')
      } else {
        setCurrentScreen('intro')
      }
    }
    setIsCheckingSession(false)
  }, [user, state.arq])

  const handleLogin = (hasArchetype: boolean) => {
    if (hasArchetype) {
      setCurrentScreen('dashboard')
    } else {
      setCurrentScreen('intro')
    }
  }

  const handleStartDiagnostic = () => {
    setCurrentScreen('diagnostic')
  }

  const handleDiagnosticComplete = async (archetype: ArchetypeKey) => {
    await setArchetype(archetype)
    setCurrentScreen('reveal')
  }

  const handleRevealContinue = () => {
    setCurrentScreen('dashboard')
  }

  const handleOpenDay = (day: number) => {
    setSelectedDay(day)
    setCurrentScreen('day')
  }

  const handleDayComplete = async () => {
    await completeDay(selectedDay)
    setCompletedDay(selectedDay)
    setCurrentScreen('complete')
  }

  const handleAfterComplete = () => {
    // Check for available upsells (only show if not already purchased)
    if (!state.arq) {
      setCurrentScreen('dashboard')
      return
    }

    const availableUpsell = upsells[state.arq]?.find(
      u => !state.shownUpsells.includes(u.id) && 
           !hasModule(u.id) && // Don't show if already purchased
           (state.done.includes(u.day - 1) || state.done.length + 1 >= u.day)
    )
    
    if (availableUpsell) {
      setCurrentUpsellId(availableUpsell.id)
      markUpsellShown(availableUpsell.id)
      setCurrentScreen('upsell')
    } else {
      setCurrentScreen('dashboard')
    }
  }

  const handleShowUpsell = (id: string) => {
    setCurrentUpsellId(id)
    markUpsellShown(id)
    setCurrentScreen('upsell')
  }

  const handleBuyUpsell = async () => {
    if (currentUpsellId) {
      await registerUpsellPurchase(currentUpsellId)
    }
    // In production, this would redirect to payment
    setCurrentScreen('dashboard')
  }

  const handleSkipUpsell = () => {
    setCurrentScreen('dashboard')
  }

  const handleOpenModule = (moduleId: string) => {
    setCurrentModuleId(moduleId)
    setCurrentScreen('module')
  }

  const handleOpenBonus = (bonusId: 'manual' | 'mapa') => {
    setCurrentScreen(bonusId)
  }

  const handleOpenAdmin = () => {
    setCurrentScreen('admin')
  }

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard')
    setCurrentTab('home')
  }

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab)
    if (tab === 'home') setCurrentScreen('dashboard')
    else if (tab === 'content') setCurrentScreen('content')
    else if (tab === 'phrases') setCurrentScreen('phrases')
    else if (tab === 'profile') setCurrentScreen('profile')
  }

  // Determinar se deve mostrar a bottom nav
  const showBottomNav = ['dashboard', 'content', 'phrases', 'profile'].includes(currentScreen) && state.arq

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0808' }}>
        <div className="text-[#8a7a76]">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="max-w-[480px] mx-auto min-h-screen relative noise-bg overflow-x-hidden">
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'intro' && (
        <IntroScreen onStart={handleStartDiagnostic} />
      )}
      
      {currentScreen === 'diagnostic' && (
        <DiagnosticScreen onComplete={handleDiagnosticComplete} />
      )}
      
      {currentScreen === 'reveal' && state.arq && (
        <RevealScreen 
          archetype={state.arq} 
          onContinue={handleRevealContinue} 
        />
      )}
      
      {currentScreen === 'dashboard' && state.arq && (
        <DashboardScreen 
          onOpenDay={handleOpenDay}
          onShowUpsell={handleShowUpsell}
          onOpenModule={handleOpenModule}
          onOpenBonus={handleOpenBonus}
        />
      )}
      
      {currentScreen === 'day' && state.arq && (
        <DayScreen
          archetype={state.arq}
          day={selectedDay}
          onBack={handleBackToDashboard}
          onComplete={handleDayComplete}
        />
      )}
      
      {currentScreen === 'complete' && (
        <CompleteScreen
          day={completedDay}
          totalXp={state.xp}
          onContinue={handleAfterComplete}
        />
      )}
      
      {currentScreen === 'upsell' && currentUpsellId && state.arq && (
        <UpsellScreen
          archetype={state.arq}
          upsellId={currentUpsellId}
          onBuy={handleBuyUpsell}
          onSkip={handleSkipUpsell}
        />
      )}

      {currentScreen === 'module' && currentModuleId && state.arq && (
        <ModuleScreen
          archetype={state.arq}
          moduleId={currentModuleId}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'content' && state.arq && (
        <ContentScreen onOpenDay={handleOpenDay} />
      )}

      {currentScreen === 'phrases' && state.arq && (
        <PhrasesScreen />
      )}

      {currentScreen === 'profile' && state.arq && (
        <ProfileScreen onOpenAdmin={handleOpenAdmin} />
      )}

      {currentScreen === 'admin' && (
        <AdminScreen onBack={handleBackToDashboard} />
      )}

      {currentScreen === 'manual' && (
        <ManualScreen onBack={handleBackToDashboard} />
      )}

      {currentScreen === 'mapa' && (
        <MapaScreen onBack={handleBackToDashboard} />
      )}

      {showBottomNav && (
        <BottomNav activeTab={currentTab} onTabChange={handleTabChange} />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <FrasesDiscretasApp />
    </AppProvider>
  )
}
