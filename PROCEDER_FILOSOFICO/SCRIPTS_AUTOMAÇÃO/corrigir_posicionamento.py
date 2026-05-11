import requests, re
from requests.auth import HTTPBasicAuth

AUTH = HTTPBasicAuth('procederfilosofico@gmail.com', 'LKG2 mbly DXxA Aive gW5v Snwp')
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'

# ════════════════════════════════════════════════════════════
#  BLOCO 1 — ÁREA DE ESTUDO (JS injection antes do footer)
# ════════════════════════════════════════════════════════════
AREA_ESTUDO_BLOCK = r"""<!-- wp:html -->
<script>
(function() {
  if (window.__aeInjected) return;
  window.__aeInjected = true;

  var CATEGORY_META = {
    'FILOSOFIA CLÁSSICA':    {period:'Séc. VI – IV a.C.', icon:'Ω', desc:'Da arkhé à forma: os pensadores que fundaram a razão ocidental.'},
    'FILOSOFIA MEDIEVAL':    {period:'Séc. IV – XIV d.C.', icon:'✦', desc:'Fé, razão e Deus: a herança grega no mundo cristão.'},
    'FILOSOFIA MODERNA':     {period:'Séc. XVII – XVIII',  icon:'◈', desc:'Cogito, tábula rasa e crítica: a era do sujeito conhecedor.'},
    'EXISTENCIALISMO':       {period:'Séc. XIX – XX',      icon:'∃', desc:'A existência precede a essência. Liberdade como destino.'},
    'METAFÍSICA':            {period:'Perene',             icon:'∞', desc:'O que existe? O que é real? A pergunta antes de todas.'},
    'FILOSOFIA ORIENTAL':    {period:'Séc. VI a.C. –',    icon:'道', desc:'Confúcio, Lao-Tsé e o pensamento além do Ocidente.'},
    'FILOSOFIA CRÍTICA':     {period:'Séc. XX',            icon:'⊗', desc:'Adorno, Frankfurt e a crítica da razão instrumental.'},
    'FILOSOFIA E PSICOLOGIA':{period:'Séc. XIX – XXI',    icon:'Ψ', desc:'Quando a mente encontra a filosofia: arquétipos, síndromes e o self.'}
  };

  var CSS = `
    #area-estudo{padding:72px 24px;max-width:960px;margin:0 auto;font-family:'Lato',sans-serif}
    .ae-header{text-align:center;margin-bottom:52px}
    .ae-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;color:#C9A84C;text-transform:uppercase;display:block;margin-bottom:14px}
    .ae-title{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,38px);color:#fff;font-weight:700;margin:0 0 12px}
    .ae-subtitle{font-size:15px;color:rgba(255,255,255,.4);max-width:480px;margin:0 auto;line-height:1.7}
    #ae-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px}
    .ae-card{background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.14);border-radius:10px;padding:28px 24px;cursor:pointer;transition:background .22s,border-color .22s,transform .18s;position:relative;overflow:hidden}
    .ae-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#C9A84C,transparent);opacity:0;transition:opacity .22s}
    .ae-card:hover{background:rgba(201,168,76,.07);border-color:rgba(201,168,76,.4);transform:translateY(-3px)}
    .ae-card:hover::before{opacity:1}
    .ae-card-icon{font-size:28px;color:#C9A84C;margin-bottom:14px;font-family:'Playfair Display',serif}
    .ae-card-period{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(201,168,76,.65);margin-bottom:8px;font-family:'Cinzel',serif}
    .ae-card-name{font-family:'Playfair Display',serif;font-size:16px;color:#fff;font-weight:700;margin-bottom:8px;line-height:1.3}
    .ae-card-desc{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:18px}
    .ae-card-count{font-size:12px;color:#C9A84C;font-weight:600;letter-spacing:.06em}
    #ae-overlay{display:none;position:fixed;inset:0;background:rgba(6,13,30,.97);z-index:9999;overflow-y:auto;animation:aeFade .25s ease}
    @keyframes aeFade{from{opacity:0}to{opacity:1}}
    #ae-overlay.active{display:block}
    #ae-ov-inner{max-width:860px;margin:0 auto;padding:52px 24px 80px}
    #ae-ov-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.45);font-size:13px;cursor:pointer;margin-bottom:40px;background:none;border:none;padding:0;font-family:'Lato',sans-serif;letter-spacing:.06em;text-transform:uppercase;transition:color .2s}
    #ae-ov-back:hover{color:#C9A84C}
    #ae-ov-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;color:#C9A84C;text-transform:uppercase;display:block;margin-bottom:10px}
    #ae-ov-title{font-family:'Playfair Display',serif;font-size:clamp(22px,4vw,32px);color:#fff;font-weight:700;margin:0 0 36px}
    #ae-art-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
    .ae-art-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;overflow:hidden;cursor:pointer;transition:border-color .2s,transform .18s}
    .ae-art-card:hover{border-color:rgba(201,168,76,.45);transform:translateY(-2px)}
    .ae-art-thumb{width:100%;height:150px;object-fit:cover;background:rgba(255,255,255,.05)}
    .ae-art-body{padding:18px 16px}
    .ae-art-tag{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#C9A84C;font-family:'Cinzel',serif;margin-bottom:6px}
    .ae-art-title{font-family:'Playfair Display',serif;font-size:15px;color:#fff;font-weight:700;line-height:1.35;margin-bottom:6px}
    .ae-art-excerpt{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
    .ae-art-date{font-size:11px;color:rgba(255,255,255,.25);margin-top:10px}
    #ae-modal{display:none;position:fixed;inset:0;background:rgba(6,13,30,.99);z-index:10000;overflow-y:auto;animation:aeFade .25s ease}
    #ae-modal.active{display:block}
    #ae-modal-inner{max-width:720px;margin:0 auto;padding:52px 24px 100px}
    #ae-modal-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.45);font-size:13px;cursor:pointer;margin-bottom:40px;background:none;border:none;padding:0;font-family:'Lato',sans-serif;letter-spacing:.06em;text-transform:uppercase;transition:color .2s}
    #ae-modal-back:hover{color:#C9A84C}
    #ae-modal-content h1{font-family:'Playfair Display',serif;color:#fff;font-size:clamp(22px,4vw,34px);margin-bottom:8px}
    #ae-modal-content h2{font-family:'Playfair Display',serif;color:#fff;font-size:20px;margin:32px 0 12px}
    #ae-modal-content p{color:rgba(255,255,255,.72);line-height:1.85;margin-bottom:16px;font-size:16px}
    #ae-modal-content blockquote{border-left:3px solid #C9A84C;padding:12px 20px;margin:24px 0;background:rgba(201,168,76,.06);border-radius:0 6px 6px 0}
    #ae-modal-content blockquote em{color:rgba(255,255,255,.80);font-size:15px}
    #ae-modal-content strong{color:rgba(255,255,255,.92)}
    #ae-modal-content hr{border:none;border-top:1px solid rgba(255,255,255,.08);margin:32px 0}
    .ae-modal-meta{display:flex;align-items:center;gap:14px;margin-bottom:32px;flex-wrap:wrap}
    .ae-modal-tag{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#060D1E;background:#C9A84C;padding:4px 12px;border-radius:20px}
    .ae-modal-date{font-size:13px;color:rgba(255,255,255,.35)}
    @media(max-width:600px){#ae-grid{grid-template-columns:1fr}#ae-art-grid{grid-template-columns:1fr}#area-estudo{padding:48px 16px}#ae-ov-inner,#ae-modal-inner{padding:36px 16px 60px}}
  `;

  function inject() {
    if (document.getElementById('area-estudo')) return;

    // CSS
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Seção principal
    var section = document.createElement('section');
    section.id = 'area-estudo';
    section.innerHTML =
      '<div class="ae-header">' +
        '<span class="ae-label">Navegue pelo Conhecimento</span>' +
        '<h2 class="ae-title">Área de Estudo</h2>' +
        '<p class="ae-subtitle">Explore os filósofos por período histórico e corrente de pensamento.</p>' +
      '</div>' +
      '<div id="ae-grid"></div>';

    // Overlay de categoria
    var overlay = document.createElement('div');
    overlay.id = 'ae-overlay';
    overlay.innerHTML =
      '<div id="ae-ov-inner">' +
        '<button id="ae-ov-back" onclick="window.__aeCloseOverlay()">← Voltar às categorias</button>' +
        '<span id="ae-ov-label"></span>' +
        '<h2 id="ae-ov-title"></h2>' +
        '<div id="ae-art-grid"></div>' +
      '</div>';

    // Modal de artigo
    var modal = document.createElement('div');
    modal.id = 'ae-modal';
    modal.innerHTML =
      '<div id="ae-modal-inner">' +
        '<button id="ae-modal-back" onclick="window.__aeCloseModal()">← Voltar</button>' +
        '<div id="ae-modal-content"></div>' +
      '</div>';

    // Insere antes do footer
    var footer = document.querySelector('footer') || document.querySelector('.footer') || document.querySelector('#footer');
    var ref = footer || null;
    var parent = ref ? ref.parentNode : document.body;
    parent.insertBefore(modal, ref);
    parent.insertBefore(overlay, ref);
    parent.insertBefore(section, ref);

    buildGrid();
  }

  function buildGrid() {
    var grid = document.getElementById('ae-grid');
    if (!grid || typeof POSTS === 'undefined') return;
    var groups = {};
    POSTS.forEach(function(p){ var t=p.tag||'OUTROS'; if(!groups[t]) groups[t]=[]; groups[t].push(p); });
    var order = ['FILOSOFIA CLÁSSICA','FILOSOFIA MEDIEVAL','FILOSOFIA MODERNA','EXISTENCIALISMO','METAFÍSICA','FILOSOFIA ORIENTAL','FILOSOFIA CRÍTICA','FILOSOFIA E PSICOLOGIA'];
    Object.keys(groups).forEach(function(k){ if(order.indexOf(k)<0) order.push(k); });
    order.forEach(function(cat){
      if(!groups[cat]) return;
      var meta = CATEGORY_META[cat]||{period:'',icon:'◆',desc:''};
      var card = document.createElement('div');
      card.className='ae-card';
      card.innerHTML='<div class="ae-card-icon">'+meta.icon+'</div><div class="ae-card-period">'+meta.period+'</div><div class="ae-card-name">'+cap(cat)+'</div><div class="ae-card-desc">'+meta.desc+'</div><div class="ae-card-count">'+groups[cat].length+' '+(groups[cat].length===1?'artigo':'artigos')+' →</div>';
      card.onclick=function(){window.__aeOpenCat(cat,groups[cat]);};
      grid.appendChild(card);
    });
  }

  function cap(s){ return s.charAt(0)+s.slice(1).toLowerCase(); }

  window.__aeOpenCat=function(cat,arts){
    var ov=document.getElementById('ae-overlay');
    document.getElementById('ae-ov-label').textContent='Área de Estudo';
    document.getElementById('ae-ov-title').textContent=cap(cat);
    var g=document.getElementById('ae-art-grid'); g.innerHTML='';
    arts.forEach(function(p){
      var c=document.createElement('div'); c.className='ae-art-card';
      c.innerHTML=(p.thumb?'<img class="ae-art-thumb" src="'+p.thumb+'" alt="" loading="lazy">':'')+
        '<div class="ae-art-body"><div class="ae-art-tag">'+(p.tag||'')+'</div><div class="ae-art-title">'+(p.title||'')+'</div><div class="ae-art-excerpt">'+(p.excerpt||'')+'</div><div class="ae-art-date">'+(p.date||'')+'</div></div>';
      c.onclick=function(){window.__aeOpenArt(p);};
      g.appendChild(c);
    });
    ov.classList.add('active'); document.body.style.overflow='hidden'; ov.scrollTop=0;
  };
  window.__aeCloseOverlay=function(){document.getElementById('ae-overlay').classList.remove('active');document.body.style.overflow='';};
  window.__aeOpenArt=function(p){
    var m=document.getElementById('ae-modal');
    document.getElementById('ae-modal-content').innerHTML='<h1>'+(p.title||'')+'</h1><div class="ae-modal-meta"><span class="ae-modal-tag">'+(p.tag||'')+'</span><span class="ae-modal-date">'+(p.date||'')+'</span></div>'+(p.content||'');
    m.classList.add('active'); m.scrollTop=0;
  };
  window.__aeCloseModal=function(){document.getElementById('ae-modal').classList.remove('active');};
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){window.__aeCloseModal&&window.__aeCloseModal();window.__aeCloseOverlay&&window.__aeCloseOverlay();document.body.style.overflow='';}});

  function waitAndInject(tries){
    if(typeof POSTS!=='undefined'&&POSTS.length>0){inject();}
    else if(tries<40){setTimeout(function(){waitAndInject(tries+1);},150);}
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){waitAndInject(0);});}
  else{waitAndInject(0);}
})();
</script>
<!-- /wp:html -->"""

