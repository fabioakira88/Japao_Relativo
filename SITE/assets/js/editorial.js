/* Japão Relativo editorial runtime. Content source: data/editorial-posts.json. */
const DB = window.JR_POSTS;
const posts = Object.entries(DB).map(([id, data]) => ({ id, ...data }));

const MONTHS_PT = {
  janeiro: 0, fevereiro: 1, março: 2, marco: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
};

function parsePostDate(value) {
  if (!value) return 0;
  var raw = String(value).trim();
  var iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  var br = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/^(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})$/);
  if (br && MONTHS_PT[br[2]] !== undefined) return Date.UTC(Number(br[3]), MONTHS_PT[br[2]], Number(br[1]));
  var fallback = Date.parse(raw);
  return Number.isNaN(fallback) ? 0 : fallback;
}

function byRecentDate(a, b) {
  var diff = parsePostDate(b.date) - parsePostDate(a.date);
  return diff || posts.findIndex(function(p) { return p.id === a.id; }) - posts.findIndex(function(p) { return p.id === b.id; });
}

const recentPosts = [...posts].sort(byRecentDate);
let visibleCount = 8;
let currentFilter = 'all';
let filteredPosts = [...recentPosts];

// ======================================================
// RENDER FUNCTIONS
// ======================================================
function normalizeAssetPath(path) {
  return path || '';
}

// Component covers come exclusively from the reviewed editorial registry.
const JR_ALLOWED_REMOTE_IMAGE_RE = /^https:\/\/s4\.anilist\.co\/file\/anilistcdn\/media\/anime\/cover\//i;

function isAnimePost(post) {
  return !!(post && (post.tag === 'Anime' || String(post.category || '').includes('Anime')));
}

function isAllowedRemoteImage(path) {
  return JR_ALLOWED_REMOTE_IMAGE_RE.test(String(path || ''));
}

function normalizeContentAssets(root) {
  if (!root) return;
  root.querySelectorAll('img[src]').forEach(function(img) {
    img.src = normalizeAssetPath(img.getAttribute('src'));
  });
}

function getCardCover(post, variant) {
  if (post && post.cover) return variant === 'preview' && post.cover.preview ? post.cover.preview : post.cover.src;
  return post && post.thumb || '';
}

function isPortraitCover(post) {
  return !!(post && post.cover && /^(illustration|artwork)$/.test(post.cover.kind));
}

function getCardImg(post, fullSize) {
  var url = encodeURI(getCardCover(post, fullSize ? 'full' : 'preview')).replace(/[()']/g, function(c) { return '%' + c.charCodeAt(0).toString(16); });
  return 'background-image:url(' + url + ');background-size:' + (isPortraitCover(post) ? 'contain' : 'cover') + ';background-position:center;background-repeat:no-repeat';
}

function handleCardImageError(img) {
  if (!img || img.dataset.jrImageState) return;
  img.dataset.jrImageState = 'unavailable';
  img.style.display = 'none';
  var message = document.createElement('span');
  message.className = 'jr-image-unavailable';
  message.textContent = 'Imagem indisponível.';
  img.insertAdjacentElement('afterend',message);
}

function extractExcerpt(html, maxLen) {
  maxLen = maxLen || 110;
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
}

function getEditorialLabel(post) {
  return String((post && (post.tag || post.category)) || 'JR').toUpperCase();
}

function getEditorialStamp(post) {
  return 'JR. <i></i> ' + getEditorialLabel(post);
}

function navigateTo(id) {
  const post = DB[id];
  if (!post) return;
  if (post.canonicalPath && !post.canonicalPath.includes('#')) {
    location.assign(post.canonicalPath);
    return;
  }
  history.pushState({ postId: id }, '', '#' + id);
  openPost(id);
}

function buildMainGrid(items) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const isHome = currentFilter === 'all';
  const portalPosts = getPortalPosts();
  updateSectionHeading(currentFilter);

  const articleItems = isHome
    ? portalPosts.slice(0, 3)
    : items.slice(0, 3);
  const featuredIds = articleItems.map(function(post) { return post.id; });
  const miniPosts = isHome
    ? portalPosts.filter(function(post) {
        return post.tag === 'Notícia' && featuredIds.indexOf(post.id) === -1;
      }).slice(0, 6)
    : items.slice(3, 9);

  articleItems.forEach(function(post, index) {
    const excerpt = extractExcerpt(post.content, 145);
    const a = document.createElement('a');
    a.className = 'editorial-card ' + (index === 1 ? 'is-image-left' : 'is-text-left');
    a.href = '#' + post.id;
    a.dataset.id = post.id;
    a.innerHTML = `
      <div class="editorial-card-img-wrap">
        <img class="editorial-card-img${isPortraitCover(post) ? ' is-portrait' : ''}" src="${getCardCover(post, 'preview')}" alt="" loading="eager" decoding="async" onerror="handleCardImageError(this)">
      </div>
      <div class="editorial-card-body">
        <div class="editorial-stamp">${getEditorialStamp(post)}</div>
        <div class="editorial-card-index">${String(index + 1).padStart(2, '0')} / Documento</div>
        <div class="editorial-card-tag">${post.tag}</div>
        <div class="editorial-card-title">${post.title}</div>
        <div class="editorial-card-excerpt">${excerpt}</div>
        <div class="editorial-card-date">${post.date}</div>
        <span class="editorial-card-read">Ler matéria</span>
      </div>`;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(post.id);
    });
    grid.appendChild(a);
  });

  if (miniPosts.length) {
    const panel = document.createElement('section');
    panel.className = 'editorial-mini-panel' + (isHome ? ' is-news-list' : '');
    panel.innerHTML = `
      <div class="editorial-mini-head">
        <div class="editorial-mini-title">${isHome ? 'Notícias / Cotação' : 'Mais em ' + currentFilter}</div>
        <div class="editorial-mini-market"${isHome ? '' : ' hidden'}>
          <span><span>USD/JPY</span><b id="mini-usd">--</b></span>
          <span><span>JPY/BRL</span><b id="mini-brl">--</b></span>
          <span><span>USD/BRL</span><b id="mini-usd-brl">--</b></span>
        </div>
      </div>
      <div class="editorial-mini-grid"></div>`;
    const miniGrid = panel.querySelector('.editorial-mini-grid');
    miniPosts.forEach(function(post) {
      const a = document.createElement('a');
      a.className = 'mini-card';
      a.href = '#' + post.id;
      a.innerHTML = `
        <img class="mini-card-img${isPortraitCover(post) ? ' is-portrait' : ''}" src="${getCardCover(post, 'preview')}" alt="" loading="lazy" decoding="async" onerror="handleCardImageError(this)">
        <div class="mini-card-body">
          <div class="editorial-stamp">${getEditorialStamp(post)}</div>
          <div class="mini-card-tag">${post.tag}</div>
          <div class="mini-card-title">${post.title}</div>
        </div>`;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo(post.id);
      });
      miniGrid.appendChild(a);
    });
    grid.appendChild(panel);
    if (isHome) syncMiniMarket();
  }
}

