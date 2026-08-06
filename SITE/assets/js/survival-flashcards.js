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

(function () {
  "use strict";

  const root = document.querySelector("[data-kanji-flashcards-root]");
  if (!root) return;

  const dataUrl = root.dataset.kanjiFlashcardsSrc;
  const storageKeys = {
    progress: "jr_kanji_flashcards_progress",
    favorites: "jr_kanji_flashcards_favorites",
    settings: "jr_kanji_flashcards_settings"
  };
  const defaultSettings = {
    grade: "all",
    status: "all",
    difficulty: "all",
    order: "sequential",
    display: "kanji-only",
    search: ""
  };
  const state = {
    cards: [],
    visibleCards: [],
    progress: {},
    favorites: new Set(),
    settings: { ...defaultSettings },
    index: 0,
    flipped: false,
    sessionSeen: new Set(),
    voices: []
  };
  const selectors = {
    body: root.querySelector("[data-kanji-body]"),
    grade: root.querySelector("[data-kanji-grade]"),
    status: root.querySelector("[data-kanji-status]"),
    difficulty: root.querySelector("[data-kanji-difficulty]"),
    order: root.querySelector("[data-kanji-order]"),
    display: root.querySelector("[data-kanji-display]"),
    search: root.querySelector("[data-kanji-search]"),
    current: root.querySelector("[data-kanji-current]"),
    total: root.querySelector("[data-kanji-total]"),
    percent: root.querySelector("[data-kanji-percent]"),
    easy: root.querySelector("[data-kanji-easy]"),
    medium: root.querySelector("[data-kanji-medium]"),
    hard: root.querySelector("[data-kanji-hard]"),
    statusMessage: root.querySelector("[data-kanji-status-message]")
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function loadJson(key, fallback) {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || "");
      return value && typeof value === "object" ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      setStatus("Não foi possível salvar o progresso neste navegador.");
      return false;
    }
  }

  function setStatus(message) {
    if (!selectors.statusMessage) return;
    selectors.statusMessage.textContent = message;
  }

  function loadState() {
    state.progress = loadJson(storageKeys.progress, {});
    const favorites = loadJson(storageKeys.favorites, []);
    state.favorites = new Set(Array.isArray(favorites) ? favorites : []);
    state.settings = { ...defaultSettings, ...loadJson(storageKeys.settings, {}) };
  }

  function saveSettings() {
    saveJson(storageKeys.settings, state.settings);
  }

  function getCardProgress(card) {
    return state.progress[card.id] || { difficulty: "new", studied: false };
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function matchesSearch(card, query) {
    if (!query) return true;
    const terms = [
      card.kanji,
      card.main_reading,
      card.romaji,
      ...(card.meaning_pt || []),
      ...(card.onyomi || []),
      ...(card.kunyomi || []),
      ...(card.words || []).flatMap((word) => [word.word, word.furigana, word.romaji, word.meaning_pt])
    ];
    return normalize(terms.join(" ")).includes(normalize(query));
  }

  function gradeMatches(card) {
    if (state.settings.grade === "all") return true;
    if (state.settings.grade === "base") return card.grade === 1;
    if (state.settings.grade === "extension") return card.grade === 4;
    return String(card.grade) === state.settings.grade;
  }

  function statusMatches(card) {
    const progress = getCardProgress(card);
    if (state.settings.status === "favorites") return state.favorites.has(card.id);
    if (state.settings.status === "unstudied") return !progress.studied;
    return true;
  }

  function difficultyMatches(card) {
    if (state.settings.difficulty === "all") return true;
    return getCardProgress(card).difficulty === state.settings.difficulty;
  }

  function shuffle(cards) {
    const copy = cards.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  }

  function applyFilters() {
    const filtered = state.cards.filter((card) => (
      gradeMatches(card)
      && statusMatches(card)
      && difficultyMatches(card)
      && matchesSearch(card, state.settings.search)
    ));
    state.visibleCards = state.settings.order === "random" ? shuffle(filtered) : filtered;
    if (state.index >= state.visibleCards.length) state.index = 0;
    state.flipped = false;
    renderCard();
  }

  function syncControls() {
    selectors.grade.value = state.settings.grade;
    selectors.status.value = state.settings.status;
    selectors.difficulty.value = state.settings.difficulty;
    selectors.order.value = state.settings.order;
    selectors.display.value = state.settings.display;
    selectors.search.value = state.settings.search;
  }

  function countDifficulty(difficulty) {
    return state.cards.filter((card) => getCardProgress(card).difficulty === difficulty).length;
  }

  function updateCounters() {
    const current = state.visibleCards.length ? state.index + 1 : 0;
    const percent = state.visibleCards.length
      ? Math.round((state.sessionSeen.size / state.visibleCards.length) * 100)
      : 0;
    selectors.current.textContent = String(current);
    selectors.total.textContent = String(state.visibleCards.length);
    selectors.percent.textContent = `${percent}%`;
    selectors.easy.textContent = String(countDifficulty("easy"));
    selectors.medium.textContent = String(countDifficulty("medium"));
    selectors.hard.textContent = String(countDifficulty("hard"));
  }

  function renderWords(words) {
    return (words || []).slice(0, 3).map((word) => `
      <li>
        <span class="kanji-word" lang="ja">${word.ruby || escapeHtml(word.word)}</span>
        <span>${escapeHtml(word.romaji)} · ${escapeHtml(word.meaning_pt)}</span>
      </li>
    `).join("");
  }

  function favoriteLabel(card) {
    return state.favorites.has(card.id) ? "Remover dos favoritos" : "Adicionar aos favoritos";
  }

  function renderCard() {
    updateCounters();
    if (!state.visibleCards.length) {
      selectors.body.innerHTML = '<p class="flashcard-error">Nenhum kanji encontrado para estes filtros.</p>';
      setStatus("Nenhum kanji corresponde aos filtros escolhidos.");
      return;
    }

    const card = state.visibleCards[state.index];
    const progress = getCardProgress(card);
    state.sessionSeen.add(card.id);
    updateCounters();
    const difficultyLabel = {
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil",
      new: "Novo"
    }[progress.difficulty] || "Novo";
    const frontReading = state.settings.display === "kanji-reading"
      ? `<span class="kanji-card__front-reading" lang="ja">${escapeHtml(card.main_reading)}</span>`
      : "";

    selectors.body.innerHTML = `
      <div class="flashcard-stage kanji-card-stage">
        <button class="flashcard-study-card kanji-study-card${state.flipped ? " is-flipped" : ""}" type="button" data-kanji-flip aria-label="Virar card do kanji ${escapeHtml(card.kanji)}">
          <span class="flashcard-inner">
            <span class="flashcard-face flashcard-face--front">
              <span class="flashcard-meta">
                <span class="flashcard-pill">${escapeHtml(card.grade_display)}</span>
                <span class="flashcard-pill">${escapeHtml(difficultyLabel)}</span>
              </span>
              <span class="kanji-card__symbol" lang="ja">${escapeHtml(card.kanji)}</span>
              ${frontReading}
              <span class="flashcard-hint">Toque para revelar leitura, significado, palavras e frase de exemplo.</span>
            </span>
            <span class="flashcard-face flashcard-face--back kanji-card__back">
              <span class="flashcard-meta">
                <span class="flashcard-pill">${escapeHtml(card.grade_display)}</span>
                <span class="flashcard-pill">${escapeHtml(difficultyLabel)}</span>
              </span>
              <div class="kanji-card__heading">
                <span class="kanji-card__small-symbol" lang="ja">${escapeHtml(card.kanji)}</span>
                <div>
                  <strong lang="ja">${escapeHtml(card.main_reading)}</strong>
                  <span>${escapeHtml(card.romaji)}</span>
                </div>
              </div>
              <p class="kanji-card__meaning">${escapeHtml((card.meaning_pt || []).join(" · "))}</p>
              <dl class="kanji-card__facts">
                <div><dt>On</dt><dd lang="ja">${escapeHtml((card.onyomi || []).join(" · ") || "—")}</dd></div>
                <div><dt>Kun</dt><dd lang="ja">${escapeHtml((card.kunyomi || []).join(" · ") || "—")}</dd></div>
                <div><dt>Radical</dt><dd lang="ja">${escapeHtml(card.radical || "—")}</dd></div>
                <div><dt>Traços</dt><dd>${escapeHtml(card.stroke_count || "—")}</dd></div>
              </dl>
              <div class="kanji-card__examples">
                <strong>Palavras comuns</strong>
                <ul>${renderWords(card.words)}</ul>
              </div>
              <div class="kanji-card__sentence">
                <strong>Frase de exemplo</strong>
                <p lang="ja">${card.example_ruby || escapeHtml(card.example_sentence)}</p>
                <p class="kanji-card__furigana" lang="ja">${escapeHtml(card.example_furigana)}</p>
                <p>${escapeHtml(card.example_romaji)}<br><em>${escapeHtml(card.example_translation_pt)}</em></p>
              </div>
            </span>
          </span>
        </button>
      </div>
      <div class="flashcard-actions kanji-card__actions">
        <button class="flashcard-action flashcard-action--primary" type="button" data-kanji-flip>Virar card</button>
        <button class="flashcard-action" type="button" data-kanji-speak aria-label="Ouvir leitura e frase de exemplo">Ouvir</button>
        <button class="flashcard-action" type="button" data-kanji-favorite aria-pressed="${state.favorites.has(card.id)}">${favoriteLabel(card)}</button>
      </div>
      <div class="flashcard-review-row kanji-card__ratings" aria-label="Marcar dificuldade do kanji">
        <button class="flashcard-review flashcard-review--easy" type="button" data-kanji-rating="easy">Fácil</button>
        <button class="flashcard-review flashcard-review--medium" type="button" data-kanji-rating="medium">Médio</button>
        <button class="flashcard-review flashcard-review--hard" type="button" data-kanji-rating="hard">Difícil</button>
      </div>
      <div class="kanji-card__navigation" aria-label="Navegação dos kanjis">
        <button class="flashcard-action" type="button" data-kanji-previous>Anterior</button>
        <button class="flashcard-action" type="button" data-kanji-next>Próximo</button>
      </div>
    `;
    setStatus(`Kanji ${card.kanji}. Card ${state.index + 1} de ${state.visibleCards.length}.`);
  }

  function moveCard(step) {
    if (!state.visibleCards.length) return;
    state.index = (state.index + step + state.visibleCards.length) % state.visibleCards.length;
    state.flipped = false;
    renderCard();
  }

  function toggleFlip() {
    state.flipped = !state.flipped;
    const button = root.querySelector(".kanji-study-card");
    if (button) button.classList.toggle("is-flipped", state.flipped);
  }

  function markDifficulty(difficulty) {
    const card = state.visibleCards[state.index];
    if (!card) return;
    state.progress[card.id] = {
      difficulty,
      studied: true,
      updatedAt: new Date().toISOString()
    };
    saveJson(storageKeys.progress, state.progress);
    setStatus(`${card.kanji} marcado como ${difficulty === "easy" ? "fácil" : difficulty === "medium" ? "médio" : "difícil"}.`);
    window.setTimeout(() => moveCard(1), 180);
  }

  function toggleFavorite() {
    const card = state.visibleCards[state.index];
    if (!card) return;
    if (state.favorites.has(card.id)) {
      state.favorites.delete(card.id);
      setStatus(`${card.kanji} removido dos favoritos.`);
    } else {
      state.favorites.add(card.id);
      setStatus(`${card.kanji} adicionado aos favoritos.`);
    }
    saveJson(storageKeys.favorites, Array.from(state.favorites));
    renderCard();
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
    if (card.audio_url) {
      const audio = new Audio(card.audio_url);
      audio.play().catch(() => setStatus("Não foi possível reproduzir o áudio gravado."));
      return;
    }
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      setStatus("Áudio não disponível neste navegador.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${card.kanji}。${card.example_sentence}`);
    const voice = pickJapaneseVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : "ja-JP";
    utterance.rate = 0.82;
    utterance.addEventListener("start", () => setStatus("Reproduzindo leitura e frase em japonês."));
    utterance.addEventListener("end", () => setStatus("Áudio concluído."));
    utterance.addEventListener("error", () => setStatus("Áudio não disponível neste navegador."));
    window.speechSynthesis.speak(utterance);
  }

  function resetSession() {
    state.sessionSeen = new Set();
    state.index = 0;
    state.flipped = false;
    renderCard();
    setStatus("Sessão reiniciada. Seu histórico de dificuldade e favoritos foi mantido.");
  }

  function resetAllProgress() {
    state.progress = {};
    state.favorites = new Set();
    state.sessionSeen = new Set();
    saveJson(storageKeys.progress, state.progress);
    saveJson(storageKeys.favorites, []);
    renderCard();
    setStatus("Progresso, dificuldades e favoritos dos kanjis foram resetados.");
  }

  function updateSetting(name, value) {
    state.settings[name] = value;
    state.index = 0;
    state.sessionSeen = new Set();
    saveSettings();
    applyFilters();
  }

  function bindEvents() {
    selectors.grade.addEventListener("change", () => updateSetting("grade", selectors.grade.value));
    selectors.status.addEventListener("change", () => updateSetting("status", selectors.status.value));
    selectors.difficulty.addEventListener("change", () => updateSetting("difficulty", selectors.difficulty.value));
    selectors.order.addEventListener("change", () => updateSetting("order", selectors.order.value));
    selectors.display.addEventListener("change", () => updateSetting("display", selectors.display.value));
    selectors.search.addEventListener("input", () => updateSetting("search", selectors.search.value));
    root.addEventListener("click", (event) => {
      if (event.target.closest("[data-kanji-flip]")) toggleFlip();
      if (event.target.closest("[data-kanji-speak]")) speakCurrentCard();
      if (event.target.closest("[data-kanji-favorite]")) toggleFavorite();
      if (event.target.closest("[data-kanji-previous]")) moveCard(-1);
      if (event.target.closest("[data-kanji-next]")) moveCard(1);
      if (event.target.closest("[data-kanji-reset-session]")) resetSession();
      if (event.target.closest("[data-kanji-reset-all]")) resetAllProgress();
      const rating = event.target.closest("[data-kanji-rating]");
      if (rating) markDifficulty(rating.dataset.kanjiRating);
    });
  }

  function validateCards(cards) {
    return Array.isArray(cards) && cards.every((card) => (
      card.id
      && card.kanji
      && Number.isFinite(card.grade)
      && Array.isArray(card.meaning_pt)
      && Array.isArray(card.words)
      && card.example_sentence
      && card.example_furigana
      && card.example_translation_pt
    ));
  }

  async function init() {
    loadState();
    syncControls();
    bindEvents();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.addEventListener?.("voiceschanged", () => {
        state.voices = window.speechSynthesis.getVoices();
      });
    }
    try {
      const response = await fetch(dataUrl, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const cards = await response.json();
      if (!validateCards(cards)) throw new Error("Formato inválido");
      state.cards = cards;
      applyFilters();
    } catch (error) {
      selectors.body.innerHTML = '<p class="flashcard-error">Não foi possível carregar os kanjis agora. Tente atualizar a página.</p>';
      setStatus("Flashcards de kanji indisponíveis neste momento.");
    }
  }

  init();
})();
