'use client'

import { useState } from 'react'
import { Logo, Pill, ProgressBar, Option } from '@/components/ui-components'
import { questions, type ArchetypeKey } from '@/lib/data'

interface DiagnosticScreenProps {
  onComplete: (archetype: ArchetypeKey) => void
}

export function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({ E: 0, I: 0, C: 0, P: 0 })
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const letters = ['A', 'B', 'C', 'D']

  const handleSelect = (index: number, archetype: ArchetypeKey) => {
    if (isTransitioning) return
    
    setSelectedOption(index)
    setScores(prev => ({ ...prev, [archetype]: prev[archetype] + 1 }))
    setIsTransitioning(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
        setIsTransitioning(false)
      } else {
        // Calculate winner
        const winner = (Object.entries(scores) as [ArchetypeKey, number][])
          .reduce((a, b) => {
            // Add the final selection score
            const aScore = a[1] + (a[0] === archetype ? 1 : 0)
            const bScore = b[1] + (b[0] === archetype ? 1 : 0)
            return aScore > bScore ? a : b
          })[0]
        onComplete(winner)
      }
    }, 420)
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)]">
      <header className="px-6 pt-4.5 pb-3.5 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between mb-2">
          <Logo />
          <Pill variant="rose" dot>Diagnóstico</Pill>
        </div>
        <ProgressBar 
          progress={progress} 
          label={`Pergunta ${currentQuestion + 1} de ${questions.length}`}
          showPercentage
        />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div 
          key={currentQuestion}
          className="w-full max-w-[420px] animate-fade-up"
        >
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--rose)] mb-2.5 flex items-center gap-2">
            {question.tag}
            <span className="flex-1 h-px bg-[rgba(200,80,106,0.18)]" />
          </div>
          
          <h2 className="font-serif text-[clamp(20px,5vw,28px)] font-semibold text-[var(--white)] leading-[1.25] mb-6">
            {question.text}
          </h2>

          <div className="flex flex-col gap-2.5">
            {question.opts.map((opt, index) => (
              <Option
                key={index}
                letter={letters[index]}
                text={opt.t}
                selected={selectedOption === index}
                onClick={() => handleSelect(index, opt.a)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