function updateSectionHeading(cat) {
  const section = document.querySelector('.editorial-section');
  const label = document.querySelector('.editorial-section .section-label');
  const title = document.querySelector('.editorial-section .section-title');
  if (!label || !title) return;
  if (section) section.classList.toggle('is-elevacao', cat === 'Elevação');
  if (section) section.classList.toggle('is-anime', cat === 'Anime');
  if (cat === 'all') {
    label.textContent = 'Revista / Editorial';
    title.textContent = 'Seleção JR';
    return;
  }
  if (cat === 'Anime') {
    label.textContent = 'Anime / Jogos · Terror · Raciocínio';
    title.textContent = 'Anime JR';
    return;
  }
  label.textContent = cat === 'Elevação' ? 'Trilhas · Trekking · Outdoor' : 'Arquivo Editorial';
  title.textContent = cat === 'Notícia' ? 'Notícias' : cat === 'Artigos' ? 'Artigos' : cat;
}

function syncMiniMarket() {
  [
    ['w-usd', 'mini-usd'],
    ['w-brl', 'mini-brl'],
    ['w-usd-brl', 'mini-usd-brl']
  ].forEach(function(pair) {
    var source = document.getElementById(pair[0]);
    var target = document.getElementById(pair[1]);
    if (source && target) target.textContent = source.textContent;
  });
}

function buildQuickNews() {
  const grid = document.getElementById('quickNewsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  recentPosts.filter(function(p){ return p.tag === 'Notícia'; }).slice(0, 9).forEach(function(post) {
    const a = document.createElement('a');
    a.className = 'quick-card';
    a.href = '#' + post.id;
    a.innerHTML = `
      <div class="quick-card-tag">${post.tag}</div>
      <div class="quick-card-title">${post.title}</div>`;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(post.id);
    });
    grid.appendChild(a);
  });
}

function buildMoreGrid() {
  const grid = document.getElementById('moreGrid');
  if (!grid) return;
  grid.innerHTML = '';
  recentPosts.slice(9, 21).forEach(function(post) {
    const excerpt = extractExcerpt(post.content, 90);
    const a = document.createElement('a');
    a.className = 'card-h';
    a.href = '#' + post.id;
    a.dataset.id = post.id;
    a.innerHTML = `
      <div class="card-h-img" style="${getCardImg(post)}"></div>
      <div class="card-h-body">
        <div class="card-h-tag">${post.tag}</div>
        <div class="card-h-title">${post.title}</div>
        <div class="card-h-excerpt">${excerpt}</div>
        <div class="card-h-date">${post.date}</div>
      </div>`;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(post.id);
    });
    grid.appendChild(a);
  });
}

function buildStrip() {
  const strip = document.getElementById('strip');
  strip.innerHTML = '';
  recentPosts.slice(0, 3).forEach(function(post) {
    const a = document.createElement('a');
    a.className = 'strip-item';
    a.href = '#' + post.id;
    a.style.display = 'flex';
    a.style.flexDirection = 'column';
    a.style.gap = '10px';
    a.style.textDecoration = 'none';
    a.style.color = 'inherit';
    a.innerHTML = `
      <div class="strip-tag">${post.tag}</div>
      <div class="strip-title">${post.title}</div>
      <div class="strip-link">
        Ler matéria
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>`;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(post.id);
    });
    strip.appendChild(a);
  });
}


// ======================================================
// FILTERS
// ======================================================
const CATEGORY_MAP = {
  'Artigos':     ['Artigos', 'Cultura', 'Sociedade'],
  'Notícia':     ['Notícia'],
  'Dicas':       ['Dicas', 'Curiosidade', 'Saúde e Bem-Estar', 'Indústria Automotiva'],
  'Cultura Pop': ['Anime'],
  'Anime':       ['Anime'],
  'Elevação':    ['Elevação', 'Montanha', 'Natureza', 'Montanhismo', 'Trekking', 'Hike', 'Trail', 'Camping', 'Bushcraft'],
  'Utilidades':  ['Utilidades', 'Dicas', 'Curiosidade', 'Saúde e Bem-Estar'],
};

