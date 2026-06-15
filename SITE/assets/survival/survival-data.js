(function () {
  "use strict";

  // Optional media fields supported on each card by survival.js:
  //   image      -> "/assets/survival/images/<card-id>.webp" (placeholder shown when absent)
  //   imageAlt   -> accessible description of `image`
  //   audio      -> "/assets/survival/audio/<card-id>.mp3" (fallback message shown when absent)
  //   audioSlow  -> "/assets/survival/audio/<card-id>-slow.mp3" (adds a second "Ouvir devagar" button)
  const modules = [
    {
      id: "restaurante",
      order: "01",
      title: "Restaurante",
      japaneseTitle: "レストラン",
      japaneseReading: "れすとらん",
      japaneseRomaji: "resutoran",
      status: "available",
      level: "Essencial",
      duration: "5 min",
      description: "Entre, entenda o atendimento e faça seu primeiro pedido com mais segurança.",
      introduction: "Seis situações que transformam uma refeição comum em uma conversa possível. Os três primeiros cards formam a demonstração gratuita.",
      cards: [
        {
          id: "restaurante-01",
          situation: "Entrando no restaurante",
          japanese: "いらっしゃいませ",
          hiragana: "いらっしゃいませ",
          romaji: "irasshaimase",
          speechText: "いらっしゃいませ",
          portuguese: "Bem-vindo.",
          note: "Saudação comum quando o cliente entra.",
          image: "/assets/survival/images/restaurant-001.webp",
          imageAlt: "Cliente entrando em um restaurante japonês e sendo recebido pelo atendente.",
          free: true
        },
        {
          id: "restaurante-02",
          situation: "Recebendo o cardápio",
          japanese: "メニューはこちらです",
          hiragana: "めにゅーはこちらです",
          romaji: "menyuu wa kochira desu",
          speechText: "メニューはこちらです",
          portuguese: "Aqui está o cardápio.",
          note: "Frase comum dita pelo atendente.",
          image: "/assets/survival/images/restaurant-002.webp",
          imageAlt: "Atendente entregando o cardápio a um cliente em um restaurante japonês.",
          free: true
        },
        {
          id: "restaurante-03",
          situation: "Perguntando recomendação",
          japanese: "おすすめは<ruby>何<rt>なに</rt></ruby>ですか？",
          hiragana: "おすすめはなにですか？",
          romaji: "osusume wa nani desu ka?",
          speechText: "おすすめは何ですか？",
          portuguese: "O que você recomenda?",
          note: "Útil quando você não sabe o que pedir.",
          image: "/assets/survival/images/restaurant-003.webp",
          imageAlt: "Cliente perguntando ao atendente qual prato do restaurante ele recomenda.",
          free: true
        }
      ],
      premiumTeasers: [
        { id: "restaurante-premium-04", situation: "Pedir água" },
        { id: "restaurante-premium-05", situation: "Fazer o pedido" },
        { id: "restaurante-premium-06", situation: "Pedir a conta" }
      ],
      quiz: [
        {
          id: "restaurante-quiz-01",
          question: "Você quer perguntar “O que você recomenda?”",
          options: [
            {
              id: "recommendation",
              japanese: "おすすめは<ruby>何<rt>なに</rt></ruby>ですか？",
              hiragana: "おすすめはなにですか？",
              romaji: "osusume wa nani desu ka?",
              portuguese: "O que você recomenda?"
            },
            {
              id: "good-morning",
              japanese: "おはようございます",
              hiragana: "おはようございます",
              romaji: "ohayou gozaimasu",
              portuguese: "Bom dia."
            },
            {
              id: "menu",
              japanese: "メニューはこちらです",
              hiragana: "めにゅーはこちらです",
              romaji: "menyuu wa kochira desu",
              portuguese: "Aqui está o cardápio."
            },
            {
              id: "welcome",
              japanese: "いらっしゃいませ",
              hiragana: "いらっしゃいませ",
              romaji: "irasshaimase",
              portuguese: "Bem-vindo."
            }
          ],
          correctAnswer: "recommendation",
          explanation: "おすすめ significa recomendação; なにですか pergunta o que é."
        },
        {
          id: "restaurante-quiz-02",
          question: "O que significa esta frase?",
          prompt: {
            japanese: "メニューはこちらです",
            hiragana: "めにゅーはこちらです",
            romaji: "menyuu wa kochira desu",
            portuguese: "Escolha a tradução correta."
          },
          options: [
            { id: "bill-here", portuguese: "A conta está aqui." },
            { id: "menu-here", portuguese: "Aqui está o cardápio." },
            { id: "recommendation-pt", portuguese: "O que você recomenda?" },
            { id: "restaurant-closed", portuguese: "O restaurante está fechado." }
          ],
          correctAnswer: "menu-here",
          explanation: "こちら indica algo ou uma direção próxima de quem fala."
        },
        {
          id: "restaurante-quiz-03",
          question: "Quando esta expressão é usada?",
          prompt: {
            japanese: "いらっしゃいませ",
            hiragana: "いらっしゃいませ",
            romaji: "irasshaimase",
            portuguese: "Bem-vindo."
          },
          options: [
            { id: "asks-bill", portuguese: "O cliente pede a conta." },
            { id: "gets-menu", portuguese: "O atendente entrega o cardápio." },
            { id: "enters", portuguese: "O cliente entra no estabelecimento." },
            { id: "closing", portuguese: "O restaurante está fechando." }
          ],
          correctAnswer: "enters",
          explanation: "É a saudação tradicional de boas-vindas em lojas e restaurantes."
        }
      ]
    },
    {
      id: "hospital",
      order: "02",
      title: "Hospital",
      japaneseTitle: "<ruby>病院<rt>びょういん</rt></ruby>",
      japaneseReading: "びょういん",
      japaneseRomaji: "byouin",
      status: "soon",
      description: "Explique sintomas e entenda as primeiras orientações."
    },
    {
      id: "prefeitura",
      order: "03",
      title: "Prefeitura",
      japaneseTitle: "<ruby>市役所<rt>しやくしょ</rt></ruby>",
      japaneseReading: "しやくしょ",
      japaneseRomaji: "shiyakusho",
      status: "soon",
      description: "Documentos, senhas e perguntas essenciais no balcão."
    },
    {
      id: "fabrica",
      order: "04",
      title: "Fábrica",
      japaneseTitle: "<ruby>工場<rt>こうじょう</rt></ruby>",
      japaneseReading: "こうじょう",
      japaneseRomaji: "koujou",
      status: "soon",
      description: "Instruções frequentes e vocabulário de segurança."
    },
    {
      id: "trem",
      order: "05",
      title: "Trem",
      japaneseTitle: "<ruby>電車<rt>でんしゃ</rt></ruby>",
      japaneseReading: "でんしゃ",
      japaneseRomaji: "densha",
      status: "soon",
      description: "Plataformas, conexões e ajuda durante o trajeto."
    },
    {
      id: "escola",
      order: "06",
      title: "Escola",
      japaneseTitle: "<ruby>学校<rt>がっこう</rt></ruby>",
      japaneseReading: "がっこう",
      japaneseRomaji: "gakkou",
      status: "soon",
      description: "Conversas básicas com professores e secretaria."
    }
  ];

  if (typeof window !== "undefined") {
    window.SURVIVAL_MODULES = modules;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = modules;
  }
})();
