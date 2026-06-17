// Tipos e dados do app Frases Discretas

export type ArchetypeKey = 'E' | 'I' | 'C' | 'P'

export interface Archetype {
  nome: string
  art: string
  emoji: string
  pill: string
  sub: string
  traits: string[]
  diag: string
}

export interface DayContent {
  tag: string
  title: string
  intro: string
  concept: {
    title: string
    text: string
  }
  frase: {
    text: string
    why: string
  }
  actions: string[]
  result: string
}

export interface Upsell {
  id: string
  day: number
  cel: string
  congrats: string
  bridge: string
  title: string
  sub: string
  items: string[]
  de: string
  por: string
  url: string
}

export interface Question {
  tag: string
  text: string
  opts: { t: string; a: ArchetypeKey }[]
}

export const archetypes: Record<ArchetypeKey, Archetype> = {
  E: {
    nome: 'Espera',
    art: 'a',
    emoji: '⏳',
    pill: 'A Espera',
    sub: 'Alta empatia · Investe mais do que recebe · Paralisia antes de agir',
    traits: ['Inicia quase sempre', 'Analisa cada mensagem', 'Sente mais do que mostra'],
    diag: 'Você tem uma capacidade empática fora do comum — consegue sentir o estado emocional da outra pessoa antes mesmo que ele se manifeste. O problema é que esse talento se voltou contra você: <strong>você dá mais do que recebe</strong> porque percebe as necessidades do outro antes de perceber as suas. E quando tenta agir com intenção, a ansiedade paralisa. O protocolo dos 7 dias muda exatamente isso.'
  },
  I: {
    nome: 'Intensidade',
    art: 'a',
    emoji: '🔥',
    pill: 'A Intensidade',
    sub: 'Conexão rápida · Comunicação densa · Intensidade como arma e fragilidade',
    traits: ['Conecta com facilidade', 'Sente tudo de verdade', 'Excesso como padrão'],
    diag: 'Você conecta de forma extraordinária — as pessoas sentem sua presença desde a primeira mensagem. O desafio é que sua <strong>intensidade que atrai no início</strong> pode afastar na continuidade. Você sente tudo de verdade, e isso aparece nas palavras mais do que você percebe. O protocolo não vai te pedir para sentir menos — vai te ensinar a calibrar a entrega.'
  },
  C: {
    nome: 'Controle',
    art: 'o',
    emoji: '🛡️',
    pill: 'O Controle',
    sub: 'Comunicação calculada · Dificuldade de abrir · Proteção como reflexo',
    traits: ['Raramente espontânea', 'Mistério como escudo', 'Isolamento silencioso'],
    diag: 'Você tem uma presença que fascina — e raramente revela tudo. As pessoas sentem que há muito mais por baixo do que você mostra. O desafio é que o <strong>controle que te protege também te isola</strong>. Você prefere o silêncio ao risco de parecer necessitada — e às vezes perde conexões que queria manter. O protocolo vai te dar ferramentas para abrir sem se expor.'
  },
  P: {
    nome: 'Presença',
    art: 'a',
    emoji: '✨',
    pill: 'A Presença',
    sub: 'Comunicação equilibrada · Presente sem pressão · Conexões profundas',
    traits: ['Naturalmente equilibrada', 'Presente sem pressão', 'Base sólida de conexão'],
    diag: 'Você tem uma base de comunicação sólida — e isso é raro. Consegue estar presente sem criar pressão, inicia com naturalidade e recebe com equilíbrio. O desafio do seu arquétipo não é resolver um problema — é <strong>refinar o que separa conexões boas de conexões inesquecíveis</strong>. O protocolo vai trabalhar os detalhes que criam presença magnética real.'
  }
}

export const questions: Question[] = [
  {
    tag: 'Seu padrão hoje',
    text: 'Quando ele fica em silêncio por alguns dias, sua primeira reação é:',
    opts: [
      { t: 'Fico verificando se ele viu minha mensagem', a: 'E' },
      { t: 'Fico com raiva — se importasse, encontraria tempo', a: 'I' },
      { t: 'Me afasto também — não corro atrás', a: 'C' },
      { t: 'Continuo minha vida — vai aparecer quando puder', a: 'P' }
    ]
  },
  {
    tag: 'Como você se vê',
    text: 'Qual dessas frases descreve melhor como você se sente na maioria das conexões?',
    opts: [
      { t: 'Sinto que dou mais do que recebo — e não consigo parar', a: 'E' },
      { t: 'Às vezes exagero na intensidade e afasto quem me importa', a: 'I' },
      { t: 'Mantenho distância como proteção — e perco conexões por isso', a: 'C' },
      { t: 'Me sinto valorizada e a troca costuma ser equilibrada', a: 'P' }
    ]
  },
  {
    tag: 'O que você quer mudar',
    text: 'Se pudesse mudar uma coisa na sua comunicação agora, qual seria?',
    opts: [
      { t: 'Parar de iniciar tudo e esperar mais da outra pessoa', a: 'E' },
      { t: 'Comunicar com mais leveza e menos intensidade', a: 'I' },
      { t: 'Me abrir mais sem medo de parecer fraca', a: 'C' },
      { t: 'Criar conexões ainda mais profundas e duradouras', a: 'P' }
    ]
  }
]

export const dayTitles = [
  'O Código da Conexão',
  'O Mapa do Silêncio',
  'A Linguagem da Incompletude',
  'As Frases do Seu Arquétipo',
  'O Princípio da Presença Real',
  'O Protocolo do Equilíbrio',
  'O Protocolo Completo'
]

export const dayIcons = ['🔑', '🗺️', '💡', '🎯', '⚡', '🌊', '🏆']

