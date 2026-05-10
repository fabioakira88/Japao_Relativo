/* ============================================================
   JAPÃO RELATIVO — script.js
   DB dos 29 artigos + interações (carousel, cards, filtros, modal)
   Arquivo único — não requer posts.js separado
   ============================================================ */

/* ── BANCO DE ARTIGOS (29 matérias) ─────────────────────── */
// Banco de artigos do Japão Relativo
// Para adicionar um artigo: copie o bloco e ajuste os campos

const DB = {
  "aoi-matsuri-kyoto-festival-heian-2026": {
    title:"Aoi Matsuri: a procissão imperial que atravessa 1.500 anos em Kyoto",
    tag:"Cultura",date:"15 de Maio de 2026",
    thumb:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    content:`<p>Em 15 de maio de cada ano, mais de 500 pessoas vestidas com trajes da era Heian percorrem as ruas de Kyoto numa procissão silenciosa e solene. O <strong>Aoi Matsuri</strong> (葵祭) — Festival do Aoi — é considerado um dos três grandes festivais de Kyoto e um dos mais antigos do Japão. Sua origem remonta ao século VI.</p>
<h2>Origens no Século VI: Uma Catástrofe que Criou uma Tradição</h2>
<p>A história do Aoi Matsuri começa com uma catástrofe. Durante o reinado do Imperador Kinmei (538–571), o Japão foi atingido por fortes tempestades e epidemias que destruíram as colheitas e causaram grande sofrimento. Um oráculo indicou que o mal decorria da fúria dos deuses Kamo — os deuses protetores de Kyoto.</p>
<p>Por ordem imperial, foram realizados rituais elaborados nos dois Santuários Kamo (Shimogamo e Kamigamo) para apaziguar as divindades. As cerimônias funcionaram — e o festival passou a ser realizado anualmente. Durante séculos, o Aoi Matsuri foi o festival imperial por excelência, suspenso apenas em períodos de guerra civil e retomado com a Restauração Meiji.</p>
<em>"O Aoi Matsuri é um espelho do Japão antigo, preservado com tal fidelidade que caminhar ao lado da procissão é, por alguns instantes, atravessar o tempo."</em>
<h2>A Procissão Imperial: Rota e Ritual</h2>
<p>O coração do festival é a <strong>Ro-e no Gyoretsu</strong> — a grande procissão. Ela parte do Gosho Imperial (Palácio Imperial de Kyoto) às 10h30 e percorre aproximadamente 8 km até o Santuário Shimogamo, onde realiza cerimônias, antes de continuar para o Santuário Kamigamo no final da tarde.</p>
<p>A procissão é composta por 511 participantes, incluindo cavaleiros, portadores de oferendas rituais, músicos tocando instrumentos da era Heian e a figura central: a <strong>Saio-Dai</strong>, uma mulher de família nobre que representa a sacerdotisa imperial. Ela viaja em um palanquim decorado com folhas de hollyhock — a planta <em>aoi</em> que dá nome ao festival.</p>
<h2>Trajes Heian e o Detalhe que Ninguém Esquece</h2>
<p>Todos os participantes usam vestimentas autênticas da corte Heian (794–1185), reproduzidas com precisão a partir de registros históricos. As mulheres usam o <em>junihitoe</em> — literalmente "doze camadas" — um kimono formal com sobreposições de cores graduadas que indicam status e posição. Os homens vestem trajes igualmente elaborados, com chapéus lacados e mangas longas.</p>
<p>As folhas de <em>aoi</em> (Asarum caulescens) decoram os trajes, os cavalos e os palanquins. Segundo a crença, essa planta tem o poder de proteger contra maus espíritos e catástrofes naturais — uma herança direta do mito fundador do festival.</p>
<h2>Como Assistir em 2026</h2>
<p>O festival acontece em 15 de maio, com a procissão saindo do Gosho Imperial às 10h30. O percurso passa por áreas públicas onde qualquer pessoa pode assistir gratuitamente. As áreas próximas ao Santuário Shimogamo são as mais concorridas por volta do meio-dia. Os santuários Shimogamo e Kamigamo ficam abertos para visita durante todo o dia. Um dos festivais mais antigos do mundo — e um dos mais silenciosos. Essa contradição é pura essência japonesa.</p>`
  },
  "natsu-basho-torneio-sumo-maio-2026": {
    title:"Natsu Basho 2026: o Torneio de Verão que paralisa o Japão em maio",
    tag:"Cultura",date:"11 de Maio de 2026",
    thumb:"https://images.unsplash.com/photo-1542051812871-7575058e4e28?q=80&w=2070",
    content:`<p>A cada maio, o bairro de Ryōgoku, em Tóquio, transforma-se no coração do Japão. Durante 15 dias, o <strong>Natsu Basho</strong> — o Torneio de Verão de Sumô — reúne os maiores lutadores do país no ringue de areia sagrada chamado <em>dohyō</em>. É um dos seis grandes torneios do ano e, para muitos, o mais emocionante de todos.</p>
<h2>O Que é o Natsu Basho</h2>
<p>Realizado sempre em maio no <strong>Ryōgoku Kokugikan</strong>, o maior ginásio de sumô do mundo com capacidade para 11.000 pessoas, o Natsu Basho é o segundo dos seis torneios anuais. Os ingressos esgotam com semanas de antecedência. As lutas acontecem diariamente das 8h30 às 18h, com os combates entre os grandes yokozuna reservados para o fim da tarde.</p>
<p>Em 2026, o torneio acontece de <strong>10 a 24 de maio</strong>. Cada dia, cada vitória e cada derrota redefine o ranking — e pode determinar se um lutador sobe ou desce de divisão, ou até perde o status conquistado ao longo de uma vida.</p>
<em>"O sumô não é apenas força. É estratégia, equilíbrio, timing perfeito e anos de uma disciplina que começa ainda na infância."</em>
<h2>A Tradição Milenar do Dohyō</h2>
<p>O sumô tem mais de 1.500 anos de história. Originalmente praticado como ritual xintoísta para agradar os deuses e garantir boa colheita, a luta em areia sagrada preserva até hoje seus elementos espirituais. Antes de cada combate, os lutadores jogam sal no ringue para purificá-lo. O árbitro veste trajes da era Heian. O próprio ringue é considerado sagrado — uma área de cerca de 4,55 metros de diâmetro onde dois corpos colidem em frações de segundo.</p>
<p>Os 82 <em>kimarite</em> (técnicas de vitória) reconhecidos pela Associação Japonesa de Sumô incluem desde empurrões frontais até arremessos complexos que exigem anos de treinamento para dominar. Um combate pode durar dois segundos ou quatro minutos — ambos igualmente válidos.</p>
<h2>As Divisões e os Grandes Nomes</h2>
<p>O sumô profissional tem seis divisões. A mais alta, <strong>Makuuchi</strong>, é composta por 42 lutadores, com os yokozuna no topo — título máximo, concedido apenas a quem demonstra excelência técnica e <em>hinkaku</em> (dignidade) de forma consistente. Subir ao <em>Juryo</em>, a segunda divisão mais alta, já é considerado uma conquista de vida inteira.</p>
<p>Lutadores mongóis dominaram a cena por décadas, mas jovens japoneses como Atamifuji e Onosho começam a desafiar essa supremacia — e o público japonês responde com entusiasmo crescente. Cada torneio pode criar novos heróis e encerrar dinastias.</p>
<h2>Como Assistir ao Natsu Basho</h2>
<p>Para quem está no Japão em maio, o Kokugikan vende ingressos online e nas bilheterias. Os <em>masu-seki</em> — assentos estilo tatami para até quatro pessoas — são os mais tradicionais e esgotam primeiro. Para quem está fora do Japão, o <strong>NHK World</strong> transmite os combates ao vivo com comentários em inglês. O canal oficial no YouTube do Nihon Sumo Kyokai publica os vídeos dos combates principais diariamente. Cada empurrão, cada queda, cada segundo no dohyō revela algo novo sobre um esporte que, quanto mais se conhece, mais fascinante se torna.</p>`
  },
  "haha-no-hi-dia-das-maes-japao-2026": {
    title:"Haha no Hi: o Dia das Mães no Japão e a tradição dos cravos vermelhos",
    tag:"Cultura",date:"11 de Maio de 2026",
    thumb:"https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070",
    content:`<p>Todo segundo domingo de maio, o Japão se veste de cravos vermelhos e gratidão. O <strong>Haha no Hi</strong> (母の日) — Dia das Mães japonês — é uma celebração marcada por gestos silenciosos, presentes cuidadosamente escolhidos e um amor que raramente se diz em voz alta, mas que se sente em cada detalhe do cotidiano.</p>
<h2>O Cravo Vermelho: Símbolo de Gratidão</h2>
<p>A tradição chegou ao Japão no início do século XX, influenciada pela celebração americana do Mother's Day. Mas foi nos anos do pós-guerra que o <em>Haha no Hi</em> ganhou força real — e o cravo vermelho tornou-se seu símbolo central.</p>
<p>A flor representa amor vivo e presente. Quem tem a mãe viva presenteia com cravos vermelhos. Quem já a perdeu oferece flores brancas — um gesto que carrega, ao mesmo tempo, luto e reverência. Essa distinção simbólica é profundamente japonesa: a beleza está no detalhe que a maioria não percebe.</p>
<em>"No Japão, o amor raramente é dito — ele é demonstrado. O Haha no Hi é um dos raros momentos em que essa demonstração se torna pública, visível, quase obrigatória."</em>
<h2>O Papel da Mãe na Família Japonesa</h2>
<p>Na cultura japonesa, a mãe ocupa um lugar singular. O conceito de <strong>kyōiku mama</strong> — a mãe devotada à educação dos filhos — ilustra bem essa posição: muitas mães japonesas organizam toda sua vida em torno do desenvolvimento acadêmico e moral das crianças. Não é raro que a mãe prepare o <em>bentō</em> com capricho quase artístico, acompanhe tarefas escolares até tarde e administre toda a logística da casa.</p>
<p>O <em>Haha no Hi</em> é, portanto, muito mais do que um dia comercial. É um momento de reconhecimento coletivo de um trabalho que opera muitas vezes invisível, mas sustenta toda a estrutura familiar japonesa.</p>
<h2>Como os Japoneses Celebram</h2>
<p>As celebrações variam do simples ao elaborado. Um bilhete escrito à mão ainda é um dos presentes mais valorizados — especialmente quando vem de filhos pequenos. Entre os adultos, é comum oferecer flores, doces artesanais ou acessórios. Restaurantes costumam ter menus especiais no dia.</p>
<p>Nas escolas, crianças aprendem a dobrar origamis de cravos vermelhos para presentear as mães. A cultura do <em>omiyage</em> — o presente bem embrulhado, escolhido com intenção — aparece aqui em sua forma mais afetiva: não importa o valor do presente, mas o cuidado com que foi escolhido e entregue.</p>
<h2>Uma Data Universal, Uma Expressão Única</h2>
<p>O Japão importou o conceito, mas reinventou a expressão. Onde outros países celebram com barulho e declarações efusivas, o Japão celebra com cuidado, silêncio e precisão simbólica. O cravo vermelho na lapela, o bilhete discreto na mesa da cozinha, o jantar especial preparado em silêncio — cada um desses gestos diz, à maneira japonesa, tudo o que precisa ser dito.</p>`
  },
  "ninguem-pode-saber-caso-sugamo-1988": {
    title: "\"Ninguém Pode Saber\" é um filme. Mas a história real foi muito mais brutal.",
    tag: "Cultura",
    date: "08 de Maio de 2026",
    thumb: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070",
    content: `
      <p>Em 1988, o Japão foi sacudido por um caso que chocou o mundo inteiro. Cinco crianças. Um apartamento. Nove meses completamente sozinhas. Duas não sobreviveriam. Este é o <strong>Caso de Abandono de Crianças de Sugamo</strong> — a tragédia real que inspirou o filme de Hirokazu Kore-eda.</p>

      <div class="film-carousel" data-carousel>
        <div class="fc-slides">
          <div class="fc-slide active">
            <img src="imagens/ninguem pode saber/IMG_2242.JPG" alt="As quatro crianças no apartamento">
            <div class="fc-caption">
              <div class="fc-num">01 / 06</div>
              <p>As quatro crianças ficaram sozinhas por nove meses no apartamento em Sugamo, Tóquio.</p>
            </div>
          </div>
          <div class="fc-slide">
            <img src="imagens/ninguem pode saber/IMG_2244.JPG" alt="A família à mesa antes do abandono">
            <div class="fc-caption">
              <div class="fc-num">02 / 06</div>
              <p>Antes do abandono, a mãe era a única referência familiar que as crianças conheciam.</p>
            </div>
          </div>
          <div class="fc-slide">
            <img src="imagens/ninguem pode saber/IMG_2245.JPG" alt="O menino mais velho sozinho">
            <div class="fc-caption">
              <div class="fc-num">03 / 06</div>
              <p>Com apenas 14 anos, a Criança A tornou-se o único responsável pela sobrevivência dos irmãos.</p>
            </div>
          </div>
          <div class="fc-slide">
            <img src="imagens/ninguem pode saber/IMG_2246.JPG" alt="Crianças confinadas no apartamento">
            <div class="fc-caption">
              <div class="fc-num">04 / 06</div>
              <p>Confinadas no apartamento, as crianças viviam cercadas por caixas e pertences esquecidos.</p>
            </div>
          </div>
          <div class="fc-slide">
            <img src="imagens/ninguem pode saber/IMG_2247.JPG" alt="Criança comendo lámen instantâneo">
            <div class="fc-caption">
              <div class="fc-num">05 / 06</div>
              <p>Alimentos de conveniência eram tudo que restava quando a luz, a água e o gás foram cortados.</p>
            </div>
          </div>
          <div class="fc-slide">
            <img src="imagens/ninguem pode saber/IMG_2251.JPG" alt="A mãe preparando a partida">
            <div class="fc-caption">
              <div class="fc-num">06 / 06</div>
              <p>A partida da mãe marcou o início de um pesadelo que duraria nove meses.</p>
            </div>
          </div>
        </div>
        <button class="fc-btn fc-prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="fc-btn fc-next"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        <div class="fc-dots">
          <div class="fc-dot active"></div>
          <div class="fc-dot"></div>
          <div class="fc-dot"></div>
          <div class="fc-dot"></div>
          <div class="fc-dot"></div>
          <div class="fc-dot"></div>
        </div>
      </div>

      <h2>Quem eram elas?</h2>
      <p>Todas as crianças tinham pais diferentes e foram referidas publicamente apenas como Criança A, B, C, D e E — seus verdadeiros nomes jamais foram revelados.</p>

      <ul style="margin:16px 0 20px 20px;line-height:2.2;font-size:16px;">
        <li><strong>Criança A</strong> — menino, nascido em 1973</li>
        <li><strong>Criança B</strong> — menina, nascida em 1981</li>
        <li><strong>Criança C</strong> — faleceu logo após o nascimento, em 1984</li>
        <li><strong>Criança D</strong> — menina, nascida em 1985</li>
        <li><strong>Criança E</strong> — menina, nascida em 1986 (a mais nova)</li>
      </ul>

      <p>Com exceção da Criança A, é provável que os demais filhos não estivessem sequer registrados no registro civil. Nenhum deles frequentava a escola. Essas crianças, para o Estado japonês, <strong>simplesmente não existiam</strong>.</p>

      <h2>O dia em que tudo desmoronou</h2>
      <p>No outono de 1987, após conhecer um novo namorado, a mãe deixou a Criança A responsável pelos irmãos, entregando ao menino — então com 14 anos — o equivalente a US$ 350 para custear as despesas de todos. Ela disse que voltaria em breve.</p>
      <p>Não voltou.</p>
      <p>Os cinco filhos ficaram confinados no pequeno apartamento em Sugamo, no bairro de Toshima, Tóquio. Sem escola. Sem adultos. Sem qualquer proteção. A Criança A, ainda uma criança, tornava-se o único responsável pela sobrevivência dos irmãos.</p>

      <h2>O que Kore-eda não mostrou</h2>
      <p>O filme suavizou a realidade. O caso verdadeiro foi devastador.</p>

      <em>O corpo da Criança C, que havia morrido logo após o nascimento em 1984, foi encontrado dentro do próprio apartamento quando as autoridades invadiram o local em julho de 1988. O bebê nunca havia sido enterrado.</em>

      <p>Em 14 de abril de 1988, a caçula — a Criança E, então com apenas dois anos — foi agredida por amigos da Criança A e morreu em decorrência do ataque. Mesmo não tendo participado do crime, a Criança A ajudou um dos amigos a enterrar o corpo da irmã em um bosque em Chichibu.</p>
      <p>As autoridades não encontraram o corpo da Criança E no apartamento — o paradeiro era desconhecido até que a própria Criança A revelou o que havia acontecido.</p>

      <h2>O dia em que o silêncio acabou</h2>
      <p>Em 17 de julho de 1988, alertado pelo proprietário do imóvel, oficiais de Sugamo invadiram o apartamento e encontraram três crianças gravemente desnutridas: a Criança A (14 anos), a Criança B (7 anos) e a Criança D (3 anos).</p>
      <p>Sem água, sem luz, sem gás — todos cortados por falta de pagamento — as crianças sobreviviam basicamente com alimentos comprados em lojas de conveniência. Com a intensa cobertura da mídia, a mãe se entregou à polícia em 23 de julho. Seu testemunho revelou que as crianças estiveram sozinhas por cerca de nove meses, e que ela desconhecia o paradeiro da filha mais nova.</p>
      <p>Dois dias depois, foi a Criança A quem contou, finalmente, o que havia acontecido com a irmã.</p>

      <h2>Justiça? Apenas no papel.</h2>
      <p>Em agosto de 1988, a mãe foi acusada de abandono infantil e condenada a três anos de prisão — pena suspensa por quatro anos. A Criança A foi indiciada por abandono de cadáver, mas em consideração às circunstâncias — uma criança que tentou proteger o que restava da família — foi encaminhado junto às irmãs para uma instituição de acolhimento.</p>
      <p>Após cumprir a pena, a mãe recuperou a guarda das filhas menores. A Criança A, então maior de idade, não foi incluído nessa decisão.</p>

      <em>Três anos foi tudo o que a Justiça japonesa considerou razoável pela morte de dois filhos e pelo abandono dos demais.</em>

      <p>Em 2004, o diretor Hirokazu Kore-eda transformou essa tragédia em cinema — não para recontá-la fielmente, mas para garantir que o mundo nunca esquecesse que crianças invisíveis existem, e que o silêncio ao redor delas pode matar.</p>
    `
  },
  "passaporte-brasileiro-japao-2026": {
  title: "Passaporte Brasileiro no Japão: Taxa cairá pela metade a partir de junho de 2026",
  tag: "Notícia",
  date: "06 de Maio de 2026",
  thumb: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070",
  content: `
    <p>O <strong>Itamaraty anunciou uma redução significativa nas taxas consulares</strong> para brasileiros residentes no exterior. A partir de <strong>1º de junho de 2026</strong>, os valores cobrados para emissão e renovação do passaporte brasileiro no Japão cairão aproximadamente pela metade, aproximando os preços praticados no exterior dos valores vigentes no Brasil.</p>

    <p>Para a comunidade brasileira no Japão — uma das maiores do mundo, com mais de 210 mil pessoas — essa mudança representa um alívio real no bolso na hora de manter a documentação em dia.</p>

    <h2>Novos Valores a partir de 1º de junho de 2026</h2>

    <p>Confira a tabela comparativa com os valores atuais e os novos valores estimados em ienes (¥):</p>

    <div style="overflow-x:auto;margin:28px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;font-family:'DM Sans',sans-serif;">
        <thead>
          <tr style="background:#111;color:#fff;">
            <th style="padding:14px 20px;text-align:left;font-weight:600;letter-spacing:0.5px;border-bottom:2px solid #cc2200;">Categoria</th>
            <th style="padding:14px 20px;text-align:center;font-weight:600;letter-spacing:0.5px;border-bottom:2px solid #cc2200;">Taxa Atual</th>
            <th style="padding:14px 20px;text-align:center;font-weight:600;letter-spacing:0.5px;border-bottom:2px solid #cc2200;">Nova Taxa (jun/2026)</th>
            <th style="padding:14px 20px;text-align:center;font-weight:600;letter-spacing:0.5px;border-bottom:2px solid #cc2200;">Economia</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#f9f7f4;">
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;font-weight:500;">Adultos</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;color:#888;text-decoration:line-through;">¥ 21.600</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;color:#1a7a30;font-weight:700;">¥ 10.800</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;background:#f0fff4;color:#1a7a30;font-weight:700;">− 50%</td>
          </tr>
          <tr style="background:#fff;">
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;font-weight:500;">Crianças (4 a 18 anos)</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;color:#888;text-decoration:line-through;">¥ 14.400</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;color:#1a7a30;font-weight:700;">¥ 7.200</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e0ddd8;text-align:center;background:#f0fff4;color:#1a7a30;font-weight:700;">− 50%</td>
          </tr>
          <tr style="background:#f9f7f4;">
            <td style="padding:14px 20px;font-weight:500;">Menores de 4 anos</td>
            <td style="padding:14px 20px;text-align:center;color:#888;text-decoration:line-through;">¥ 7.200</td>
            <td style="padding:14px 20px;text-align:center;color:#1a7a30;font-weight:700;">¥ 3.600</td>
            <td style="padding:14px 20px;text-align:center;background:#f0fff4;color:#1a7a30;font-weight:700;">− 50%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Vale a pena esperar para renovar?</h2>

    <p>Se o seu passaporte <strong>não vence antes de junho de 2026</strong>, a resposta é simples: <strong>espere</strong>. A economia pode chegar a mais de ¥ 10.000 para um adulto — um valor que já cobre uma boa parte de uma conta mensal de gás ou transporte.</p>

    <em>Dica estratégica: Verifique a data de validade do seu passaporte agora. Se ele vence após junho de 2026, aguarde a nova tabela entrar em vigor e realize a renovação com o desconto garantido.</em>

    <p>Já quem está com o passaporte próximo do vencimento — ou sem documento válido — não tem por que adiar. Agende quanto antes pelo site do Consulado para evitar filas e esperas longas, que tendem a aumentar conforme a data de junho se aproxima.</p>

    <h2>Como Agendar</h2>

    <p>O agendamento para renovação de passaporte é feito exclusivamente de forma online, diretamente nos sites dos consulados brasileiros no Japão:</p>

    <ul style="margin:16px 0 20px 20px;line-height:2;">
      <li><a href="https://www.gov.br/mre/pt-br/assuntos/portal-consular/tokyo" target="_blank" rel="noopener" style="color:#cc2200;font-weight:600;">Consulado-Geral em Tóquio</a></li>
      <li><a href="https://www.gov.br/mre/pt-br/assuntos/portal-consular/nagoia" target="_blank" rel="noopener" style="color:#cc2200;font-weight:600;">Consulado-Geral em Nagoia</a></li>
      <li><a href="https://www.gov.br/mre/pt-br/assuntos/portal-consular/hamamatsu" target="_blank" rel="noopener" style="color:#cc2200;font-weight:600;">Consulado em Hamamatsu</a></li>
    </ul>

    <p>Essa redução é uma vitória concreta para a comunidade brasileira no exterior. Manter a documentação em dia deixa de ser um sacrifício financeiro e passa a ser mais acessível para todas as famílias — independentemente do tamanho ou da faixa etária. Fique atento ao Japão Relativo para atualizações assim que os valores oficiais forem confirmados pelo Itamaraty.</p>
  `
},
  "toyota": {
    title:"Toyota bate recorde histórico de vendas em 2025 — mesmo com as tarifas de Trump no caminho",
    tag:"Indústria Automotiva",date:"04 de Maio de 2026",
    thumb:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
    content:`<p>Quando o governo Trump anunciou tarifas de até 25% sobre veículos importados do Japão, muitos analistas anteciparam um ano turbulento para as montadoras japonesas. O que ninguém esperava era que a Toyota saísse de 2025 com resultados históricos.</p>
<em>"Empresas que dependem de importação sofreram. A Toyota, não. E a diferença está numa estratégia construída ao longo de décadas — não de meses."</em>
<h2>A aposta nos híbridos funcionou</h2>
<p>O Prius virou piada nos anos 2000. Depois virou ícone. Hoje, é estratégia de sobrevivência. A demanda por modelos híbridos como o Prius e o RAV4 foi a principal força por trás do crescimento da Toyota nos Estados Unidos em 2025 — um mercado que deveria ter sido hostil para qualquer fabricante japonês.</p>
<p>Enquanto o debate em torno de carros elétricos puros ganhou força e perdeu fôlego ao mesmo tempo, os híbridos ocuparam o espaço do meio: o carro que o consumidor americano quer agora, não no futuro.</p>
<h2>Absorver o custo em vez de repassar</h2>
<p>A decisão da Toyota de não transferir integralmente o impacto das tarifas ao consumidor final foi arriscada e inteligente ao mesmo tempo. A empresa estimou um custo de aproximadamente 1,45 trilhão de ienes no ano fiscal. Em paralelo, a Toyota acelerou eficiências internas, ampliou a produção local nos EUA e manteve demanda forte em mercados fora da América do Norte.</p>
<h2>O que isso tem a ver com o Japão</h2>
<p>A Toyota não é apenas uma empresa. No Japão, ela é uma instituição. Este recorde chega num momento delicado das relações comerciais entre Japão e Estados Unidos — e a Toyota passou nesse teste como nenhum concorrente conseguiu replicar.</p>`
  },
  "festival-de-pipas-de-hamamatsu": {
    title:"Festival de Pipas de Hamamatsu: O Coração da Golden Week em Shizuoka",
    tag:"Cultura",date:"29 de Abril de 2026",
    thumb:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    content:`<p>O Festival de Pipas de Hamamatsu (Hamamatsu Matsuri) é um dos eventos mais vibrantes e visualmente impressionantes do Japão.</p>
<h2>O que é o Festival?</h2>
<p>Acontece anualmente de 3 a 5 de maio. Este evento singular transforma os céus da praia de Nakatajima em uma competição cheia de cor e história, que remonta ao século XVI. Segundo a tradição, o festival começou como uma forma de comemorar o nascimento de um herdeiro do castelo de Hamamatsu.</p>
<h2>A Batalha das Pipas</h2>
<p>Durante o dia, a ação ocorre nas dunas da praia de Nakatajima, onde mais de 100 equipes de diferentes bairros da cidade competem utilizando pipas gigantes, que podem atingir até 3,5 metros de altura. O objetivo é cortar as linhas dos adversários utilizando a fricção.</p>
<h2>Os Desfiles Noturnos</h2>
<p>Ao cair da noite, a energia do festival se transforma. O centro de Hamamatsu é tomado por desfiles de carros alegóricos meticulosamente esculpidos, iluminados por lanternas de papel e acompanhados por melodias de flautas e tambores tradicionais.</p>`
  },
  "a-revolucao-silenciosa-na-politica-de-exportacao-de-armas": {
    title:"A Revolução Silenciosa na Política de Exportação de Armas",
    tag:"Notícia",date:"23 de Abril de 2026",
    thumb:"https://images.unsplash.com/photo-1542051812871-7575058e4e28?q=80&w=2070",
    content:`<p>O Japão quebra décadas de silêncio bélico com uma mudança histórica nas leis de exportação de armas.</p>
<h2>O Fim de uma Era Pacifista</h2>
<p>Desde o fim da Segunda Guerra Mundial, a Constituição japonesa, conhecida por seu Artigo 9, tem sido a pedra angular de sua postura pacifista, limitando o uso da força. No entanto, o mundo mudou. A ascensão de novas potências e a instabilidade em regiões estratégicas levaram o Japão a reavaliar sua posição.</p>
<h2>Exportação para 17 Países Parceiros</h2>
<p>A nova diretriz permite que o Japão exporte equipamentos militares letais para 17 países com os quais já possui acordos de defesa. Entre esses parceiros estão Estados Unidos, Reino Unido, Austrália e Índia.</p>
<h2>Impacto Global</h2>
<p>A decisão foi saudada pelo embaixador dos EUA no Japão como um "passo histórico" para a segurança do Indo-Pacífico. Um exemplo concreto é a venda de 11 fragatas da classe Mogami para a Austrália, demonstrando a qualidade da engenharia militar japonesa.</p>`
  },
  "kurai-incerteza-e-modestia": {
    title:"くらい（kurai), incerteza e modéstia",
    tag:"Idioma",date:"17 de Fevereiro de 2026",
    thumb:"https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?q=80&w=2070",
    content:`<p>Como o Japão usa a linguagem e os gestos para evitar arrogância.</p>
<p>A palavra 暗い（kurai）significa literalmente <strong>escuro, sombrio ou pouco claro</strong>. No uso cotidiano e no campo simbólico, ela se conecta à ideia de algo não totalmente definido, não absoluto, não afirmado com certeza total.</p>
<h2>A incerteza como virtude social</h2>
<p>Diferente da cultura ocidental, onde certeza = autoridade, no Japão certeza excessiva pode soar como arrogância. Por isso, expressões indiretas e ambíguas são valorizadas. Esse comportamento está ligado a conceitos centrais de harmonia social.</p>
<h2>Linguagem indireta e humildade prática</h2>
<p>No japonês cotidiano, isso aparece em expressões como 「ちょっと…」 (um pouco… — muitas vezes significando "não"). Mesmo quando alguém tem certeza, suaviza o discurso para preservar a harmonia do grupo.</p>
<h2>Modéstia nos presentes</h2>
<p>Esse mesmo princípio aparece claramente na cultura dos presentes. Dar algo muito caro pode ser visto como indelicado. O omiyage são lembranças simples, feitas para não criar obrigação de retribuição desigual.</p>`
  },
  "os-beneficios-do-misso-japones": {
    title:"Os Benefícios do Missô Japonês: Nutrientes e Cuidados Necessários",
    tag:"Curiosidade",date:"11 de Fevereiro de 2026",
    thumb:"https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2070",
    content:`<p>O missô japonês é muito mais do que uma sopa tradicional; é um alimento fermentado que desempenha um papel crucial na dieta japonesa.</p>
<h2>Benefícios do Missô</h2>
<p>Rico em probióticos, o missô ajuda a equilibrar a flora intestinal, melhorar a digestão e fortalecer o sistema imunológico. Estas propriedades são especialmente valiosas para aqueles que enfrentam rotinas puxadas e o estresse do dia a dia no Japão.</p>
<h2>Cuidados Necessários</h2>
<p>Embora o missô traga benefícios, é importante consumi-lo com moderação. O alimento possui um alto teor de sódio, o que pode representar um risco para a saúde em certas situações. Pessoas com hipertensão devem estar atentas.</p>
<p>A chave para aproveitar os benefícios do missô está no equilíbrio. No Japão, saúde não é sinônimo de excesso, mas de constância e responsabilidade em relação à alimentação.</p>`
  },
  "treze-japoneses-foram-presos-apos-retornar-do-camboja": {
    title:"Treze japoneses foram presos após retornar do Camboja",
    tag:"Notícia",date:"17 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1542051812871-7575058e4e28?q=80&w=2070",
    content:`<p>A polícia japonesa prendeu 13 cidadãos japoneses que retornaram recentemente do Camboja, sob suspeita de envolvimento em esquemas de fraude telefônica.</p>
<h2>O Esquema de Fraude</h2>
<p>Os detidos têm idades entre 20 e 63 anos e teriam participado de golpes contra moradores do Japão, incluindo uma mulher de aproximadamente 60 anos, residente na província de Kanagawa. Os suspeitos teriam extorquido mais de 11 milhões de ienes (cerca de US$ 69 mil).</p>
<h2>A Operação no Camboja</h2>
<p>Os japoneses foram detidos pelas autoridades cambojanas em novembro, em uma base militar localizada na cidade de Bavet, no sudeste do país. Mais de 50 pessoas foram presas no local, incluindo cidadãos das Filipinas e do Vietnã.</p>`
  },
  "yamato-proibe-uso-de-smartphones-por-pedestres-para-evitar-acidentes": {
    title:"Yamato Proíbe Uso de Smartphones por Pedestres para Evitar Acidentes",
    tag:"Cultura",date:"17 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070",
    content:`<p>Usar o celular andando na rua já está sendo proibido em algumas cidades do Japão.</p>
<h2>A Nova Lei de Yamato</h2>
<p>A cidade de Yamato implementou uma nova lei que proíbe os pedestres de utilizarem smartphones enquanto caminham. Essa medida visa prevenir lesões causadas por distrações, uma preocupação crescente nas áreas urbanas. A decisão teve respaldo de mais de 240 mil habitantes.</p>
<h2>Amplo Apoio Popular</h2>
<p>Antes da promulgação da lei, foi realizada uma consulta pública que revelou que 80% da população estava a favor da proibição. Um estudo revelou que aproximadamente 12% dos 6 mil pedestres observados estavam usando seus dispositivos móveis enquanto caminhavam.</p>`
  },
  "por-que-o-consumo-de-alcool-e-tao-presente-na-cultura-japonesa": {
    title:"Por que o consumo de álcool é tão presente na cultura japonesa?",
    tag:"Cultura",date:"13 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=2070",
    content:`<p>Em um país onde o autocontrole e a formalidade são muito valorizados, o álcool vira um espaço socialmente permitido para relaxar.</p>
<h2>O Papel do Álcool nas Relações</h2>
<p>As reuniões após o expediente, conhecidas como "nomikai", são um exemplo claro de como o álcool serve para estreitar relações. Durante essas celebrações, colegas de trabalho se reúnem para compartilhar não apenas uma bebida, mas também suas experiências e emoções que não são vistas em um ambiente de escritório formal.</p>
<h2>A Pressão Social</h2>
<p>A influência social da bebida no Japão é forte e muitas vezes pode ser percebida como uma pressão implícita para participar. Em um país onde os conflitos diretos são geralmente evitados, o consumo de álcool oferece uma atmosfera propícia para discutir assuntos delicados de maneira mais leve e informal.</p>`
  },
  "forcas-da-natureza-o-impacto-das-nevascas-e-tempestades-de-inverno-no-japao": {
    title:"Forças da Natureza: O Impacto das Nevascas e Tempestades de Inverno no Japão",
    tag:"Notícia",date:"12 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070",
    content:`<p>O inverno no Japão é uma estação que marca a cultura e o cotidiano dos habitantes, trazendo tanto beleza quanto desafios.</p>
<p>Este ano, o inverno japonês mostra sua força de maneira imponente, com fortes nevascas e tempestades afetando diversas regiões do país. As inclementes condições climáticas têm provocado atrasos significativos no transporte e, em alguns casos, o fechamento de estradas.</p>
<h2>Segurança nas Estradas</h2>
<p>As autoridades recomendam atenção redobrada, ressaltando a importância de um planejamento antecipado para evitar imprevistos. Equipamentos adequados como roupas térmicas e calçados resistentes à água são fundamentais para garantir o conforto e a segurança durante as tempestades de inverno.</p>`
  },
  "o-significado-profundo-da-palavra-na-sociedade": {
    title:"O Significado Profundo da Palavra 迷惑 na Sociedade",
    tag:"Cultura",date:"11 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    content:`<p>迷惑 significa, literalmente, incômodo, transtorno ou causar problemas aos outros. Mais do que uma palavra, é um princípio social profundamente internalizado desde a infância.</p>
<h2>A Importância na Educação e na Cultura</h2>
<p>O princípio do 迷惑 nos ensina sobre a empatia e a responsabilidade social. Em interações cotidianas, a compreensão do que é ser um inconveniente para os outros se torna um mecanismo essencial para a convivência harmoniosa.</p>
<h2>Reflexão sobre o Comportamento Social</h2>
<p>Compreender o significado de 迷惑 oferece uma oportunidade de refletirmos sobre nossos comportamentos diários. Como interagimos com os outros pode fazer a diferença entre uma convivência amigável e conflitos desnecessários.</p>`
  },
  "queda-dos-salarios-no-japao-em-2025": {
    title:"A Queda do Rendimento Real dos Salários no Japão em 2025",
    tag:"Notícia",date:"11 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070",
    content:`<p>Dados preliminares mostram que os salários reais no Japão caíram em novembro de 2025, apresentando a maior redução desde janeiro do ano anterior.</p>
<h2>Impacto da Redução dos Bônus</h2>
<p>A principal razão é a redução nos bônus extraordinários, que costumam ser uma parte crucial da compensação total dos trabalhadores japoneses. Com a inflação contínua, a perda dessa parte significativa da remuneração tem um impacto desastroso nas finanças pessoais.</p>
<h2>Inflação e suas Consequências</h2>
<p>A inflação elevada no Japão criou um ambiente desafiador, onde os preços dos bens e serviços aumentaram, mas os salários não acompanharam essa tendência. Isso resulta em uma pressão crescente sobre as famílias, que precisam rever seus orçamentos para se ajustarem a esta nova realidade econômica.</p>`
  },
  "daiso-100shop-hyakoen-japan": {
    title:"A história do Daiso: como o Japão transformou o 'barato' em qualidade",
    tag:"Curiosidade",date:"11 de Janeiro de 2026",
    thumb:"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070",
    content:`<p>A história do Daiso teve início em 1977, na cidade de Hiroshima, com a visão inovadora de Hirotake Yano, seu fundador.</p>
<h2>O Modelo de Negócios</h2>
<p>Uma das chaves para o modelo de negócios do Daiso é a capacidade de realizar compras em grande volume. Ao adquirir produtos em quantidade, a empresa consegue negociar preços significativamente menores, refletindo essa economia em seus preços finais.</p>
<h2>Cultura de Consumo Japonesa</h2>
<p>A cultura de consumo no Japão é profundamente influenciada por valores tradicionais e contemporâneos que promovem um forte apreço pela qualidade e funcionalidade dos produtos. Um conceito fundamental é o <em>mottainai</em>, a ideia de não desperdício.</p>`
  },
  "no-japao-perguntar-e-sinal-de-inteligencia-no-brasil-e-sinal-de-iniciativa-e-ai-nasce-o-conflito": {
    title:"No Japão, perguntar é sinal de inteligência. No Brasil, é sinal de iniciativa. E aí nasce o conflito.",
    tag:"Cultura",date:"30 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    content:`<p>No Japão, quando você é novato, eles esperam que você pergunte. Perguntar é sinal de respeito, não de fraqueza.</p>
<h2>O Choque Cultural</h2>
<p>Já o brasileiro costuma ir pelo instinto, pela lógica própria, pela tentativa. Isso é visto como iniciativa no Brasil, mas pode gerar conflito na fábrica japonesa. Aqui, experiência pesa mais que coragem. Processo pesa mais que improviso.</p>
<p>Quando um trabalhador é novo em uma fábrica japonesa, existe uma expectativa silenciosa: ele deve perguntar antes de agir, confirmar antes de executar, observar antes de decidir. No Japão, isso não é insegurança — é respeito à hierarquia, ao processo e à experiência acumulada.</p>
<h2>Duas Lógicas Diferentes</h2>
<p>O choque acontece quando nenhum dos dois lados entende que não se trata de certo ou errado, mas de lógicas culturais diferentes. O japonês valoriza o conhecimento transmitido. O brasileiro valoriza o conhecimento testado.</p>`
  },
  "despedida-de-nitama": {
    title:"Despedida de Nitama: O Gato Stationmaster que Conquistou Corações no Japão",
    tag:"Notícia",date:"22 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2070",
    content:`<p>No interior do Japão, uma história simples e comovente conquistou admiradores de todas as idades. Nitama, um gato que desempenhava o papel simbólico de stationmaster em uma linha de trem local, faleceu aos 15 anos.</p>
<p>Com sua presença serena e olhar amigável, ele se tornou um símbolo afetuoso para moradores e visitantes que passavam pela estação. Ao longo dos anos, sua imagem foi celebrada em fotos, postagens e até artigos em revistas.</p>
<p>A perda de Nitama foi sentida profundamente na comunidade. Os gatos stationmasters representam um mosaico de interações humanas e memórias coletivas que ajudam a fortalecer os laços comunitários. Nitama se tornou uma lenda, um testemunho de como até os seres mais humildes têm o poder de tocar o coração das pessoas.</p>`
  },
  "fim-da-era-dos-pandas": {
    title:"O Fim da Era dos Pandas no Japão: Uma Reflexão Sobre a Diplomacia do Panda",
    tag:"Notícia",date:"21 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=2070",
    content:`<p>Tóquio se prepara para um momento de grande significância histórica: o Japão ficará sem pandas pela primeira vez em 50 anos.</p>
<h2>O Fim de uma Era</h2>
<p>Os últimos pandas gigantes do país, Xiao Xiao e Lei Lei, serão retornados à China no final de janeiro de 2026. Este movimento representa o encerramento de um capítulo que começou com a "diplomacia do panda" em 1972.</p>
<h2>Um Legado de Conservação</h2>
<p>O retorno de Xiao Xiao e Lei Lei à China marca uma oportunidade de reflexão sobre o impacto que os pandas tiveram nos zoológicos e na cultura japonesa. Este período de 50 anos gerou conscientização sobre a conservação da natureza e reforçou a importância da proteção desses animais ameaçados.</p>`
  },
  "nomes-de-planetas-em-japones": {
    title:"Explorando os Planetas em Japonês: Um Guia Divertido sobre o Sistema Solar",
    tag:"Idioma",date:"17 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070",
    content:`<p>Os planetas em japonês (太陽系 – taiyoukei) usam kanji ligados aos elementos da natureza, como água, fogo, madeira e metal. Esses nomes vêm da antiga astronomia chinesa.</p>
<h2>Os Nomes dos Planetas</h2>
<p>Esses nomes são mais do que apenas palavras; eles refletem a curiosidade humana sobre o cosmos e a forma como diferentes culturas veem o universo. Mercúrio é 水星 (Suisei — Estrela da Água), Vênus é 金星 (Kinsei — Estrela do Metal), Marte é 火星 (Kasei — Estrela do Fogo).</p>
<h2>Como Praticar</h2>
<p>Aprender sobre os planetas em japonês não é apenas uma forma de expandir seu vocabulário, mas também uma maneira de se conectar com a cultura japonesa de um jeito diferente. Olhar para o céu e identificar os planetas enquanto pratica novos vocábulos é uma experiência única.</p>`
  },
  "oiwa-folclore-japones": {
    title:"A História de Oiwa: O Fantasma que Assombra o Folclore Japonês",
    tag:"Cultura",date:"17 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    content:`<p>Oiwa (お岩) é um dos fantasmas mais emblemáticos e aterradores do folclore japonês. A sua história é eternamente entrelaçada com a famosa narrativa de Yotsuya Kaidan (四谷怪談).</p>
<h2>A Tragédia de Oiwa</h2>
<p>A vida de Oiwa era marcada pela bondade e pelo amor por seu esposo, Iemon. No entanto, a gentileza de Oiwa foi cruelmente recompensada com traição, quando Iemon a envenenou para se livrar dela e casar-se com outra mulher. O veneno deformou seu rosto, fazendo com que ela ficasse irreconhecível.</p>
<h2>O Espírito Vingativo</h2>
<p>Após sua morte, Oiwa retorna do além como um monryō (怨霊), um espírito vingativo impulsionado por ódio e injustiça. Sua presença fantasmagórica se materializa em lanternas, espelhos e até no rosto de outras mulheres, levando Iemon à loucura e à ruína.</p>`
  },
  "biotina": {
    title:"Por que tanta gente está tomando biotina no Japão?",
    tag:"Saúde e Bem-Estar",date:"08 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070",
    content:`<p>A biotina, também conhecida como vitamina B7, é uma vitamina do complexo B solúvel em água que desempenha um papel fundamental no metabolismo dos macronutrientes.</p>
<h2>Benefícios para Cabelo, Pele e Unhas</h2>
<p>Um dos principais benefícios da biotina refere-se à sua capacidade de fortalecer os fios de cabelo, tornando-os menos quebradiços e promovendo um crescimento saudável. Além disso, a biotina é crucial para a saúde das unhas, pois pode ajudar a reduzir a fragilidade e o descascamento.</p>
<h2>Cuidados Necessários</h2>
<p>É importante mencionar que para pessoas que já possuem níveis adequados de biotina, os efeitos da suplementação podem ser discretos. A suplementação excessiva de biotina pode interferir em exames de sangue, afetando resultados importantes. Portanto, é essencial buscar orientação profissional antes de iniciar qualquer regime de suplementação.</p>`
  },
  "vaselina-o-creme-baratinho-que-virou-queridinho-do-skincare": {
    title:"VASELINA: O \"Creme Baratinho\" que Virou Queridinho do Skincare",
    tag:"Saúde e Bem-Estar",date:"06 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?q=80&w=2070",
    content:`<p>A vaselina (petrolato) é um derivado purificado do petróleo, amplamente usado na dermatologia por seu alto poder de proteção da pele.</p>
<h2>Como Funciona</h2>
<p>Diferente de muitos cremes caros, a vaselina não hidrata diretamente, mas cria uma barreira protetora que impede a perda de água da pele, mantendo a hidratação natural por mais tempo.</p>
<p>Segundo a American Academy of Dermatology (AAD), o petrolato é seguro, não comedogênico e altamente recomendado para pele sensível.</p>
<h2>Usos no Japão</h2>
<p>No Japão, pode ser encontrada em versões de 100 ienes na Daiso. Pode ser usada em unhas, cutículas e áreas ásperas, sendo uma excelente opção de custo-benefício para o cuidado diário da pele.</p>`
  },
  "montanhas-do-japao-terminam-em-san-e-dake": {
    title:"Por que algumas montanhas do Japão terminam em DAKE e outras em SAN?",
    tag:"Cultura",date:"03 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070",
    content:`<p>Você já reparou que algumas montanhas do Japão terminam em -san e outras em -dake? Essa diferença vai além da língua.</p>
<h2>O Significado de -San</h2>
<p>Enquanto -san está ligado a montanhas de forte valor cultural e espiritual, como o Fuji-san, o sufixo carrega um tom de respeito, semelhante ao "-san" usado para pessoas. O monte é tratado quase como uma presença viva.</p>
<h2>O Significado de -Dake</h2>
<p>O sufixo -dake geralmente se refere a picos mais técnicos e escarpados, associados ao montanhismo esportivo. Está muito associado ao alpinismo e ao montanhismo técnico, como Yari-dake e Kita-dake.</p>
<h2>Uma Questão Espiritual</h2>
<p>No xintoísmo, as montanhas são vistas como locais onde os deuses habitam. No budismo japonês, elas se tornaram locais de práticas espirituais como o shugendō, ascetismo nas montanhas.</p>`
  },
  "estrutura-noni": {
    title:"Entendendo a Estrutura ～のに (noni) no Dia a Dia",
    tag:"Idioma",date:"14 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?q=80&w=2070",
    content:`<p>A estrutura ～のに (noni) é usada no japonês para expressar contraste e quebra de expectativa. Ela equivale a "apesar de", "mesmo que" ou "mesmo tendo feito algo".</p>
<h2>Como Usar</h2>
<p>A expressão revela uma contradição ou um desalinhamento entre duas partes de uma frase, enfatizando um resultado que não se espera dada a premissa apresentada. Por exemplo: "Sakura wa kirei no ni, kare wa soreni kyoumi ga nai" — Sakura é linda, mas ele não está interessado.</p>
<h2>Emoções Expressas</h2>
<p>A estrutura noni atua como um dispositivo linguístico que permite ao falante expressar emoções como desapontamento, surpresa ou confusão em relação a um resultado que parece ilógico ou inesperado.</p>`
  },
  "uso-da-importante-particula-ni": {
    title:"Uso da importante partícula \"ni\"",
    tag:"Idioma",date:"11 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?q=80&w=2070",
    content:`<p>As partículas do japonês desempenham um papel importante na construção das frases. Entre elas, a partícula に possui diversas aplicações, sendo usada com frequência para indicar o alvo de uma ação ou o momento em que algo acontece.</p>
<h2>Usos Principais</h2>
<p>Os usos básicos de に incluem apontar um lugar específico, uma direção, ou indicar que algo ocorre em um determinado momento. Por exemplo: 「先輩に聞いてください」expressa a intenção de pedir conselhos ao senpai.</p>
<h2>Exemplos Práticos</h2>
<p>「そのミーティングは7時に始まります」mostra um horário específico. 「作業場に戻ります」esclarece o local para onde a pessoa está retornando. Dominar a partícula に aprofunda seu entendimento do japonês e melhora a comunicação.</p>`
  },
  "temo-kamawanai": {
    title:"Como Dizer \"Tudo Bem Se…\" em Japonês",
    tag:"Idioma",date:"08 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?q=80&w=2070",
    content:`<p>A estrutura ～てもかまわない (temo kamawanai) é usada no japonês para expressar que "não importa se algo acontecer" ou que "está tudo bem se…". Ela indica permissão, tolerância ou aceitação diante de uma situação.</p>
<h2>Exemplos Práticos</h2>
<p>少し遅れてもかまわない — Está tudo bem se atrasar um pouco. ここで待ってもかまわない — Está tudo bem esperar aqui. 明日来てもかまわない — Está tudo bem vir amanhã.</p>
<h2>Por que Usar</h2>
<p>A construção てもかまわない é uma ferramenta valiosa no aprendizado do japonês, pois permite expressar permissividade de maneira polida. Incorporar essas frases ao vocabulário cotidiano ajuda no aprofundamento do entendimento da cultura e da comunicação no Japão.</p>`
  },
  "gripe-2025": {
    title:"Alerta de Gripe Chega Mais Cedo e Explode Casos no Japão em 2025",
    tag:"Notícia",date:"17 de Dezembro de 2025",
    thumb:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070",
    content:`<p>O Japão enfrenta um surto precoce e intenso de influenza em 2025, com casos crescendo bem antes do esperado para a temporada de gripe.</p>
<h2>Aumento Precoce nos Casos</h2>
<p>No ano de 2025, o Japão se deparou com um crescimento alarmante nos casos de gripe, desencadeando um alerta de saúde pública nacional. O fenômeno que antes era esperado apenas nos meses de inverno, chegou mais cedo, confundindo especialistas e população.</p>
<h2>Resposta do Governo</h2>
<p>A implementação de um programa intensivo de vacinação foi uma das primeiras medidas. As autoridades também intensificaram a vigilância epidemiológica para monitorar novos casos e identificar focos de infecção.</p>`
  }
};

/* ── CONFIGURAÇÃO ────────────────────────────────────────── */
// PROMPT 1 — Slides do carousel hero (imagens Japan de alta qualidade)
const SLIDES = [
  {
    src:  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80',
    label:'Festival Aoi Matsuri, Kyoto'
  },
  {
    src:  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=80',
    label:'Rua tradicional japonesa'
  },
  {
    src:  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&q=80',
    label:'Tokyo à noite'
  },
];

const CARDS_POR_PAGINA = 12;
const ARROW = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

// Cards placeholder removidos — DB real com 29 artigos embutido acima.

/* ── ESTADO ──────────────────────────────────────────────── */
let posts        = [];
let filteredPosts = [];
let visibleCount = CARDS_POR_PAGINA;
let currentFilter = 'all';

/* ── HERO CAROUSEL (Prompt 1) ────────────────────────────── */
function initCarousel() {
  const slidesEl = document.getElementById('heroSlides');
  const dotsEl   = document.getElementById('heroDots');
  if (!slidesEl || !SLIDES.length) return;

  // Cria os slides com imagem e label acessível
  SLIDES.forEach((slide, i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide' + (i === 0 ? ' active' : '');
    s.style.backgroundImage = `url('${slide.src}')`;
    s.setAttribute('aria-label', slide.label);
    slidesEl.appendChild(s);
  });

  // Cria os dots de navegação
  SLIDES.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });

  let cur = 0;
  const slideEls = slidesEl.querySelectorAll('.hero-slide');
  const dotEls   = dotsEl.querySelectorAll('.hero-dot');

  function goTo(n) {
    slideEls[cur].classList.remove('active');
    dotEls[cur].classList.remove('active');
    cur = (n + SLIDES.length) % SLIDES.length;
    slideEls[cur].classList.add('active');
    dotEls[cur].classList.add('active');
  }

  // Fade automático a cada 5 segundos
  setInterval(() => goTo(cur + 1), 5000);
}

/* ── CARDS ───────────────────────────────────────────────── */
function excerptDe(html, max = 110) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const txt = (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  return txt.length > max ? txt.slice(0, max) + '…' : txt;
}

function criarCard(post) {
  const a = document.createElement('a');
  a.className = 'card';
  a.href = '#' + post.id;
  a.dataset.id  = post.id;
  a.dataset.tag = post.tag;
  a.innerHTML = `
    <div class="card-img" style="background-image:url('${post.thumb}')"></div>
    <div class="card-body">
      <div class="card-tag">${post.tag}</div>
      <div class="card-title">${post.title}</div>
      <div class="card-excerpt">${excerptDe(post.content)}</div>
      <div class="card-date">${post.date}</div>
    </div>`;
  a.addEventListener('click', e => { e.preventDefault(); abrirModal(post.id); });
  return a;
}

/* ── RENDERIZAÇÃO ────────────────────────────────────────── */
function renderCards() {
  const grid = document.getElementById('cardGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const slice = filteredPosts.slice(0, visibleCount);
  slice.forEach((p, i) => {
    const card = criarCard(p);
    // Primeiro card do resultado ocupa 2 colunas (destaque editorial)
    if (i === 0) card.classList.add('card-featured');
    // Atraso escalonado para entrada suave
    card.style.animationDelay = `${i * 0.04}s`;
    grid.appendChild(card);
  });

  atualizarLoadMore();
  atualizarTituloFiltro();
}

function atualizarLoadMore() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  btn.style.display = visibleCount >= filteredPosts.length ? 'none' : 'inline-flex';
}

function atualizarTituloFiltro() {
  const label = document.getElementById('filtroAtivo');
  if (!label) return;
  if (currentFilter === 'all') {
    label.textContent = '';
  } else {
    label.innerHTML = `<span class="filter-badge">${currentFilter}</span>`;
  }
}

/* ── APLICAR FILTRO (usado por nav E pelos botões de filtro) ─ */
function aplicarFiltro(categoria) {
  currentFilter = categoria || 'all';
  filteredPosts = currentFilter === 'all'
    ? [...posts]
    : posts.filter(p => p.tag && p.tag.toLowerCase() === currentFilter.toLowerCase());
  visibleCount = CARDS_POR_PAGINA;
  renderCards();

  // Sincroniza botões internos de filtro
  document.querySelectorAll('#filterGroup .filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === currentFilter || (currentFilter === 'all' && b.dataset.filter === 'all'));
  });

  // Sincroniza links do nav
  document.querySelectorAll('#navLinks a[data-filter]').forEach(a => {
    a.classList.toggle('nav-ativo', a.dataset.filter === currentFilter);
  });
}

/* ── FILTROS (botões internos da seção) ──────────────────── */
function initFiltros() {
  const group = document.getElementById('filterGroup');
  if (!group) return;

  // Gera botões automaticamente a partir das categorias do DB
  const categorias = [...new Set(posts.map(p => p.tag))].sort();
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = cat;
    group.appendChild(btn);
  });

  group.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    aplicarFiltro(btn.dataset.filter);
  });
}

/* ── FILTRO VIA NAV ──────────────────────────────────────── */
function initNavFilter() {
  document.querySelectorAll('#navLinks a[data-filter]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      aplicarFiltro(link.dataset.filter);
      // Scroll suave até a seção de artigos
      const secao = document.getElementById('noticias');
      if (secao) secao.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Logo reseta o filtro (volta para "Todos")
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', e => {
      e.preventDefault();
      aplicarFiltro('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ── LOAD MORE ───────────────────────────────────────────── */
function initLoadMore() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    visibleCount += CARDS_POR_PAGINA;
    renderCards();
  });
}

/* ── MODAL ───────────────────────────────────────────────── */
function abrirModal(id) {
  const post = DB[id];
  if (!post) return;

  const modal   = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-tag">${post.tag}</div>
    <h1 class="modal-title">${post.title}</h1>
    <div class="modal-meta">
      <span>Japão Relativo</span>
      <span class="sep">|</span>
      <span>${post.date}</span>
    </div>
    <div class="modal-body">${post.content}</div>`;

  modal.classList.add('open');
  modal.scrollTo(0, 0);
  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
  history.pushState({ id }, '', '#' + id);
}

function fecharModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  history.pushState(null, '', location.pathname);
}

