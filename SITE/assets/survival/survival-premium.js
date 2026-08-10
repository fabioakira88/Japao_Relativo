(function () {
  "use strict";

  const message = "Conteudo premium indisponivel nesta versao publica.";

  if (typeof window !== "undefined") {
    window.SURVIVAL_PREMIUM_NOTICE = message;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { message };
  }
})();
