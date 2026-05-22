'use client'

import { ChevronLeft } from 'lucide-react'

interface MapaScreenProps {
  onBack: () => void
}

const padroes = [
  { titulo: 'O Silencio Estrategico', desc: 'Quando ele para de responder, nem sempre e desinteresse. As vezes e processamento. A diferenca esta no padrao anterior.' },
  { titulo: 'O Teste Inconsciente', desc: 'Homens testam limites sem saber que estao testando. A resposta que voce da define o padrao do relacionamento.' },
  { titulo: 'A Aproximacao Indireta', desc: 'Ele raramente diz o que quer diretamente. Aprenda a ler os sinais que precedem cada movimento.' },
  { titulo: 'O Medo do Compromisso Real', desc: 'Nao e medo de voce. E medo de perder a liberdade de nao decidir. A solucao nao e pressionar.' },
  { titulo: 'A Necessidade de Espaco', desc: 'Espaco nao e rejeicao. E como ele processa. Dar espaco com elegancia e o maior atrativo.' },
  { titulo: 'O Padrao de Reconexao', desc: 'Ele sempre volta quando voce para de esperar. Nao e coincidencia — e neurociencia.' },
  { titulo: 'A Comunicacao Nao-Verbal', desc: '93% da comunicacao e nao-verbal. O que ele faz importa mais do que o que ele diz.' },
  { titulo: 'O Ciclo de Interesse', desc: 'Interesse masculino funciona em ondas. Entender o ciclo evita interpretacoes erradas.' },
  { titulo: 'A Atracao pelo Misterio', desc: 'O que ele nao sabe sobre voce e mais atraente do que o que ele sabe. Preserve sempre algo.' },
  { titulo: 'O Valor da Independencia', desc: 'Nada e mais atraente do que uma mulher que nao precisa dele para ser feliz.' },
]

export function MapaScreen({ onBack }: MapaScreenProps) {
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
            Mapa do Comportamento Masculino
          </h1>
          
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            Decodificando os padroes que ele nunca vai te explicar
          </p>
          
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--rose)] to-[var(--gold)] opacity-40 w-24 mx-auto" />
        </div>

        <div className="flex flex-col gap-3">
          {padroes.map((padrao, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-semibold text-[var(--gold)] bg-[rgba(212,164,90,0.15)] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold text-[var(--white)] mb-1.5">
                    {padrao.titulo}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {padrao.desc}
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
