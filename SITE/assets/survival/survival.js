(function () {
  "use strict";

  const modules = window.SURVIVAL_MODULES || [];
  const state = {
    module: null,
    cardIndex: 0,
    quizIndex: 0,
    score: 0,
    answered: false
  };

  const screens = Array.from(document.querySelectorAll("[data-screen]"));
  const moduleGrid = document.querySelector("#moduleGrid");
  const introRoadmap = document.querySelector("#introRoadmap");
  const lessonCard = document.querySelector("#lessonCard");
  const quizOptions = document.querySelector("#quizOptions");
  const feedback = document.querySelector("#quizFeedback");
  const quizNext = document.querySelector("#quizNext");
  const audioStatus = document.querySelector("#audioStatus");
  const premiumPanel = document.querySelector("#premiumPanel");
  const appToast = document.querySelector("#appToast");
  let toastTimer;

  function showScreen(name) {
    screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== name;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function lockIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12v10H6z"/></svg>';
  }

  function renderModules() {
    moduleGrid.innerHTML = modules.map((item) => {
      const available = item.status === "available";
      return `
        <button class="module-card${available ? "" : " is-soon"}" type="button"
          data-module-id="${item.id}" ${available ? "" : "disabled"}>
          <span class="module-number">${item.order}</span>
          <span class="module-japanese">${item.japaneseTitle}</span>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
          <em>${available ? "Abrir módulo" : "Em breve"}</em>
        </button>
      `;
    }).join("");
  }

  function openModule(moduleId) {
    state.module = modules.find((item) => item.id === moduleId);
    if (!state.module || state.module.status !== "available") return;

    document.querySelector("#introEyebrow").textContent = `Módulo ${state.module.order} · ${state.module.level}`;
    document.querySelector("#introJapanese").textContent = state.module.japaneseTitle;
    document.querySelector("#introTitle").textContent = state.module.title;
    document.querySelector("#introCopy").textContent = state.module.introduction;
    document.querySelector("#introDuration").textContent = state.module.duration;
    renderRoadmap();
    showScreen("intro");
  }

  function renderRoadmap() {
    introRoadmap.innerHTML = state.module.cards.map((card, index) => `
      <li class="${card.free ? "" : "is-locked"}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${card.situation}</strong>
        ${card.free ? "<em>Grátis</em>" : `<i>${lockIcon()} Bloqueado</i>`}
      </li>
    `).join("");
  }

  function startLessons() {
    state.cardIndex = 0;
    renderLesson();
    showScreen("lesson");
  }

  function renderLesson() {
    const freeCards = state.module.cards.filter((card) => card.free);
    const card = freeCards[state.cardIndex];
    const progress = ((state.cardIndex + 1) / freeCards.length) * 100;

    document.querySelector("#lessonMeta").textContent = `${state.module.title} · Card ${state.cardIndex + 1} de ${freeCards.length}`;
    document.querySelector("#lessonProgress").style.width = `${progress}%`;
    document.querySelector("#lessonProgressBar").setAttribute("aria-valuenow", String(Math.round(progress)));
    document.querySelector("#lessonBack").disabled = state.cardIndex === 0;
    document.querySelector("#lessonNext").textContent = state.cardIndex === freeCards.length - 1 ? "Iniciar quiz" : "Próximo";

    lessonCard.innerHTML = `
      <p class="lesson-situation">${card.situation}</p>
      <p class="lesson-japanese" lang="ja">${card.japanese}</p>
      <p class="lesson-portuguese">${card.portuguese}</p>
      <div class="lesson-note"><span>Como usar</span><p>${card.note}</p></div>
      <button class="audio-button" id="audioButton" type="button" aria-describedby="audioStatus">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h4l5 4V6l-5 4zm12-1a5 5 0 0 1 0 6m2-8a8 8 0 0 1 0 10"/></svg>
        Ouvir pronúncia
      </button>
    `;

    document.querySelector("#audioButton").addEventListener("click", announceAudio);
  }

  function announceAudio(event) {
    const button = event.currentTarget;
    button.classList.add("is-playing");
    audioStatus.textContent = "Áudio demonstrativo. A pronúncia será adicionada em uma próxima versão.";
    showToast("Pronúncia disponível em breve.");
    window.setTimeout(() => button.classList.remove("is-playing"), 700);
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    appToast.textContent = message;
    appToast.hidden = false;
    appToast.classList.remove("is-visible");
    window.requestAnimationFrame(() => appToast.classList.add("is-visible"));
    toastTimer = window.setTimeout(() => {
      appToast.classList.remove("is-visible");
      window.setTimeout(() => {
        appToast.hidden = true;
      }, 180);
    }, 2600);
  }

  function hideToast() {
    window.clearTimeout(toastTimer);
    appToast.classList.remove("is-visible");
    appToast.hidden = true;
  }

  function openPremiumPanel() {
    hideToast();
    premiumPanel.hidden = false;
    document.querySelector("#notifyPremium").focus();
  }

  function closePremiumPanel() {
    premiumPanel.hidden = true;
    document.querySelector("#openPremiumPanel").focus();
  }

  function notifyPremium() {
    closePremiumPanel();
    showToast("Avisos da versão Premium estarão disponíveis em breve.");
  }

  function moveLesson(direction) {
    const freeCards = state.module.cards.filter((card) => card.free);
    if (direction < 0 && state.cardIndex > 0) {
      state.cardIndex -= 1;
      renderLesson();
      return;
    }
    if (direction > 0 && state.cardIndex < freeCards.length - 1) {
      state.cardIndex += 1;
      renderLesson();
      return;
    }
    if (direction > 0) startQuiz();
  }

  function startQuiz() {
    state.quizIndex = 0;
    state.score = 0;
    state.answered = false;
    renderQuiz();
    showScreen("quiz");
  }

  function renderQuiz() {
    const item = state.module.quiz[state.quizIndex];
    const progress = ((state.quizIndex + 1) / state.module.quiz.length) * 100;
    state.answered = false;
    feedback.hidden = true;
    feedback.className = "quiz-feedback";
    quizNext.disabled = true;
    quizNext.textContent = state.quizIndex === state.module.quiz.length - 1 ? "Ver resultado" : "Próxima pergunta";

    document.querySelector("#quizMeta").textContent = `Pergunta ${state.quizIndex + 1} de ${state.module.quiz.length}`;
    document.querySelector("#quizProgress").style.width = `${progress}%`;
    document.querySelector("#quizProgressBar").setAttribute("aria-valuenow", String(Math.round(progress)));
    document.querySelector("#quizQuestion").textContent = item.question;
    quizOptions.innerHTML = item.options.map((option) => `
      <button type="button" data-answer="${escapeAttribute(option)}">${option}</button>
    `).join("");
  }

  function escapeAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function answerQuiz(answer, button) {
    if (state.answered) return;
    state.answered = true;
    const item = state.module.quiz[state.quizIndex];
    const correct = answer === item.correctAnswer;
    if (correct) state.score += 1;

    Array.from(quizOptions.children).forEach((optionButton) => {
      optionButton.disabled = true;
      if (optionButton.dataset.answer === item.correctAnswer) optionButton.classList.add("is-correct");
    });
    if (!correct) button.classList.add("is-wrong");

    feedback.hidden = false;
    feedback.classList.add(correct ? "is-correct" : "is-wrong");
    feedback.innerHTML = `<strong>${correct ? "Resposta certa." : "Quase."}</strong><p>${item.explanation}</p>`;
    quizNext.disabled = false;
  }

  function nextQuiz() {
    if (!state.answered) return;
    if (state.quizIndex < state.module.quiz.length - 1) {
      state.quizIndex += 1;
      renderQuiz();
      return;
    }
    renderUnlock();
    showScreen("unlock");
  }

  function renderUnlock() {
    const lockedCards = state.module.cards.filter((card) => !card.free);
    document.querySelector("#resultScore").textContent = `${state.score}/${state.module.quiz.length}`;
    document.querySelector("#lockedList").innerHTML = lockedCards.map((card) => `
      <li>${lockIcon()}<span><strong>${card.situation}</strong><small>Conteúdo premium</small></span></li>
    `).join("");
  }

  moduleGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-module-id]");
    if (card) openModule(card.dataset.moduleId);
  });
  quizOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-answer]");
    if (option) answerQuiz(option.dataset.answer, option);
  });

  document.querySelectorAll("[data-show-screen]").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.showScreen));
  });
  document.querySelector("#startModule").addEventListener("click", startLessons);
  document.querySelector("#lessonBack").addEventListener("click", () => moveLesson(-1));
  document.querySelector("#lessonNext").addEventListener("click", () => moveLesson(1));
  document.querySelector("#quizNext").addEventListener("click", nextQuiz);
  document.querySelector("#repeatModule").addEventListener("click", startLessons);
  document.querySelector("#openPremiumPanel").addEventListener("click", openPremiumPanel);
  document.querySelector("#closePremiumPanel").addEventListener("click", closePremiumPanel);
  document.querySelector("#closePremiumBackdrop").addEventListener("click", closePremiumPanel);
  document.querySelector("#notifyPremium").addEventListener("click", notifyPremium);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !premiumPanel.hidden) closePremiumPanel();
  });

  renderModules();
  showScreen("modules");
})();
