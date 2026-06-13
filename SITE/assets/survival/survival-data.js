(function () {
  "use strict";

  const modules = [
    {
      id: "restaurante",
      order: "01",
      title: "Restaurante",
      japaneseTitle: "レストラン",
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
          portuguese: "Bem-vindo.",
          note: "Saudação comum quando o cliente entra.",
          free: true
        },
        {
          id: "restaurante-02",
          situation: "Recebendo o cardápio",
          japanese: "メニューはこちらです",
          portuguese: "Aqui está o cardápio.",
          note: "Frase comum dita pelo atendente.",
          free: true
        },
        {
          id: "restaurante-03",
          situation: "Perguntando recomendação",
          japanese: "おすすめは何ですか？",
          portuguese: "O que você recomenda?",
          note: "Útil quando você não sabe o que pedir.",
          free: true
        },
        {
          id: "restaurante-04",
          situation: "Pedir água",
          japanese: "お水をお願いします",
          portuguese: "Água, por favor.",
          note: "Uma forma educada e direta de pedir água.",
          free: false
        },
        {
          id: "restaurante-05",
          situation: "Fazer o pedido",
          japanese: "これをお願いします",
          portuguese: "Este, por favor.",
          note: "Use apontando para o item escolhido no cardápio.",
          free: false
        },
        {
          id: "restaurante-06",
          situation: "Pedir a conta",
          japanese: "お会計をお願いします",
          portuguese: "A conta, por favor.",
          note: "Frase útil para encerrar o atendimento.",
          free: false
        }
      ],
      quiz: [
        {
          id: "restaurante-quiz-01",
          question: "Você quer perguntar “O que você recomenda?”",
          options: [
            "おすすめは何ですか？",
            "お会計をお願いします",
            "メニューはこちらです",
            "いらっしゃいませ"
          ],
          correctAnswer: "おすすめは何ですか？",
          explanation: "おすすめ significa recomendação; 何ですか pergunta o que é."
        },
        {
          id: "restaurante-quiz-02",
          question: "メニューはこちらです significa:",
          options: [
            "A conta está aqui.",
            "Aqui está o cardápio.",
            "O que você recomenda?",
            "Água, por favor."
          ],
          correctAnswer: "Aqui está o cardápio.",
          explanation: "こちら indica algo ou uma direção próxima de quem fala."
        },
        {
          id: "restaurante-quiz-03",
          question: "いらっしゃいませ é usado quando:",
          options: [
            "O cliente pede a conta.",
            "O atendente entrega o cardápio.",
            "O cliente entra no estabelecimento.",
            "O restaurante está fechando."
          ],
          correctAnswer: "O cliente entra no estabelecimento.",
          explanation: "É a saudação tradicional de boas-vindas em lojas e restaurantes."
        }
      ]
    },
    {
      id: "hospital",
      order: "02",
      title: "Hospital",
      japaneseTitle: "病院",
      status: "soon",
      description: "Explique sintomas e entenda as primeiras orientações."
    },
    {
      id: "prefeitura",
      order: "03",
      title: "Prefeitura",
      japaneseTitle: "市役所",
      status: "soon",
      description: "Documentos, senhas e perguntas essenciais no balcão."
    },
    {
      id: "fabrica",
      order: "04",
      title: "Fábrica",
      japaneseTitle: "工場",
      status: "soon",
      description: "Instruções frequentes e vocabulário de segurança."
    },
    {
      id: "trem",
      order: "05",
      title: "Trem",
      japaneseTitle: "電車",
      status: "soon",
      description: "Plataformas, conexões e ajuda durante o trajeto."
    },
    {
      id: "escola",
      order: "06",
      title: "Escola",
      japaneseTitle: "学校",
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
