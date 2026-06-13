const MODULES = ["n5", "wa-ga", "ni-de", "wo-ni", "to-ya-mo", "kara-made-yori"];
const MODULE_LABELS = {
  "n5": "Partículas N5",
  "wa-ga": "は vs が",
  "ni-de": "に vs で",
  "wo-ni": "を vs に",
  "to-ya-mo": "と・や・も",
  "kara-made-yori": "から・まで・より"
};
const QUESTIONS_PER_MODULE = 20;
const QUESTIONS = window.PARTICLE_QUESTIONS || [];
const HAN_PATTERN = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

function auditParticleBank(questions) {
  const ids = new Set();
  if (questions.length !== 120) throw new Error("O banco deve conter exatamente 120 perguntas.");
  MODULES.forEach(function(module) {
    const count = questions.filter(function(q) { return q.module === module; }).length;
    if (count !== QUESTIONS_PER_MODULE) throw new Error(module + " deve conter exatamente 20 perguntas.");
  });
  questions.forEach(function(q) {
    if (ids.has(q.id)) throw new Error("ID duplicado: " + q.id);
    ids.add(q.id);
    if (!MODULES.includes(q.module)) throw new Error("Módulo inválido: " + q.id);
    if (!["N5", "N4"].includes(q.level)) throw new Error("Nível inválido: " + q.id);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error("Alternativas inválidas: " + q.id);
    if (new Set(q.options).size !== 4) throw new Error("Alternativa duplicada: " + q.id);
    if (!q.options.includes(q.correctAnswer)) throw new Error("Resposta ausente: " + q.id);
    if (!q.question || !q.translation || !q.explanationPtBr) throw new Error("Questão incompleta: " + q.id);
    if (HAN_PATTERN.test(q.question) || q.options.some(function(option) { return HAN_PATTERN.test(option); }) || HAN_PATTERN.test(q.explanationPtBr)) {
      throw new Error("Kanji sem furigana: " + q.id);
    }
  });
}

try { auditParticleBank(QUESTIONS); }
catch (err) { console.error("[Quiz de Partículas] Erro no banco:", err.message); }

const state = { module: null, questions: [], index: 0, score: 0, selected: false };
function byId(id) { return document.getElementById(id); }
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
function startQuiz(module) {
  state.module = module;
  state.questions = shuffle(QUESTIONS.filter(function(q) { return q.module === module; }));
  state.index = 0; state.score = 0; state.selected = false;
  setScreen("quiz"); renderQuestion();
}
function renderQuestion() {
  const q = state.questions[state.index];
  state.selected = false;
  byId("questionMeta").textContent = "Módulo · " + q.level;
  byId("questionTitle").textContent = MODULE_LABELS[state.module];
  byId("questionCategory").textContent = q.category + " · escolha pelo contexto";
  byId("questionText").textContent = q.question;
  byId("questionTranslation").textContent = q.translation;
  byId("progressText").textContent = "Pergunta " + (state.index + 1) + " de " + state.questions.length;
  byId("scoreText").textContent = state.score + " acertos";
  byId("progressFill").style.width = Math.round((state.index / state.questions.length) * 100) + "%";
  byId("feedback").hidden = true;
  const next = byId("nextQuestion"); next.disabled = true; next.textContent = "Responder para continuar";
  const answers = byId("answers"); answers.innerHTML = "";
  shuffle(q.options).forEach(function(option) {
    const button = document.createElement("button");
    button.type = "button"; button.className = "answer-btn particle-answer"; button.textContent = option;
    button.addEventListener("click", function() { selectAnswer(button, option, q); });
    answers.appendChild(button);
  });
}
function selectAnswer(button, option, question) {
  if (state.selected) return;
  state.selected = true;
  const correct = option === question.correctAnswer;
  if (correct) state.score += 1;
  document.querySelectorAll(".answer-btn").forEach(function(btn) {
    btn.disabled = true;
    if (btn.textContent === question.correctAnswer) btn.classList.add("is-correct");
  });
  button.classList.add("is-selected");
  if (!correct) button.classList.add("is-wrong");
  byId("scoreText").textContent = state.score + " acertos";
  byId("feedback").hidden = false;
  byId("feedbackTitle").textContent = correct ? "Correto." : "Ainda não.";
  byId("feedbackCopy").textContent = question.explanationPtBr;
  const next = byId("nextQuestion"); next.disabled = false;
  next.textContent = state.index === state.questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
}
function showResult() {
  const pct = state.score / state.questions.length;
  const label = MODULE_LABELS[state.module];
  const result = pct < .5
    ? ["Revise o módulo " + label, "Observe a função exigida pelo verbo e pelo contexto antes de escolher a partícula."]
    : pct < .75
      ? [label + " em construção", "Você reconhece os usos principais, mas ainda precisa ganhar consistência nas diferenças de contexto."]
      : pct < .9
        ? ["Bom domínio de " + label, "Sua base está sólida. Reveja os poucos contextos que ainda causaram dúvida."]
        : ["Excelente domínio de " + label, "Você escolhe as partículas deste módulo com segurança contextual."];
  byId("resultLevel").textContent = "Resultado · " + label;
  byId("resultTitle").textContent = result[0]; byId("resultCopy").textContent = result[1];
  byId("resultScore").textContent = Math.round(pct * 100) + "%";
  byId("resultCorrect").textContent = state.score; byId("resultTotal").textContent = state.questions.length;
  setScreen("result");
}
function nextQuestion() {
  if (!state.selected) return;
  if (state.index === state.questions.length - 1) return showResult();
  state.index += 1; renderQuestion();
}
function initNav() {
  const nav = byId("quizNav"); const toggle = byId("quizNavToggle");
  toggle.addEventListener("click", function() {
    const open = nav.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function(link) { link.addEventListener("click", function() { nav.classList.remove("is-open"); }); });
}
function initParticleQuiz() {
  initNav();
  document.querySelectorAll("[data-start-module]").forEach(function(btn) {
    btn.addEventListener("click", function() { startQuiz(btn.dataset.startModule); });
  });
  byId("nextQuestion").addEventListener("click", nextQuestion);
  byId("quitQuiz").addEventListener("click", function() { setScreen("start"); });
  byId("chooseAgain").addEventListener("click", function() { setScreen("start"); });
  byId("restartSame").addEventListener("click", function() { startQuiz(state.module || "n5"); });
  const module = new URLSearchParams(window.location.search).get("modulo");
  if (MODULES.includes(module)) startQuiz(module);
}
document.addEventListener("DOMContentLoaded", initParticleQuiz);
