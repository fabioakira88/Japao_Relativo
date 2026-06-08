const LEVELS = ["N5", "N4", "N3", "N2", "N1"];
const LEVEL_TITLES = {
  N5:"Diagnóstico iniciante",
  N4:"Diagnóstico básico",
  N3:"Diagnóstico intermediário",
  N2:"Diagnóstico avançado",
  N1:"Diagnóstico de domínio"
};

function auditQuestionBank(questions) {
  const ids = new Set();
  LEVELS.forEach((level) => {
    const count = questions.filter((question) => question.level === level).length;
    if (count < 20) throw new Error(`${level} precisa ter pelo menos 20 perguntas.`);
  });
  questions.forEach((question) => {
    if (ids.has(question.id)) throw new Error(`ID duplicado: ${question.id}`);
    ids.add(question.id);
    if (!LEVELS.includes(question.level)) throw new Error(`Nível inválido: ${question.id}`);
    if (!Array.isArray(question.options) || question.options.length < 4) throw new Error(`Alternativas insuficientes: ${question.id}`);
    if (new Set(question.options).size !== question.options.length) throw new Error(`Alternativa duplicada: ${question.id}`);
    if (!question.options.includes(question.correctAnswer)) throw new Error(`Resposta inválida: ${question.id}`);
    if (!question.question || !question.category || !question.explanationPtBr) throw new Error(`Questão incompleta: ${question.id}`);
  });
}

const QUESTIONS = window.JLPT_QUESTIONS || [];
auditQuestionBank(QUESTIONS);

const state = {
  level:null,
  questions:[],
  index:0,
  score:0,
  selected:false
};

const $ = (selector) => document.querySelector(selector);

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function byId(id) {
  return document.getElementById(id);
}

function setScreen(screen) {
  byId("startScreen").hidden = screen !== "start";
  byId("quizPanel").hidden = screen !== "quiz";
  byId("resultPanel").hidden = screen !== "result";
  window.scrollTo({top:0, behavior:"smooth"});
}

function startQuiz(level) {
  state.level = level;
  state.questions = shuffle(QUESTIONS.filter((q) => q.level === level));
  state.index = 0;
  state.score = 0;
  state.selected = false;
  setScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.index];
  const total = state.questions.length;
  state.selected = false;

  byId("questionMeta").textContent = `${state.level} / Pergunta ${state.index + 1}`;
  byId("questionTitle").textContent = LEVEL_TITLES[state.level];
  byId("questionCategory").textContent = `${q.category} · ${q.level}`;
  byId("questionText").textContent = q.question;
  byId("progressText").textContent = `Pergunta ${state.index + 1} de ${total}`;
  byId("scoreText").textContent = `${state.score} acertos`;
  byId("progressFill").style.width = `${Math.round((state.index / total) * 100)}%`;
  byId("feedback").hidden = true;
  byId("nextQuestion").disabled = true;
  byId("nextQuestion").textContent = "Responder para continuar";

  const answers = byId("answers");
  answers.innerHTML = "";
  shuffle(q.options).forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option, q));
    answers.appendChild(btn);
  });
}

function selectAnswer(button, option, question) {
  if (state.selected) return;
  state.selected = true;
  const isCorrect = option === question.correctAnswer;
  if (isCorrect) state.score += 1;

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.disabled = true;
    btn.classList.toggle("is-correct", btn.textContent === question.correctAnswer);
  });
  button.classList.add("is-selected");
  if (!isCorrect) button.classList.add("is-wrong");

  byId("scoreText").textContent = `${state.score} acertos`;
  byId("feedback").hidden = false;
  byId("feedbackTitle").textContent = isCorrect ? "Correto." : "Ainda não.";
  byId("feedbackCopy").textContent = question.explanationPtBr;
  byId("nextQuestion").disabled = false;
  byId("nextQuestion").textContent = state.index === state.questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
}

function getResult() {
  const percent = state.score / state.questions.length;
  if (percent < .5) return [`Base ${state.level} precisa de revisão`, "Revise os fundamentos deste nível antes de avançar. Observe especialmente as categorias em que houve mais hesitação."];
  if (percent < .75) return [`${state.level} em construção`, "Você já reconhece boa parte das estruturas, mas ainda precisa ganhar consistência e velocidade."];
  if (percent < .9) return [`Bom desempenho em ${state.level}`, "Sua base está sólida. Continue treinando leitura, contexto e nuances para reduzir erros pontuais."];
  return [`Pronto para um simulado maior de ${state.level}`, "Seu resultado indica domínio forte neste diagnóstico. O próximo passo é testar tempo, resistência e variedade em um simulado completo."];
}

function showResult() {
  const [title, copy] = getResult();
  const percent = Math.round((state.score / state.questions.length) * 100);
  byId("resultLevel").textContent = `Resultado ${state.level}`;
  byId("resultTitle").textContent = title;
  byId("resultScore").textContent = `${percent}%`;
  byId("resultCopy").textContent = copy;
  byId("resultCorrect").textContent = state.score;
  byId("resultTotal").textContent = state.questions.length;
  setScreen("result");
}

function nextQuestion() {
  if (!state.selected) return;
  if (state.index >= state.questions.length - 1) {
    showResult();
    return;
  }
  state.index += 1;
  renderQuestion();
}

function initNav() {
  const nav = byId("quizNav");
  const toggle = byId("quizNavToggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initLeadForm() {
  const form = byId("leadForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = byId("leadName").value.trim();
    const email = byId("leadEmail").value.trim();
    const status = byId("leadStatus");
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Preencha nome e e-mail válido para salvar o interesse.";
      return;
    }
    localStorage.setItem("jrJlptLead", JSON.stringify({
      name,
      email,
      level:state.level,
      score:state.score,
      total:state.questions.length,
      createdAt:new Date().toISOString()
    }));
    status.textContent = "Interesse salvo neste navegador. Próximo passo: conectar com a newsletter.";
    form.reset();
  });
}

function initQuiz() {
  initNav();
  initLeadForm();
  document.querySelectorAll("[data-start-level]").forEach((button) => {
    button.addEventListener("click", () => startQuiz(button.dataset.startLevel));
  });
  byId("nextQuestion").addEventListener("click", nextQuestion);
  byId("quitQuiz").addEventListener("click", () => setScreen("start"));
  byId("chooseAgain").addEventListener("click", () => setScreen("start"));
  byId("restartSame").addEventListener("click", () => startQuiz(state.level || "N5"));

  const params = new URLSearchParams(window.location.search);
  const level = (params.get("nivel") || params.get("level") || "").toUpperCase();
  if (LEVELS.includes(level)) startQuiz(level);
}

document.addEventListener("DOMContentLoaded", initQuiz);
