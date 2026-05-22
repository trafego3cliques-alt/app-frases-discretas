'use client'

import { Logo, Button, IntroCard } from '@/components/ui-components'

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_20%,rgba(200,80,106,0.15),transparent_60%),radial-gradient(ellipse_60%_40%_at_80%_85%,rgba(212,164,90,0.08),transparent_55%),var(--bg)]">
      <div className="flex-1 flex flex-col items-center justify-center px-7 py-12 text-center">
        <Logo className="text-[22px] text-[var(--white)]" />
        <div className="grad-line w-14 my-3.5" />
        <h1 className="font-serif text-[clamp(30px,8vw,46px)] font-semibold text-[var(--white)] leading-[1.05] mb-2.5">
          Não são frases.<br />
          <em className="italic text-[var(--rose-l)]">É um protocolo.</em>
        </h1>
        <p className="text-sm text-[var(--muted)] leading-[1.8] max-w-[340px]">
          A maioria das mulheres acredita que o problema está no que sente — ou em quem escolhe. A verdade é mais precisa que isso.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 px-6 mb-6">
        <IntroCard
          icon="🧠"
          iconVariant="rose"
          title="Psicologia, não manipulação"
          description="Cada frase foi estruturada com base em como o cérebro masculino processa conexão, distância e desejo. Não é intuição — é ciência aplicada."
        />
        <IntroCard
          icon="🎯"
          iconVariant="gold"
          title="Personalizado pelo seu arquétipo"
          description="O seu padrão de comunicação cria dinâmicas específicas nas suas relações. As frases certas para você não são as certas para outra mulher."
        />
        <IntroCard
          icon="🔓"
          iconVariant="blue"
          title="Uma jornada de 7 dias"
          description="Não é um PDF para ler — é um protocolo para viver. Cada dia desbloqueado traz um conceito, uma frase e uma ação com resultado esperado."
        />
        <IntroCard
          icon="✨"
          iconVariant="green"
          title="Você já deu o primeiro passo"
          description="Ao entender que existe um padrão — e que ele pode mudar — você saiu da maioria. Isso começa aqui."
        />
      </div>

      <div className="px-6 pb-9">
        <Button onClick={onStart}>Iniciar minha jornada →</Button>
        <p className="text-xs text-[var(--muted)] text-center mt-3">
          🔒 Anônimo · Acesso exclusivo · Resultado imediato
        </p>
      </div>
    </div>
  )
}