export const daysContent: Record<ArchetypeKey, DayContent[]> = {
  E: [
    {
      tag: 'Fundamento',
      title: 'O Código da Conexão',
      intro: 'Antes de qualquer frase, existe um princípio que ninguém te ensinou. Entendê-lo vai mudar como você interpreta cada silêncio, cada resposta curta, cada distância.',
      concept: {
        title: 'Por que você sente mais do que recebe',
        text: 'Mulheres com alto perfil empático tendem a <strong>antecipar as necessidades da outra pessoa</strong> antes de qualquer sinalização. Isso cria um desequilíbrio invisível: você já está no próximo nível emocional enquanto ele ainda está no anterior. Quando você "dá mais", não é fraqueza — é um sistema nervoso respondendo ao que percebe, não ao que foi pedido. A boa notícia: isso pode ser redirecionado.'
      },
      frase: {
        text: '"Estava pensando em algo completamente diferente quando você apareceu na minha cabeça."',
        why: 'Demonstra vida interior rica e que ele faz parte dela de forma natural — não ansiosa. Cria curiosidade sem revelar o suficiente para encerrar a conversa.'
      },
      actions: [
        'Hoje: se ele não entrar em contato, <strong>não inicie</strong>. Apenas observe como seu sistema nervoso reage.',
        'Escreva (só para você) o que você normalmente mandaria agora — mas não mande.',
        'Ao final do dia, leia o que escreveu. Isso é o seu padrão automático.'
      ],
      result: 'Ao final deste dia, você terá identificado seu impulso de comunicação automático. Esse reconhecimento é o primeiro passo para substituí-lo pelo protocolo.'
    },
    {
      tag: 'Decodificação',
      title: 'O Mapa do Silêncio',
      intro: 'O silêncio dele não é o que você pensa. E sua interpretação desse silêncio está custando muito mais do que você percebe.',
      concept: {
        title: 'Os 3 tipos de silêncio masculino',
        text: 'Pesquisadores identificaram que homens processam conexão emocional de forma diferente — o silêncio raramente significa rejeição. Existem 3 tipos: <em>processamento</em> (ele está integrando algo), <em>regulação</em> (ele está gerenciando um estado interno) e <em>teste</em> (ele quer ver sua reação). Só o terceiro diz algo sobre a dinâmica entre vocês — e mesmo esse tem uma resposta específica que não é ansiedade.'
      },
      frase: {
        text: '"Que bom que você apareceu. Tava aqui no meu mundo."',
        why: 'Quando ele retorna após silêncio, esta resposta comunica: você estava bem sem ele. Cria percepção de valor sem cobrar, sem alívio visível, sem demonstrar que esperou.'
      },
      actions: [
        'Identifique: quando ele fica em silêncio, qual tipo você assume automaticamente?',
        'Pratique a frase do dia em voz alta — sinta o estado emocional que ela cria em você.',
        '<strong>Ação de alto impacto:</strong> se ele entrar em contato hoje, espere 30 minutos antes de responder. Note a sensação.'
      ],
      result: 'Você vai começar a perceber a diferença entre silêncio que pede resposta e silêncio que pede presença. Essa distinção muda completamente como você age.'
    },
    {
      tag: 'Protocolo',
      title: 'A Linguagem da Incompletude',
      intro: 'Hoje você aprende o princípio central do código secreto da comunicação sedutora. Não é sobre o que você diz — é sobre o que você deliberadamente não diz.',
      concept: {
        title: 'O Efeito Zeigarnik na comunicação',
        text: 'O cérebro humano é programado para completar o que está incompleto — psicólogos chamam isso de <strong>Efeito Zeigarnik</strong>. Uma mensagem que deixa algo em aberto ativa esse sistema: ele vai pensar em você depois de ler, não durante. A arte está em dizer o suficiente para criar curiosidade e o suficiente para demonstrar que você tem mais para oferecer. Incompletude não é mistério artificial — é inteligência emocional aplicada.'
      },
      frase: {
        text: '"Acabei de descobrir algo que você definitivamente não ia esperar de mim."',
        why: 'Usa o princípio da incompletude — não resolve a curiosidade, a abre. Deixa a pergunta "o quê?" como trabalho do cérebro dele. Simples, eficaz, elegante.'
      },
      actions: [
        'Escolha uma mensagem sua dos últimos 7 dias e reescreva usando a incompletude.',
        'Compare as duas versões: qual cria mais espaço para a conversa continuar?',
        '<strong>Desafio:</strong> envie uma mensagem nova usando o princípio hoje.'
      ],
      result: 'Após este dia, você vai perceber a diferença entre mensagens que fecham conversas e mensagens que as mantêm abertas. Este é o núcleo do método.'
    },
    {
      tag: 'Arsenal',
      title: 'As Frases do Seu Arquétipo',
      intro: 'Você já entende os princípios. Agora vem o arsenal específico para A Espera — as frases exatas para as situações que mais te custam.',
      concept: {
        title: 'As 3 situações críticas de A Espera',
        text: 'Para o arquétipo da Espera, existem 3 situações que ativam o padrão automático com mais força: <em>quando ele some sem aviso</em>, <em>quando retorna como se nada tivesse acontecido</em> e <em>quando você sente a distância crescer mas ele não demonstra nada</em>. Para cada uma existe uma resposta que reposiciona a dinâmica sem confrontar, sem cobrar e sem diminuir você.'
      },
      frase: {
        text: '"Curiosamente, quando você some é quando percebo o quanto tenho me dedicado ao que é meu."',
        why: 'Usada quando ele retorna após sumir. Comunica: o afastamento dele não te desfez — te concentrou em você mesma. É o oposto do que o padrão automático faria.'
      },
      actions: [
        'Liste as últimas 3 vezes que o padrão automático falou mais alto. O que você enviou?',
        'Para cada situação, escreva como a versão do protocolo responderia.',
        '<strong>Guarde essas 3 frases.</strong> Elas são o seu kit de emergência.'
      ],
      result: 'Você agora tem um arsenal personalizado para as situações que mais te custavam. O próximo passo é internalizá-las até virarem reflexo — não performance.'
    },
    {
      tag: 'Aprofundamento',
      title: 'O Princípio da Presença Real',
      intro: 'Existe uma diferença entre estar presente e parecer presente. Hoje você aprende o que as separa — e como isso muda completamente a percepção que ele tem de você.',
      concept: {
        title: 'Qualidade versus frequência',
        text: 'A pesquisa do MIT sobre conexão interpessoal identificou que o fator mais determinante na percepção de valor não é a frequência de contato — é a <strong>qualidade de cada ponto de contato</strong>. Uma mensagem enviada de um estado de equilíbrio tem 3x mais impacto do que dez mensagens enviadas de ansiedade. O que muda não é o que você diz — é de onde você fala.'
      },
      frase: {
        text: '"Hoje foi um desses dias que te lembram por que você faz o que faz."',
        why: 'Compartilha algo genuíno da sua vida sem abrir espaço para interpretação. Demonstra que você tem um mundo interior rico — e que ele é convidado a entrar, não cobrado a responder.'
      },
      actions: [
        'Identifique 3 coisas genuínas que aconteceram hoje que são exclusivamente suas.',
        'Escolha a mais interessante e crie uma mensagem usando o princípio da presença real.',
        '<strong>Regra de hoje:</strong> a mensagem não pode ter nenhuma pergunta. Só declaração.'
      ],
      result: 'Você começa a mudar o eixo da comunicação: de buscar resposta para criar atração. Essa mudança é sutil no início — e poderosa com o tempo.'
    },
    {
      tag: 'Transformação',
      title: 'O Protocolo do Equilíbrio',
      intro: 'Nos últimos 5 dias você mudou como interpreta o silêncio, como responde ao retorno e como inicia. Hoje integramos tudo isso num único princípio.',
      concept: {
        title: 'Como o desequilíbrio se instala e como sai',
        text: 'A assimetria relacional — onde um investe mais que o outro — não se instala de uma vez. Ela se instala <strong>mensagem a mensagem</strong>, ao longo de semanas. E se desfaz da mesma forma: com decisões conscientes repetidas. O protocolo não é uma virada de chave — é uma recalibração gradual que, quando completa, muda a dinâmica inteira sem que você precise explicar nada a ninguém.'
      },
      frase: {
        text: '"Percebi que precisava de mais de mim mesma. E que isso muda tudo ao redor."',
        why: 'Pode ser enviada ou guardada. Não é sobre ele — é uma declaração de onde você está. Quem a recebe sente que está diante de uma mulher que se moveu.'
      },
      actions: [
        'Releia as frases dos 5 dias anteriores. Escolha a que mais ressoou com você.',
        'Compare como você teria respondido em cada situação antes do protocolo.',
        '<strong>Escreva:</strong> "O que mudou em mim nesses 5 dias."'
      ],
      result: 'Você tem o mapa completo. O Dia 7 vai selar o protocolo com a ação mais importante da jornada.'
    },
    {
      tag: 'Conquista',
      title: 'O Protocolo Completo',
      intro: 'Você chegou ao Dia 7. O que começa aqui não é o fim — é o primeiro dia do novo padrão.',
      concept: {
        title: 'A diferença que ninguém percebe, mas todo mundo sente',
        text: 'O protocolo não muda o que você diz — muda <strong>de onde você fala</strong>. E isso é percebido antes das palavras. Estudos de linguagem digital mostram que o estado emocional de quem escreve aparece na escolha de palavras, no timing e no que não é dito. Quando você comunica do lugar do equilíbrio, isso é sentido visceralmente — não racionalmente.'
      },
      frase: {
        text: '"Tem coisas que só ficam claras depois. E quando ficam, você fica agradecida pela espera."',
        why: 'A frase-síntese do arquétipo A Espera transformado. Não é mais esperar por ele — é a espera como processo interno, como crescimento. Quem a lê sente que está diante de uma mulher que chegou a outro lugar.'
      },
      actions: [
        '<strong>A ação final:</strong> aplique uma frase do protocolo em uma situação real hoje.',
        'Documente o resultado — não a resposta dele, mas como você se sentiu enviando.',
        'Isso é o novo ponto de partida.'
      ],
      result: 'Você completou o Protocolo Frases Discretas para A Espera. O que mudou não é o que você diz — é de onde você fala.'
    }
  ],
  I: [
    {
      tag: 'Fundamento',
      title: 'O Código da Conexão',
      intro: 'Sua intensidade não é o problema. É a maior força que você tem. O protocolo não vai pedir para você sentir menos — vai te ensinar a entregar com precisão.',
      concept: {
        title: 'Por que a intensidade atrai e depois afasta',
        text: 'Neurociência comportamental identificou que conexões intensas no início criam dopamina — o neurotransmissor do desejo. O problema é que <strong>dopamina sem cortisol baixo cria ansiedade</strong>, não amor. Quando você sente muito e entrega tudo de uma vez, a outra pessoa vai de dopamina para sobrecarga. Não é que ela não te quer — é que o sistema nervoso dela não consegue processar tudo no mesmo ritmo.'
      },
      frase: {
        text: '"Tem momentos que eu guardo só para mim. Esse foi um deles — até agora."',
        why: 'Demonstra que você tem uma vida interior rica que não está disponível para todos. Cria curiosidade sem intensidade — o oposto do padrão automático.'
      },
      actions: [
        'Hoje: escreva tudo que você normalmente mandaria — mas envie apenas 20% disso.',
        'Observe a sensação de segurar. Não é repressão — é calibração.',
        'Note se a resposta que veio foi diferente do habitual.'
      ],
      result: 'Você vai começar a sentir a diferença entre liberar tudo e entregar com precisão. A intensidade que fica calibrada cria mais atração do que a que transborda.'
    },
    {
      tag: 'Decodificação',
      title: 'O Mapa do Silêncio',
      intro: 'O que você diz importa. Quando você diz importa mais. Hoje você aprende a usar o tempo como parte da mensagem.',
      concept: {
        title: 'A psicologia do timing nas mensagens',
        text: 'Pesquisadores identificaram que o <strong>tempo entre a mensagem e a resposta</strong> comunica tanta informação quanto o conteúdo. Resposta imediata sinaliza alta disponibilidade — o que reduz percepção de valor. Resposta calibrada sinaliza que você tem uma vida em movimento. Para A Intensidade, o desafio é que a urgência interna pressiona por resposta imediata.'
      },
      frase: {
        text: '"Tava no meio de algo. Mas você vale a interrupção."',
        why: 'Comunica simultaneamente que você tem vida própria E que ele importa. Intensidade sem ansiedade. A ordem das palavras importa — a vida vem antes dele.'
      },
      actions: [
        'Regra: antes de responder qualquer mensagem dele, espere pelo menos o dobro do tempo que ele esperou.',
        'Observe o impulso de responder imediatamente — é automático, não é urgência real.',
        'Escolha um momento hoje para mandar uma mensagem <strong>curta e incompleta</strong>.'
      ],
      result: 'O timing calibrado vai começar a mudar a percepção que ele tem da sua disponibilidade — sem que você precise dizer uma palavra sobre isso.'
    },
    {
      tag: 'Protocolo',
      title: 'A Linguagem da Incompletude',
      intro: 'Muito em poucas palavras. Esse é o princípio que separa comunicação intensa de comunicação irresistível.',
      concept: {
        title: 'Densidade versus volume',
        text: 'A intensidade que você sente é real — o desafio é a <strong>densidade de entrega</strong>. Uma frase que carrega profundidade emocional real é mais poderosa do que cinco parágrafos que tentam explicar essa profundidade. O cérebro da outra pessoa preenche os espaços — e o que ela imagina é sempre maior do que o que você poderia descrever.'
      },
      frase: {
        text: '"Você não sabe o quanto acertou sem saber que estava tentando."',
        why: 'Alta densidade emocional em poucas palavras. Deixa espaço para interpretação. Cria o desejo de perguntar "o quê?" sem forçar a resposta.'
      },
      actions: [
        'Escolha a última mensagem longa que você enviou e reescreva em uma única frase.',
        'Teste: você perdeu o significado ou ele ficou mais poderoso?',
        '<strong>Desafio do dia:</strong> se comunicar com ele usando no máximo 2 frases em cada mensagem.'
      ],
      result: 'Você vai perceber que menos palavras cuidadosamente escolhidas criam mais impacto do que muitas palavras verdadeiras mal calibradas.'
    },
    {
      tag: 'Arsenal',
      title: 'As Frases do Seu Arquétipo',
      intro: 'Você entende os princípios. Agora o arsenal específico para A Intensidade — frases que carregam profundidade sem criar sobrecarga.',
      concept: {
        title: 'As 3 situações críticas de A Intensidade',
        text: 'Para A Intensidade, os 3 momentos mais desafiadores são: <em>quando você quer dizer muito e precisa calibrar o quanto entregar</em>, <em>quando a tensão emocional está alta e o impulso é confrontar</em> e <em>quando ele esfria e a tentação é intensificar para resgatar</em>. Para cada um, existe uma resposta que preserva sua autenticidade sem criar sobrecarga.'
      },
      frase: {
        text: '"Preciso processar isso. Você merece minha versão mais inteira — não a do impulso."',
        why: 'Usada quando a tensão está alta e o impulso é confrontar ou intensificar. Mostra maturidade emocional rara. Cria respeito antes de qualquer resolução.'
      },
      actions: [
        'Liste os 3 momentos recentes onde o padrão de intensidade se manifestou mais forte.',
        'Para cada um, escreva como a versão calibrada teria respondido.',
        '<strong>Kit de emergência:</strong> salve essas 3 frases para usar quando sentir o impulso subir.'
      ],
      result: 'Você tem um arsenal que honra sua intensidade sem entregá-la toda de uma vez. O próximo passo é praticar até virar reflexo.'
    },
    {
      tag: 'Aprofundamento',
      title: 'O Princípio da Presença Real',
      intro: 'Você sempre soube como encher o espaço. Hoje aprende o poder de deixá-lo vazio.',
      concept: {
        title: 'Vácuo emocional e desejo',
        text: 'Psicologia da atração identificou que <strong>o espaço deliberado cria desejo</strong> — o sistema nervoso da outra pessoa naturalmente busca preencher o que está incompleto. Para A Intensidade, o desafio é que preencher o espaço é automático. Cada vez que você resiste a esse impulso, você cria uma tensão sutil que funciona a seu favor.'
      },
      frase: {
        text: '"Tem coisas que ficam melhores quando você espera o momento certo para contar."',
        why: 'Sinaliza que existe mais — sem revelar o quê. Usa o espaço como ferramenta. Cria antecipação sem intensidade.'
      },
      actions: [
        'Escolha algo genuíno que aconteceu com você hoje — e decida não contar ainda.',
        'Observe como a "reserva" muda a forma como você aparece na próxima conversa.',
        'Quando finalmente contar, perceba a diferença na qualidade da atenção que recebe.'
      ],
      result: 'Você vai começar a sentir o poder de não entregar tudo. O que é reservado tem mais valor do que o que é imediatamente disponível.'
    },
    {
      tag: 'Transformação',
      title: 'O Protocolo do Equilíbrio',
      intro: 'Cinco dias integrando calibração, timing e densidade. Hoje o princípio que une tudo.',
      concept: {
        title: 'A diferença entre intensa e irresistível',
        text: 'Intensidade não calibrada satura. Intensidade calibrada <strong>cria dependência emocional</strong>. A mulher irresistível não é a que sente menos — é a que entrega com precisão. Cada frase dela tem peso porque ela não desperdiça palavras. Cada momento de intensidade tem impacto porque não é constante.'
      },
      frase: {
        text: '"Decidi que vou parar de me explicar e deixar que as pessoas descubram."',
        why: 'Declaração de postura que comunica confiança profunda. Não é direcionada a ele — é sobre você. Mas quem ouve quer fazer parte da descoberta.'
      },
      actions: [
        'Releia as frases dos 5 dias anteriores e escolha a que mais te surpreendeu.',
        'Escreva: como a versão calibrada da sua intensidade se parece na prática?',
        '<strong>Ação de hoje:</strong> uma interação guiada 100% pelo protocolo.'
      ],
      result: 'Você está pronta para o Dia 7 — o passo final que sela o protocolo e inicia o novo padrão.'
    },
    {
      tag: 'Conquista',
      title: 'O Protocolo Completo',
      intro: 'Sete dias recalibrando como você entrega o que sente. O que muda hoje não é a intensidade — é a relação que você tem com ela.',
      concept: {
        title: 'Intensidade como presente, não como pressão',
        text: 'Quando calibrada, a intensidade de A Intensidade é o maior presente que existe numa relação. Ela cria <strong>conexão real, memória emocional e profundidade</strong>. A diferença entre pressão e presente é o timing, a densidade e o espaço que você preserva. Com o protocolo internalizado, sua intensidade passa a trabalhar a seu favor — não contra.'
      },
      frase: {
        text: '"Aprendi que o que vale a pena sente mais intenso quando guardado com cuidado."',
        why: 'A frase-síntese de A Intensidade transformada. Não é contenção — é sabedoria. Quem a lê sente que está diante de uma mulher que domina o que sente.'
      },
      actions: [
        '<strong>A ação final:</strong> aplique uma comunicação 100% calibrada hoje.',
        'Documente: como foi a reação versus o padrão anterior?',
        'Isso é o novo ponto de partida.'
      ],
      result: 'Você completou o protocolo para A Intensidade. O que mudou não é quanto você sente — é como você entrega.'
    }
  ],
  C: [
    {
      tag: 'Fundamento',
      title: 'O Código da Conexão',
      intro: 'Você aprendeu a se proteger por uma razão. E essa razão faz todo sentido. O que o protocolo vai fazer não é tirar o escudo — é dar a você a escolha de quando usá-lo.',
      concept: {
        title: 'Por que a proteção se tornou prisão',
        text: 'Psicólogos identificaram que pessoas com alto controle emocional desenvolvem o padrão como resposta adaptativa — geralmente antes dos 20 anos. O problema é que o mesmo mecanismo que te protegeu de dor também te <strong>protege da conexão</strong>. Você não perdeu a capacidade de se abrir — você nunca teve permissão de aprender como fazer isso sem se sentir exposta.'
      },
      frase: {
        text: '"Tenho pensado muito — e decidi que algumas coisas merecem mais do meu espaço interior."',
        why: 'Demonstra profundidade sem revelar o quê. Cria curiosidade sobre o seu mundo interno. Não é uma abertura — é um convite sutil para que ele se pergunte o que está dentro.'
      },
      actions: [
        'Observe as vezes que você escolheu o silêncio porque falar parecia perigoso.',
        'Escreva (só para você): "O que eu teria dito se não tivesse medo de parecer necessitada?"',
        'Essa distância entre o que você sente e o que você diz é o que o protocolo vai encurtar.'
      ],
      result: 'Ao final deste dia, você terá mapeado onde o controle atua com mais força. Esse mapa é o primeiro instrumento do protocolo.'
    },
    {
      tag: 'Decodificação',
      title: 'O Mapa do Silêncio',
      intro: 'Abrir não significa expor. Hoje você aprende a diferença — e por que essa distinção muda tudo.',
      concept: {
        title: 'Vulnerabilidade calculada versus exposição',
        text: 'Existe uma diferença entre <strong>vulnerabilidade estratégica</strong> (revelar algo selecionado com intenção) e exposição (revelar tudo de uma vez). Para O Controle, a segunda parece a única opção disponível. O protocolo vai te mostrar que existe um terceiro caminho.'
      },
      frase: {
        text: '"Às vezes eu surpreendo até a mim mesma com o que descubro quando paro de me controlar tanto."',
        why: 'Revela que existe um mundo interior em movimento. Cria proximidade sem expor. Demonstra autoconsciência — uma das características mais atraentes que existem.'
      },
      actions: [
        'Escolha uma coisa genuína sobre você que você raramente compartilha.',
        'Crie uma frase que toque nesse assunto sem revelá-lo completamente.',
        'Se sentir segura, envie hoje. Se não, salve para amanhã.'
      ],
      result: 'Você vai perceber que abrir com intenção é completamente diferente de expor sem controle.'
    },
    {
      tag: 'Protocolo',
      title: 'A Linguagem da Incompletude',
      intro: 'Existe uma forma de criar intimidade real sem abrir mão da sua privacidade. Hoje você aprende como.',
      concept: {
        title: 'O princípio da janela estratégica',
        text: 'Intimidade não é construída pela quantidade do que é revelado — é construída pela <strong>qualidade da seleção</strong>. Quando você escolhe revelar algo específico, com intenção, isso cria mais conexão do que abrir tudo. Para O Controle, isso é uma mudança fundamental: você não precisa abrir a casa — só a janela.'
      },
      frase: {
        text: '"Tem uma versão de mim que muito pouca gente conhece. Você está chegando perto de encontrar ela."',
        why: 'Convida sem expor. Cria interesse sem pressão. Comunica que você tem profundidade — e que ele está sendo especialmente admitido.'
      },
      actions: [
        'Identifique uma "janela" — algo sobre você que poucos sabem, genuíno, não pesado.',
        'Crie uma mensagem que abra essa janela parcialmente.',
        '<strong>Regra:</strong> revelar suficiente para criar curiosidade. Não suficiente para resolver.'
      ],
      result: 'Você terá experimentado a diferença entre expor e revelar. Essa distinção é o coração do protocolo para O Controle.'
    },
    {
      tag: 'Arsenal',
      title: 'As Frases do Seu Arquétipo',
      intro: 'Você entende os princípios. Agora o arsenal específico para O Controle — frases que criam conexão sem exigir exposição.',
      concept: {
        title: 'As 3 situações críticas de O Controle',
        text: 'Para O Controle, os 3 momentos mais desafiadores são: <em>quando você quer reconectar depois de um distanciamento mas não quer parecer que esperou</em>, <em>quando sente algo forte mas seu reflexo é o silêncio</em> e <em>quando ele se aproxima demais e seu instinto é recuar</em>.'
      },
      frase: {
        text: '"Percebi que eu me afasto quando deveria simplesmente ficar. Estou aprendendo a diferença."',
        why: 'Usada quando o distanciamento foi de você. Revela autoconsciência sem pedir desculpas. Cria abertura sem vulnerabilidade.'
      },
      actions: [
        'Liste 3 situações recentes onde o recuo automático atuou.',
        'Para cada uma, escreva o que você teria dito se tivesse a frase certa.',
        '<strong>Kit de emergência:</strong> salve essas 3 frases para quando o recuo automático aparecer.'
      ],
      result: 'Você tem um arsenal que honra sua necessidade de controle enquanto cria as aberturas que a conexão real exige.'
    },
    {
      tag: 'Aprofundamento',
      title: 'O Princípio da Presença Real',
      intro: 'Quando a conexão esfriou — seja por iniciativa sua ou dele — existe uma forma de retomar que não parece perseguição e não parece rendição.',
      concept: {
        title: 'O movimento que reconecta sem suplicar',
        text: 'Para O Controle, a reconexão é o maior desafio porque as duas opções disponíveis parecem igualmente arriscadas: <em>iniciar</em> (que parece fraqueza) ou <em>esperar</em> (que custa conexões). O protocolo identifica um terceiro movimento: <strong>aparecer de uma forma que ele precise escolher</strong> se vai se aproximar ou não.'
      },
      frase: {
        text: '"Passei esses dias relembrando por que algumas coisas valem a pena ser difíceis."',
        why: 'Pode ser enviada depois de silêncio de qualquer um dos dois. Não explica, não pede — apenas sinaliza que você está em movimento.'
      },
      actions: [
        'Pense em uma conexão que esfriou recentemente.',
        'Use a frase do dia ou crie uma variação para aquela situação específica.',
        'Observe: enviar a partir do equilíbrio é diferente de enviar a partir do medo.'
      ],
      result: 'Você está aprendendo a reativar conexões sem abrir mão da sua posição.'
    },
    {
      tag: 'Transformação',
      title: 'O Protocolo do Equilíbrio',
      intro: 'Cinco dias trabalhando a abertura sem exposição. Hoje o princípio que une tudo.',
      concept: {
        title: 'Quanto mais segura, mais você pode abrir',
        text: 'O paradoxo de O Controle: o recuo que parece proteger <strong>na verdade aumenta a vulnerabilidade</strong>, porque mantém você isolada. Quando você pratica a abertura estratégica com intenção, sua segurança interna cresce — e ironicamente, você precisa se proteger menos.'
      },
      frase: {
        text: '"Aprendi que me abrir com escolha não é fraqueza. É o que eu faço de mais corajoso."',
        why: 'Uma declaração de postura interna. Não é para ele — é uma afirmação do novo padrão.'
      },
      actions: [
        'Releia as frases dos 5 dias anteriores. Qual te custou mais? Essa é a mais importante.',
        'Escreva: "O que mudou na minha relação com abertura nesses 5 dias?"',
        '<strong>Ação:</strong> uma abertura deliberada hoje — pequena, mas real.'
      ],
      result: 'Você está pronta para o Dia 7 — onde o protocolo se completa.'
    },
    {
      tag: 'Conquista',
      title: 'O Protocolo Completo',
      intro: 'Sete dias aprendendo que você pode escolher quando e como se abrir. O que começa hoje é a prática de uma nova liberdade.',
      concept: {
        title: 'A mulher que escolhe quando se abrir é incontrolável',
        text: 'Existe uma diferença entre a mulher que não se abre por medo e a mulher que escolhe quando se abrir com intenção. A segunda é percebida como <strong>profunda por excesso de mundo interior</strong> — não como misteriosa por falta de acesso.'
      },
      frase: {
        text: '"Descobri que posso ser toda eu sem me entregar completamente. E isso muda tudo."',
        why: 'A frase-síntese de O Controle transformado. Não é mais recuo como proteção — é abertura como escolha.'
      },
      actions: [
        '<strong>A ação final:</strong> uma abertura genuína e escolhida hoje.',
        'Documente: como foi diferente de abrir por impulso ou por pressão?',
        'Esse é o novo ponto de partida.'
      ],
      result: 'Você completou o protocolo para O Controle. O que mudou não é o quanto você se protege — é a relação que você tem com a sua própria abertura.'
    }
  ],
  P: [
    {
      tag: 'Fundamento',
      title: 'O Código da Conexão',
      intro: 'Você já tem o que a maioria das mulheres passa anos tentando construir. O protocolo vai trabalhar os detalhes que separam conexões boas de conexões que ele não quer perder.',
      concept: {
        title: 'A diferença entre presente e inesquecível',
        text: 'Pesquisas identificaram que pessoas percebidas como "irresistíveis" não comunicam mais — elas comunicam com mais <strong>precisão, timing e incompletude estratégica</strong>. Para A Presença, que já tem o equilíbrio, o trabalho é no refinamento: a frase que cria tensão sutil, o timing que gera antecipação, o momento escolhido para se revelar mais.'
      },
      frase: {
        text: '"Tem dias que eu surpreendo até a mim mesma. Hoje foi um deles."',
        why: 'Simples, genuína e irresistível. Não explica o que aconteceu — abre a curiosidade. Demonstra que você vive uma vida que te surpreende.'
      },
      actions: [
        'Observe um momento genuíno da sua vida que tem potencial para comunicação interessante.',
        'Crie uma mensagem sobre esse momento usando incompletude.',
        'Compare com como você normalmente comunicaria a mesma coisa.'
      ],
      result: 'Você vai perceber que você já está muito próxima do padrão irresistível. O protocolo vai afinar os detalhes.'
    },
    {
      tag: 'Refinamento',
      title: 'O Mapa do Silêncio',
      intro: 'Existe uma diferença entre ser interessante e criar tensão irresistível. Hoje você aprende como criar a segunda.',
      concept: {
        title: 'O papel da tensão na atração duradoura',
        text: 'Neurocientistas identificaram que a <strong>tensão emocional calibrada</strong> — não conflito, não ansiedade — é o principal mecanismo de atração sustentada. É a sensação de que algo está acontecendo, de que existe mais por baixo, de que a próxima interação vai revelar algo. Para A Presença, criar essa tensão é o refinamento que eleva a comunicação ao próximo nível.'
      },
      frase: {
        text: '"Você me faz pensar em coisas que eu não sabia que pensava."',
        why: 'Cria tensão emocional sem explicação. Demonstra que ele tem efeito sobre você — de uma forma que te aprofunda, não te anseia.'
      },
      actions: [
        'Observe uma interação com ele que criou algo inesperado em você.',
        'Crie uma frase que comunique o efeito sem explicar o que causou.',
        '<strong>Teste:</strong> envie e observe a qualidade da resposta versus o usual.'
      ],
      result: 'Você está começando a criar tensão emocional intencional — o elemento que mantém a atração acesa no longo prazo.'
    },
    {
      tag: 'Protocolo',
      title: 'A Linguagem da Incompletude',
      intro: 'Algumas palavras criam superfície. Outras criam profundidade. Hoje você aprende a diferença — e como usar o segundo tipo.',
      concept: {
        title: 'Linguagem de profundidade versus linguagem de superfície',
        text: 'Linguistas identificaram que mensagens que usam <strong>linguagem de estado interno</strong> — referências ao que você pensa, percebe, descobriu — criam conexão mais profunda do que mensagens sobre eventos externos. Para A Presença, que já comunica bem, mudar a camada da linguagem cria um salto qualitativo na conexão.'
      },
      frase: {
        text: '"Às vezes acontece algo e eu penso: essa é exatamente a versão de mim que quero ser."',
        why: 'Linguagem de estado interno, não de evento. Cria intimidade real. Demonstra que você tem uma relação consciente com quem você está se tornando.'
      },
      actions: [
        'Hoje: em vez de contar o que aconteceu, comunique o que aquilo criou em você.',
        'Escolha uma interação do dia e reescreva saindo da descrição para a experiência interna.',
        'Compare as duas versões — qual cria mais espaço para conexão real?'
      ],
      result: 'Você está desenvolvendo o vocabulário da profundidade — a camada de linguagem que cria conexões inesquecíveis.'
    },
    {
      tag: 'Arsenal',
      title: 'As Frases do Seu Arquétipo',
      intro: 'Você entende os princípios. Agora o arsenal específico para A Presença — frases que aprofundam o que já existe.',
      concept: {
        title: 'As 3 situações de refinamento de A Presença',
        text: 'Para A Presença, o trabalho não é resolver problemas — é elevar o que existe. As 3 situações mais relevantes são: <em>quando uma conexão boa precisa de um elemento de tensão para não esfriar</em>, <em>quando você quer criar memória emocional duradoura</em> e <em>quando quer aprofundar sem forçar</em>.'
      },
      frase: {
        text: '"Você é uma das poucas pessoas com quem o tempo parece ter uma qualidade diferente."',
        why: 'Cria memória emocional específica e pessoal. Não é um elogio genérico — é uma observação que ele nunca esquece.'
      },
      actions: [
        'Liste 3 momentos recentes com ele que tiveram uma qualidade especial.',
        'Para cada um, crie uma frase que capture essa qualidade sem explicá-la completamente.',
        '<strong>Kit de elevação:</strong> salve essas 3 frases para os momentos certos.'
      ],
      result: 'Você tem um arsenal de elevação — frases que aprofundam conexões que já existem.'
    },
    {
      tag: 'Aprofundamento',
      title: 'O Princípio da Presença Real',
      intro: 'Você sempre soube estar presente. Hoje aprende o poder de deixar sempre um pouco mais para depois.',
      concept: {
        title: 'A incompletude como preservação do desejo',
        text: '<strong>Desejo é sustentado pela antecipação</strong> — não pela satisfação. A mulher irresistível não é a que entrega tudo — é a que sempre faz a outra pessoa sentir que tem mais a descobrir. Para A Presença, a incompletude estratégica é o elemento que mantém o desejo vivo ao longo do tempo.'
      },
      frase: {
        text: '"Se você soubesse o que eu estava pensando agora, a conversa ficaria interessante demais."',
        why: 'A incompletude perfeita. Cria curiosidade imediata, tensão sutil e a certeza de que existe mais de você a descobrir.'
      },
      actions: [
        'Escolha algo genuíno que você poderia compartilhar — mas que pode esperar.',
        'Crie uma frase que sugira que existe algo sem revelar o quê.',
        'Observe: a reação de curiosidade vai ser diferente do que você normalmente compartilha.'
      ],
      result: 'Você está dominando a arte de sempre ter mais a oferecer — a qualidade que mantém o desejo vivo indefinidamente.'
    },
    {
      tag: 'Transformação',
      title: 'O Protocolo do Equilíbrio',
      intro: 'Cinco dias refinando tensão, profundidade e incompletude. Hoje o princípio que une tudo.',
      concept: {
        title: 'O que a neurociência diz sobre presença magnética',
        text: 'Pesquisadores identificaram 4 características que criam presença magnética real: <em>atenção genuína</em>, <em>curiosidade autêntica</em>, <em>conforto com o silêncio</em> e <em>imprevisibilidade controlada</em>. Para A Presença, que já tem as primeiras três, a quarta é o refinamento final que transforma conexão boa em conexão magnética.'
      },
      frase: {
        text: '"Tenho pensado em te surpreender de uma forma que você não esperaria de mim. Ainda não decidi se vou fazer."',
        why: 'Imprevisibilidade controlada no máximo. Cria tensão, curiosidade e antecipação simultâneas.'
      },
      actions: [
        'Releia as frases dos 5 dias anteriores. Qual criou o efeito mais forte?',
        'Escreva: "O que refinei na minha comunicação nesses 5 dias?"',
        '<strong>Ação:</strong> uma interação guiada pela imprevisibilidade controlada hoje.'
      ],
      result: 'Você está pronta para o Dia 7 — onde o protocolo se completa.'
    },
    {
      tag: 'Conquista',
      title: 'O Protocolo Completo',
      intro: 'Sete dias refinando o que separa conexão boa de conexão inesquecível. O que começa agora é a prática do seu nível mais elevado.',
      concept: {
        title: 'A mulher que ele não esquece',
        text: 'Existe uma mulher que ele sempre lembra — não pela beleza, não pelos momentos intensos, mas por algo mais difícil de nomear. Ela estava presente de uma forma que poucos conseguem. Ela deixou espaço. Ela disse coisas que ficaram ecoando. Ela tinha mais do que mostrou. <strong>Esse é o arquétipo de A Presença realizado.</strong>'
      },
      frase: {
        text: '"Há coisas sobre mim que só aparecem para quem presta atenção. Você é um desses."',
        why: 'A frase-síntese de A Presença elevada. Não é vanidade — é convite. Cria uma sensação de exclusividade genuína.'
      },
      actions: [
        '<strong>A ação final:</strong> uma interação que incorpore todos os elementos do protocolo.',
        'Documente: qual foi o elemento mais transformador dessa jornada?',
        'Isso é o novo ponto de partida.'
      ],
      result: 'Você completou o protocolo para A Presença. O que mudou não é quem você é — é a precisão com que você entrega quem você é.'
    }
  ]
}