function initModal() {
  const btn = document.getElementById('modalClose');
  if (btn) btn.addEventListener('click', fecharModal);

  window.addEventListener('popstate', () => {
    const id = location.hash.replace('#', '');
    if (!id) fecharModal();
    else if (DB[id]) abrirModal(id);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
  });
}

/* ── NAV SCROLL ──────────────────────────────────────────── */
function initNavScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── HASH INICIAL ────────────────────────────────────────── */
function checkHash() {
  const id = location.hash.replace('#', '');
  if (id && DB[id]) abrirModal(id);
}

/* ── SEÇÃO ANIME ─────────────────────────────────────────── */
function renderAnime() {
  const grid  = document.getElementById('animeGrid');
  const empty = document.getElementById('animeEmpty');
  if (!grid) return;
  const animePosts = posts.filter(p =>
    p.tag && p.tag.toLowerCase().includes('anime')
  );
  if (!animePosts.length) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }
  grid.innerHTML = '';
  animePosts.forEach(p => grid.appendChild(criarCard(p)));
}

window.filtrarAnime = function() {
  document.getElementById('noticias').scrollIntoView({ behavior: 'smooth' });
};

/* ── INIT ────────────────────────────────────────────────── */
function init() {
  // PROMPT 2 — Garante conteúdo mesmo sem servidor (file://)
  // Usa DB do posts.js se disponível, senão usa os cards placeholder
  const fonte = (typeof DB !== 'undefined' && Object.keys(DB).length > 0)
    ? Object.entries(DB).map(([id, data]) => ({ id, ...data }))
    : CARDS_PLACEHOLDER;

  posts         = fonte;
  filteredPosts = [...posts];

  initCarousel();
  renderCards();
  initFiltros();
  initNavFilter();   // ← liga nav ao filtro do grid
  initLoadMore();
  initModal();
  initNavScroll();
  renderAnime();
  checkHash();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
