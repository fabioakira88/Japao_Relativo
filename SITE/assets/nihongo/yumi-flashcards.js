(function () {
  "use strict";

  const roots = document.querySelectorAll("[data-yumi-app]");
  if (!roots.length) return;

  function escapeHtml(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "");
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { return false; }
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function pickVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => /^ja(-|_)?JP/i.test(voice.lang)) || voices.find((voice) => /^ja/i.test(voice.lang)) || null;
  }

  function speak(text, status) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance !== "function") {
      status("Áudio não disponível neste navegador.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : "ja-JP";
    utterance.rate = 0.84;
    utterance.addEventListener("start", () => status("Reproduzindo japonês."));
    utterance.addEventListener("end", () => status("Áudio concluído."));
    utterance.addEventListener("error", () => status("Áudio não disponível neste navegador."));
    window.speechSynthesis.speak(utterance);
  }

  function createKanjiApp(root) {
    const state = {
      cards: [], visible: [], index: 0, filter: "all", statusFilter: "all", order: "session", flipped: false,
      progress: loadJson("yumi-flashcards-progress", { learnedKanji: [], difficultKanji: [], lastUpdated: new Date().toISOString() }),
      history: loadJson("yumi_progress_history", [])
    };
    const els = {
      series: root.querySelector("[data-yumi-series]"), filterStatus: root.querySelector("[data-yumi-filter-status]"), order: root.querySelector("[data-yumi-order]"), body: root.querySelector("[data-yumi-body]"),
      current: root.querySelector("[data-yumi-current]"), total: root.querySelector("[data-yumi-total]"), learned: root.querySelector("[data-yumi-learned]"),
      difficult: root.querySelector("[data-yumi-difficult]"), percent: root.querySelector("[data-yumi-percent]"), bar: root.querySelector("[data-yumi-bar]"), status: root.querySelector("[data-yumi-status]"), dashboard: root.querySelector("[data-yumi-dashboard]")
    };
    const setStatus = (message) => { if (els.status) els.status.textContent = message; };
    const learnedSet = () => new Set(state.progress.learnedKanji || []);
    const difficultSet = () => new Set(state.progress.difficultKanji || []);
    function persist() {
      state.progress.lastUpdated = new Date().toISOString();
      saveJson("yumi-flashcards-progress", state.progress);
      const today = new Date().toISOString().slice(0, 10);
      const next = state.history.filter((item) => item.date !== today);
      next.push({ date: today, learnedCount: state.progress.learnedKanji.length, difficultCount: state.progress.difficultKanji.length });
      state.history = next.slice(-90);
      saveJson("yumi_progress_history", state.history);
    }
    function apply() {
      const learned = learnedSet();
      const difficult = difficultSet();
      const filtered = state.cards.filter((card) => {
        const seriesOk = state.filter === "all" || card.series === state.filter;
        const statusOk = state.statusFilter === "all"
          || (state.statusFilter === "new" && !learned.has(card.sourceId) && !difficult.has(card.sourceId))
          || (state.statusFilter === "learned" && learned.has(card.sourceId))
          || (state.statusFilter === "difficult" && difficult.has(card.sourceId));
        return seriesOk && statusOk;
      });
      state.visible = state.order === "shuffle" ? shuffle(filtered) : filtered;
      state.index = Math.min(state.index, Math.max(state.visible.length - 1, 0));
      state.flipped = false;
      render();
    }
    function updateStats() {
      const total = state.cards.length;
      const learned = state.progress.learnedKanji.length;
      const percent = total ? Math.round((learned / total) * 100) : 0;
      els.current.textContent = String(state.visible.length ? state.index + 1 : 0);
      els.total.textContent = String(state.visible.length);
      els.learned.textContent = String(learned);
      els.difficult.textContent = String(state.progress.difficultKanji.length);
      els.percent.textContent = percent + "%";
      els.bar.style.width = percent + "%";
      if (els.dashboard) {
        const bySeries = state.cards.reduce((acc, card) => {
          acc[card.series] = acc[card.series] || { total: 0, learned: 0, difficult: 0, label: card.seriesLabel };
          acc[card.series].total += 1;
          if ((state.progress.learnedKanji || []).includes(card.sourceId)) acc[card.series].learned += 1;
          if ((state.progress.difficultKanji || []).includes(card.sourceId)) acc[card.series].difficult += 1;
          return acc;
        }, {});
        els.dashboard.innerHTML = `
          <h2>Dashboard</h2>
          <div class="yumi-dashboard-grid">
            <div><span>Dias ativos</span><strong>${escapeHtml(state.history.length)}</strong></div>
            <div><span>Faltam</span><strong>${escapeHtml(Math.max(total - learned, 0))}</strong></div>
            ${Object.values(bySeries).map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.learned)}/${escapeHtml(item.total)}</strong><em>${escapeHtml(item.difficult)} difíceis</em></div>`).join("")}
          </div>`;
      }
    }
    function render() {
      updateStats();
      const card = state.visible[state.index];
      if (!card) { els.body.innerHTML = '<p class="yumi-status">Nenhum kanji encontrado para este filtro.</p>'; return; }
      const learned = learnedSet().has(card.sourceId);
      const difficult = difficultSet().has(card.sourceId);
      const label = learned ? "Aprendido" : difficult ? "Difícil" : "Novo";
      els.body.innerHTML = `
        <button class="yumi-flashcard${state.flipped ? " is-flipped" : ""}" type="button" data-yumi-flip aria-label="Virar card do kanji ${escapeHtml(card.kanji)}">
          <span class="yumi-card-inner">
            <span class="yumi-face">
              <span class="yumi-meta"><span class="yumi-pill">${escapeHtml(card.seriesLabel)}</span><span class="yumi-pill">${escapeHtml(label)}</span></span>
              <span class="yumi-kanji" lang="ja">${escapeHtml(card.kanji)}</span>
              <span class="yumi-hint">Toque para revelar leitura, romaji e significados.</span>
            </span>
            <span class="yumi-face yumi-face-back">
              <span class="yumi-meta"><span class="yumi-pill">${escapeHtml(card.seriesLabel)}</span><span class="yumi-pill">${escapeHtml(label)}</span></span>
              <div class="yumi-back-title"><strong lang="ja">${escapeHtml(card.kanji)}</strong><div><span lang="ja">${escapeHtml(card.reading)}</span><span>${escapeHtml(card.romaji)}</span></div></div>
              <p class="yumi-meaning">${escapeHtml(card.meaningPt)}</p>
              <ul class="yumi-detail-list">
                <li><span>Inglês</span><strong>${escapeHtml(card.meaningEn)}</strong></li>
                <li><span>Série</span><strong>${escapeHtml(card.seriesLabel)} · coleção publicada do Yumi</strong></li>
                <li><span>ID original</span><strong>${escapeHtml(card.sourceId)}</strong></li>
              </ul>
              <span class="yumi-hint">Marque como aprendido ou difícil para atualizar seu progresso.</span>
            </span>
          </span>
        </button>
        <div class="yumi-actions">
          <button class="yumi-btn" type="button" data-yumi-flip>Virar</button>
          <button class="yumi-btn" type="button" data-yumi-speak>Ouvir</button>
          <button class="yumi-btn" type="button" data-yumi-shuffle>Embaralhar</button>
        </div>
        <div class="yumi-ratings">
          <button class="yumi-btn is-learned" type="button" data-yumi-learned>Aprendido</button>
          <button class="yumi-btn is-difficult" type="button" data-yumi-difficult>Difícil</button>
          <button class="yumi-btn" type="button" data-yumi-next>Próximo</button>
        </div>`;
      setStatus(`${card.kanji}: card ${state.index + 1} de ${state.visible.length}.`);
    }
    function move(step) { if (!state.visible.length) return; state.index = (state.index + step + state.visible.length) % state.visible.length; state.flipped = false; render(); }
    function mark(type) {
      const card = state.visible[state.index]; if (!card) return;
      const learned = learnedSet(); const difficult = difficultSet();
      if (type === "learned") { learned.add(card.sourceId); difficult.delete(card.sourceId); }
      if (type === "difficult") { difficult.add(card.sourceId); learned.delete(card.sourceId); }
      state.progress.learnedKanji = Array.from(learned); state.progress.difficultKanji = Array.from(difficult); persist(); move(1);
    }
    root.addEventListener("click", (event) => {
      if (event.target.closest("[data-yumi-flip]")) { state.flipped = !state.flipped; root.querySelector(".yumi-flashcard")?.classList.toggle("is-flipped", state.flipped); }
      if (event.target.closest("[data-yumi-next]")) move(1);
      if (event.target.closest("[data-yumi-shuffle]")) { state.order = "shuffle"; els.order.value = "shuffle"; apply(); }
      if (event.target.closest("[data-yumi-speak]")) { const card = state.visible[state.index]; if (card) speak(card.kanji + "。" + card.reading, setStatus); }
      if (event.target.closest("[data-yumi-learned]")) mark("learned");
      if (event.target.closest("[data-yumi-difficult]")) mark("difficult");
    });
    els.series.addEventListener("change", () => { state.filter = els.series.value; state.index = 0; apply(); });
    els.filterStatus.addEventListener("change", () => { state.statusFilter = els.filterStatus.value; state.index = 0; apply(); });
    els.order.addEventListener("change", () => { state.order = els.order.value; state.index = 0; apply(); });
    fetch(root.dataset.yumiSrc, { cache: "no-cache" }).then((response) => { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); }).then((cards) => { state.cards = cards; apply(); }).catch(() => { els.body.innerHTML = '<p class="yumi-status">Não foi possível carregar os kanji agora.</p>'; setStatus("Base de kanji indisponível."); });
  }

  function createPhraseApp(root) {
    const state = { decks: [], deck: "fabrica", cards: [], index: 0, flipped: false, progress: loadJson("yumi-phrases-progress", {}) };
    const els = {
      decks: root.querySelector("[data-yumi-decks]"), body: root.querySelector("[data-yumi-body]"), current: root.querySelector("[data-yumi-current]"), total: root.querySelector("[data-yumi-total]"), learned: root.querySelector("[data-yumi-learned]"), difficult: root.querySelector("[data-yumi-difficult]"), percent: root.querySelector("[data-yumi-percent]"), bar: root.querySelector("[data-yumi-bar]"), status: root.querySelector("[data-yumi-status]")
    };
    const setStatus = (message) => { if (els.status) els.status.textContent = message; };
    function allCards() { return state.decks.flatMap((deck) => deck.cards); }
    function saveProgress() { saveJson("yumi-phrases-progress", state.progress); }
    function selectDeck(deckId) {
      state.deck = deckId;
      const deck = state.decks.find((item) => item.id === deckId) || state.decks[0];
      state.cards = deck ? deck.cards.slice() : [];
      state.index = 0; state.flipped = false; renderDecks(); render();
    }
    function renderDecks() {
      els.decks.innerHTML = state.decks.map((deck) => `<button class="yumi-deck" type="button" data-yumi-deck="${escapeHtml(deck.id)}" aria-pressed="${deck.id === state.deck}"><strong>${escapeHtml(deck.title)}</strong><span>${escapeHtml(deck.description)}</span></button>`).join("");
    }
    function updateStats() {
      const cards = allCards();
      const learned = cards.filter((card) => state.progress[card.id] === "learned").length;
      const difficult = cards.filter((card) => state.progress[card.id] === "difficult").length;
      const percent = cards.length ? Math.round((learned / cards.length) * 100) : 0;
      els.current.textContent = String(state.cards.length ? state.index + 1 : 0);
      els.total.textContent = String(state.cards.length);
      els.learned.textContent = String(learned);
      els.difficult.textContent = String(difficult);
      els.percent.textContent = percent + "%";
      els.bar.style.width = percent + "%";
    }
    function render() {
      updateStats();
      const card = state.cards[state.index];
      if (!card) { els.body.innerHTML = '<p class="yumi-status">Nenhum card encontrado.</p>'; return; }
      const cardStatus = state.progress[card.id] === "learned" ? "Aprendido" : state.progress[card.id] === "difficult" ? "Difícil" : "Novo";
      els.body.innerHTML = `
        <button class="yumi-flashcard${state.flipped ? " is-flipped" : ""}" type="button" data-yumi-flip aria-label="Virar flashcard de frase">
          <span class="yumi-card-inner">
            <span class="yumi-face">
              <span class="yumi-meta"><span class="yumi-pill">${escapeHtml(card.category)}</span><span class="yumi-pill">${escapeHtml(cardStatus)}</span></span>
              <p class="yumi-situation">${escapeHtml(card.situation)}</p>
              <span class="yumi-phrase" lang="ja">${escapeHtml(card.japanese)}</span>
              <span class="yumi-hint">Toque para ver leitura, tradução e contexto.</span>
            </span>
            <span class="yumi-face yumi-face-back">
              <span class="yumi-meta"><span class="yumi-pill">${escapeHtml(card.category)}</span><span class="yumi-pill">${escapeHtml(cardStatus)}</span></span>
              <p class="yumi-situation">${escapeHtml(card.situation)}</p>
              <span class="yumi-phrase" lang="ja">${escapeHtml(card.japanese)}</span>
              <ul class="yumi-detail-list">
                <li><span>Hiragana</span><strong lang="ja">${escapeHtml(card.hiragana)}</strong></li>
                <li><span>Romaji</span><strong>${escapeHtml(card.romaji)}</strong></li>
                <li><span>Português</span><strong>${escapeHtml(card.portuguese)}</strong></li>
              </ul>
              <p class="yumi-note"><strong>Uso:</strong> ${escapeHtml(card.context)}</p>
              <p class="yumi-note"><strong>Nota:</strong> ${escapeHtml(card.culturalNote)}</p>
            </span>
          </span>
        </button>
        <div class="yumi-actions">
          <button class="yumi-btn" type="button" data-yumi-flip>Virar</button>
          <button class="yumi-btn" type="button" data-yumi-speak>Ouvir</button>
          <button class="yumi-btn" type="button" data-yumi-next>Próximo</button>
        </div>
        <div class="yumi-ratings">
          <button class="yumi-btn is-learned" type="button" data-yumi-learned>Aprendido</button>
          <button class="yumi-btn is-difficult" type="button" data-yumi-difficult>Difícil</button>
          <button class="yumi-btn" type="button" data-yumi-shuffle>Embaralhar</button>
        </div>`;
      setStatus(`${card.category}: card ${state.index + 1} de ${state.cards.length}.`);
    }
    function move(step) { if (!state.cards.length) return; state.index = (state.index + step + state.cards.length) % state.cards.length; state.flipped = false; render(); }
    function mark(status) { const card = state.cards[state.index]; if (!card) return; state.progress[card.id] = status; saveProgress(); move(1); }
    root.addEventListener("click", (event) => {
      const deck = event.target.closest("[data-yumi-deck]"); if (deck) selectDeck(deck.dataset.yumiDeck);
      if (event.target.closest("[data-yumi-flip]")) { state.flipped = !state.flipped; root.querySelector(".yumi-flashcard")?.classList.toggle("is-flipped", state.flipped); }
      if (event.target.closest("[data-yumi-next]")) move(1);
      if (event.target.closest("[data-yumi-speak]")) { const card = state.cards[state.index]; if (card) speak(card.japanese, setStatus); }
      if (event.target.closest("[data-yumi-learned]")) mark("learned");
      if (event.target.closest("[data-yumi-difficult]")) mark("difficult");
      if (event.target.closest("[data-yumi-shuffle]")) { state.cards = shuffle(state.cards); state.index = 0; render(); }
    });
    fetch(root.dataset.yumiSrc, { cache: "no-cache" }).then((response) => { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); }).then((decks) => { state.decks = decks; selectDeck(state.deck); }).catch(() => { els.body.innerHTML = '<p class="yumi-status">Não foi possível carregar os baralhos agora.</p>'; setStatus("Baralhos indisponíveis."); });
  }

  roots.forEach((root) => {
    if (root.dataset.yumiApp === "kanji") createKanjiApp(root);
    if (root.dataset.yumiApp === "phrases") createPhraseApp(root);
  });
})();
