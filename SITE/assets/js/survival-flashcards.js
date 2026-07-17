(function () {
  "use strict";

  const root = document.querySelector("[data-flashcards-root]");
  if (!root) return;

  const dataUrl = root.dataset.flashcardsSrc;
  const storageKey = "jr-survival-flashcards-progress-v1";
  const state = {
    cards: [],
    visibleCards: [],
    progress: {},
    index: 0,
    category: "Todos",
    flipped: false,
    voices: []
  };

  const selectors = {
    body: root.querySelector("[data-flashcards-body]"),
    category: root.querySelector("[data-flashcards-category]"),
    current: root.querySelector("[data-flashcards-current]"),
    total: root.querySelector("[data-flashcards-total]"),
    known: root.querySelector("[data-flashcards-known]"),
    review: root.querySelector("[data-flashcards-review]"),
    status: root.querySelector("[data-flashcards-status]")
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      if (parsed && typeof parsed === "object") state.progress = parsed;
    } catch (error) {
      state.progress = {};
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state.progress));
    } catch (error) {
      setStatus("Não foi possível salvar o progresso neste navegador.");
    }
  }

  function setStatus(message) {
    if (!selectors.status) return;
    selectors.status.innerHTML = `<span>Status</span>${escapeHtml(message)}`;
  }

  function normalizeCategory(value) {
    return value || "Todos";
  }

  function applyFilter() {
    state.visibleCards = state.category === "Todos"
      ? state.cards.slice()
      : state.cards.filter((card) => card.category === state.category);
    if (state.index >= state.visibleCards.length) state.index = 0;
    state.flipped = false;
    renderCard();
  }

  function renderCategories() {
    const categories = ["Todos", ...Array.from(new Set(state.cards.map((card) => card.category)))];
    selectors.category.innerHTML = categories.map((category) => `
      <option value="${escapeHtml(category)}">${escapeHtml(category)}</option>
    `).join("");
    selectors.category.value = state.category;
  }

  function getCardStatus(card) {
    return state.progress[card.id] || "new";
  }

  function getReviewCount() {
    return state.cards.filter((card) => {
      const status = getCardStatus(card);
      return status === "unknown" || status === "later";
    }).length;
  }

  function updateCounters() {
    const current = state.visibleCards.length ? state.index + 1 : 0;
    selectors.current.textContent = String(current);
    selectors.total.textContent = String(state.visibleCards.length);
    selectors.known.textContent = String(state.cards.filter((card) => getCardStatus(card) === "known").length);
    selectors.review.textContent = String(getReviewCount());
  }

  function renderCard() {
    updateCounters();
    if (!state.visibleCards.length) {
      selectors.body.innerHTML = '<p class="flashcard-error">Nenhum card encontrado para esta categoria.</p>';
      return;
    }

    const card = state.visibleCards[state.index];
    const status = getCardStatus(card);
    const statusLabel = {
      known: "Sei",
      unknown: "Não sei",
      later: "Revisar depois",
      new: "Novo"
    }[status] || "Novo";

    selectors.body.innerHTML = `
      <div class="flashcard-stage">
        <button class="flashcard-study-card${state.flipped ? " is-flipped" : ""}" type="button" data-flashcard-flip aria-label="Virar card">
          <span class="flashcard-inner">
            <span class="flashcard-face flashcard-face--front">
              <span class="flashcard-meta">
                <span class="flashcard-pill">${escapeHtml(card.category)}</span>
                <span class="flashcard-pill">${escapeHtml(statusLabel)}</span>
              </span>
              <span class="flashcard-situation">${escapeHtml(card.situation)}</span>
              <span class="flashcard-japanese" lang="ja">${escapeHtml(card.japanese)}</span>
              <span class="flashcard-hint">Toque em “Virar card” ou no próprio card para ver leitura, romaji, tradução e contexto.</span>
            </span>
            <span class="flashcard-face flashcard-face--back">
              <span class="flashcard-meta">
                <span class="flashcard-pill">${escapeHtml(card.category)}</span>
                <span class="flashcard-pill">${escapeHtml(statusLabel)}</span>
              </span>
              <span class="flashcard-situation">${escapeHtml(card.situation)}</span>
              <span class="flashcard-japanese" lang="ja">${escapeHtml(card.japanese)}</span>
              <span class="flashcard-reading">
                <span lang="ja">${escapeHtml(card.hiragana)}</span>
                <span>${escapeHtml(card.romaji)}</span>
                <strong>${escapeHtml(card.portuguese)}</strong>
              </span>
              <p class="flashcard-note"><strong>Uso:</strong> ${escapeHtml(card.context)}</p>
              <p class="flashcard-note"><strong>Nota cultural:</strong> ${escapeHtml(card.culturalNote)}</p>
            </span>
          </span>
        </button>
      </div>
      <div class="flashcard-actions">
        <button class="flashcard-action flashcard-action--primary" type="button" data-flashcard-flip>Virar card</button>
        <button class="flashcard-action" type="button" data-flashcard-speak>Ouvir</button>
      </div>
      <div class="flashcard-review-row" aria-label="Marcar revisão">
        <button class="flashcard-review" type="button" data-rating="known">Sei</button>
        <button class="flashcard-review" type="button" data-rating="unknown">Não sei</button>
        <button class="flashcard-review" type="button" data-rating="later">Revisar depois</button>
      </div>
    `;

    setStatus(`Card ${state.index + 1} de ${state.visibleCards.length}. Categoria: ${card.category}.`);
  }

  function nextCard() {
    if (!state.visibleCards.length) return;
    state.index = (state.index + 1) % state.visibleCards.length;
    state.flipped = false;
    renderCard();
  }

  function markCard(rating) {
    const card = state.visibleCards[state.index];
    if (!card) return;
    state.progress[card.id] = rating;
    saveProgress();
    setStatus(rating === "known" ? "Marcado como sei." : rating === "unknown" ? "Marcado como não sei." : "Marcado para revisar depois.");
    window.setTimeout(nextCard, 220);
  }

  function flipCard() {
    state.flipped = !state.flipped;
    const cardButton = root.querySelector(".flashcard-study-card");
    if (cardButton) cardButton.classList.toggle("is-flipped", state.flipped);
  }

  function pickJapaneseVoice() {
    if (!("speechSynthesis" in window)) return null;
    state.voices = window.speechSynthesis.getVoices();
    return state.voices.find((voice) => /^ja(-|_)?JP/i.test(voice.lang))
      || state.voices.find((voice) => /^ja/i.test(voice.lang))
      || null;
  }

  function speakCurrentCard() {
    const card = state.visibleCards[state.index];
    if (!card) return;
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      setStatus("Áudio não disponível neste navegador.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(card.japanese);
    const voice = pickJapaneseVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : "ja-JP";
    utterance.rate = 0.84;
    utterance.pitch = 1;
    utterance.addEventListener("start", () => setStatus("Reproduzindo frase em japonês."));
    utterance.addEventListener("end", () => setStatus("Áudio concluído."));
    utterance.addEventListener("error", () => setStatus("Áudio não disponível neste navegador."));
    window.speechSynthesis.speak(utterance);
  }

  function resetProgress() {
    state.progress = {};
    saveProgress();
    renderCard();
    setStatus("Progresso dos flashcards resetado.");
  }

  function bindEvents() {
    selectors.category.addEventListener("change", () => {
      state.category = normalizeCategory(selectors.category.value);
      state.index = 0;
      applyFilter();
    });

    root.addEventListener("click", (event) => {
      const flip = event.target.closest("[data-flashcard-flip]");
      const speak = event.target.closest("[data-flashcard-speak]");
      const rating = event.target.closest("[data-rating]");
      const reset = event.target.closest("[data-flashcards-reset]");

      if (flip) flipCard();
      if (speak) speakCurrentCard();
      if (rating) markCard(rating.dataset.rating);
      if (reset) resetProgress();
    });
  }

  function validateCards(cards) {
    return Array.isArray(cards) && cards.every((card) => (
      card.id
      && card.category
      && card.situation
      && card.japanese
      && card.hiragana
      && card.romaji
      && card.portuguese
      && card.context
    ));
  }

  async function init() {
    loadProgress();
    bindEvents();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.addEventListener?.("voiceschanged", () => {
        state.voices = window.speechSynthesis.getVoices();
      });
    } else {
      setStatus("Áudio não disponível neste navegador.");
    }

    try {
      const response = await fetch(dataUrl, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const cards = await response.json();
      if (!validateCards(cards)) throw new Error("Formato inválido");
      state.cards = cards;
      renderCategories();
      applyFilter();
    } catch (error) {
      selectors.body.innerHTML = '<p class="flashcard-error">Não foi possível carregar os flashcards agora. Tente atualizar a página.</p>';
      setStatus("Flashcards indisponíveis neste momento.");
    }
  }

  init();
})();