# ════════════════════════════════════════════════════════════
#  BLOCO 2 — MESTRES DO PENSAMENTO (círculos + bio modal)
# ════════════════════════════════════════════════════════════
MESTRES_BLOCK = r"""<!-- wp:html -->
<script>
(function(){
  if(window.__mestresInjected) return;
  window.__mestresInjected=true;

  var FILOSOFOS=[
    {nome:'Epicteto',    periodo:'50 — 135 d.C.',  corrente:'Estoicismo',           img:'https://procederfilosofico.com.br/wp-content/uploads/2026/05/epicteto.png',         bio:'<p>Nasceu escravo em Hierápolis. Tornou-se o mais radical dos estoicos: para ele, a liberdade não está nas correntes ou na ausência delas — está na distinção entre o que depende de nós e o que não depende.</p><p>Seu <em>Enchiridion</em> é um dos manuais práticos de filosofia mais influentes já escritos. Epicteto nunca escreveu uma linha — seus ensinamentos foram registrados por seu discípulo Arriano. A filosofia como forma de vida, não como sistema teórico.</p>'},
    {nome:'Marco Aurélio',periodo:'121 — 180 d.C.',corrente:'Estoicismo',           img:'PLACEHOLDER',bio:'<p>Imperador de Roma por quase duas décadas, governou durante guerras, pragas e crises de fronteira. Mesmo no poder absoluto, escrevia para si mesmo.</p><p><em>Meditações</em> não foi escrito para publicação — é o diário de um homem tentando ser melhor do que o cargo exigia. O filósofo-rei que Platão sonhou, confrontando diariamente a diferença entre o ideal e o possível.</p>'},
    {nome:'Sêneca',      periodo:'4 a.C. — 65 d.C.',corrente:'Estoicismo',          img:'https://procederfilosofico.com.br/wp-content/uploads/2026/05/seneca.png',          bio:'<p>Conselheiro de Nero e um dos homens mais ricos de Roma — o mais contraditório dos estoicos. Pregou a moderação enquanto acumulava fortunas. Foi forçado a se suicidar pelo próprio imperador que aconselhou.</p><p>Suas <em>Cartas a Lucílio</em> permanecem entre os textos mais honestos sobre o tempo, a amizade e o medo da morte que a filosofia já produziu.</p>'},
    {nome:'Platão',      periodo:'428 — 348 a.C.', corrente:'Filosofia Clássica',   img:'https://procederfilosofico.com.br/wp-content/uploads/2026/05/platao-mestre.jpeg',  bio:'<p>Fundou a Academia de Atenas — a primeira instituição de ensino superior do Ocidente. Discípulo de Sócrates, mestre de Aristóteles.</p><p>Para Platão, o mundo que vemos é sombra de um mundo mais real, acessível apenas pela razão. Toda a filosofia ocidental, dizia Whitehead, é uma série de notas de rodapé a Platão.</p>'},
    {nome:'Aristóteles', periodo:'384 — 322 a.C.', corrente:'Filosofia Clássica',   img:'https://procederfilosofico.com.br/wp-content/uploads/2026/05/aristoteles-mestre.jpeg',bio:'<p>Discípulo de Platão e tutor de Alexandre, o Grande. Escreveu sobre lógica, biologia, política, poética e metafísica com igual profundidade.</p><p>Onde Platão buscava o eterno, Aristóteles observava o concreto. A <em>Ética a Nicômaco</em> continua sendo o texto fundador da filosofia moral ocidental.</p>'},
    {nome:'Nietzsche',   periodo:'1844 — 1900',    corrente:'Filosofia Moderna',    img:'https://procederfilosofico.com.br/wp-content/uploads/2026/05/nietzsche-mestre.jpg',  bio:'<p>Anunciou a morte de Deus — não com alegria, mas com espanto diante do que isso significa. Filólogo antes de filósofo, atacou a moral e o niilismo com um martelo.</p><p>O eterno retorno, o além-homem, a vontade de potência: conceitos que o século XX não conseguiu ignorar nem digerir completamente. Enlouqueceu aos 44 anos e nunca se recuperou.</p>'},
    {nome:'Hannah Arendt',periodo:'1906 — 1975',   corrente:'Filosofia Contemporânea',img:'PLACEHOLDER',bio:'<p>Refugiada judia que fugiu do nazismo e se tornou a pensadora política mais importante do século XX. Cunhou a expressão "banalidade do mal" ao cobrir o julgamento de Eichmann em Jerusalém.</p><p>Em <em>A Condição Humana</em>, distinguiu trabalho, obra e ação política — e defendeu que é na ação que a liberdade se torna real. Seu pensamento permanece urgente.</p>'},
  ];

  var CSS=`
    #mestres-section{padding:72px 24px;max-width:1040px;margin:0 auto;font-family:'Lato',sans-serif}
    .ms-header{text-align:center;margin-bottom:52px}
    .ms-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;color:#C9A84C;text-transform:uppercase;display:block;margin-bottom:14px}
    .ms-title{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,38px);color:#fff;font-weight:700;margin:0 0 12px}
    .ms-subtitle{font-size:15px;color:rgba(255,255,255,.40);max-width:520px;margin:0 auto;line-height:1.7}
    #ms-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:24px;align-items:start}
    .ms-card{display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer;gap:14px}
    .ms-circle-wrap{position:relative;width:100%;max-width:120px;aspect-ratio:1;border-radius:50%;overflow:hidden;border:2px solid rgba(201,168,76,.25);transition:border-color .25s,transform .22s,box-shadow .25s}
    .ms-card:hover .ms-circle-wrap{border-color:#C9A84C;transform:translateY(-4px);box-shadow:0 8px 28px rgba(201,168,76,.20)}
    .ms-circle-img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;filter:grayscale(15%) brightness(.90);transition:filter .25s}
    .ms-card:hover .ms-circle-img{filter:grayscale(0%) brightness(1)}
    .ms-circle-placeholder{width:100%;height:100%;background:linear-gradient(145deg,#0d1930,#060D1E);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:28px;color:rgba(201,168,76,.30)}
    .ms-nome{font-family:'Playfair Display',serif;font-size:14px;color:#fff;font-weight:700;line-height:1.2}
    .ms-corrente{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(201,168,76,.65)}
    /* Modal bio */
    #ms-modal{display:none;position:fixed;inset:0;background:rgba(6,13,30,.98);z-index:10001;overflow-y:auto;animation:msFade .25s ease}
    @keyframes msFade{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
    #ms-modal.active{display:block}
    #ms-modal-inner{max-width:680px;margin:0 auto;padding:52px 24px 100px}
    #ms-modal-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.45);font-size:13px;cursor:pointer;margin-bottom:44px;background:none;border:none;padding:0;font-family:'Lato',sans-serif;letter-spacing:.06em;text-transform:uppercase;transition:color .2s}
    #ms-modal-back:hover{color:#C9A84C}
    .ms-modal-photo{width:110px;height:110px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid #C9A84C;margin-bottom:24px;display:block}
    .ms-modal-photo-ph{width:110px;height:110px;border-radius:50%;background:linear-gradient(145deg,#0d1930,#060D1E);border:3px solid rgba(201,168,76,.30);margin-bottom:24px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:32px;color:rgba(201,168,76,.30)}
    .ms-modal-periodo{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.16em;color:rgba(201,168,76,.70);text-transform:uppercase;margin-bottom:6px}
    .ms-modal-nome{font-family:'Playfair Display',serif;font-size:clamp(26px,5vw,36px);color:#fff;font-weight:700;margin:0 0 6px}
    .ms-modal-corrente{display:inline-block;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.12em;color:#060D1E;background:#C9A84C;padding:4px 14px;border-radius:20px;margin-bottom:28px;text-transform:uppercase}
    .ms-modal-bio p{color:rgba(255,255,255,.72);line-height:1.90;font-size:16px;margin-bottom:16px}
    .ms-modal-bio em{color:rgba(255,255,255,.85)}
    .ms-modal-coming{margin-top:36px;padding:20px 22px;border:1px solid rgba(201,168,76,.20);border-radius:8px;background:rgba(201,168,76,.05)}
    .ms-modal-coming p{font-size:14px;color:rgba(255,255,255,.45);margin:0;line-height:1.7}
    .ms-modal-coming strong{color:#C9A84C}
    @media(max-width:900px){#ms-grid{grid-template-columns:repeat(4,1fr)}}
    @media(max-width:600px){#ms-grid{grid-template-columns:repeat(3,1fr);gap:16px}#mestres-section{padding:48px 16px}.ms-nome{font-size:12px}#ms-modal-inner{padding:36px 16px 60px}}
    @media(max-width:380px){#ms-grid{grid-template-columns:repeat(2,1fr)}}
  `;

  function isPlaceholder(src){return !src||src.indexOf('PLACEHOLDER')===0;}

  function inject(){
    if(document.getElementById('mestres-section')) return;

    var style=document.createElement('style');
    style.textContent=CSS;
    document.head.appendChild(style);

    var section=document.createElement('section');
    section.id='mestres-section';
    section.innerHTML=
      '<div class="ms-header">'+
        '<span class="ms-label">Galeria Filosófica</span>'+
        '<h2 class="ms-title">Mestres do Pensamento</h2>'+
        '<p class="ms-subtitle">Conheça os filósofos que transformaram a história do pensamento humano.</p>'+
      '</div>'+
      '<div id="ms-grid"></div>';

    var modal=document.createElement('div');
    modal.id='ms-modal';
    modal.innerHTML='<div id="ms-modal-inner"><button id="ms-modal-back">← Voltar</button><div id="ms-modal-content"></div></div>';

    var footer=document.querySelector('footer')||document.querySelector('.footer')||document.querySelector('#footer');
    var ref=footer||null, parent=ref?ref.parentNode:document.body;
    parent.insertBefore(modal,ref);
    parent.insertBefore(section,ref);

    document.getElementById('ms-modal-back').addEventListener('click',function(){
      document.getElementById('ms-modal').classList.remove('active');
      document.body.style.overflow='';
    });

    var grid=document.getElementById('ms-grid');
    FILOSOFOS.forEach(function(f){
      var card=document.createElement('div');
      card.className='ms-card';
      var ph=isPlaceholder(f.img);
      card.innerHTML=
        '<div class="ms-circle-wrap">'+
          (ph
            ? '<div class="ms-circle-placeholder">'+f.nome.charAt(0)+'</div>'
            : '<img class="ms-circle-img" src="'+f.img+'" alt="'+f.nome+'" loading="lazy">')+
        '</div>'+
        '<div class="ms-nome">'+f.nome+'</div>'+
        '<div class="ms-corrente">'+f.corrente+'</div>';
      card.addEventListener('click',function(){openBio(f);});
      grid.appendChild(card);
    });
  }

  function openBio(f){
    var ph=isPlaceholder(f.img);
    document.getElementById('ms-modal-content').innerHTML=
      (ph
        ? '<div class="ms-modal-photo-ph">'+f.nome.charAt(0)+'</div>'
        : '<img class="ms-modal-photo" src="'+f.img+'" alt="'+f.nome+'">')+
      '<div class="ms-modal-periodo">'+f.periodo+'</div>'+
      '<h2 class="ms-modal-nome">'+f.nome+'</h2>'+
      '<span class="ms-modal-corrente">'+f.corrente+'</span>'+
      '<div class="ms-modal-bio">'+f.bio+'</div>'+
      '<div class="ms-modal-coming">'+
        '<p><strong>Artigo completo em breve.</strong> A biografia filosófica de '+f.nome+' será publicada em detalhes. Assine a newsletter para ser notificado.</p>'+
      '</div>';
    var modal=document.getElementById('ms-modal');
    modal.classList.add('active');
    modal.scrollTop=0;
    document.body.style.overflow='hidden';
  }

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&document.getElementById('ms-modal').classList.contains('active')){
      document.getElementById('ms-modal').classList.remove('active');
      document.body.style.overflow='';
    }
  });

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',inject);}
  else{inject();}
})();
</script>
<!-- /wp:html -->"""

# ════════════════════════════════════════════════════════════
#  Substitui os blocos antigos na page 68
# ════════════════════════════════════════════════════════════
print("[1] Buscando page 68...")
r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context':'edit'})
raw = r0.json().get('content',{}).get('raw','')
print(f'  raw atual: {len(raw)} chars')

# Isola os 5 blocos
blocks = re.findall(r'<!-- wp:html -->.*?<!-- /wp:html -->', raw, re.DOTALL)

# Reconstrói page 68: blocos 0,1,2 (agostinho, peter pan, newsletter) + novos 3 e 4
new_content = (
    blocks[0] + '\n\n' +
    blocks[1] + '\n\n' +
    blocks[2] + '\n\n' +
    AREA_ESTUDO_BLOCK + '\n\n' +
    MESTRES_BLOCK
)

print(f'  novo raw: {len(new_content)} chars')
print("[2] Publicando...")
resp = requests.post(f'{BASE}/pages/68', auth=AUTH,
    json={'content': new_content, 'status': 'publish'})
print(f'  Status: {resp.status_code}')
if resp.ok:
    print('  ✓ Posicionamento corrigido + Mestres redesenhado!')
else:
    print(resp.text[:300])
