(function () {
  "use strict";

  const restaurantPremiumCards = [
    {
      id: "restaurante-premium-04",
      situation: "Pedir água",
      japanese: "お<ruby>水<rt>みず</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします",
      hiragana: "おみずをおねがいします",
      romaji: "omizu o onegai shimasu",
      speechText: "お水をお願いします",
      portuguese: "Água, por favor.",
      note: "Uma forma educada e direta de pedir água."
    },
    {
      id: "restaurante-premium-05",
      situation: "Fazer o pedido",
      japanese: "これをお<ruby>願<rt>ねが</rt></ruby>いします",
      hiragana: "これをおねがいします",
      romaji: "kore o onegai shimasu",
      speechText: "これをお願いします",
      portuguese: "Este, por favor.",
      note: "Use apontando para o item escolhido no cardápio."
    },
    {
      id: "restaurante-premium-06",
      situation: "Pedir a conta",
      japanese: "お<ruby>会計<rt>かいけい</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします",
      hiragana: "おかいけいをおねがいします",
      romaji: "okaikei o onegai shimasu",
      speechText: "お会計をお願いします",
      portuguese: "A conta, por favor.",
      note: "Frase útil para encerrar o atendimento."
    }
  ];

  if (typeof window !== "undefined") {
    window.SURVIVAL_RESTAURANT_PREMIUM = restaurantPremiumCards;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = restaurantPremiumCards;
  }
})();
