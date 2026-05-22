'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react'
import { useAppState } from '@/lib/context'

interface LoginScreenProps {
  onLogin: (hasArchetype: boolean) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { login, isLoading, error, state } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await login(email, password)
    if (result.success) {
      onLogin(result.hasArchetype)
    }
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-7 py-12"
      style={{
        background: 'radial-gradient(circle at 50% 20%, rgba(200, 80, 106, 0.14) 0%, transparent 50%), #0a0808'
      }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl italic text-[#faf5f2] tracking-wide">
          Frases <span className="text-[#e8748a]">Discretas</span>
        </h1>
        
        {/* Gradient line */}
        <div 
          className="h-[2px] w-14 mx-auto mt-4 rounded-sm"
          style={{
            background: 'linear-gradient(90deg, #c8506a, #d4a45a)'
          }}
        />
        
        {/* Subtitle */}
        <p className="text-[#8a7a76] text-sm mt-4">
          Seu protocolo personalizado de comunicação
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail de compra"
            disabled={isLoading}
            className="w-full px-4 py-3.5 rounded-lg bg-black/30 border border-white/12 text-[#e0d4d0] placeholder:text-[#8a7a76] focus:border-[#d4a45a] focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            disabled={isLoading}
            className="w-full px-4 py-3.5 rounded-lg bg-black/30 border border-white/12 text-[#e0d4d0] placeholder:text-[#8a7a76] focus:border-[#d4a45a] focus:outline-none transition-colors pr-12 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7a76] hover:text-[#e0d4d0] transition-colors disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-[#c8506a] text-sm text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-lg font-sans font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #c8506a, #8a2040)',
            boxShadow: '0 4px 24px rgba(200, 80, 106, 0.3)'
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Carregando...
            </>
          ) : (
            <>Entrar &rarr;</>
          )}
        </button>

        {/* Microcopy */}
        <p className="text-[#8a7a76] text-xs text-center flex items-center justify-center gap-1.5 mt-4">
          <Lock size={12} />
          Acesso exclusivo para compradores
        </p>
      </form>
    </div>
  )
}
