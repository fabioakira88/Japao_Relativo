const QUESTIONS = [
  {level:"N5", category:"Hiragana", prompt:"Qual leitura em hiragana corresponde a 日本?", options:["にほん","にちほん","ひもと","にっぽ"], correct:"にほん", explanation:"日本 normalmente é lido como にほん no nível básico do JLPT."},
  {level:"N5", category:"Katakana", prompt:"Como se escreve 'koohii' em katakana?", options:["コーヒー","カーヒー","コヒー","クーヒー"], correct:"コーヒー", explanation:"Palavras estrangeiras como coffee usam katakana: コーヒー."},
  {level:"N5", category:"Vocabulário", prompt:"Qual palavra significa 'água'?", options:["みず","やま","そら","あめ"], correct:"みず", explanation:"みず significa água. あめ pode significar chuva ou doce, dependendo do kanji/contexto."},
  {level:"N5", category:"Vocabulário", prompt:"Qual palavra significa 'estação'?", options:["えき","みせ","へや","いえ"], correct:"えき", explanation:"えき significa estação. É uma palavra essencial para vida no Japão."},
  {level:"N5", category:"Partícula", prompt:"Complete: わたし___ブラジル人です。", options:["は","を","で","に"], correct:"は", explanation:"は marca o tópico: 'quanto a mim, sou brasileiro(a)'."},
  {level:"N5", category:"Partícula", prompt:"Complete: コーヒー___飲みます。", options:["を","へ","で","は"], correct:"を", explanation:"を marca o objeto direto do verbo: beber café."},
  {level:"N5", category:"Partícula", prompt:"Complete: 学校___行きます。", options:["へ","を","が","と"], correct:"へ", explanation:"へ indica direção/destino com verbos de movimento."},
  {level:"N5", category:"Gramática", prompt:"Qual é a forma negativa educada de 食べます?", options:["食べません","食べました","食べないで","食べますん"], correct:"食べません", explanation:"Na forma educada, a negativa de ます é ません."},
  {level:"N5", category:"Verbo", prompt:"Qual é o passado educado de 行きます?", options:["行きました","行きません","行って","行きたい"], correct:"行きました", explanation:"ます vira ました para formar passado educado."},
  {level:"N5", category:"Expressão", prompt:"O que significa いくらですか?", options:["Quanto custa?","Onde fica?","Que horas são?","Você entende?"], correct:"Quanto custa?", explanation:"いくらですか é usado para perguntar preço."},
  {level:"N5", category:"Expressão", prompt:"Qual frase significa 'não entendo japonês'?", options:["日本語がわかりません","日本語を食べません","日本語へ行きません","日本語でありません"], correct:"日本語がわかりません", explanation:"わかりません significa 'não entendo'. 日本語が marca aquilo que não é entendido."},
  {level:"N5", category:"Kanji", prompt:"Qual kanji significa 'pessoa'?", options:["人","日","月","火"], correct:"人", explanation:"人 significa pessoa. 日 é dia/sol, 月 é lua/mês, 火 é fogo."},
  {level:"N5", category:"Kanji", prompt:"Qual kanji significa 'montanha'?", options:["山","川","田","本"], correct:"山", explanation:"山 significa montanha. É um dos kanji básicos do N5."},
  {level:"N5", category:"Tempo", prompt:"Qual expressão significa 'amanhã'?", options:["あした","きのう","いま","まいにち"], correct:"あした", explanation:"あした significa amanhã. きのう é ontem."},
  {level:"N5", category:"Adjetivo", prompt:"Qual frase significa 'está frio'?", options:["さむいです","あついです","たかいです","やすいです"], correct:"さむいです", explanation:"さむい significa frio para clima/temperatura."},
  {level:"N5", category:"Leitura curta", prompt:"Texto: きょうは雨です。バスで会社へ行きます。 Como a pessoa vai ao trabalho?", options:["De ônibus","De trem","A pé","De bicicleta"], correct:"De ônibus", explanation:"バスで significa 'de ônibus'. 会社へ行きます significa ir à empresa."},
  {level:"N5", category:"Número", prompt:"Qual opção significa 'quatro pessoas'?", options:["よにん","よっつ","しじん","よんひと"], correct:"よにん", explanation:"Para contar pessoas, usa-se にん. Quatro pessoas é よにん."},
  {level:"N5", category:"Pergunta", prompt:"Complete: これは何___か。", options:["です","を","へ","が"], correct:"です", explanation:"何ですか forma a pergunta 'o que é?'. Aqui これは何ですか."},
  {level:"N5", category:"Localização", prompt:"Complete: ねこはつくえの下___います。", options:["に","を","で","へ"], correct:"に", explanation:"に indica localização de existência com います/あります."},
  {level:"N5", category:"Compreensão", prompt:"Qual frase indica permissão simples?", options:["いいです","だめです","わかりません","ありません"], correct:"いいです", explanation:"いいです pode indicar 'tudo bem/pode', dependendo do contexto."},

  {level:"N4", category:"Forma て", prompt:"Qual é a forma て de 書きます?", options:["書いて","書って","書きて","書いてる"], correct:"書いて", explanation:"Verbos terminados em き geralmente viram いて na forma て. Exceção famosa: 行って."},
  {level:"N4", category:"Forma て", prompt:"Complete: ちょっと待って___ください。", options:["いて","みて","して","から"], correct:"いて", explanation:"待っていてください significa 'por favor, fique esperando'."},
  {level:"N4", category:"Forma ない", prompt:"Qual é a forma ない de 食べます?", options:["食べない","食べた","食べて","食べたい"], correct:"食べない", explanation:"食べる é ichidan; troca る por ない: 食べない."},
  {level:"N4", category:"Forma た", prompt:"Qual é a forma た de 飲みます?", options:["飲んだ","飲みた","飲った","飲いて"], correct:"飲んだ", explanation:"飲む vira 飲んで na forma て e 飲んだ na forma た."},
  {level:"N4", category:"Desejo", prompt:"Qual frase expressa desejo?", options:["日本へ行きたいです","日本へ行きました","日本へ行きません","日本へ行ってください"], correct:"日本へ行きたいです", explanation:"たい é usado para falar de desejo: quero ir ao Japão."},
  {level:"N4", category:"Partícula", prompt:"Complete: 日本語___話すことができます。", options:["を","に","で","へ"], correct:"を", explanation:"日本語を話す significa falar japonês. ことができます indica capacidade."},
  {level:"N4", category:"Partícula", prompt:"Complete: 駅___友だち___会いました。", options:["で / に","に / を","を / が","へ / で"], correct:"で / に", explanation:"で marca o local da ação; に marca a pessoa encontrada em 会う."},
  {level:"N4", category:"Gramática", prompt:"Qual opção significa 'já comi'?", options:["もう食べました","まだ食べません","いつ食べますか","食べてもいいです"], correct:"もう食べました", explanation:"もう + passado indica que algo já aconteceu."},
  {level:"N4", category:"Gramática", prompt:"Qual opção significa 'ainda não terminei'?", options:["まだ終わっていません","もう終わりました","終わってください","終わりたいです"], correct:"まだ終わっていません", explanation:"まだ + ていません indica que algo ainda não aconteceu/terminou."},
  {level:"N4", category:"Kanji", prompt:"Qual leitura comum de 会社 é correta?", options:["かいしゃ","がっこう","でんしゃ","しゃいん"], correct:"かいしゃ", explanation:"会社 significa empresa e lê-se かいしゃ."},
  {level:"N4", category:"Kanji", prompt:"Qual kanji aparece em 'eletricidade/trem elétrico'?", options:["電","車","食","休"], correct:"電", explanation:"電 aparece em 電気 e 電車, ligado a eletricidade."},
  {level:"N4", category:"Kanji", prompt:"Qual opção significa 'semana que vem'?", options:["来週","今週","先週","毎週"], correct:"来週", explanation:"来週 é próxima semana. 先週 é semana passada."},
  {level:"N4", category:"Leitura curta", prompt:"Texto: 仕事が多かったので、昨日は家に帰ってすぐ寝ました. Por que a pessoa dormiu logo?", options:["Porque havia muito trabalho","Porque estava de férias","Porque perdeu o trem","Porque estudou japonês"], correct:"Porque havia muito trabalho", explanation:"仕事が多かったので indica motivo: porque havia muito trabalho."},
  {level:"N4", category:"Leitura curta", prompt:"Texto: この店は安いですが、駅から遠いです. O que o texto diz sobre a loja?", options:["É barata, mas longe da estação","É cara e perto da estação","É nova e grande","Está fechada hoje"], correct:"É barata, mas longe da estação", explanation:"安いですが indica contraste: é barata, mas 遠い, longe."},
  {level:"N4", category:"Condição", prompt:"Qual frase significa 'se chover, não vou'?", options:["雨が降ったら、行きません","雨が降って、行きます","雨が降るから、行きました","雨が降りたいです"], correct:"雨が降ったら、行きません", explanation:"たら cria condição: se chover, não vou."},
  {level:"N4", category:"Obrigação", prompt:"Qual opção expressa 'preciso estudar'?", options:["勉強しなければなりません","勉強してもいいです","勉強したいでした","勉強しないでください"], correct:"勉強しなければなりません", explanation:"なければなりません indica obrigação: ter que fazer algo."},
  {level:"N4", category:"Permissão", prompt:"Qual frase significa 'posso entrar?'", options:["入ってもいいですか","入らないでください","入ったことがあります","入らなければなりません"], correct:"入ってもいいですか", explanation:"て form + もいいですか pede permissão."},
  {level:"N4", category:"Experiência", prompt:"Qual frase significa 'já fui a Kyoto'?", options:["京都へ行ったことがあります","京都へ行きたいです","京都へ行かないでください","京都へ行くところです"], correct:"京都へ行ったことがあります", explanation:"たことがあります indica experiência passada."},
  {level:"N4", category:"Comparação", prompt:"Complete: 東京___大阪___大きいです。", options:["は / より","を / から","に / まで","で / と"], correct:"は / より", explanation:"A は B より ... significa 'A é mais ... que B'."},
  {level:"N4", category:"Compreensão", prompt:"Na frase 早く起きるために、アラームをかけます, qual é o objetivo?", options:["Acordar cedo","Comprar um alarme","Dormir tarde","Chegar atrasado"], correct:"Acordar cedo", explanation:"ために indica finalidade: para acordar cedo, coloco alarme."}
];

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
  byId("questionTitle").textContent = state.level === "N5" ? "Diagnóstico iniciante" : "Diagnóstico básico/intermediário";
  byId("questionCategory").textContent = `${q.category} · ${q.level}`;
  byId("questionText").textContent = q.prompt;
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
  const isCorrect = option === question.correct;
  if (isCorrect) state.score += 1;

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.disabled = true;
    btn.classList.toggle("is-correct", btn.textContent === question.correct);
  });
  button.classList.add("is-selected");
  if (!isCorrect) button.classList.add("is-wrong");

  byId("scoreText").textContent = `${state.score} acertos`;
  byId("feedback").hidden = false;
  byId("feedbackTitle").textContent = isCorrect ? "Correto." : "Ainda não.";
  byId("feedbackCopy").textContent = question.explanation;
  byId("nextQuestion").disabled = false;
  byId("nextQuestion").textContent = state.index === state.questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
}