function getPostsByCategory(cat) {
  if (cat === 'all') return getPortalPosts();
  const tags = CATEGORY_MAP[cat] || [cat];
  return recentPosts.filter(p => tags.some(t => p.tag === t || p.tag.includes(t)));
}

function isElevationPost(post) {
  const tags = CATEGORY_MAP['Elevação'];
  return !!(post && post.tag && tags.some(t => post.tag === t || post.tag.includes(t)));
}

function getPortalPosts() {
  var portalPosts = recentPosts.filter(function(post) {
    return !isElevationPost(post);
  });
  return portalPosts.length ? portalPosts : recentPosts;
}

function setActiveNav(cat) {
  document.querySelectorAll('.nav-links a[data-cat]').forEach(a => {
    a.classList.toggle('active', a.dataset.cat === cat);
  });
  document.querySelectorAll('.nav-links a[data-section]').forEach(a => {
    a.classList.toggle('active', a.dataset.section === cat);
  });
}

const filterGroup = document.getElementById('filterGroup');
if (filterGroup) {
  filterGroup.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    filteredPosts = getPostsByCategory(currentFilter);
    visibleCount = 8;
    buildMainGrid(filteredPosts);
    setActiveNav(currentFilter);
  });
}


function filterCategory(cat) {
  document.body.classList.remove('about-visible');
  document.body.classList.remove('reading-mode');
  document.body.classList.remove('reading-elevacao');
  setElevacaoMode(cat === 'Elevação');
  setAnimeMode(cat === 'Anime');
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  currentFilter = cat;
  filteredPosts = getPostsByCategory(cat);
  visibleCount = 8;
  buildMainGrid(filteredPosts);
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  setActiveNav(cat);
  if (cat === 'all' || cat === 'Elevação' || cat === 'Anime') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    setTimeout(() => {
      document.getElementById('grid-section').scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
}

function showJapanEditorial() {
  filterCategory('all');
  setActiveNav('japao');
  setTimeout(() => {
    var el = document.getElementById('grid-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function showAbout() {
  document.body.classList.remove('reading-mode');
  document.body.classList.remove('reading-elevacao');
  setElevacaoMode(false);
  setAnimeMode(false);
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  document.body.classList.add('about-visible');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const aboutLink = document.querySelector('.nav-links a[data-section="about"]');
  if (aboutLink) aboutLink.classList.add('active');
  setTimeout(() => {
    document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ======================================================
// FILM CAROUSEL
// ======================================================
function initCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.fc-slide');
  const dots   = carousel.querySelectorAll('.fc-dot');
  let idx = 0;

  function goTo(n) {
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
  }

  carousel.querySelector('.fc-prev').addEventListener('click', () => goTo(idx - 1));
  carousel.querySelector('.fc-next').addEventListener('click', () => goTo(idx + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

// ======================================================
// ARTICLE VIEW
// ======================================================
const HOME_TITLE = 'Japão Relativo — O Japão por Vários Ângulos';
let homeMetaDescription = null;
const SITE_ORIGIN = 'https://japaorelativo.com';
const homeHeadState = Array.from(document.head.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')).map(function(tag) {
  return { tag:tag, content:tag.getAttribute('content') };
});

function getMetaDescription() {
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  return metaDescription;
}

function getHeadTag(selector, attrs) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  return tag;
}

function getArticleJsonLd() {
  let script = document.getElementById('jr-article-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'jr-article-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  return script;
}

function absoluteImage(path) {
  if (!path) return SITE_ORIGIN + '/assets/brand/jr-logo-master-3.png';
  if (/^https:\/\//i.test(path)) return isAllowedRemoteImage(path) ? path : SITE_ORIGIN + '/assets/brand/jr-logo-master-3.png';
  return SITE_ORIGIN + '/' + String(path).replace(/^\/+/, '');
}

function updateArticleMeta(post, id) {
  const title = post.metaTitle || post.title + ' — Japão Relativo';
  const description = post.metaDescription || post.description || extractExcerpt(post.content, 155);
  const url = SITE_ORIGIN + (post.canonicalPath || '/#' + id);
  const image = absoluteImage(getCardCover(post));
  getHeadTag('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', title);
  getHeadTag('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', description);
  getHeadTag('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', url);
  getHeadTag('meta[property="og:image"]', { property: 'og:image' }).setAttribute('content', image);
  getHeadTag('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', title);
  getHeadTag('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', description);
  getHeadTag('meta[name="twitter:image"]', { name: 'twitter:image' }).setAttribute('content', image);
  getArticleJsonLd().textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    image,
    datePublished: post.date || undefined,
    author: { '@type': 'Organization', name: 'Japão Relativo' },
    publisher: { '@type': 'Organization', name: 'Japão Relativo' },
    mainEntityOfPage: url
  });
}

function restoreHomeMetaDescription() {
  if (homeMetaDescription !== null) getMetaDescription().setAttribute('content', homeMetaDescription);
  homeHeadState.forEach(function(item) { item.tag.setAttribute('content',item.content); });
  const articleSchema = document.getElementById('jr-article-jsonld');
  if (articleSchema) articleSchema.remove();
}

function openPost(id) {
  const post = DB[id];
  if (!post) return;
  const isElevacao = isElevationPost(post);
  const heroBg = document.getElementById('articleHeroBg');
  heroBg.style.cssText = getCardImg(post, true) + ";height:100%";
  const metaDescription = getMetaDescription();
  if (homeMetaDescription === null) {
    homeMetaDescription = metaDescription.getAttribute('content') || '';
  }
  metaDescription.setAttribute('content', post.metaDescription || post.description || extractExcerpt(post.content, 155));
  updateArticleMeta(post, id);
  const brandLogo = isElevacao ? 'assets/elevacao/elevacao-logo.png' : 'assets/brand/jr-logo-master-3.png';
  const brandAlt = isElevacao ? 'Elevação' : '';
  document.getElementById('renderTarget').innerHTML = `
    <div class="article-brand-lockup${isElevacao ? ' is-elevacao' : ''}">
      <img src="${brandLogo}" alt="${brandAlt}" ${isElevacao ? '' : 'aria-hidden="true"'}>
      <span class="editorial-stamp">${getEditorialStamp(post)}</span>
    </div>
    <div class="a-tag">${post.tag}</div>
    <h1>${post.title}</h1>
    ${post.subtitle ? `<p class="a-subtitle">${post.subtitle}</p>` : ''}
    <div class="a-meta">
      <span>Por Japão Relativo</span>
      <span class="sep">|</span>
      <span>${post.date}</span>
    </div>
    <div class="a-body">${post.content}</div>
  `;
  normalizeContentAssets(document.getElementById("renderTarget"));
  initCarousel();
  setElevacaoMode(isElevacao);
  document.body.classList.add('reading-mode');
  document.body.classList.toggle('reading-elevacao', isElevacao);
  document.title = post.metaTitle || post.title + ' — Japão Relativo';
  window.scrollTo(0, 0);
}

function closePost() {
  document.body.classList.remove('reading-mode');
  document.body.classList.remove('reading-elevacao');
  setElevacaoMode(currentFilter === 'Elevação');
  document.title = HOME_TITLE;
  restoreHomeMetaDescription();
  history.pushState(null, '', location.pathname);
  window.scrollTo(0, 0);
}

document.getElementById('btnBack').addEventListener('click', closePost);

window.addEventListener('popstate', function() {
  const id = location.hash.replace('#', '');
  if (id && DB[id]) {
    openPost(id);
  } else {
    document.body.classList.remove('reading-mode');
    document.body.classList.remove('reading-elevacao');
    setElevacaoMode(currentFilter === 'Elevação');
    document.title = HOME_TITLE;
    restoreHomeMetaDescription();
    window.scrollTo(0, 0);
  }
});




// ======================================================
// INIT
// ======================================================
function checkHash() {
  const id = location.hash.replace('#', '');
  if (id && DB[id]) openPost(id);
}

var heroPostsData = [];
var heroAllData   = [];

function getExcerpt(html, len) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  var t = (tmp.textContent || tmp.innerText || '').replace(/\s+/g,' ').trim();
  return t.length > len ? t.slice(0, len) + '\u2026' : t;
}

var HERO_EDITORIAL_COPY = {
  "obon-yasumi-espiritos-aguas-afogamentos": {
    title: "Obon e as águas dos mortos",
    subtitle: "Lenda, memória ancestral e riscos reais do verão japonês."
  },
  "obon-japao-memoria-ancestrais": {
    title: "Obon é retorno",
    subtitle: "Família, lanternas, ancestrais e o país em movimento."
  },
  "gozan-okuribi-kyoto-agosto": {
    title: "Fogo nas montanhas",
    subtitle: "Kyoto encerra o Obon despedindo os ancestrais."
  },
  "jizo-bon-fim-de-agosto-japao": {
    title: "Jizō Bon no bairro",
    subtitle: "O fim de agosto como cuidado comunitário."
  },
  "bosai-no-hi-prevencao-desastres-setembro": {
    title: "Bōsai no Hi",
    subtitle: "Preparação para desastre como cultura cotidiana."
  },
  "choyo-no-sekku-kiku-setembro": {
    title: "Crisântemos de setembro",
    subtitle: "Chōyō no Sekku e a estética da longevidade."
  },
  "shubun-no-hi-e-higan-setembro": {
    title: "Equinócio e memória",
    subtitle: "Shūbun no Hi, Higan e visita aos ancestrais."
  },
  "tsukimi-chushu-no-meigetsu-2026": {
    title: "Lua de outono",
    subtitle: "Tsukimi recoloca o céu no calendário japonês."
  },
  "shirakawa-go-aldeia-gassho-zukuri": {
    title: "Shirakawa-go ainda é aldeia",
    subtitle: "Patrimônio, turismo e vida cotidiana entre as montanhas de Gifu."
  },
  "castelo-de-himeji-guia-japao": {
    title: "A Garça Branca de Himeji",
    subtitle: "Patrimônio Mundial, arquitetura defensiva e cinco séculos de história."
  },
  "gundam-witch-from-mercury-bruxa-de-mercurio": {
    title: "A Bruxa de Mercúrio",
    subtitle: "Gundam, juventude e tecnologia sob controle corporativo."
  },
  "previsao-cidade-nao-serve-para-cume": {
    title: "O cume tem outro clima",
    subtitle: "Altitude, vento e nuvens mudam a leitura da montanha."
  },
  "o-que-fazer-ao-perceber-que-esta-perdido-na-trilha": {
    title: "Perdido na trilha",
    subtitle: "Pare, observe, conserve recursos e evite transformar erro em resgate."
  },
  "bussola-orientacao-basica-sem-gps": {
    title: "Bússola sem GPS",
    subtitle: "Direção, mapa e terreno antes da bateria acabar."
  },
  "curvas-de-nivel-sem-misterio": {
    title: "Curvas de nível",
    subtitle: "O mapa já mostra onde a subida começa."
  },
  "mapa-offline-sinal-celular-nao-e-navegacao": {
    title: "Mapa offline primeiro",
    subtitle: "Sinal de celular não é plano de navegação."
  },
  "o-que-fazer-ao-perceber-que-esta-perdido": {
    title: "Perdido na trilha",
    subtitle: "A primeira decisão é parar de piorar o erro."
  },
  "guia-yamap-portugues-trilhas-japao": {
    title: "YAMAP antes da trilha",
    subtitle: "Mapa, rota e bateria preparados antes da montanha."
  },
  "yamareco-guia-portugues-montanhismo-japao": {
    title: "Yamareco com método",
    subtitle: "Registros recentes ajudam quando viram planejamento."
  },
  "compass-tozan-todoke-plano-montanha-japao": {
    title: "Tozan todoke sem mistério",
    subtitle: "O plano de montanha como aviso, não como burocracia."
  },
  "apps-clima-montanha-japao-jma-wbgt": {
    title: "Clima de montanha",
    subtitle: "JMA, chuva, vento e calor antes do primeiro passo."
  },
  "kit-digital-montanhismo-japao-apps": {
    title: "Kit digital de montanha",
    subtitle: "Apps ajudam mais quando não viram ponto único de falha."
  },
  "como-montar-mochila-sem-destruir-costas": {
    title: "Mochila sem sofrimento",
    subtitle: "Peso, acesso e equilíbrio antes da primeira subida."
  },
  "bota-ou-tenis-de-trilha-qual-escolher": {
    title: "Bota ou tênis?",
    subtitle: "Terreno, carga e chuva decidem melhor que aparência."
  },
  "bastoes-de-trekking-quando-usar": {
    title: "Bastões com técnica",
    subtitle: "Apoio, ritmo e equilíbrio sem atrapalhar a trilha."
  },
  "roupa-em-camadas-trilha-japao": {
    title: "Camadas de trilha",
    subtitle: "Suor, vento, chuva e frio sob controle."
  },
  "lanterna-de-cabeca-trilha-item-obrigatorio": {
    title: "Luz antes do escuro",
    subtitle: "Headlamp é margem quando o bate-volta atrasa."
  },
  "akira-biografia-anime-classico": {
    title: "Akira e Neo-Tokyo",
    subtitle: "O cyberpunk japonês como trauma urbano em movimento."
  },
  "cowboy-bebop-biografia-anime-classico": {
    title: "Cowboy Bebop em jazz",
    subtitle: "Caçadores de recompensa fugindo do próprio passado."
  },
  "evangelion-biografia-anime-classico": {
    title: "Evangelion por dentro",
    subtitle: "O robô gigante como linguagem de trauma."
  },
  "ghost-in-the-shell-biografia-anime-classico": {
    title: "Ghost in the Shell",
    subtitle: "Corpo, rede e memória no cyberpunk japonês."
  },
  "serial-experiments-lain-biografia-anime-classico": {
    title: "Lain conectada",
    subtitle: "A solidão digital antes de virar rotina."
  },
  "proximas-temporadas-kimetsu-dragon-ball-super-classicos": {
    title: "Próximas sagas",
    subtitle: "Kimetsu, Dragon Ball Super e clássicos sem rumor disfarçado de data."
  },
  "steins-gate-anime-jogo-visual-novel": {
    title: "Steins;Gate",
    subtitle: "Viagem no tempo, culpa e paranoia em Akihabara."
  },
  "fate-stay-night-anime-jogo-visual-novel": {
    title: "Fate vira mito",
    subtitle: "A visual novel que fez heróis históricos lutarem por desejo."
  },
  "persona-4-animation-anime-jogo-rpg": {
    title: "Persona 4 investiga",
    subtitle: "RPG, escola e identidade em cidade pequena."
  },
  "pokemon-anime-nascido-dos-jogos": {
    title: "Pokémon saiu do jogo",
    subtitle: "A aventura portátil que virou rotina global."
  },
  "devil-may-cry-anime-jogo-acao": {
    title: "Devil May Cry",
    subtitle: "Quando estilo de game precisa virar ritmo de anime."
  },
  "another-terror-escolar-anime": {
    title: "Another na sala vazia",
    subtitle: "Terror escolar feito de silêncio e regra invisível."
  },
  "higurashi-terror-vila-cicadas": {
    title: "Higurashi no verão",
    subtitle: "Cigarras, vila pequena e ciclos de paranoia."
  },
  "shiki-terror-vampirico-vila-japonesa": {
    title: "Shiki na aldeia",
    subtitle: "Vampiros e comunidade perguntam quem é o monstro."
  },
  "yamishibai-terror-curto-folclore-urbano": {
    title: "Yamishibai no escuro",
    subtitle: "Terror curto como história contada em papel."
  },
  "paranoia-agent-terror-psicologico-satoshi-kon": {
    title: "Paranoia Agent",
    subtitle: "A cidade ansiosa transforma boato em ameaça."
  },
  "death-note-raciocinio-jogo-moral": {
    title: "Death Note pensa",
    subtitle: "Poder, blefe e moralidade em duelo intelectual."
  },
  "monster-raciocinio-investigacao-moral": {
    title: "Monster investiga",
    subtitle: "Um thriller onde cada pista pesa na consciência."
  },
  "psycho-pass-raciocinio-sistema-crime": {
    title: "Psycho-Pass mede",
    subtitle: "Crime, previsão e vigilância em forma de sistema."
  },
  "promised-neverland-raciocinio-fuga": {
    title: "Fugir exige pensar",
    subtitle: "The Promised Neverland transforma fuga em tabuleiro."
  },
  "kaiji-raciocinio-aposta-pressao": {
    title: "Kaiji aposta",
    subtitle: "Raciocínio sob dívida, medo e pressão."
  },
  "sumimasen-palavra-chave-japones-cotidiano": {
    title: "すみません abre portas",
    subtitle: "Licença, desculpa e pedido de atenção em uma palavra."
  },
  "onegaishimasu-kudasai-diferenca-japones": {
    title: "Pedir do jeito certo",
    subtitle: "お願いします e ください sem misturar tudo."
  },
  "kore-sore-are-dore-japones": {
    title: "Isto, isso, aquilo",
    subtitle: "これ, それ, あれ e どれ para destravar no balcão."
  },
  "contadores-basicos-japones-loja-restaurante": {
    title: "Contar em japonês",
    subtitle: "Os contadores que salvam loja e restaurante."
  },
  "confirmar-entendimento-japones-atendimento": {
    title: "Entendi mesmo?",
    subtitle: "Frases para confirmar antes de dizer sim."
  },
  "hakuba-alem-da-neve-alpes-do-norte": {
    title: "Hakuba além da neve",
    subtitle: "Um vale moldado pelos Alpes do Norte do Japão."
  },
  "kiso-komagatake-alpes-centrais-japao": {
    title: "Kiso-Komagatake",
    subtitle: "O ponto alto dos Alpes Centrais exige respeito de montanha."
  },
  "komagane-cidade-entre-alpes-japoneses": {
    title: "Komagane entre Alpes",
    subtitle: "A cidade-base entre os Alpes Centrais e os Alpes do Sul."
  },
  "kamikochi-vale-protegido-alpes-japoneses": {
    title: "Kamikochi protegido",
    subtitle: "O vale alpino onde a paisagem pede cuidado."
  },
  "salario-minimo-japao-2026-conselho-central": {
    title: "Salário mínimo em revisão",
    subtitle: "A orientação é nacional, mas o valor final é provincial."
  },
  "turismo-japao-dados-jnto-como-ler-2026": {
    title: "O turismo em números",
    subtitle: "Dados da JNTO ajudam, mas não contam a cidade inteira."
  },
  "alerta-calor-wbgt-verao-japao-2026": {
    title: "Calor além do termômetro",
    subtitle: "WBGT mede o risco real do verão japonês."
  },
  "bicicletas-blue-ticket-japao-2026": {
    title: "Bicicleta com regra",
    subtitle: "O blue ticket muda a relação entre pedal e trânsito."
  },
  "rideshare-japao-calor-chuva-eventos-2026": {
    title: "Rideshare à japonesa",
    subtitle: "Um complemento regulado para lacunas reais de mobilidade."
  },
  "madoka-magia-walpurgisnacht-2026": {
    title: "Madoka retorna",
    subtitle: "A garota mágica que ensinou o público a desconfiar do milagre."
  },
  "bleach-tybw-2026-retorno-julho": {
    title: "Bleach em encerramento",
    subtitle: "Continuações longas precisam mais que nostalgia."
  },
  "jojo-steel-ball-run-netflix-2026": {
    title: "Steel Ball Run",
    subtitle: "JoJo muda de palco e volta ao centro da conversa global."
  },
  "sekiro-no-defeat-anime-2026": {
    title: "Sekiro vira anime",
    subtitle: "Quando o peso do controle precisa virar enquadramento."
  },
  "temporada-verao-2026-crunchyroll-curadoria": {
    title: "A temporada ficou grande",
    subtitle: "O problema agora é escolher o que merece tempo."
  },
  "por-que-o-japao-gosta-de-filas": {
    title: "A tecnologia da fila",
    subtitle: "Ordem pública como forma de evitar disputa explícita."
  },
  "omotenashi-limites-hospitalidade-japonesa": {
    title: "Omotenashi tem limite",
    subtitle: "Hospitalidade japonesa também é trabalho emocional."
  },
  "furusato-cidade-natal-japao-memoria": {
    title: "Furusato",
    subtitle: "Cidade natal, memória e retorno no imaginário japonês."
  },
  "washoku-fermentacao-misso-shoyu-natto": {
    title: "O sabor do tempo",
    subtitle: "Missô, shoyu e natto como inteligência cotidiana."
  },
  "ma-pausa-espaco-vida-japonesa": {
    title: "Ma",
    subtitle: "A pausa que organiza espaço, fala e convivência."
  }
};

function getHeroDisplayTitle(post) {
  return (HERO_EDITORIAL_COPY[post.id] && HERO_EDITORIAL_COPY[post.id].title) || post.heroTitle || post.title;
}

function getHeroDisplaySubtitle(post) {
  return (HERO_EDITORIAL_COPY[post.id] && HERO_EDITORIAL_COPY[post.id].subtitle) || post.heroSubtitle || post.subtitle || '';
}


function buildLatestStrip() {
  var grid = document.getElementById('latestGrid');
  if (!grid) return;
  grid.innerHTML = '';
  var isElevacao = document.body.classList.contains('elevacao-mode');
  var isAnime = document.body.classList.contains('anime-mode');
  var sourcePosts = isElevacao
    ? recentPosts.filter(isElevationPost)
    : isAnime
      ? recentPosts.filter(function(post) { return post.tag === 'Anime'; })
      : getPortalPosts();
  var heroItems = isElevacao ? getElevacaoHeroItems() : isAnime ? getAnimeHeroItems() : getCurrentHeroItems();
  var usedIds = {};
  heroItems.forEach(function(item) {
    usedIds[item.post.id] = true;
  });
  var latest = sourcePosts.filter(function(p){ return !usedIds[p.id]; }).slice(0, 8);
  latest.forEach(function(post) {
    var a = document.createElement('a');
    a.className = 'jr-latest-card';
    a.href = '#';
    a.setAttribute('aria-label', post.title);
    a.onclick = function(e) { e.preventDefault(); navigateTo(post.id); };
    a.innerHTML =
      "<div class='jr-latest-card-bg' style='" + getCardImg(post) + "'></div>" +
      '<div class="jr-latest-card-ov"></div>' +
      '<div class="jr-latest-card-body">' +
        '<div class="editorial-stamp">' + getEditorialStamp(post) + '</div>' +
        '<div class="jr-latest-card-cat">' + post.tag + '</div>' +
        '<div class="jr-latest-card-title">' + post.title + '</div>' +
      '</div>';
    grid.appendChild(a);
  });
}

function getCurrentHeroItems() {
  return getPortalPosts()
    .filter(function(post) {
      return post && post.id && post.title && getCardCover(post);
    })
    .slice(0, 7)
    .map(function(post) {
      return {
        post: post,
        label: String(post.tag || post.category || 'JR').toUpperCase()
      };
    });
}

function getElevacaoHeroItems() {
  return recentPosts
    .filter(function(post) {
      return isElevationPost(post) && post.id && post.title && getCardCover(post);
    })
    .slice(0, 6)
    .map(function(post) {
      return {
        post: post,
        label: 'TRILHAS · TREKKING · OUTDOOR'
      };
    });
}

function getAnimeHeroItems() {
  var curated = [
    'steins-gate-anime-jogo-visual-novel',
    'death-note-raciocinio-jogo-moral',
    'another-terror-escolar-anime',
    'proximas-temporadas-kimetsu-dragon-ball-super-classicos',
    'akira-biografia-anime-classico',
    'psycho-pass-raciocinio-sistema-crime',
    'higurashi-terror-vila-cicadas'
  ];
  return curated
    .map(function(id) { return DB[id]; })
    .filter(function(post) { return post && post.id && post.title && getCardCover(post); })
    .map(function(post) {
      return {
        post: post,
        label: 'ANIME · JOGOS · TERROR · RACIOCÍNIO'
      };
    });
}

var heroRotationTimer = null;
var heroCurrentItems = [];
var heroCurrentIndex = 0;

function getHeroStamp(post) {
  if (document.body.classList.contains('elevacao-mode')) {
    return 'ELEVAÇÃO <i></i> OUTDOOR';
  }
  if (document.body.classList.contains('anime-mode')) {
    return 'JR. <i></i> ANIME';
  }
  return getEditorialStamp(post);
}

function renderHeroItems(items) {
  var container = document.getElementById('heroSlides');
  var panel     = document.getElementById('heroTextPanel');
  if (!container || !panel) return;
  if (heroRotationTimer) {
    clearInterval(heroRotationTimer);
    heroRotationTimer = null;
  }
  container.innerHTML = '';

  if (!items.length) return;
  heroCurrentItems = items;
  heroCurrentIndex = 0;

  // Slides carregam APENAS imagem de fundo — sem texto interno.
  // Texto fica no #heroTextPanel único, fora dos slides.
  // Isso elimina o FOUC por design: não há múltiplos elementos
  // de texto que precisam de opacity management.
  items.forEach(function(item, index) {
    var slide = document.createElement('div');
    slide.className = 'hero-bg-slide' + (index === 0 ? ' active' : '');
    slide.style.cssText = getCardImg(item.post);
    slide.style.cursor = 'pointer';
    slide.style.pointerEvents = index === 0 ? 'auto' : 'none';
    slide.setAttribute('role', 'link');
    slide.setAttribute('aria-label', item.post.title);
    slide.addEventListener('click', function() { navigateTo(item.post.id); });
    container.appendChild(slide);
  });

  var catEl   = document.getElementById('ht-cat');
  var stampEl = document.getElementById('heroStamp');
  var titleEl = document.getElementById('ht-title');
  var subEl   = document.getElementById('ht-sub');

  // Preencher painel com o primeiro slide (instantâneo, sem fade)
  if (stampEl) stampEl.innerHTML = getHeroStamp(items[0].post);
  if (catEl)   catEl.textContent   = items[0].label;
  if (titleEl) titleEl.textContent = getHeroDisplayTitle(items[0].post);
  if (subEl)   subEl.textContent   = getHeroDisplaySubtitle(items[0].post);
  panel.style.cursor = 'pointer';
  panel.setAttribute('role', 'link');
  panel.setAttribute('tabindex', '0');
  panel.setAttribute('aria-label', items[0].post.title);

  var allSlides = container.getElementsByClassName('hero-bg-slide');
  var current = 0;

  function updateHeroTargets(index) {
    Array.prototype.forEach.call(allSlides, function(slide, slideIndex) {
      slide.style.pointerEvents = slideIndex === index ? 'auto' : 'none';
      slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
    });
    panel.setAttribute('aria-label', items[index].post.title);
  }

  panel.onclick = function() {
    navigateTo(items[current].post.id);
  };

  panel.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo(items[current].post.id);
    }
  };
  updateHeroTargets(current);
  if (allSlides.length < 2) return;

  // Fade do painel de texto ao trocar de slide
  var fadeTimer = null;
  function updatePanel(index) {
    panel.classList.add('hero-panel-fading');
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(function() {
      if (catEl)   catEl.textContent   = items[index].label;
      if (stampEl) stampEl.innerHTML   = getHeroStamp(items[index].post);
      if (titleEl) titleEl.textContent = getHeroDisplayTitle(items[index].post);
      if (subEl)   subEl.textContent   = getHeroDisplaySubtitle(items[index].post);
      panel.classList.remove('hero-panel-fading');
    }, 280);
  }

  heroRotationTimer = setInterval(function() {
    allSlides[current].classList.remove('active');
    allSlides[current].style.pointerEvents = 'none';
    current = (current + 1) % allSlides.length;
    heroCurrentIndex = current;
    allSlides[current].classList.add('active');
    updateHeroTargets(current);
    updatePanel(current);
  }, 5600);
}

function buildFadeHero() {
  renderHeroItems(
    document.body.classList.contains('elevacao-mode')
      ? getElevacaoHeroItems()
      : document.body.classList.contains('anime-mode')
        ? getAnimeHeroItems()
        : getCurrentHeroItems()
  );
}

function setElevacaoMode(active) {
  var logo = document.querySelector('#heroSection .nav-logo-mark');
  var logoLink = document.querySelector('#heroSection .nav-logo');
  document.body.classList.toggle('elevacao-mode', !!active);
  if (logo) {
    logo.src = active ? 'assets/elevacao/elevacao-logo.png' : 'assets/brand/jr-logo-master-3.png';
    logo.alt = active ? 'Elevação' : '';
    logo.setAttribute('aria-hidden', active ? 'false' : 'true');
  }
  if (logoLink) {
    logoLink.setAttribute('aria-label', active ? 'Elevação — início da editoria' : 'Japão Relativo — início');
  }
  renderHeroItems(active ? getElevacaoHeroItems() : getCurrentHeroItems());
  buildLatestStrip();
}

function setAnimeMode(active) {
  document.body.classList.toggle('anime-mode', !!active);
  renderHeroItems(
    active
      ? getAnimeHeroItems()
      : document.body.classList.contains('elevacao-mode')
        ? getElevacaoHeroItems()
        : getCurrentHeroItems()
  );
  buildLatestStrip();
}

function initMarketBar() {
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function applyRates(rates) {
    if (!rates) return;
    var jpyRate = Number(rates.JPY);
    var brlRate = Number(rates.BRL);
    if (!Number.isFinite(jpyRate) || !Number.isFinite(brlRate) || jpyRate <= 0) return;
    var usdJpy = jpyRate.toFixed(2);
    var usdBrl = brlRate.toFixed(2);
    var jpyBrl = (brlRate / jpyRate).toFixed(4);
    setText('w-usd', usdJpy);
    setText('mini-usd', usdJpy);
    setText('w-usd-brl', usdBrl);
    setText('mini-usd-brl', usdBrl);
    setText('w-brl', jpyBrl);
    setText('mini-brl', jpyBrl);
  }

  applyRates({ JPY: 159.12, BRL: 5.01 });

  function fetchWithTimeout(url, ms) {
    var controller = new AbortController();
    var timer = setTimeout(function() {
      controller.abort();
    }, ms);
    return fetch(url, { signal: controller.signal }).finally(function() {
      clearTimeout(timer);
    });
  }

  function parseRatesResponse(response) {
    if (!response.ok) throw new Error('Exchange API HTTP ' + response.status);
    return response.json();
  }

  fetchWithTimeout('https://open.er-api.com/v6/latest/USD', 3500)
    .then(parseRatesResponse)
    .then(function(data) { applyRates(data.rates || {}); })
    .catch(function(){
      fetchWithTimeout('https://api.exchangerate-api.com/v4/latest/USD', 3500)
        .then(parseRatesResponse)
        .then(function(data) { applyRates(data.rates || {}); })
        .catch(function(){});
    });
}

function initMobileNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var toggle = nav.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

function redirectLegacyQuizLink() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('quiz') === 'jlpt') {
    window.location.replace('quiz.html');
    return;
  }
  var cat = params.get('cat');
  if (cat) {
    var validCats = ['Notícia','Artigos','Idioma','Anime','Utilidades','Elevação'];
    if (validCats.includes(cat)) {
      filterCategory(cat);
      setTimeout(function() {
        var el = document.getElementById('grid-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }
}

function init() {
  redirectLegacyQuizLink();
  initMobileNav();
  buildMainGrid(filteredPosts);
  buildMoreGrid();
  buildFadeHero();
  buildLatestStrip();
  initMarketBar();
  checkHash();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