export const upsells: Record<ArchetypeKey, Upsell[]> = {
  E: [
    {
      id: 'fp-e',
      day: 4,
      cel: '🎯',
      congrats: 'Você chegou no<br>ponto exato.',
      bridge: 'Você tem os princípios e as frases do seu arquétipo. Agora vem o módulo que trata das situações mais difíceis — as que o protocolo padrão não cobre completamente.',
      title: 'Frases Proibidas',
      sub: 'As 3 situações mais difíceis de A Espera — com 3 níveis de resposta cada.',
      items: ['Quando ele desaparece por dias e retorna como se nada tivesse acontecido', 'Quando você sente que está investindo mais do que recebe', 'Quando ele esfria sem explicação e você não sabe como reagir', 'Frases específicas por intensidade do silêncio'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'pr-e',
      day: 7,
      cel: '✨',
      congrats: 'Protocolo<br><em>completo.</em>',
      bridge: 'Você terminou os 7 dias. O Protocolo de Reconexão é para quando o distanciamento já aconteceu e você quer retomar de um lugar completamente diferente.',
      title: 'Protocolo de Reconexão',
      sub: 'A sequência exata para reativar conexão depois que ela esfriou — sem parecer que você estava esperando.',
      items: ['A sequência de 3 mensagens que reativa interesse após distanciamento', 'Como criar curiosidade quando a conversa parou completamente', 'O timing ideal por tipo de distanciamento', 'Frases específicas por número de dias de silêncio'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'tr-e',
      day: 5,
      cel: '♟️',
      congrats: 'O troco<br><em>certo.</em>',
      bridge: 'Você já domina a espera estratégica. Este módulo vai além: os movimentos exatos para inverter a dinâmica quando ele some, esfria ou volta como se nada tivesse acontecido.',
      title: 'O Troco',
      sub: '21 movimentos psicológicos para inverter qualquer dinâmica — sem mágoa, sem ansiedade, sem espera.',
      items: ['Os 5 movimentos para quando ele some sem avisar', 'Como reagir ao "oi sumida" sem cobrar nem validar', 'O que fazer quando a conexão esfria gradualmente', 'Como reconectar sem parecer que estava esperando'],
      de: 'R$29',
      por: 'R$9',
      url: '#'
    }
  ],
  I: [
    {
      id: 'fp-i',
      day: 4,
      cel: '🔥',
      congrats: 'Sua intensidade<br><em>agora é precisão.</em>',
      bridge: 'Você já domina a calibração. O próximo módulo vai para as situações de alta tensão — onde o padrão automático é mais forte.',
      title: 'Frases Proibidas',
      sub: 'As 3 situações de alta tensão para A Intensidade — com resposta calibrada para cada nível.',
      items: ['Quando a tensão emocional está alta e o impulso é confrontar', 'Quando ele esfria e o padrão quer reagir com mais intensidade', 'Quando você quer dizer muito e precisa saber o que guardar', 'Frases que carregam profundidade sem criar sobrecarga'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'sc-i',
      day: 7,
      cel: '✨',
      congrats: 'Protocolo<br><em>completo.</em>',
      bridge: 'Sete dias de calibração. O Sistema Avançado vai mais fundo — situações onde a intensidade precisa de instrumentos mais específicos.',
      title: 'Sistema de Calibração Avançado',
      sub: 'O próximo nível para A Intensidade — situações complexas, soluções precisas.',
      items: ['Como calibrar quando a emoção é muito real para conter', 'O mapa completo de timing para cada tipo de situação', 'Quando intensidade é necessária versus quando prejudica', 'As frases que entregam muito em muito pouco'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'tr-i',
      day: 5,
      cel: '♟️',
      congrats: 'O troco<br><em>certo.</em>',
      bridge: 'Sua intensidade já é precisão. Este módulo dá os movimentos exatos para inverter a dinâmica quando ele some, esfria ou volta como se nada tivesse acontecido.',
      title: 'O Troco',
      sub: '21 movimentos psicológicos para inverter qualquer dinâmica — sem mágoa, sem ansiedade, sem espera.',
      items: ['Os 5 movimentos para quando ele some sem avisar', 'Como reagir ao "oi sumida" sem cobrar nem validar', 'O que fazer quando a conexão esfria gradualmente', 'Como reconectar sem parecer que estava esperando'],
      de: 'R$29',
      por: 'R$9',
      url: '#'
    }
  ],
  C: [
    {
      id: 'fp-c',
      day: 4,
      cel: '🛡️',
      congrats: 'Abertura<br><em>estratégica.</em>',
      bridge: 'Você tem as ferramentas de abertura. O próximo módulo vai para as situações onde o recuo automático é mais forte.',
      title: 'Frases Proibidas',
      sub: 'As 3 situações de maior recuo para O Controle — com abertura calculada para cada uma.',
      items: ['Quando o instinto de recuar aparece no momento de se aproximar', 'Quando a conexão esfriou por sua iniciativa e você quer retomar', 'Quando ele se abre e você não sabe como receber sem se expor', 'Frases que criam intimidade sem exigir exposição'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'ab-c',
      day: 7,
      cel: '✨',
      congrats: 'Protocolo<br><em>completo.</em>',
      bridge: 'Sete dias de abertura estratégica. A Arte da Abertura Segura vai mais fundo — situações onde a conexão real exige mais.',
      title: 'A Arte da Abertura Segura',
      sub: 'O nível avançado de abertura para O Controle — quando você quer se abrir mais sem perder a posição.',
      items: ['Como criar intimidade crescente sem se sentir exposta', 'O mapa de abertura por nível de confiança na relação', 'Quando e como revelar mais — o timing que fortalece', 'As frases que criam profundidade sem fragilidade'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'tr-c',
      day: 5,
      cel: '♟️',
      congrats: 'O troco<br><em>certo.</em>',
      bridge: 'Você já abre de forma estratégica. Este módulo dá os movimentos exatos para inverter a dinâmica quando ele some, esfria ou volta como se nada tivesse acontecido.',
      title: 'O Troco',
      sub: '21 movimentos psicológicos para inverter qualquer dinâmica — sem mágoa, sem ansiedade, sem espera.',
      items: ['Os 5 movimentos para quando ele some sem avisar', 'Como reagir ao "oi sumida" sem cobrar nem validar', 'O que fazer quando a conexão esfria gradualmente', 'Como reconectar sem parecer que estava esperando'],
      de: 'R$29',
      por: 'R$9',
      url: '#'
    }
  ],
  P: [
    {
      id: 'fp-p',
      day: 4,
      cel: '✨',
      congrats: 'Refinamento<br><em>em ação.</em>',
      bridge: 'Você trabalhou os princípios de elevação. O próximo módulo são as situações de maior potencial para A Presença.',
      title: 'Frases Proibidas',
      sub: 'As 3 situações de maior impacto para A Presença — com frases de efeito máximo.',
      items: ['Quando a conexão está boa mas precisa de tensão para não esfriar', 'Quando você quer criar uma memória emocional duradoura', 'Quando quer aprofundar sem forçar a intimidade', 'Frases que ficam ecoando depois da conversa terminar'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'ap-p',
      day: 7,
      cel: '✨',
      congrats: 'Protocolo<br><em>completo.</em>',
      bridge: 'Você finalizou os 7 dias. Os Amplificadores de Presença são o nível mais avançado — para quem já tem a base.',
      title: 'Amplificadores de Presença',
      sub: 'O nível avançado para A Presença — os elementos que criam presença verdadeiramente magnética.',
      items: ['A imprevisibilidade controlada em situações avançadas', 'Como criar tensão que sustenta o desejo no longo prazo', 'O vocabulário de profundidade para conversas que ficam', 'As frases que fazem ele pensar em você muito depois'],
      de: 'R$49',
      por: 'R$9',
      url: '#'
    },
    {
      id: 'tr-p',
      day: 5,
      cel: '♟️',
      congrats: 'O troco<br><em>certo.</em>',
      bridge: 'Sua presença já é magnética. Este módulo dá os movimentos exatos para inverter a dinâmica quando ele some, esfria ou volta como se nada tivesse acontecido.',
      title: 'O Troco',
      sub: '21 movimentos psicológicos para inverter qualquer dinâmica — sem mágoa, sem ansiedade, sem espera.',
      items: ['Os 5 movimentos para quando ele some sem avisar', 'Como reagir ao "oi sumida" sem cobrar nem validar', 'O que fazer quando a conexão esfria gradualmente', 'Como reconectar sem parecer que estava esperando'],
      de: 'R$29',
      por: 'R$9',
      url: '#'
    }
  ]
}
