const PARTICLE_MODULES = {
  "は": [
    ["わたし___ブラジル人です。","Eu sou brasileiro.","apresentação","N5"],
    ["田中さん___先生です。","Tanaka é professor.","apresentação","N5"],
    ["今日___月曜日です。","Hoje é segunda-feira.","tópico temporal","N5"],
    ["この本___おもしろいです。","Este livro é interessante.","descrição","N5"],
    ["東京___大きい町です。","Tóquio é uma cidade grande.","descrição","N5"],
    ["日本語___少しわかります。","Quanto ao japonês, entendo um pouco.","tópico e habilidade","N5"],
    ["朝ごはん___パンを食べます。","Quanto ao café da manhã, como pão.","contraste temático","N5"],
    ["父___会社員です。","Meu pai é funcionário de empresa.","apresentação","N5"],
    ["この店___九時からです。","Esta loja abre a partir das nove.","informação temática","N5"],
    ["夏___暑いです。","O verão é quente.","descrição","N5"],
    ["犬___好きですが、猫は苦手です。","Gosto de cães, mas não me dou bem com gatos.","contraste","N4"],
    ["日曜日___働きません。","Aos domingos, não trabalho.","contraste temporal","N5"],
    ["この電車___新宿へ行きません。","Este trem não vai para Shinjuku.","informação temática","N5"],
    ["兄___背が高いです。","Meu irmão mais velho é alto.","tópico com característica","N4"],
    ["日本___四季があります。","Quanto ao Japão, há quatro estações.","tópico amplo","N4"],
    ["コーヒー___飲みますが、お茶は飲みません。","Bebo café, mas não bebo chá.","contraste","N4"],
    ["試験___来週です。","A prova será na próxima semana.","informação temática","N5"],
    ["この問題___難しくありません。","Este problema não é difícil.","descrição","N5"],
    ["駅まで___歩いて十分です。","Quanto ao trajeto até a estação, são dez minutos a pé.","tópico de percurso","N4"],
    ["わたしの趣味___写真です。","Meu hobby é fotografia.","identificação","N5"]
  ],
  "が": [
    ["だれ___来ましたか。","Quem veio?","sujeito interrogativo","N5"],
    ["猫___庭にいます。","Há um gato no jardim.","existência","N5"],
    ["雨___降っています。","Está chovendo.","fenômeno natural","N5"],
    ["日本語___わかります。","Entendo japonês.","habilidade","N5"],
    ["音楽___好きです。","Gosto de música.","preferência","N5"],
    ["山田さん___料理を作りました。","Yamada preparou a comida.","sujeito destacado","N5"],
    ["どの電車___東京へ行きますか。","Qual trem vai para Tóquio?","sujeito interrogativo","N5"],
    ["新しい店___駅前にできました。","Uma loja nova abriu em frente à estação.","surgimento","N4"],
    ["風___強いです。","O vento está forte.","fenômeno natural","N5"],
    ["子ども___公園で遊んでいます。","Uma criança está brincando no parque.","sujeito","N5"],
    ["この料理___いちばんおいしいです。","Este prato é o mais gostoso.","foco","N4"],
    ["窓___開いています。","A janela está aberta.","estado","N4"],
    ["何___必要ですか。","O que é necessário?","sujeito interrogativo","N5"],
    ["頭___痛いです。","Minha cabeça dói.","condição física","N5"],
    ["漢字___読めません。","Não consigo ler kanji.","capacidade","N4"],
    ["バス___遅れました。","O ônibus atrasou.","sujeito","N5"],
    ["春___来ました。","A primavera chegou.","sujeito","N5"],
    ["弟___自転車を直しました。","Meu irmão mais novo consertou a bicicleta.","sujeito destacado","N5"],
    ["電話___鳴っています。","O telefone está tocando.","sujeito","N5"],
    ["どんな仕事___ありますか。","Que tipo de trabalho existe?","existência","N4"]
  ],
  "を": [
    ["水___飲みます。","Bebo água.","objeto direto","N5"],
    ["本___読みます。","Leio um livro.","objeto direto","N5"],
    ["朝ごはん___食べました。","Tomei café da manhã.","objeto direto","N5"],
    ["日本語___勉強しています。","Estou estudando japonês.","objeto direto","N5"],
    ["写真___撮りましょう。","Vamos tirar uma foto.","objeto direto","N5"],
    ["音楽___聞きます。","Ouço música.","objeto direto","N5"],
    ["ドア___開けてください。","Abra a porta, por favor.","objeto direto","N5"],
    ["手紙___書きました。","Escrevi uma carta.","objeto direto","N5"],
    ["テレビ___見ません。","Não assisto televisão.","objeto direto","N5"],
    ["部屋___掃除します。","Limpo o quarto.","objeto direto","N5"],
    ["薬___飲んでください。","Tome o remédio, por favor.","objeto direto","N5"],
    ["宿題___忘れました。","Esqueci a tarefa.","objeto direto","N5"],
    ["名前___書いてください。","Escreva seu nome, por favor.","objeto direto","N5"],
    ["橋___渡ります。","Atravesso a ponte.","percurso","N4"],
    ["公園___散歩します。","Caminho pelo parque.","percurso","N4"],
    ["家___出ます。","Saio de casa.","ponto de saída","N4"],
    ["バス___降りました。","Desci do ônibus.","ponto de saída","N4"],
    ["空___飛びます。","Voa pelo céu.","percurso","N4"],
    ["道___まっすぐ歩いてください。","Caminhe reto pela rua, por favor.","percurso","N4"],
    ["大学___卒業しました。","Formei-me na universidade.","ponto de saída","N4"]
  ],
  "に": [
    ["七時___起きます。","Acordo às sete horas.","horário","N5"],
    ["学校___行きます。","Vou à escola.","destino","N5"],
    ["机の上___本があります。","Há um livro sobre a mesa.","existência","N5"],
    ["友だち___会いました。","Encontrei um amigo.","alvo da ação","N5"],
    ["日曜日___映画を見ます。","No domingo, assistirei a um filme.","tempo","N5"],
    ["日本___住んでいます。","Moro no Japão.","local de permanência","N5"],
    ["先生___質問しました。","Fiz uma pergunta ao professor.","alvo da ação","N4"],
    ["母___花をあげました。","Dei flores à minha mãe.","destinatário","N4"],
    ["駅___着きました。","Cheguei à estação.","destino","N5"],
    ["来年___大学生になります。","No próximo ano, vou me tornar universitário.","mudança de estado","N4"],
    ["部屋___入ってください。","Entre no quarto, por favor.","destino","N5"],
    ["買い物___行きます。","Vou fazer compras.","finalidade","N4"],
    ["一週間___三回運動します。","Faço exercício três vezes por semana.","frequência","N4"],
    ["壁___写真を貼りました。","Colei uma foto na parede.","ponto de contato","N4"],
    ["電車___乗ります。","Entro no trem.","alvo da ação","N5"],
    ["毎朝六時___家を出ます。","Saio de casa às seis todas as manhãs.","horário","N5"],
    ["医者___なりたいです。","Quero me tornar médico.","mudança de estado","N4"],
    ["京都___旅行しました。","Viajei para Kyoto.","destino","N5"],
    ["弟___本を貸しました。","Emprestei um livro ao meu irmão.","destinatário","N4"],
    ["春___桜が咲きます。","As cerejeiras florescem na primavera.","tempo","N5"]
  ],
  "で": [
    ["図書館___本を読みます。","Leio livros na biblioteca.","local da ação","N5"],
    ["バス___会社へ行きます。","Vou à empresa de ônibus.","meio de transporte","N5"],
    ["箸___ご飯を食べます。","Como arroz com hashis.","instrumento","N5"],
    ["日本語___話してください。","Fale em japonês, por favor.","idioma usado","N5"],
    ["公園___サッカーをします。","Jogo futebol no parque.","local da ação","N5"],
    ["店___パンを買いました。","Comprei pão na loja.","local da ação","N5"],
    ["三人___旅行しました。","Viajamos em três pessoas.","quantidade do grupo","N4"],
    ["一時間___宿題を終えました。","Terminei a tarefa em uma hora.","limite necessário","N4"],
    ["木___机を作ります。","Faço uma mesa de madeira.","material","N4"],
    ["電話___予約しました。","Fiz a reserva por telefone.","meio","N5"],
    ["家族___食事をしました。","Fizemos uma refeição em família.","grupo","N4"],
    ["この町___祭りがあります。","Há um festival nesta cidade.","local do evento","N4"],
    ["自分___決めてください。","Decida por si mesmo.","agente ou meio","N4"],
    ["駅前___待ちましょう。","Vamos esperar em frente à estação.","local da ação","N5"],
    ["百円___買えます。","É possível comprar por cem ienes.","preço","N4"],
    ["雨___試合が中止になりました。","O jogo foi cancelado por causa da chuva.","causa","N4"],
    ["コンビニ___働いています。","Trabalho em uma loja de conveniência.","local da ação","N5"],
    ["鉛筆___名前を書きました。","Escrevi o nome a lápis.","instrumento","N5"],
    ["みんな___歌いました。","Cantamos todos juntos.","grupo","N4"],
    ["大阪___会議が開かれます。","Uma reunião será realizada em Osaka.","local do evento","N4"]
  ],
  "と": [
    ["友だち___映画を見ました。","Assisti a um filme com um amigo.","companhia","N5"],
    ["パン___牛乳を買いました。","Comprei pão e leite.","enumeração completa","N5"],
    ["先生___話しました。","Conversei com o professor.","interação","N5"],
    ["母___買い物に行きます。","Vou fazer compras com minha mãe.","companhia","N5"],
    ["「ありがとう」___言いました。","Disse 'obrigado'.","citação","N4"],
    ["犬___猫がいます。","Há um cão e um gato.","enumeração completa","N5"],
    ["山田さん___結婚しました。","Casei-me com Yamada.","parceiro","N4"],
    ["来年日本へ行く___思います。","Acho que irei ao Japão no próximo ano.","citação de pensamento","N4"],
    ["弟___同じ学校です。","Estudo na mesma escola que meu irmão.","comparação","N4"],
    ["駅で佐藤さん___会いました。","Encontrei Sato na estação.","interação","N5"],
    ["父___母は東京に住んでいます。","Meu pai e minha mãe moram em Tóquio.","enumeração completa","N5"],
    ["もう一度説明してほしい___頼みました。","Pedi que explicasse mais uma vez.","citação","N4"],
    ["この漢字は「やま」___読みます。","Este kanji é lido 'yama'.","citação","N4"],
    ["姉___一緒に料理しました。","Cozinhei junto com minha irmã.","companhia","N5"],
    ["赤___青を混ぜます。","Misturo vermelho e azul.","enumeração completa","N5"],
    ["医者___相談してください。","Consulte um médico, por favor.","interação","N4"],
    ["今日は休みだ___聞きました。","Ouvi dizer que hoje é folga.","citação","N4"],
    ["昔___今では生活が違います。","A vida é diferente entre antigamente e hoje.","comparação","N4"],
    ["同僚___昼ごはんを食べました。","Almocei com um colega.","companhia","N5"],
    ["試験は簡単だった___彼は言いました。","Ele disse que a prova foi fácil.","citação","N4"]
  ]
};

