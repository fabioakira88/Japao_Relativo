(function () {
  "use strict";

  const courses = window.JR_COURSES || [];
  const state = {
    course: null,
    cardIndex: 0,
    quizIndex: 0,
    score: 0,
    answered: false
  };

  const screens = Array.from(document.querySelectorAll("[data-screen]"));
  const courseGrid = document.querySelector("#courseGrid");
  const roadmap = document.querySelector("#courseRoadmap");
  const lessonCard = document.querySelector("#lessonCard");
  const quizOptions = document.querySelector("#quizOptions");
  const quizFeedback = document.querySelector("#quizFeedback");
  const quizNext = document.querySelector("#quizNext");
  const toast = document.querySelector("#courseToast");
  let toastTimer;

  function showScreen(name) {
    screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== name;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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

  function renderCourses() {
    if (!courseGrid) return;
    courseGrid.innerHTML = courses.map((course) => `
      <a class="course-card" href="${escapeHtml(course.slug)}/" data-course-id="${escapeHtml(course.id)}">
        <strong>${escapeHtml(course.title)}</strong>
        <span>${escapeHtml(course.description)}</span>
        <em>Abrir curso</em>
      </a>
    `).join("");
  }

  function initCoursePage() {
    const courseId = (document.querySelector(".course-app") || {}).dataset.courseId;
    state.course = courses.find((course) => course.id === courseId);
    if (!state.course) return;
    document.querySelector("#courseEyebrow").textContent = state.course.eyebrow;
    document.querySelector("#courseTitle").textContent = state.course.title;
    document.querySelector("#courseIntro").textContent = state.course.introduction;
    document.querySelector("#courseDuration").textContent = state.course.duration;
    roadmap.innerHTML = [
      ...state.course.freeCards.map((card) => ({ title: card.title, free: true })),
      ...state.course.premiumTeasers.map((card) => ({ title: card.title, free: false }))
    ].map((item, index) => `
      <li class="${item.free ? "" : "is-locked"}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(item.title)}</strong>
        ${item.free ? "<em>Grátis</em>" : "<i>Bloqueado</i>"}
      </li>
    `).join("");
  }

  function startLessons() {
    state.cardIndex = 0;
    renderLesson();
    showScreen("lesson");
  }

  function renderLesson() {
    const card = state.course.freeCards[state.cardIndex];
    const progress = ((state.cardIndex + 1) / state.course.freeCards.length) * 100;
    document.querySelector("#lessonMeta").textContent = `Card ${state.cardIndex + 1} de ${state.course.freeCards.length}`;
    document.querySelector("#lessonProgress").style.width = `${progress}%`;
    document.querySelector("#lessonProgressBar").setAttribute("aria-valuenow", String(Math.round(progress)));
    document.querySelector("#lessonBack").disabled = state.cardIndex === 0;
    document.querySelector("#lessonNext").textContent = state.cardIndex === state.course.freeCards.length - 1 ? "Iniciar quiz" : "Próximo";
    lessonCard.innerHTML = `
      <div class="card-mark"><span>Aula gratuita</span><strong>${String(state.cardIndex + 1).padStart(2, "0")}</strong></div>
      <p class="lesson-title">${escapeHtml(card.title)}</p>
      <p class="lesson-subtitle">${escapeHtml(card.subtitle)}</p>
      <p class="lesson-body">${escapeHtml(card.content)}</p>
      <p class="lesson-takeaway"><span>Essencial</span>${escapeHtml(card.takeaway)}</p>
    `;
  }

  function moveLesson(direction) {
    if (direction < 0 && state.cardIndex > 0) {
      state.cardIndex -= 1;
      renderLesson();
      return;
    }
    if (direction > 0 && state.cardIndex < state.course.freeCards.length - 1) {
      state.cardIndex += 1;
      renderLesson();
      return;
    }
    if (direction > 0) startQuiz();
  }

  function startQuiz() {
    state.quizIndex = 0;
    state.score = 0;
    renderQuiz();
    showScreen("quiz");
  }

  function renderQuiz() {
    const item = state.course.quiz[state.quizIndex];
    const progress = ((state.quizIndex + 1) / state.course.quiz.length) * 100;
    state.answered = false;
    quizFeedback.hidden = true;
    quizFeedback.className = "quiz-feedback";
    quizNext.disabled = true;
    quizNext.textContent = state.quizIndex === state.course.quiz.length - 1 ? "Ver resultado" : "Próxima pergunta";
    document.querySelector("#quizMeta").textContent = `Pergunta ${state.quizIndex + 1} de ${state.course.quiz.length}`;
    document.querySelector("#quizProgress").style.width = `${progress}%`;
    document.querySelector("#quizProgressBar").setAttribute("aria-valuenow", String(Math.round(progress)));
    document.querySelector("#quizQuestion").textContent = item.question;
    quizOptions.innerHTML = item.options.map((option) => `
      <button type="button" data-answer="${escapeHtml(option.id)}">${escapeHtml(option.text)}</button>
    `).join("");
  }

  function answerQuiz(answer, button) {
    if (state.answered) return;
    state.answered = true;
    const item = state.course.quiz[state.quizIndex];
    const correct = answer === item.correctAnswer;
    if (correct) state.score += 1;
    Array.from(quizOptions.children).forEach((optionButton) => {
      optionButton.disabled = true;
      if (optionButton.dataset.answer === item.correctAnswer) optionButton.classList.add("is-correct");
    });
    if (!correct) button.classList.add("is-wrong");
    quizFeedback.hidden = false;
    quizFeedback.classList.add(correct ? "is-correct" : "is-wrong");
    quizFeedback.innerHTML = `<strong>${correct ? "Resposta certa." : "Quase."}</strong><p>${escapeHtml(item.explanation)}</p>`;
    quizNext.disabled = false;
  }

  function nextQuiz() {
    if (!state.answered) return;
    if (state.quizIndex < state.course.quiz.length - 1) {
      state.quizIndex += 1;
      renderQuiz();
      return;
    }
    renderUnlock();
    showScreen("unlock");
  }

  function renderUnlock() {
    document.querySelector("#resultScore").textContent = `${state.score}/${state.course.quiz.length}`;
    document.querySelector("#lockedList").innerHTML = state.course.premiumTeasers.map((item) => `<li>${escapeHtml(item.title)}</li>`).join("");
  }

  if (courseGrid) renderCourses();
  if (roadmap) {
    initCoursePage();
    document.querySelector("#startCourse").addEventListener("click", startLessons);
    document.querySelector("#lessonBack").addEventListener("click", () => moveLesson(-1));
    document.querySelector("#lessonNext").addEventListener("click", () => moveLesson(1));
    document.querySelector("#quizNext").addEventListener("click", nextQuiz);
    document.querySelector("#repeatCourse").addEventListener("click", startLessons);
    document.querySelector("#temporaryCta").addEventListener("click", () => showToast("Curso completo em preparação."));
    quizOptions.addEventListener("click", (event) => {
      const option = event.target.closest("[data-answer]");
      if (option) answerQuiz(option.dataset.answer, option);
    });
    document.querySelectorAll("[data-show-screen]").forEach((button) => {
      button.addEventListener("click", () => showScreen(button.dataset.showScreen));
    });
  }
})();
