const PARTICLES = ["は", "が", "を", "に", "で", "と"];
const PARTICLE_LABELS = {
  "は": "Partícula de tópico", "が": "Partícula de sujeito", "を": "Partícula de objeto",
  "に": "Partícula de destino e tempo", "で": "Partícula de ação e meio", "と": "Partícula de companhia e citação"
};
const QUESTIONS_PER_MODULE = 20;
const QUESTIONS = window.PARTICLE_QUESTIONS || [];

function auditParticleBank(questions) {
  const ids = new Set();
  if (questions.length !== 120) throw new Error("O banco deve conter exatamente 120 perguntas.");
  PARTICLES.forEach(function(particle) {
    const count = questions.filter(function(q) { return q.particle === particle; }).length;
    if (count !== QUESTIONS_PER_MODULE) throw new Error(particle + " deve conter exatamente 20 perguntas.");
  });
  questions.forEach(function(q) {
    if (ids.has(q.id)) throw new Error("ID duplicado: " + q.id);
    ids.add(q.id);
    if (!PARTICLES.includes(q.particle)) throw new Error("Partícula inválida: " + q.id);
    if (!["N5", "N4"].includes(q.level)) throw new Error("Nível inválido: " + q.id);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error("Alternativas inválidas: " + q.id);
    if (new Set(q.options).size !== 4) throw new Error("Alternativa duplicada: " + q.id);
    if (!q.options.includes(q.correctAnswer)) throw new Error("Resposta ausente: " + q.id);
    if (!q.question || !q.translation || !q.explanationPtBr) throw new Error("Questão incompleta: " + q.id);
  });
}

try { auditParticleBank(QUESTIONS); }
catch (err) { console.error("[Quiz de Partículas] Erro no banco:", err.message); }

const state = { particle: null, questions: [], index: 0, score: 0, selected: false };
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
function startQuiz(particle) {
  state.particle = particle;
  state.questions = shuffle(QUESTIONS.filter(function(q) { return q.particle === particle; }));
  state.index = 0; state.score = 0; state.selected = false;
  setScreen("quiz"); renderQuestion();
}
function renderQuestion() {
  const q = state.questions[state.index];
  state.selected = false;
  byId("questionMeta").textContent = "Partícula " + state.particle + " · " + q.level;
  byId("questionTitle").textContent = PARTICLE_LABELS[state.particle];
  byId("questionCategory").textContent = q.category + " · escolha a partícula correta";
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
  const result = pct < .5
    ? ["Revise a base da partícula " + state.particle, "Retome a função central da partícula e observe o verbo de cada frase antes de responder."]
    : pct < .75
      ? ["Partícula " + state.particle + " em construção", "Você reconhece o uso principal, mas ainda precisa ganhar consistência nos diferentes contextos."]
      : pct < .9
        ? ["Bom domínio da partícula " + state.particle, "Sua base está sólida. Reveja os poucos contextos que ainda causaram dúvida."]
        : ["Excelente domínio da partícula " + state.particle, "Você reconhece com segurança os usos essenciais deste módulo."];
  byId("resultLevel").textContent = "Resultado · " + state.particle;
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
  document.querySelectorAll("[data-start-particle]").forEach(function(btn) {
    btn.addEventListener("click", function() { startQuiz(btn.dataset.startParticle); });
  });
  byId("nextQuestion").addEventListener("click", nextQuestion);
  byId("quitQuiz").addEventListener("click", function() { setScreen("start"); });
  byId("chooseAgain").addEventListener("click", function() { setScreen("start"); });
  byId("restartSame").addEventListener("click", function() { startQuiz(state.particle || "は"); });
  const particle = new URLSearchParams(window.location.search).get("particula");
  if (PARTICLES.includes(particle)) startQuiz(particle);
}
document.addEventListener("DOMContentLoaded", initParticleQuiz);
