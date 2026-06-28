(function () {
  "use strict";

  const cards = window.SURVIVAL_RESTAURANT_PREMIUM || [];
  const cardContainer = document.querySelector("#premiumCard");
  const cardMeta = document.querySelector("#premiumCardMeta");
  const progress = document.querySelector("#premiumProgress");
  const progressBar = document.querySelector("#premiumProgressBar");
  const backButton = document.querySelector("#premiumBack");
  const nextButton = document.querySelector("#premiumNext");
  const audioStatus = document.querySelector("#premiumAudioStatus");
  const toast = document.querySelector("#premiumToast");
  let cardIndex = 0;
  let activeAudio;
  let activeUtterance;
  let toastTimer;

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function audioIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h4l5 4V6l-5 4zm12-1a5 5 0 0 1 0 6m2-8a8 8 0 0 1 0 10"/></svg>';
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.remove("is-visible");
    window.requestAnimationFrame(() => toast.classList.add("is-visible"));
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => {
        toast.hidden = true;
      }, 180);
    }, 2600);
  }

  function stopAudio() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = undefined;
    }
    if (activeUtterance && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      activeUtterance = undefined;
    }
    const button = cardContainer.querySelector(".audio-button.is-playing");
    if (button) button.classList.remove("is-playing");
  }

  function speakJapanese(button) {
    const text = button.dataset.speechText;
    if (!text || !("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      audioStatus.textContent = "Áudio não disponível neste navegador.";
      showToast("Áudio não disponível neste navegador.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    utterance.lang = "ja-JP";
    utterance.rate = Number(button.dataset.speechRate || .86);
    utterance.addEventListener("end", () => {
      button.classList.remove("is-playing");
      if (activeUtterance === utterance) activeUtterance = undefined;
    });
    utterance.addEventListener("error", () => {
      button.classList.remove("is-playing");
      audioStatus.textContent = "Áudio não disponível neste navegador.";
      showToast("Áudio não disponível neste navegador.");
    });
    button.classList.add("is-playing");
    audioStatus.textContent = "Reproduzindo pronúncia em japonês.";
    window.speechSynthesis.speak(utterance);
  }

  function playCardAudio(button) {
    const src = button.dataset.audioSrc;
    stopAudio();
    if (!src) {
      speakJapanese(button);
      return;
    }

    const audio = new Audio(src);
    activeAudio = audio;
    const stopPlaying = () => {
      button.classList.remove("is-playing");
      if (activeAudio === audio) activeAudio = undefined;
    };
    button.classList.add("is-playing");
    audioStatus.textContent = button.dataset.audioStatus || "Reproduzindo pronúncia.";
    audio.addEventListener("ended", stopPlaying);
    audio.addEventListener("error", () => {
      stopPlaying();
      speakJapanese(button);
    });
    audio.play().catch(() => {
      stopPlaying();
      speakJapanese(button);
    });
  }

  function renderCard() {
    stopAudio();
    const card = cards[cardIndex];
    const percentage = ((cardIndex + 1) / cards.length) * 100;
    cardMeta.textContent = `Restaurante completo · Card ${cardIndex + 4} de 6`;
    progress.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", String(Math.round(percentage)));
    backButton.disabled = cardIndex === 0;
    nextButton.textContent = cardIndex === cards.length - 1 ? "Concluir" : "Próximo";
    cardContainer.innerHTML = `
      <div class="premium-card-mark"><span>Exclusivo</span><strong>${String(cardIndex + 4).padStart(2, "0")}</strong></div>
      <p class="lesson-situation">${escapeHtml(card.situation)}</p>
      <div class="language-block lesson-language">
        <p class="jp-main" lang="ja">${card.japanese}</p>
        <p class="jp-reading" lang="ja">${escapeHtml(card.hiragana)}</p>
        <p class="jp-romaji">${escapeHtml(card.romaji)}</p>
        <p class="jp-portuguese">${escapeHtml(card.portuguese)}</p>
      </div>
      <div class="lesson-note"><span>Como usar</span><p>${escapeHtml(card.note)}</p></div>
      <div class="audio-controls">
        <button class="audio-button" type="button" data-audio-src="${escapeAttribute(card.audio || "")}" data-speech-text="${escapeAttribute(card.speechText)}" data-audio-status="Reproduzindo pronúncia." aria-describedby="premiumAudioStatus">
          ${audioIcon()}
          Ouvir pronúncia
        </button>
        <button class="audio-button audio-button--slow" type="button" data-audio-src="${escapeAttribute(card.audioSlow || "")}" data-speech-text="${escapeAttribute(card.speechText)}" data-speech-rate="0.68" data-audio-status="Reproduzindo pronúncia em ritmo lento." aria-describedby="premiumAudioStatus">
          ${audioIcon()}
          Ouvir devagar
        </button>
      </div>
    `;
    cardContainer.querySelectorAll(".audio-button").forEach((button) => {
      button.addEventListener("click", (event) => playCardAudio(event.currentTarget));
    });
    audioStatus.textContent = "";
  }

  function move(direction) {
    if (direction < 0 && cardIndex > 0) {
      cardIndex -= 1;
      renderCard();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (direction > 0 && cardIndex < cards.length - 1) {
      cardIndex += 1;
      renderCard();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (direction > 0) {
      showToast("Módulo Restaurante completo.");
    }
  }

  if (!cards.length) {
    cardContainer.innerHTML = "<p>Conteúdo indisponível. Solicite um novo link à equipe do Japão Relativo.</p>";
    backButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  backButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  renderCard();
})();
