'use client'

import { ChevronLeft } from 'lucide-react'

interface ManualScreenProps {
  onBack: () => void
}

const frases = [
  { text: 'Voce apareceu na minha cabeca hoje de um jeito diferente.', desc: 'Cria presenca sem necessidade' },
  { text: 'Tem coisas que eu so consigo pensar quando estou quieta.', desc: 'Demonstra profundidade interior' },
  { text: 'Voce me faz querer ser mais honesta comigo mesma.', desc: 'Conexao emocional genuina' },
  { text: 'Hoje foi um desses dias que ficam.', desc: 'Compartilha sem explicar' },
  { text: 'Percebi que sorrio diferente quando voce esta por perto.', desc: 'Impacto sem pressao' },
  { text: 'Tem algo em voce que eu ainda estou descobrindo.', desc: 'Curiosidade que convida' },
  { text: 'Voce tem um timing interessante. Apareceu bem na hora.', desc: 'Retorno sem alivio' },
  { text: 'Andei tao dentro de mim que quase esqueci o mundo la fora.', desc: 'Presenca sem dependencia' },
  { text: 'Nem tudo que sinto precisa de explicacao. Esse e um deles.', desc: 'Intensidade calibrada' },
  { text: 'Voce nao sabe o quanto acertou sem saber que estava tentando.', desc: 'Alta densidade emocional' },
  { text: 'Tem uma versao de mim que muito pouca gente conhece.', desc: 'Abertura estrategica' },
  { text: 'Passei esses dias lembrando por que algumas coisas valem a pena.', desc: 'Reconexao elegante' },
  { text: 'Decidi parar de me explicar e deixar que as pessoas descubram.', desc: 'Postura de valor' },
  { text: 'Se voce soubesse o que eu estava pensando agora...', desc: 'Incompletude maxima' },
  { text: 'Aprendi que o que vale a pena fica mais intenso quando guardado.', desc: 'Maturidade emocional' },
  { text: 'Ha coisas sobre mim que so aparecem para quem presta atencao.', desc: 'Presenca magnetica' },
  { text: 'Voce e uma das poucas pessoas com quem o tempo tem uma qualidade diferente.', desc: 'Memoria emocional' },
]

export function ManualScreen({ onBack }: ManualScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[var(--bg)]">
      <header className="px-5 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.1)]"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--muted)]" />
        </button>
        <span className="text-[var(--muted)] text-sm">Voltar</span>
      </header>

      <div className="flex-1 px-5 py-6 pb-10 overflow-y-auto">
        <div className="text-center mb-6">
          <span className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--rose)] bg-[rgba(200,80,106,0.12)] px-3 py-1 rounded-full mb-4">
            Bonus Exclusivo
          </span>
          
          <h1 className="font-serif text-2xl font-semibold text-[var(--white)] mb-2 text-balance">
            Manual da Comunicacao Irresistivel
          </h1>
          
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            17 frases estudadas psicologicamente para criar conexao emocional profunda
          </p>
          
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--rose)] to-[var(--gold)] opacity-40 w-24 mx-auto" />
        </div>

        <div className="flex flex-col gap-3">
          {frases.map((frase, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-semibold text-[var(--gold)] bg-[rgba(212,164,90,0.15)] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-base italic text-[var(--white)] leading-relaxed mb-2">
                    &ldquo;{frase.text}&rdquo;
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {frase.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
