const LEVELS = ["N5", "N4", "N3", "N2", "N1"];
const LEVEL_LABELS = {
  N5: "Iniciante",
  N4: "Básico / Intermediário",
  N3: "Intermediário",
  N2: "Avançado",
  N1: "Domínio avançado"
};
const LEVEL_TITLES = {
  N5: "Diagnóstico iniciante",
  N4: "Diagnóstico básico",
  N3: "Diagnóstico intermediário",
  N2: "Diagnóstico avançado",
  N1: "Diagnóstico de domínio"
};
const QUESTIONS_PER_SESSION = 20;

function auditQuestionBank(questions) {
  const ids = new Set();
  LEVELS.forEach(function(level) {
    const count = questions.filter(function(q) { return q.level === level; }).length;
    if (count < QUESTIONS_PER_SESSION) {
      throw new Error(level + " precisa ter pelo menos " + QUESTIONS_PER_SESSION + " perguntas.");
    }
  });
  questions.forEach(function(q) {
    if (ids.has(q.id)) throw new Error("ID duplicado: " + q.id);
    ids.add(q.id);
    if (!LEVELS.includes(q.level)) throw new Error("Nível inválido: " + q.id);
    if (!Array.isArray(q.options) || q.options.length < 4) throw new Error("Alternativas insuficientes: " + q.id);
    if (new Set(q.options).size !== q.options.length) throw new Error("Alternativa duplicada: " + q.id);
    if (!q.options.includes(q.correctAnswer)) throw new Error("Resposta inválida: " + q.id);
    if (!q.question || !q.category || !q.explanationPtBr) throw new Error("Questão incompleta: " + q.id);
  });
}

const QUESTIONS = window.JLPT_QUESTIONS || [];
try {
  auditQuestionBank(QUESTIONS);
} catch (err) {
  console.error("[Quiz JLPT] Erro no banco de questões:", err.message);
}

const state = {
  level: null,
  questions: [],
  index: 0,
  score: 0,
  selected: false
};

function byId(id) {
  return document.getElementById(id);
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setScreen(screen) {
  byId("startScreen").hidden = screen !== "start";
  byId("quizPanel").hidden = screen !== "quiz";
  byId("resultPanel").hidden = screen !== "result";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz(level) {
  state.level = level;
  const pool = QUESTIONS.filter(function(q) { return q.level === level; });
  state.questions = shuffle(pool).slice(0, QUESTIONS_PER_SESSION);
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

  byId("questionMeta").textContent = state.level + " / Pergunta " + (state.index + 1);
  byId("questionTitle").textContent = LEVEL_TITLES[state.level];
  byId("questionCategory").textContent = q.category + " · " + state.level;
  byId("questionText").textContent = q.question;
  byId("progressText").textContent = "Pergunta " + (state.index + 1) + " de " + total;
  byId("scoreText").textContent = state.score + " acertos";
  byId("progressFill").style.width = Math.round((state.index / total) * 100) + "%";
  byId("feedback").hidden = true;

  const nextBtn = byId("nextQuestion");
  nextBtn.disabled = true;
  nextBtn.textContent = "Responder para continuar";

  const answers = byId("answers");
  answers.innerHTML = "";
  shuffle(q.options).forEach(function(option) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", function() { selectAnswer(btn, option, q); });
    answers.appendChild(btn);
  });
}

function selectAnswer(button, option, question) {
  if (state.selected) return;
  state.selected = true;

  const isCorrect = option === question.correctAnswer;
  if (isCorrect) state.score += 1;

  document.querySelectorAll(".answer-btn").forEach(function(btn) {
    btn.disabled = true;
    if (btn.textContent === question.correctAnswer) btn.classList.add("is-correct");
  });
  button.classList.add("is-selected");
  if (!isCorrect) button.classList.add("is-wrong");

  byId("scoreText").textContent = state.score + " acertos";
  byId("feedback").hidden = false;
  byId("feedbackTitle").textContent = isCorrect ? "Correto." : "Ainda não.";
  byId("feedbackCopy").textContent = question.explanationPtBr;

  const nextBtn = byId("nextQuestion");
  nextBtn.disabled = false;
  const isLast = state.index === state.questions.length - 1;
  nextBtn.textContent = isLast ? "Ver resultado" : "Próxima pergunta";
}

function getResult() {
  const pct = state.score / state.questions.length;
  const lvl = state.level;
  if (pct < 0.5) return [
    "Base " + lvl + " precisa de revisão",
    "Revise os fundamentos deste nível antes de avançar. Observe especialmente as categorias em que houve mais hesitação."
  ];
  if (pct < 0.75) return [
    lvl + " em construção",
    "Você já reconhece boa parte das estruturas, mas ainda precisa ganhar consistência e velocidade."
  ];
  if (pct < 0.9) return [
    "Bom desempenho em " + lvl,
    "Sua base está sólida. Continue treinando leitura, contexto e nuances para reduzir erros pontuais."
  ];
  return [
    "Pronto para um simulado maior de " + lvl,
    "Seu resultado indica domínio forte neste diagnóstico. O próximo passo é testar tempo, resistência e variedade em um simulado completo."
  ];
}

function showResult() {
  const [title, copy] = getResult();
  const percent = Math.round((state.score / state.questions.length) * 100);
  byId("resultLevel").textContent = "Resultado " + state.level;
  byId("resultTitle").textContent = title;
  byId("resultScore").textContent = percent + "%";
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

  toggle.addEventListener("click", function() {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function(e) {
    if (!nav.contains(e.target)) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initLeadForm() {
  const form = byId("leadForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = byId("leadName").value.trim();
    const email = byId("leadEmail").value.trim();
    const status = byId("leadStatus");
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Preencha nome e e-mail válido para salvar.";
      return;
    }
    localStorage.setItem("jrJlptLead", JSON.stringify({
      name, email,
      level: state.level,
      score: state.score,
      total: state.questions.length,
      createdAt: new Date().toISOString()
    }));
    status.textContent = "Interesse salvo neste navegador.";
    form.reset();
  });
}

function initQuiz() {
  initNav();
  initLeadForm();

  document.querySelectorAll("[data-start-level]").forEach(function(btn) {
    btn.addEventListener("click", function() { startQuiz(btn.dataset.startLevel); });
  });

  byId("nextQuestion").addEventListener("click", nextQuestion);
  byId("quitQuiz").addEventListener("click", function() { setScreen("start"); });
  byId("chooseAgain").addEventListener("click", function() { setScreen("start"); });
  byId("restartSame").addEventListener("click", function() { startQuiz(state.level || "N5"); });

  const params = new URLSearchParams(window.location.search);
  const level = (params.get("nivel") || params.get("level") || "").toUpperCase();
  if (LEVELS.includes(level)) startQuiz(level);
}

document.addEventListener("DOMContentLoaded", initQuiz);
