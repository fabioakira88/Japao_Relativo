(function () {
  "use strict";

  const checkoutUrl = "https://buy.stripe.com/28E28j7dc9bNa5943zffy00";

  const moduleSpecs = [
    {
      id: "restaurante",
      order: "01",
      title: "Restaurante",
      japaneseTitle: "レストラン",
      japaneseReading: "れすとらん",
      japaneseRomaji: "resutoran",
      level: "Essencial",
      duration: "5 min",
      description: "Entre, entenda o atendimento e faça seu primeiro pedido com mais segurança.",
      introduction: "Seis situações que transformam uma refeição comum em uma conversa possível. Os três primeiros cards formam a demonstração gratuita.",
      cards: [
        card("restaurante-01", "Entrando no restaurante", "いらっしゃいませ", "いらっしゃいませ", "irasshaimase", "Bem-vindo.", "Saudação comum quando o cliente entra.", "/assets/survival/images/restaurant-001.webp", "Cliente entrando em um restaurante japonês e sendo recebido pelo atendente."),
        card("restaurante-02", "Recebendo o cardápio", "メニューはこちらです", "めにゅーはこちらです", "menyuu wa kochira desu", "Aqui está o cardápio.", "Frase comum dita pelo atendente.", "/assets/survival/images/restaurant-002.webp", "Atendente entregando o cardápio a um cliente em um restaurante japonês."),
        card("restaurante-03", "Perguntando recomendação", "おすすめは<ruby>何<rt>なに</rt></ruby>ですか？", "おすすめはなにですか？", "osusume wa nani desu ka?", "O que você recomenda?", "Útil quando você não sabe o que pedir.", "/assets/survival/images/restaurant-003.webp", "Cliente perguntando ao atendente qual prato do restaurante ele recomenda.")
      ],
      premiumTeasers: teasers("Pedir água", "Fazer o pedido", "Pedir a conta")
    },
    {
      id: "hospital",
      order: "02",
      title: "Hospital",
      japaneseTitle: "<ruby>病院<rt>びょういん</rt></ruby>",
      japaneseReading: "びょういん",
      japaneseRomaji: "byouin",
      level: "Essencial",
      duration: "6 min",
      description: "Explique sintomas e entenda as primeiras orientações.",
      introduction: "Frases para chegar ao atendimento, dizer o que sente e confirmar o próximo passo sem travar no balcão.",
      cards: [
        card("hospital-01", "Chegando à recepção", "<ruby>受付<rt>うけつけ</rt></ruby>はどこですか？", "うけつけはどこですか？", "uketsuke wa doko desu ka?", "Onde fica a recepção?", "Pergunta direta para se orientar dentro do hospital."),
        card("hospital-02", "Dizendo que está com dor", "お<ruby>腹<rt>なか</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いです", "おなかがいたいです", "onaka ga itai desu", "Estou com dor de barriga.", "Troque お腹 por outra parte do corpo quando necessário."),
        card("hospital-03", "Confirmando seguro", "<ruby>保険証<rt>ほけんしょう</rt></ruby>があります", "ほけんしょうがあります", "hokenshou ga arimasu", "Eu tenho cartão do seguro.", "Útil quando a recepção pergunta sobre o seguro de saúde.")
      ],
      premiumTeasers: teasers("Marcar consulta", "Entender remédio", "Pedir intérprete")
    },
    {
      id: "prefeitura",
      order: "03",
      title: "Prefeitura",
      japaneseTitle: "<ruby>市役所<rt>しやくしょ</rt></ruby>",
      japaneseReading: "しやくしょ",
      japaneseRomaji: "shiyakusho",
      level: "Essencial",
      duration: "6 min",
      description: "Documentos, senhas e perguntas essenciais no balcão.",
      introduction: "Um módulo para reduzir a ansiedade dos balcões: pegar senha, explicar o assunto e confirmar documentos.",
      cards: [
        card("prefeitura-01", "Perguntando o balcão certo", "<ruby>住民票<rt>じゅうみんひょう</rt></ruby>の<ruby>窓口<rt>まどぐち</rt></ruby>はどこですか？", "じゅうみんひょうのまどぐちはどこですか？", "juuminhyou no madoguchi wa doko desu ka?", "Onde fica o balcão do comprovante de residência?", "Use 窓口 para perguntar pelo guichê correto."),
        card("prefeitura-02", "Pegando senha", "<ruby>番号札<rt>ばんごうふだ</rt></ruby>を<ruby>取<rt>と</rt></ruby>ればいいですか？", "ばんごうふだをとればいいですか？", "bangoufuda o toreba ii desu ka?", "Devo pegar uma senha?", "Boa frase quando você não sabe se precisa esperar chamada."),
        card("prefeitura-03", "Confirmando documentos", "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>書類<rt>しょるい</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか？", "ひつようなしょるいはなんですか？", "hitsuyou na shorui wa nan desu ka?", "Quais documentos são necessários?", "Pergunta central em qualquer procedimento municipal.")
      ],
      premiumTeasers: teasers("Mudança de endereço", "My Number", "Atestado de imposto")
    },
    {
      id: "fabrica",
      order: "04",
      title: "Fábrica",
      japaneseTitle: "<ruby>工場<rt>こうじょう</rt></ruby>",
      japaneseReading: "こうじょう",
      japaneseRomaji: "koujou",
      level: "Essencial",
      duration: "6 min",
      description: "Instruções frequentes e vocabulário de segurança.",
      introduction: "Frases curtas para entender comandos, avisar dúvidas e confirmar procedimentos dentro do trabalho.",
      cards: [
        card("fabrica-01", "Confirmando instrução", "もう<ruby>一度<rt>いちど</rt></ruby>お<ruby>願<rt>ねが</rt></ruby>いします", "もういちどおねがいします", "mou ichido onegai shimasu", "Mais uma vez, por favor.", "Use quando a instrução veio rápida demais."),
        card("fabrica-02", "Dizendo que entendeu", "わかりました", "わかりました", "wakarimashita", "Entendi.", "Resposta curta e educada depois de receber uma orientação."),
        card("fabrica-03", "Avisando problema", "<ruby>機械<rt>きかい</rt></ruby>が<ruby>止<rt>と</rt></ruby>まりました", "きかいがとまりました", "kikai ga tomarimashita", "A máquina parou.", "Frase objetiva para chamar atenção para um problema.")
      ],
      premiumTeasers: teasers("Pedir luvas", "Reportar erro", "Confirmar horário")
    },
    {
      id: "trem",
      order: "05",
      title: "Trem",
      japaneseTitle: "<ruby>電車<rt>でんしゃ</rt></ruby>",
      japaneseReading: "でんしゃ",
      japaneseRomaji: "densha",
      level: "Essencial",
      duration: "5 min",
      description: "Plataformas, conexões e ajuda durante o trajeto.",
      introduction: "O básico para perguntar plataforma, confirmar direção e pedir ajuda quando a rota muda.",
      cards: [
        card("trem-01", "Perguntando plataforma", "<ruby>何番線<rt>なんばんせん</rt></ruby>ですか？", "なんばんせんですか？", "nanbansen desu ka?", "Qual plataforma?", "Pergunta rápida quando você já sabe o destino."),
        card("trem-02", "Confirmando direção", "この<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>東京<rt>とうきょう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きますか？", "このでんしゃはとうきょうにいきますか？", "kono densha wa Toukyou ni ikimasu ka?", "Este trem vai para Tóquio?", "Troque 東京 pelo destino desejado."),
        card("trem-03", "Pedindo ajuda", "<ruby>乗<rt>の</rt></ruby>り<ruby>換<rt>か</rt></ruby>えを<ruby>教<rt>おし</rt></ruby>えてください", "のりかえをおしえてください", "norikae o oshiete kudasai", "Por favor, me explique a baldeação.", "Útil em estações grandes e rotas com conexão.")
      ],
      premiumTeasers: teasers("Trem atrasado", "Último trem", "Bilhete errado")
    },
    {
      id: "escola",
      order: "06",
      title: "Escola",
      japaneseTitle: "<ruby>学校<rt>がっこう</rt></ruby>",
      japaneseReading: "がっこう",
      japaneseRomaji: "gakkou",
      level: "Essencial",
      duration: "6 min",
      description: "Conversas básicas com professores e secretaria.",
      introduction: "Frases para pais e alunos: avisos, faltas e pedidos simples sem perder o tom educado.",
      cards: [
        card("escola-01", "Avisando atraso", "<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れます", "すこしおくれます", "sukoshi okuremasu", "Vou me atrasar um pouco.", "Mensagem curta para avisar a escola ou professor."),
        card("escola-02", "Perguntando tarefa", "<ruby>宿題<rt>しゅくだい</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか？", "しゅくだいはなんですか？", "shukudai wa nan desu ka?", "Qual é a lição de casa?", "Pergunta direta para confirmar a tarefa."),
        card("escola-03", "Dizendo que está doente", "<ruby>今日<rt>きょう</rt></ruby>は<ruby>体調<rt>たいちょう</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>いです", "きょうはたいちょうがわるいです", "kyou wa taichou ga warui desu", "Hoje não estou bem.", "Serve para justificar ausência ou pedir cuidado.")
      ],
      premiumTeasers: teasers("Falar com professor", "Entregar formulário", "Confirmar reunião")
    },
    {
      id: "mercado",
      order: "07",
      title: "Mercado",
      japaneseTitle: "<ruby>スーパー<rt>すーぱー</rt></ruby>",
      japaneseReading: "すーぱー",
      japaneseRomaji: "suupaa",
      level: "Essencial",
      duration: "5 min",
      description: "Pergunte preço, sacola e localização de produtos.",
      introduction: "Frases de compra para encontrar produtos, entender o caixa e responder perguntas rápidas.",
      cards: [
        card("mercado-01", "Perguntando onde fica", "<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>はどこですか？", "ぎゅうにゅうはどこですか？", "gyuunyuu wa doko desu ka?", "Onde fica o leite?", "Troque 牛乳 pelo produto que você procura."),
        card("mercado-02", "Respondendo sobre sacola", "<ruby>袋<rt>ふくろ</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします", "ふくろをおねがいします", "fukuro o onegai shimasu", "Uma sacola, por favor.", "Resposta útil no caixa quando perguntam se precisa de sacola."),
        card("mercado-03", "Confirmando preço", "これはいくらですか？", "これはいくらですか？", "kore wa ikura desu ka?", "Quanto custa isto?", "Use apontando para o produto.")
      ],
      premiumTeasers: teasers("Pagar separado", "Usar ponto", "Produto esgotado")
    },
    {
      id: "banco",
      order: "08",
      title: "Banco",
      japaneseTitle: "<ruby>銀行<rt>ぎんこう</rt></ruby>",
      japaneseReading: "ぎんこう",
      japaneseRomaji: "ginkou",
      level: "Essencial",
      duration: "6 min",
      description: "Conta, cartão, senha e atendimento no guichê.",
      introduction: "Frases para explicar o motivo da visita e atravessar perguntas comuns em banco ou caixa eletrônico.",
      cards: [
        card("banco-01", "Abrindo conta", "<ruby>口座<rt>こうざ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>りたいです", "こうざをつくりたいです", "kouza o tsukuritai desu", "Quero abrir uma conta.", "Frase inicial para atendimento no banco."),
        card("banco-02", "Problema no cartão", "カードが<ruby>使<rt>つか</rt></ruby>えません", "かーどがつかえません", "kaado ga tsukaemasen", "O cartão não funciona.", "Serve para cartão de banco ou débito."),
        card("banco-03", "Perguntando caixa eletrônico", "ATMはどこですか？", "えーてぃーえむはどこですか？", "ee tii emu wa doko desu ka?", "Onde fica o caixa eletrônico?", "Pergunta simples em agência, shopping ou konbini.")
      ],
      premiumTeasers: teasers("Transferência", "Trocar senha", "Atualizar endereço")
    },
    {
      id: "correios",
      order: "09",
      title: "Correios",
      japaneseTitle: "<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>",
      japaneseReading: "ゆうびんきょく",
      japaneseRomaji: "yuubinkyoku",
      level: "Essencial",
      duration: "5 min",
      description: "Envios, retirada, endereço e formas de entrega.",
      introduction: "Frases para enviar pacote, perguntar prazo e lidar com retirada sem depender de tradução automática.",
      cards: [
        card("correios-01", "Enviando pacote", "これを<ruby>送<rt>おく</rt></ruby>りたいです", "これをおくりたいです", "kore o okuritai desu", "Quero enviar isto.", "Use ao entregar o pacote no balcão."),
        card("correios-02", "Perguntando prazo", "いつ<ruby>届<rt>とど</rt></ruby>きますか？", "いつとどきますか？", "itsu todokimasu ka?", "Quando chega?", "Pergunta direta sobre prazo de entrega."),
        card("correios-03", "Retirando encomenda", "<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>りに<ruby>来<rt>き</rt></ruby>ました", "にもつをうけとりにきました", "nimotsu o uketori ni kimashita", "Vim retirar uma encomenda.", "Útil quando há aviso de entrega ou retirada.")
      ],
      premiumTeasers: teasers("Escrever endereço", "Envio internacional", "Reentrega")
    }
  ];

  function card(id, situation, japanese, hiragana, romaji, portuguese, note, image, imageAlt) {
    const item = {
      id,
      situation,
      japanese,
      hiragana,
      romaji,
      speechText: stripRuby(japanese),
      portuguese,
      note,
      audio: `/assets/survival/audio/${id}.mp3`,
      audioSlow: `/assets/survival/audio/${id}-slow.mp3`,
      free: true
    };
    if (image) item.image = image;
    if (imageAlt) item.imageAlt = imageAlt;
    return item;
  }

  function teasers() {
    return Array.from(arguments).map((situation, index) => ({
      id: `premium-${index + 4}`,
      situation
    }));
  }

  function stripRuby(value) {
    return String(value)
      .replace(/<rt>.*?<\/rt>/g, "")
      .replace(/<\/?ruby>/g, "");
  }

  function createQuiz(moduleItem) {
    const cards = moduleItem.cards;
    return [
      {
        id: `${moduleItem.id}-quiz-01`,
        question: `Você quer dizer “${cards[0].portuguese}”`,
        options: shuffleOptions(moduleItem.id, cards, 0),
        correctAnswer: cards[0].id,
        explanation: "Compare a situação em português com a frase japonesa principal."
      },
      {
        id: `${moduleItem.id}-quiz-02`,
        question: "O que significa esta frase?",
        prompt: languagePrompt(cards[1], "Escolha a tradução correta."),
        options: cards.map((item) => ({ id: item.id, portuguese: item.portuguese })),
        correctAnswer: cards[1].id,
        explanation: "A leitura em hiragana e o romaji ajudam a reconhecer a frase mesmo sem kanji."
      },
      {
        id: `${moduleItem.id}-quiz-03`,
        question: "Quando esta expressão é usada?",
        prompt: languagePrompt(cards[2], cards[2].portuguese),
        options: cards.map((item) => ({ id: item.id, portuguese: item.situation })),
        correctAnswer: cards[2].id,
        explanation: "Associe a frase à situação real em que ela aparece."
      }
    ];
  }

  function languagePrompt(item, portuguese) {
    return {
      japanese: item.japanese,
      hiragana: item.hiragana,
      romaji: item.romaji,
      portuguese
    };
  }

  function shuffleOptions(moduleId, cards, correctIndex) {
    const extra = {
      id: `${moduleId}-extra`,
      japanese: "ありがとうございます",
      hiragana: "ありがとうございます",
      romaji: "arigatou gozaimasu",
      portuguese: "Muito obrigado."
    };
    return [cards[correctIndex], cards[1], cards[2], extra]
      .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index)
      .slice(0, 4)
      .map((item) => ({
        id: item.id,
        japanese: item.japanese,
        hiragana: item.hiragana,
        romaji: item.romaji,
        portuguese: item.portuguese
      }));
  }

  const modules = moduleSpecs.map((item) => ({
    ...item,
    status: "available",
    checkoutUrl,
    premiumTeasers: item.premiumTeasers.map((teaser, index) => ({
      ...teaser,
      id: `${item.id}-premium-${String(index + 4).padStart(2, "0")}`
    }))
  })).map((item) => ({
    ...item,
    quiz: createQuiz(item)
  }));

  if (typeof window !== "undefined") {
    window.SURVIVAL_CONFIG = {
      checkoutUrl,
      premiumStorageKey: "jr-survival-premium-access",
      premiumModulePath: "restaurante-completo/"
    };
    window.SURVIVAL_MODULES = modules;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = modules;
  }
})();
