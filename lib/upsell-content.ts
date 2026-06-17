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
  },

  // O TROCO - 21 movimentos para inverter qualquer dinamica - Para todos os arquetipos
  'tr': {
    id: 'tr',
    sections: [
      {
        title: 'Situacao 01 · Quando ele some sem avisar (5 movimentos)',
        content: 'O sumico e o momento em que a maioria das mulheres da o movimento errado — manda mensagem, pergunta o que aconteceu, fica no online esperando. Cada um desses movimentos comunica uma coisa antes de qualquer palavra: voce estava esperando. Os 5 movimentos abaixo invertem isso.\n\n<strong>01 · O Silencio com Proposito</strong> (primeiras 48h depois que ele some)\nNao mandar mensagem. Nao verificar se ele esta online. Nao deixar story que pareca direcionado a ele. O silencio nas primeiras 48h nao e passividade — e o primeiro movimento ativo do reposicionamento. A diferenca entre silencio ansioso e silencio estrategico esta no estado interno: um espera resposta, o outro cria espaco.\n⟶ <strong>Por que funciona:</strong> o cerebro masculino processa ausencia como sinal de valor. Quando voce some junto, inverte a percepcao de quem estava aguardando quem.\n\n<strong>02 · A Vida que Nao Parou</strong> (a partir do 2o dia de sumico)\nContinuar a propria vida de forma genuina e visivel. Nao como performance para ele ver — como decisao real. Sair, trabalhar, se cuidar, estar presente no que e seu. O objetivo nao e faze-lo enciumado. E nao deixar que o sumico dele defina o ritmo da sua semana.\n⟶ <strong>Por que funciona:</strong> mulheres que continuam a vida enquanto ele some comunicam, sem dizer uma palavra, que a ausencia dele nao e o evento principal.\n\n<strong>05 · O Tempo Calibrado</strong> (ao responder qualquer mensagem depois do sumico)\nNunca responder imediatamente quando ele voltar depois de um sumico. Esperar pelo menos o dobro do tempo que ele levou — sem regra rigida, com fluidez. O objetivo nao e jogar. E calibrar o ritmo para que ele nao seja o unico a determinar o tempo da conversa.\n⟶ <strong>Por que funciona:</strong> timing e comunicacao. Resposta imediata depois de sumico comunica que voce estava esperando. Resposta calibrada comunica que voce estava ocupada sendo voce.',
        frase: {
          text: '"Tive um insight essa semana que me fez pensar em algo que voce falou uma vez. Interessante como certas conversas ficam."',
          context: 'Movimento 03 · O Gatilho de Curiosidade (se quiser iniciar contato depois de 5+ dias). Nao abre espaco para desculpa, nao cobra, nao demonstra que estava esperando. Cria curiosidade e posiciona voce como alguem que viveu algo enquanto ele estava ausente. E quando ele voltar (movimento 04), responda sem demonstrar alivio: "Que bom que voce apareceu. Tava aqui no meu mundo."'
        }
      },
      {
        title: 'Situacao 02 · Quando ele volta como se nada tivesse acontecido (5 movimentos)',
        content: 'O "oi sumida" e uma das situacoes mais dificeis — porque voce quer cobrar, mas nao quer parecer carente. Quer deixar passar, mas nao quer validar o comportamento. Os 5 movimentos abaixo resolvem isso sem nenhuma das duas opcoes extremas.\n\n<strong>07 · A Pausa de Reentrada</strong> (primeiras 24h depois que ele volta)\nNao retomar a conversa no mesmo ritmo de antes do sumico. Responder quando conveniente, sem acelerar para recuperar a dinamica anterior. O sumico criou uma distancia — deixar ela existir por um ou dois dias antes de normalizar o ritmo.\n⟶ <strong>Por que funciona:</strong> voltando ao ritmo imediatamente, voce sinaliza que o sumico nao teve peso. Mantendo uma leve frieza nos primeiros dias, voce comunica que ele saiu de uma posicao — e precisa reconquistar.\n\n<strong>09 · O Interesse Suspenso</strong> (primeiros 3 dias depois que ele volta)\nNao perguntar sobre a vida dele, nao demonstrar curiosidade sobre o sumico, nao iniciar topicos novos. Responder quando ele falar, mas nao alimentar a conversa alem do necessario. Deixar o espaco — e ver o que ele faz com ele.\n⟶ <strong>Por que funciona:</strong> quando voce para de ser quem move a conversa, ele descobre se quer move-la — ou nao. Essa informacao vale mais do que qualquer resposta a uma cobranca.\n\n<strong>10 · O Reposicionamento pelo Comportamento</strong> (toda a semana pos-retorno)\nA posicao de poder nao se declara — se demonstra. Continuar vivendo, aparecendo nas proprias coisas, sendo quem voce e fora dessa conexao. Nao monitorar o comportamento dele, nao ajustar o seu para agradar.\n⟶ <strong>Por que funciona:</strong> mulheres que nao reorganizam a propria vida em torno do retorno dele comunicam que o sumico foi o problema dele — nao o centro da vida delas.',
        frase: {
          text: '"Aqui to. E voce, sumiu por onde?"',
          context: 'Movimento 06 · O Acolhimento Frio (resposta imediata ao "oi sumida"). Retorna a pergunta sem acusar. Coloca nele a responsabilidade de explicar — ou nao. Se precisar nomear o sumico (movimento 08), faca de uma posicao de forca: "Percebi que voce some as vezes. Tudo bem — so queria que soubesse que nao fico esperando."'
        }
      },
      {
        title: 'Situacao 03 · Quando a conexao esfria gradualmente (4 movimentos)',
        content: 'O esfriamento gradual e mais dificil de nomear do que o sumico — porque ele ainda esta la, ainda responde, mas algo mudou. E voce fica sem saber se age ou espera, se nomeia ou ignora. Esses 4 movimentos resolvem isso.\n\n<strong>11 · A Pausa que Testa</strong> (quando perceber o esfriamento comecando)\nParar de iniciar conversas por 48 a 72 horas. Nao anunciar, nao justificar, nao deixar claro que esta fazendo isso. Simplesmente parar de dar o primeiro movimento — e observar. Se ele iniciar, voce tem a resposta. Se nao iniciar, voce tambem tem.\n⟶ <strong>Por que funciona:</strong> o esfriamento muitas vezes acontece porque voce esta sustentando a conexao sozinha. Pausar revela se a conexao existe para os dois lados — ou so para voce.\n\n<strong>13 · O Interesse Deslocado</strong> (durante o periodo de esfriamento)\nInvestir genuinamente em outras areas da propria vida — nao como estrategia visivel, mas como decisao real. Quando voce para de concentrar energia em uma conexao que esfria e redireciona para o que e seu, algo muda na forma como voce aparece para ele tambem.\n⟶ <strong>Por que funciona:</strong> a mulher que investe em si mesma comunica escassez de atencao — e escassez cria valor. Nao e manipulacao. E honestidade sobre onde sua energia esta indo.',
        frase: {
          text: '"Tava pensando numa coisa que voce disse semanas atras. Ficou na minha cabeca de um jeito que nao esperava."',
          context: 'Movimento 12 · A Mensagem de Alto Impacto. Em vez de multiplas mensagens pequenas, uma unica mensagem com peso — e depois silencio. Demonstra que ele tem presenca na sua mente de forma natural, nao ansiosa, e nao pede resposta. Se o esfriamento persistir (movimento 14): "Percebi que a dinamica entre a gente mudou. To bem com isso. So queria que soubesse que o espaco aqui ta aberto — se e quando voce quiser."'
        }
      },
      {
        title: 'Situacao 04 · Quando ele responde mas nunca inicia (3 movimentos)',
        content: 'Essa e a situacao que mais esgota — porque ha conexao, mas sempre mediada por voce. Ele esta presente quando voce aparece, mas nunca e quem aparece primeiro. Tres movimentos para interromper esse ciclo.\n\n<strong>15 · A Interrupcao do Ciclo</strong> (decisao de parar de iniciar)\nParar completamente de ser quem inicia — por tempo indeterminado. Sem aviso, sem explicacao. Se ele nunca iniciou quando voce iniciava sempre, a unica forma de descobrir se ele vai iniciar e parar de cobrir o espaco.\n⟶ <strong>Por que funciona:</strong> quando voce para de iniciar, ou ele percebe a ausencia e age — ou voce descobre que era a unica sustentando a conexao. As duas respostas sao informacao valiosa.\n\n<strong>17 · O Espaco que Convida</strong> (depois de parar de iniciar — quando ele aparecer)\nQuando ele eventualmente aparecer, responder com calor — mas nao com alivio. Receber bem, mas nao acelerar. Deixar o ritmo ser dele por enquanto, para confirmar se o interesse e genuino ou apenas reativo a sua ausencia.\n⟶ <strong>Por que funciona:</strong> se ele aparecer so por reacao a sua ausencia, o padrao vai se repetir. Se aparecer por interesse real, a dinamica muda estruturalmente. A diferenca fica clara no ritmo das proximas semanas.',
        frase: {
          text: '"Tive um pensamento sobre a gente esses dias. Talvez eu te conte quando o momento for certo."',
          context: 'Movimento 16 · A Ultima Mensagem Estrategica (antes de parar de iniciar, se quiser dar uma ultima chance). Cria uma incompletude que o cerebro dele precisa resolver. Ele vai pensar no que voce nao disse — e se tiver interesse real, vai buscar saber.'
        }
      },
      {
        title: 'Situacao 05 · Quando quer reconectar sem parecer que estava esperando (4 movimentos)',
        content: 'As vezes voce quer reconectar — mas nao quer que ele saiba que estava querendo. Os 4 movimentos abaixo criam o contexto para uma reconexao que parece natural, nao calculada.\n\n<strong>18 · O Pretexto Real</strong> (ao iniciar contato depois de um afastamento)\nUsar um pretexto genuino — algo que aconteceu na sua vida que naturalmente faz voce pensar nele. Nao inventado, nao forcado: "Vi algo hoje que me lembrou daquela conversa sobre [assunto real]. Teve algum desdobramento disso na sua vida?"\n⟶ <strong>Por que funciona:</strong> conecta ao passado de voces dois sem mencionar o afastamento. Demonstra que voce tem uma vida que gera pensamentos — e que ele faz parte dela de forma natural.\n\n<strong>20 · O Nao Dito que Fica</strong> (na reconexao, ao inves de explicar o afastamento)\nNao explicar o proprio sumico. Nao justificar por que estava ausente. Deixar o afastamento como dado da realidade — nao como algo que precisa de explicacao.\n⟶ <strong>Por que funciona:</strong> explicacoes nao pedidas comunicam ansiedade. Silencio sobre o proprio sumico comunica que voce estava ocupada sendo voce — e que isso e suficiente.',
        frase: {
          text: '"Percebi esses tempos que preciso de conexoes que se movem nos dois sentidos. Nao sei se faz sentido pra voce tambem — mas faz pra mim."',
          context: 'Movimento 21 · O Reposicionamento Final (quando a reconexao acontece e voce quer que ela seja diferente). Declara o que voce precisa sem pedir. Coloca nele a responsabilidade de decidir se quer uma conexao que funcione nos dois lados — de um lugar de clareza, nao de cobranca. O troco nao e o que voce diz. E de onde voce fala.'
        }
      }
    ]
  }
}