const PARTICLE_EXPLANATIONS = {
  "は": "は apresenta o tópico sobre o qual a frase faz uma afirmação ou estabelece contraste.",
  "が": "が marca o sujeito em foco, especialmente com existência, capacidade, preferência e informação nova.",
  "を": "を marca o objeto direto da ação e também pode indicar percurso ou ponto de saída.",
  "に": "に indica um ponto definido, como destino, horário, lugar de existência, destinatário ou resultado.",
  "で": "で indica onde uma ação acontece ou o meio, instrumento, material, grupo, preço ou causa.",
  "と": "と indica companhia, interação, enumeração completa, comparação ou conteúdo citado."
};
const ALL_PARTICLES = ["は", "が", "を", "に", "で", "と"];

const PARTICLE_QUESTIONS = Object.entries(PARTICLE_MODULES).flatMap(function(entry) {
  const particle = entry[0];
  return entry[1].map(function(item, index) {
    const distractors = ALL_PARTICLES.filter(function(candidate) { return candidate !== particle; });
    const offset = index % distractors.length;
    const options = [particle, distractors[offset], distractors[(offset + 1) % distractors.length], distractors[(offset + 2) % distractors.length]];
    return {
      id: "particle-" + ALL_PARTICLES.indexOf(particle) + "-" + String(index + 1).padStart(2, "0"),
      particle: particle,
      level: item[3],
      category: item[2],
      question: item[0],
      translation: item[1],
      options: options,
      correctAnswer: particle,
      explanationPtBr: PARTICLE_EXPLANATIONS[particle]
    };
  });
});

if (typeof window !== "undefined") window.PARTICLE_QUESTIONS = PARTICLE_QUESTIONS;
if (typeof module !== "undefined") module.exports = PARTICLE_QUESTIONS;