function getResult() {
  const percent = state.score / state.questions.length;
  if (state.level === "N5") {
    if (percent < .45) return ["Base N5 ainda frágil", "Você ainda precisa reforçar hiragana/katakana, vocabulário essencial, partículas e frases simples antes de pensar em prova."];
    if (percent < .7) return ["Quase N5", "Você já reconhece estruturas importantes, mas ainda precisa ganhar consistência em leitura e gramática básica."];
    return ["N5 provável", "Seu resultado indica boa chance de acompanhar ou revisar N5. O próximo passo é treinar tempo de prova e leitura curta."];
  }
  if (percent < .45) return ["Transição N5 → N4", "Você está entrando no território do N4, mas ainda precisa consolidar forma て, ない, た, partículas com contexto e leitura."];
  if (percent < .72) return ["N4 em construção", "Você já tem base para N4, mas precisa aumentar repertório de kanji, gramática funcional e interpretação de frases."];
  return ["N4 provável", "Seu desempenho sugere boa chance de acompanhar N4. Vale partir para simulados mais longos e leitura com tempo controlado."];
}

function showResult() {
  const [title, copy] = getResult();
  byId("resultLevel").textContent = `Resultado ${state.level}`;
  byId("resultTitle").textContent = title;
  byId("resultScore").textContent = `${state.score}/${state.questions.length}`;
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
  if (level === "N5" || level === "N4") startQuiz(level);
}

document.addEventListener("DOMContentLoaded", initQuiz);
