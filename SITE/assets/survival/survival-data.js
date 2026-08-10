(function () {
  "use strict";

  const moduleSpecs = [
    {
      id: "restaurante",
      order: "01",
      title: "Restaurante",
      japaneseTitle: "レストラン",
      japaneseReading: "れすとらん",
      japaneseRomaji: "resutoran",
      level: "Gratuito",
      duration: "8 min",
      status: "available",
      description: "Entre, entenda o atendimento, faça o pedido e peça a conta com mais segurança.",
      introduction: "Seis situações gratuitas que transformam uma refeição comum em uma conversa possível, da entrada até pedir a conta.",
      cards: [
        card("restaurante-01", "Entrando no restaurante", "いらっしゃいませ", "いらっしゃいませ", "irasshaimase", "Bem-vindo.", "Saudação comum quando o cliente entra.", "/assets/survival/images/restaurant-001.webp", "Cliente entrando em um restaurante japonês e sendo recebido pelo atendente."),
        card("restaurante-02", "Recebendo o cardápio", "メニューはこちらです", "めにゅーはこちらです", "menyuu wa kochira desu", "Aqui está o cardápio.", "Frase comum dita pelo atendente.", "/assets/survival/images/restaurant-002.webp", "Atendente entregando o cardápio a um cliente em um restaurante japonês."),
        card("restaurante-03", "Perguntando recomendação", "おすすめは<ruby>何<rt>なに</rt></ruby>ですか？", "おすすめはなにですか？", "osusume wa nani desu ka?", "O que você recomenda?", "Útil quando você não sabe o que pedir.", "/assets/survival/images/restaurant-003.webp", "Cliente perguntando ao atendente qual prato do restaurante ele recomenda."),
        card("restaurante-04", "Pedir água", "お<ruby>水<rt>みず</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします", "おみずをおねがいします", "omizu o onegai shimasu", "Água, por favor.", "Uma forma educada e direta de pedir água."),
        card("restaurante-05", "Fazer o pedido", "これをお<ruby>願<rt>ねが</rt></ruby>いします", "これをおねがいします", "kore o onegai shimasu", "Este, por favor.", "Use apontando para o item escolhido no cardápio."),
        card("restaurante-06", "Pedir a conta", "お<ruby>会計<rt>かいけい</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします", "おかいけいをおねがいします", "okaikei o onegai shimasu", "A conta, por favor.", "Frase útil para encerrar o atendimento.")
      ],
      premiumTeasers: []
    },
    lockedModule("hospital", "02", "Hospital", "<ruby>病院<rt>びょういん</rt></ruby>", "びょういん", "byouin", "Explique sintomas e entenda orientações essenciais.", ["Recepção", "Sintomas", "Seguro", "Consulta", "Remédio", "Intérprete"]),
    lockedModule("prefeitura", "03", "Prefeitura", "<ruby>市役所<rt>しやくしょ</rt></ruby>", "しやくしょ", "shiyakusho", "Documentos, senhas e perguntas essenciais no balcão.", ["Balcão certo", "Senha", "Documentos", "Mudança de endereço", "My Number", "Impostos"]),
    lockedModule("fabrica", "04", "Fábrica", "<ruby>工場<rt>こうじょう</rt></ruby>", "こうじょう", "koujou", "Instruções frequentes e vocabulário de segurança.", ["Instrução", "Entendi", "Problema", "Luvas", "Erro", "Horário"]),
    lockedModule("trem", "05", "Trem", "<ruby>電車<rt>でんしゃ</rt></ruby>", "でんしゃ", "densha", "Plataformas, conexões e ajuda durante o trajeto.", ["Plataforma", "Direção", "Ajuda", "Atraso", "Último trem", "Bilhete"]),
    lockedModule("escola", "06", "Escola", "<ruby>学校<rt>がっこう</rt></ruby>", "がっこう", "gakkou", "Conversas básicas com professores e secretaria.", ["Atraso", "Tarefa", "Saúde", "Professor", "Formulário", "Reunião"]),
    lockedModule("mercado", "07", "Mercado", "<ruby>スーパー<rt>すーぱー</rt></ruby>", "すーぱー", "suupaa", "Pergunte preço, sacola e localização de produtos.", ["Produto", "Sacola", "Preço", "Pagamento", "Pontos", "Estoque"]),
    lockedModule("banco", "08", "Banco", "<ruby>銀行<rt>ぎんこう</rt></ruby>", "ぎんこう", "ginkou", "Conta, cartão, senha e atendimento no guichê.", ["Conta", "Cartão", "ATM", "Transferência", "Senha", "Endereço"]),
    lockedModule("correios", "09", "Correios", "<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>", "ゆうびんきょく", "yuubinkyoku", "Envios, retirada, endereço e formas de entrega.", ["Pacote", "Prazo", "Retirada", "Endereço", "Internacional", "Reentrega"])
  ];

  const modules = moduleSpecs.map((item) => ({
    ...item,
    cards: item.cards || [],
    premiumTeasers: (item.premiumTeasers || []).map((teaser, index) => ({
      ...teaser,
      id: `${item.id}-premium-${String(index + 1).padStart(2, "0")}`
    })),
    quiz: item.status === "available" ? createQuiz(item) : []
  }));

  function lockedModule(id, order, title, japaneseTitle, japaneseReading, japaneseRomaji, description, teaserNames) {
    return {
      id,
      order,
      title,
      japaneseTitle,
      japaneseReading,
      japaneseRomaji,
      level: "Premium",
      duration: "Premium",
      status: "locked",
      description,
      introduction: "Modulo reservado para a area Premium.",
      cards: [],
      premiumTeasers: teaserNames.map((situation) => ({ situation }))
    };
  }

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
        question: `Você quer dizer "${cards[0].portuguese}"`,
        options: phraseOptions(cards, 0, [1, 2, 3]),
        correctAnswer: cards[0].id,
        explanation: "Compare a situação em português com a frase japonesa principal."
      },
      {
        id: `${moduleItem.id}-quiz-02`,
        question: "O que significa esta frase?",
        prompt: languagePrompt(cards[1], "Escolha a tradução correta."),
        options: translationOptions(cards, 1, [0, 2, 4]),
        correctAnswer: cards[1].id,
        explanation: "A leitura em hiragana e o romaji ajudam a reconhecer a frase mesmo sem kanji."
      },
      {
        id: `${moduleItem.id}-quiz-03`,
        question: "Quando esta expressão é usada?",
        prompt: languagePrompt(cards[2], cards[2].portuguese),
        options: situationOptions(cards, 2, [0, 1, 5]),
        correctAnswer: cards[2].id,
        explanation: "Associe a frase à situação real em que ela aparece."
      },
      {
        id: `${moduleItem.id}-quiz-04`,
        question: `Você quer dizer "${cards[3].portuguese}"`,
        options: phraseOptions(cards, 3, [0, 4, 5]),
        correctAnswer: cards[3].id,
        explanation: "No restaurante, お願いします ajuda a fazer pedidos de forma educada."
      },
      {
        id: `${moduleItem.id}-quiz-05`,
        question: "Qual frase serve para apontar um item do cardápio e pedir?",
        options: phraseOptions(cards, 4, [1, 3, 5]),
        correctAnswer: cards[4].id,
        explanation: "これをお願いします significa 'Este, por favor' e funciona bem apontando para o cardápio."
      },
      {
        id: `${moduleItem.id}-quiz-06`,
        question: "Como pedir a conta?",
        options: phraseOptions(cards, 5, [0, 3, 4]),
        correctAnswer: cards[5].id,
        explanation: "お会計をお願いします e uma forma direta e educada de pedir a conta."
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

  function phraseOptions(cards, correctIndex, distractorIndexes) {
    return optionIndexes(correctIndex, distractorIndexes).map((index) => phraseOption(cards[index]));
  }

  function translationOptions(cards, correctIndex, distractorIndexes) {
    return optionIndexes(correctIndex, distractorIndexes).map((index) => ({
      id: cards[index].id,
      portuguese: cards[index].portuguese
    }));
  }

  function situationOptions(cards, correctIndex, distractorIndexes) {
    return optionIndexes(correctIndex, distractorIndexes).map((index) => ({
      id: cards[index].id,
      portuguese: cards[index].situation
    }));
  }

  function optionIndexes(correctIndex, distractorIndexes) {
    return [correctIndex].concat(distractorIndexes).filter((index, position, list) => (
      list.indexOf(index) === position
    ));
  }

  function phraseOption(item) {
    return {
      id: item.id,
      japanese: item.japanese,
      hiragana: item.hiragana,
      romaji: item.romaji,
      portuguese: item.portuguese
    };
  }

  if (typeof window !== "undefined") {
    window.SURVIVAL_MODULES = modules;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = modules;
  }
})();
