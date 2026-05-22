// Conteudo completo dos upsells

export interface UpsellContent {
  id: string
  sections: {
    title: string
    content: string
    frase?: {
      text: string
      context: string
    }
  }[]
}

export const upsellContent: Record<string, UpsellContent> = {
  // FRASES PROIBIDAS - Para todos os arquetipos
  'fp': {
    id: 'fp',
    sections: [
      {
        title: 'Quando o instinto de recuar aparece no momento de se aproximar',
        content: 'Existe um momento critico em toda conexao: quando voce sente que deveria se aproximar, mas algo dentro de voce trava. O instinto de protecao dispara antes mesmo de voce processar o que esta acontecendo. A frase proibida para esse momento nao e sobre forcar a aproximacao — e sobre criar um espaco seguro para ela acontecer.',
        frase: {
          text: '"Eu ia guardar isso, mas decidi que voce merece saber antes que eu mude de ideia."',
          context: 'Essa frase funciona porque reconhece a vulnerabilidade sem se entregar completamente. Ela cria urgencia ("antes que eu mude de ideia") enquanto demonstra que voce esta escolhendo se abrir — nao sendo forcada a isso.'
        }
      },
      {
        title: 'Quando a conexao esfriou por sua iniciativa e voce quer retomar',
        content: 'Reconectar depois de ter sido voce quem esfriou e um dos movimentos mais delicados que existem. A tentacao e explicar, justificar, pedir desculpas. Mas nenhuma dessas abordagens cria o tipo de tensao que reacende interesse. A frase proibida para esse momento usa o espaco que voce criou como ferramenta.',
        frase: {
          text: '"Passei esses dias entendendo algumas coisas. Uma delas envolve voce."',
          context: 'Essa frase funciona porque nao pede permissao para voltar — ela simplesmente aparece. O "envolve voce" cria curiosidade sem revelar o que. Ela posiciona voce como alguem que estava em processo, nao como alguem que estava fugindo.'
        }
      },
      {
        title: 'Quando ele se abre e voce nao sabe como receber sem se expor',
        content: 'Quando ele finalmente se abre, o reflexo natural e retribuir na mesma intensidade. Mas isso pode criar um desequilibrio onde voce entrega mais do que pretendia. A frase proibida para esse momento permite que voce receba a abertura dele sem precisar igualar.',
        frase: {
          text: '"Eu ouvi cada palavra. E vou guardar isso com cuidado."',
          context: 'Essa frase funciona porque valida o que ele compartilhou sem exigir que voce compartilhe de volta. "Guardar com cuidado" comunica que voce valoriza o que ele disse — sem precisar abrir o seu proprio cofre.'
        }
      },
      {
        title: 'Frases que criam intimidade sem exigir exposicao',
        content: 'Intimidade real nao e construida pela quantidade de informacao trocada — e construida pela qualidade da conexao criada. As frases abaixo criam sensacao de proximidade profunda sem exigir que voce revele mais do que escolheu.',
        frase: {
          text: '"Tem uma versao dessa historia que so voce vai ouvir. Quando eu decidir contar."',
          context: 'Essa frase cria antecipacao e exclusividade simultaneamente. Ela promete algo especial no futuro enquanto mantem voce no controle do timing. Ele vai querer ser digno dessa versao — e vai esperar por ela.'
        }
      }
    ]
  },

  // PROTOCOLO RECONEXAO - Para todos os arquetipos
  'pr': {
    id: 'pr',
    sections: [
      {
        title: 'Os 3 estagios do afastamento masculino',
        content: 'O afastamento masculino raramente e linear. Ele acontece em 3 estagios distintos, cada um com sua propria logica interna. Entender em qual estagio ele esta determina completamente qual movimento funciona.\n\n<strong>Estagio 1 - O Recuo Reflexivo:</strong> Acontece automaticamente quando ele sente que esta "perdendo o controle" da situacao. Nao e sobre voce — e sobre o sistema nervoso dele respondendo a intensidade.\n\n<strong>Estagio 2 - A Avaliacao Silenciosa:</strong> Ele esta processando. Nao necessariamente de forma consciente, mas esta medindo se o que ele sente vale o risco que representa.\n\n<strong>Estagio 3 - A Decisao Inconsciente:</strong> O ponto onde ele decide (sem saber que decidiu) se vai voltar ou seguir em frente. E aqui que o protocolo e mais efetivo.',
        frase: {
          text: '"Nao vou fingir que nao notei. Mas tambem nao vou fingir que preciso de explicacao."',
          context: 'Essa frase funciona em qualquer um dos 3 estagios porque comunica consciencia sem pressao. Ela diz "eu vejo o que esta acontecendo" sem dizer "e voce precisa resolver isso agora".'
        }
      },
      {
        title: 'A mensagem que reabre portas sem parecer perseguicao',
        content: 'A reconexao efetiva nao e sobre perseguir — e sobre criar uma abertura que ele queira atravessar. A diferenca esta no posicionamento: voce nao esta pedindo para voltar, voce esta criando um espaco onde voltar faz sentido para ele.',
        frase: {
          text: '"Lembrei de uma coisa que voce disse. Fez mais sentido agora do que quando voce disse."',
          context: 'Essa frase funciona porque faz ele se perguntar "o que foi?". Ela reabre a conversa sem parecer que voce esta tentando reabrir a conversa. E genuina, porque provavelmente e verdade — e cria curiosidade natural.'
        }
      },
      {
        title: 'O timing exato para cada tipo de silencio',
        content: '<strong>Silencio de 1-3 dias:</strong> Ainda e cedo. Espere pelo menos o dobro do tempo que ele esperou. Nenhuma mensagem nesse periodo — a nao ser que ele inicie.\n\n<strong>Silencio de 4-7 dias:</strong> Zona critica. Uma mensagem curta e incompleta pode funcionar. Nada que exija resposta — algo que simplesmente aparece.\n\n<strong>Silencio de 7+ dias:</strong> O protocolo completo entra em acao. A mensagem precisa criar um motivo genuino para responder, sem parecer que voce esta criando um motivo.',
        frase: {
          text: '"Encontrei algo que me lembrou daquela conversa. Achei que voce ia querer ver."',
          context: 'Essa frase funciona para silencios mais longos porque oferece algo concreto. Nao e "oi, sumiu" — e "tenho algo para voce". A dinamica e completamente diferente.'
        }
      },
      {
        title: 'Reconectando sem perder a posicao que voce construiu',
        content: 'O maior erro na reconexao e desfazer o trabalho que voce ja fez. Se voce construiu uma posicao de valor, a reconexao precisa manter essa posicao — nao abandona-la. A frase final do protocolo e desenhada exatamente para isso.',
        frase: {
          text: '"Decidi que algumas portas merecem ficar entreabertas. Essa e uma delas."',
          context: 'Essa frase funciona porque mantem voce no controle. Voce esta "decidindo" deixar a porta entreaberta — nao implorando para que ele entre. A diferenca de posicionamento e fundamental.'
        }
      }
    ]
  },

  // SISTEMA DE CALIBRACAO AVANCADO - Para A Intensidade
  'sc': {
    id: 'sc',
    sections: [
      {
        title: 'O medidor interno: como saber quando e demais',
        content: 'A intensidade tem um ponto de virada — o momento exato onde ela passa de atraente para avassaladora. O sistema de calibracao te ensina a identificar esse ponto antes de cruza-lo.\n\n<strong>Sinais internos de que voce esta prestes a cruzar:</strong>\n- Urgencia de responder imediatamente\n- Vontade de explicar ou justificar\n- Impulso de mandar mais de uma mensagem seguida\n- Sensacao de que "se eu nao disser agora, perco a chance"',
        frase: {
          text: '"Tenho mais para dizer. Mas vou guardar para quando a gente se ver."',
          context: 'Essa frase e o freio de emergencia. Quando voce sentir os sinais de que esta prestes a cruzar o ponto de virada, ela permite que voce pare sem parecer que esta parando. Cria antecipacao em vez de sobrecarga.'
        }
      },
      {
        title: 'Transformando intensidade em misterio',
        content: 'A mesma energia que cria intensidade pode criar misterio — depende de como voce canaliza. O sistema de calibracao ensina a redirecionar o impulso de entregar tudo para o impulso de revelar estrategicamente.',
        frase: {
          text: '"Voce nao tem ideia do que passou pela minha cabeca agora. E eu nao vou contar."',
          context: 'Essa frase transforma a intensidade em misterio instantaneamente. Voce esta admitindo que sentiu algo forte — mas nao esta entregando o que. Ele vai passar horas imaginando.'
        }
      },
      {
        title: 'O protocolo de 24 horas para mensagens intensas',
        content: '<strong>Passo 1:</strong> Escreva a mensagem que voce quer mandar. Toda ela. Sem filtro.\n\n<strong>Passo 2:</strong> Salve como rascunho. Nao envie.\n\n<strong>Passo 3:</strong> Espere 24 horas.\n\n<strong>Passo 4:</strong> Releia. Identifique o nucleo emocional — a unica coisa que realmente importa.\n\n<strong>Passo 5:</strong> Reescreva usando apenas 20% das palavras originais.\n\n<strong>Passo 6:</strong> Envie a versao calibrada.',
        frase: {
          text: '"Editei essa mensagem 5 vezes antes de mandar. Essa e a versao que voce merece."',
          context: 'Essa frase pode ser usada quando voce quiser admitir a intensidade sem entregar ela. Mostra autoconsciencia e cuidado — duas qualidades extremamente atraentes.'
        }
      },
      {
        title: 'Calibracao em tempo real durante conversas',
        content: 'Nem sempre voce tem 24 horas. As vezes a conversa esta acontecendo agora e voce precisa calibrar em tempo real. O sistema inclui frases de transicao que permitem que voce ganhe tempo sem parecer que esta ganhando tempo.',
        frase: {
          text: '"Deixa eu pensar na melhor forma de dizer isso..."',
          context: 'Essa frase simples compra tempo precioso. Ela comunica que voce tem algo importante para dizer — mas que esta escolhendo as palavras com cuidado. Isso aumenta o peso do que vier depois.'
        }
      }
    ]
  },

  // AMPLIFICADORES DE PRESENCA - Para A Presenca
  'ap': {
    id: 'ap',
    sections: [
      {
        title: 'O efeito "ultima palavra" e como domina-lo',
        content: 'Existe um fenomeno psicologico onde a ultima coisa dita em uma conversa e a que mais ecoa na memoria. Pessoas com presenca natural instintivamente deixam a conversa com algo memoravel. O amplificador de presenca te ensina a fazer isso de forma deliberada.',
        frase: {
          text: '"Vou embora agora. Mas vou levar essa conversa comigo por um tempo."',
          context: 'Essa frase funciona como ultima palavra perfeita porque cria uma impressao duradoura. Ela diz "isso foi significativo" sem explicar porque. Ele vai lembrar dessa saida.'
        }
      },
      {
        title: 'Criando momentos que ele vai querer recontar',
        content: 'Memorias nao sao feitas de informacao — sao feitas de momentos emocionais especificos. O amplificador de presenca te ensina a criar esses momentos de forma intencional, deixando marcas que ele vai querer revisitar.',
        frase: {
          text: '"Para. Olha para mim. Eu quero lembrar exatamente dessa sua expressao agora."',
          context: 'Essa frase cria um momento fotografico — um instante suspenso no tempo. Ela comunica que voce esta presente de uma forma que a maioria das pessoas nunca esta. Ele nunca vai esquecer que voce disse isso.'
        }
      },
      {
        title: 'A tecnica do eco emocional',
        content: 'O eco emocional e quando voce referencia algo que aconteceu entre voces de uma forma que reativa a emocao original. Nao e sobre lembrar fatos — e sobre despertar sentimentos.',
        frase: {
          text: '"Sabe aquele momento [especifico]? Eu ainda penso nele em momentos aleatorios."',
          context: 'Essa frase funciona porque mostra que voce carrega momentos dele com voce. Nao e uma declaracao de sentimentos — e uma demonstracao de presenca continua. E muito mais poderoso.'
        }
      },
      {
        title: 'Presenca magnetica em ambientes sociais',
        content: 'Presenca nao e sobre chamar atencao — e sobre manter atencao sem esforco aparente. Em ambientes sociais, isso significa criar pequenos momentos de conexao exclusiva que so voces dois percebem.',
        frase: {
          text: '"[Olhar prolongado seguido de um sorriso minimo]"',
          context: 'As vezes a comunicacao mais poderosa nao usa palavras. Um olhar de 3 segundos seguido de um sorriso quase imperceptivel cria uma conversa privada no meio de uma sala cheia. Ele vai se sentir visto de uma forma que os outros nao veem.'
        }
      }
    ]
  },

  // A ARTE DA ABERTURA SEGURA - Para O Controle
  'ab': {
    id: 'ab',
    sections: [
      {
        title: 'O paradoxo da vulnerabilidade calculada',
        content: 'A abertura que cria conexao real nao e a abertura total — e a abertura escolhida. O paradoxo e que quanto mais voce controla o que revela, mais segura voce se sente para revelar. E quanto mais segura voce se sente, mais genuina a abertura parece.',
        frase: {
          text: '"Vou te contar uma coisa que eu normalmente nao conto. E voce vai entender porque quando eu terminar."',
          context: 'Essa frase funciona porque prepara o terreno. Ela avisa que algo importante esta vindo — o que faz ele prestar mais atencao. E o "voce vai entender porque" cria um arco narrativo que ele vai querer completar.'
        }
      },
      {
        title: 'As 3 camadas de abertura e quando usar cada uma',
        content: '<strong>Camada 1 - Abertura Superficial:</strong> Fatos sobre voce que sao verdadeiros mas nao vulneraveis. Use para criar familiaridade inicial.\n\n<strong>Camada 2 - Abertura de Profundidade Media:</strong> Opinioes, preferencias, algumas historias pessoais. Use quando ja existe confianca basica.\n\n<strong>Camada 3 - Abertura de Nucleo:</strong> Medos, desejos reais, historias formativas. Use apenas quando ele ja demonstrou que merece esse acesso.',
        frase: {
          text: '"Isso e camada 3 para mim. Entao vou precisar de um momento antes de continuar."',
          context: 'Voce pode literalmente usar essa linguagem. Nomear o nivel de profundidade comunica autoconsciencia e estabelece que voce tem camadas que nao estao disponiveis para todos.'
        }
      },
      {
        title: 'Recuperando-se de uma abertura que foi longe demais',
        content: 'As vezes voce se abre mais do que pretendia. O instinto e se fechar completamente ou tentar minimizar o que disse. Nenhum dos dois funciona. A arte da recuperacao e diferente.',
        frase: {
          text: '"Falei mais do que planejava. Mas nao me arrependo — so preciso de um momento para reorganizar."',
          context: 'Essa frase funciona porque nao nega o que voce disse nem pede desculpas por isso. Ela simplesmente marca uma pausa. Isso comunica que voce e humana E que voce sabe se cuidar.'
        }
      },
      {
        title: 'Criando reciprocidade sem exigir',
        content: 'A abertura saudavel cria um espaco onde a outra pessoa quer se abrir tambem — nao porque voce exigiu, mas porque se sente segura para isso. A arte da abertura segura inclui frases que convidam sem pressionar.',
        frase: {
          text: '"Eu te contei a minha versao. Voce nao precisa me contar a sua — mas eu vou ouvir se voce quiser."',
          context: 'Essa frase cria espaco para reciprocidade sem demanda-la. "Voce nao precisa" remove a pressao. "Mas eu vou ouvir" comunica disponibilidade. E uma combinacao rara e poderosa.'
        }
      }
    ]
  }
}
