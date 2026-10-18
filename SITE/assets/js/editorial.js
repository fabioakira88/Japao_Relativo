/* Japão Relativo editorial runtime. Content source: data/editorial-posts.json. */
const DB = window.JR_POSTS || {};
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
// Cultural direction of the magazine; news remains available in its dated archive.
const HOME_EDITORIAL = window.JR_HOME || {selected: [], copy: {}};
const HOME_EDITORIAL_IDS = HOME_EDITORIAL.selected;
let visibleCount = 8;
let currentFilter = 'all';
let filteredPosts = [...recentPosts];

// ======================================================
// RENDER FUNCTIONS
// ======================================================
function normalizeAssetPath(path) {
  return path || '';
}

// Component covers come from the reviewed local editorial registry.
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
  return !!(post && post.cover && /^(illustration|artwork|social-cover)$/.test(post.cover.kind));
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
  const tmp = document.createElement('template');
  tmp.innerHTML = html;
  const text = (tmp.content.textContent || '').replace(/\s+/g, ' ').trim();
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

function createEditorialCard(post, index) {
  const card = document.createElement('a');
  card.className = 'jr-story' + (index === 0 ? ' jr-story-lead' : '');
  card.href = post.canonicalPath;
  card.dataset.id = post.id;
  const image = document.createElement('img');
  image.src = getCardCover(post, 'preview');
  image.alt = '';
  image.loading = 'lazy';
  image.decoding = 'async';
  image.width = isPortraitCover(post) ? 4 : 16;
  image.height = isPortraitCover(post) ? 5 : 9;
  image.className = 'jr-story-image' + (isPortraitCover(post) ? ' is-portrait' : '');
  image.addEventListener('error', () => handleCardImageError(image));
  const body = document.createElement('div');
  body.className = 'jr-story-body';
  const tag = document.createElement('span');
  tag.className = 'jr-web-kicker'; tag.textContent = post.tag;
  const title = document.createElement('h3'); title.textContent = post.title;
  const excerpt = document.createElement('p');
  excerpt.textContent = post.subtitle || extractExcerpt(post.content, 155);
  const date = document.createElement('span');
  date.className = 'jr-story-date'; date.textContent = post.date;
  body.append(tag, title, excerpt, date);
  card.append(image, body);
  card.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigateTo(post.id);
  });
  return card;
}

function getSelectionPosts() {
  const heroIds = new Set(getCurrentHeroItems().map(item => item.post.id));
  return getHomeEditorialPosts().filter(post => !heroIds.has(post.id)).slice(0, 3);
}

function buildMainGrid(items) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.replaceChildren();
  grid.className = currentFilter === 'all' ? 'jr-curation-grid' : 'jr-category-grid';
  updateSectionHeading(currentFilter);
  const selected = currentFilter === 'all' ? getSelectionPosts() : items.slice(0, 9);
  selected.forEach((post, index) => grid.append(createEditorialCard(post, index)));
}

function updateSectionHeading(cat) {
  const section = document.querySelector('.editorial-section');
  const label = document.querySelector('.editorial-section .section-label');
  const title = document.querySelector('.editorial-section .section-title');
  if (!label || !title) return;
  if (cat === 'all') {
    label.textContent = 'Revista / Editorial';
    title.textContent = 'Seleção JR';
    return;
  }
  label.textContent = 'Arquivo Editorial';
  title.textContent = cat === 'Notícia' ? 'Notícias' : cat === 'Artigos' ? 'Artigos' : cat;
}

// ======================================================
// FILTERS
// ======================================================
const CATEGORY_MAP = {
  'Artigos':     ['Artigos', 'Cultura', 'Sociedade'],
  'Notícia':     ['Notícia'],
  'Dicas':       ['Dicas', 'Curiosidade', 'Saúde e Bem-Estar', 'Indústria Automotiva'],
  'Utilidades':  ['Utilidades', 'Dicas', 'Curiosidade', 'Saúde e Bem-Estar'],
};

function getPostsByCategory(cat) {
  if (cat === 'all') return getPortalPosts();
  const tags = CATEGORY_MAP[cat] || [cat];
  return recentPosts.filter(p => tags.some(t => p.tag === t || p.tag.includes(t)));
}

function getPortalPosts() {
  var portalPosts = recentPosts.filter(function(post) {
    return !NEWS_IDS.has(post.id);
  });
  return portalPosts.length ? portalPosts : recentPosts;
}

function getHomeEditorialPosts() {
  const selected = HOME_EDITORIAL_IDS.map(id => DB[id]).filter(Boolean);
  const used = new Set(selected.map(post => post.id));
  return selected.concat(getPortalPosts().filter(post => !used.has(post.id)));
}

function buildNewsArchive() {
  const list = document.getElementById('newsArchiveList');
  if (!list) return;
  const news = recentPosts.filter(post => NEWS_IDS.has(post.id));
  document.getElementById('newsArchiveCount').textContent = '(' + news.length + ')';
  list.replaceChildren();
  news.forEach(post => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = post.canonicalPath;
    link.textContent = post.title;
    link.addEventListener('click', event => { event.preventDefault(); navigateTo(post.id); });
    const date = document.createElement('span');
    date.textContent = post.date;
    item.append(link, date);
    list.append(item);
  });
}

function setActiveNav(section) {
  const key = section === 'all' || section === 'japao' ? 'revista' : section === 'about' ? 'sobre' : section;
  document.querySelectorAll('#nav [data-nav]').forEach(control => {
    const active = control.dataset.nav === key;
    control.classList.toggle('active', active);
    if (active) control.setAttribute('aria-current', 'location');
    else control.removeAttribute('aria-current');
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


function filterCategory(cat, options) {
  if (document.body.classList.contains('reading-mode')) {
    document.title = HOME_TITLE;
    restoreHomeMetaDescription();
  }
  closeNavigation();
  if (cat !== 'all' && !CATEGORY_MAP[cat] && !recentPosts.some(post => post.tag === cat)) cat = 'all';
  document.body.classList.remove('about-visible');
  document.body.classList.remove('reading-mode');
  refreshEditorialHome();
  const portalUrl = new URL(window.location.href);
  portalUrl.hash = '';
  if (cat === 'all') portalUrl.searchParams.delete('cat');
  else portalUrl.searchParams.set('cat', cat);
  history.replaceState(null, '', portalUrl.pathname + portalUrl.search);
  currentFilter = cat;
  filteredPosts = getPostsByCategory(cat);
  visibleCount = 8;
  buildMainGrid(filteredPosts);
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  setActiveNav(cat);
  if (options && options.scroll === false) return;
  if (cat === 'all') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    setTimeout(() => {
      document.getElementById('grid-section').scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
}

function goToPortalSection(id) {
  filterCategory('all', {scroll: false});
  const target = document.getElementById(id);
  if (!target) return;
  if (id === 'sobre') document.body.classList.add('about-visible');
  if (id === 'newsArchive') target.open = true;
  setActiveNav(id === 'sobre' ? 'sobre' : id === 'editorias' ? 'editorias' : 'revista');
  history.replaceState(null, '', location.pathname + location.search + '#' + id);
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll: true});
  target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
}

function showJapanEditorial() { goToPortalSection('grid-section'); }
function showAbout() { goToPortalSection('sobre'); }

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
  if (!path) return SITE_ORIGIN + '/assets/brand/jr-share-card.png';
  if (/^https:\/\//i.test(path)) return SITE_ORIGIN + '/assets/brand/jr-share-card.png';
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
  const heroBg = document.getElementById('articleHeroBg');
  heroBg.style.cssText = getCardImg(post, true) + ";height:100%";
  const metaDescription = getMetaDescription();
  if (homeMetaDescription === null) {
    homeMetaDescription = metaDescription.getAttribute('content') || '';
  }
  metaDescription.setAttribute('content', post.metaDescription || post.description || extractExcerpt(post.content, 155));
  updateArticleMeta(post, id);
  document.getElementById('renderTarget').innerHTML = `
    <div class="article-brand-lockup">
      <img src="/assets/brand/jr-brandmark.svg" alt="Japão Relativo">
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
  document.body.classList.add('reading-mode');
  document.title = post.metaTitle || post.title + ' — Japão Relativo';
  window.scrollTo(0, 0);
}

function closePost() {
  document.body.classList.remove('reading-mode');
  refreshEditorialHome();
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
    refreshEditorialHome();
    document.title = HOME_TITLE;
    restoreHomeMetaDescription();
    checkHash();
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({behavior: 'instant', block: 'start'});
    else window.scrollTo(0, 0);
  }
});




// ======================================================
// INIT
// ======================================================
function checkHash() {
  const id = location.hash.replace('#', '');
  if (id && DB[id]) openPost(id);
  else if (id && !document.getElementById(id)) history.replaceState(null, '', location.pathname + location.search);
  else if (id === 'sobre') { document.body.classList.add('about-visible'); setActiveNav('sobre'); }
  else if (id === 'editorias') setActiveNav('editorias');
  else if (id === 'newsArchive') document.getElementById(id).open = true;
}

var heroPostsData = [];
var heroAllData   = [];

function getHeroDisplayTitle(post) {
  return (HOME_EDITORIAL.copy[post.id] && HOME_EDITORIAL.copy[post.id].title) || post.heroTitle || post.title;
}

function getHeroDisplaySubtitle(post) {
  return (HOME_EDITORIAL.copy[post.id] && HOME_EDITORIAL.copy[post.id].subtitle) || post.heroSubtitle || post.subtitle || '';
}


function buildLatestStrip() {
  const grid = document.getElementById('latestGrid');
  if (!grid) return;
  grid.replaceChildren();
  const used = new Set(getCurrentHeroItems().map(item => item.post.id));
  getSelectionPosts().forEach(post => used.add(post.id));
  const source = getPortalPosts();
  document.getElementById('latestTitle').textContent = 'Últimas matérias';
  source.filter(post => !used.has(post.id)).slice(0, 3).forEach((post, index) => grid.append(createEditorialCard(post, index)));
}

function getCurrentHeroItems() {
  return getHomeEditorialPosts()
    .filter(function(post) {
      return post && post.id && post.title && getCardCover(post);
    })
    .slice(0, 1)
    .map(function(post) {
      return {
        post: post,
        label: String(post.tag || post.category || 'JR').toUpperCase()
      };
    });
}


var heroRotationTimer = null;
var heroCurrentItems = [];
var heroCurrentIndex = 0;

function getHeroStamp(post) { return getEditorialStamp(post); }

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
    var slide = document.createElement('a');
    slide.className = 'hero-bg-slide' + (index === 0 ? ' active' : '');
    slide.href = item.post.canonicalPath;
    const image = document.createElement('img');
    image.src = getCardCover(item.post, 'preview');
    image.alt = '';
    image.width = isPortraitCover(item.post) ? 4 : 16;
    image.height = isPortraitCover(item.post) ? 5 : 9;
    image.fetchPriority = index === 0 ? 'high' : 'auto';
    image.decoding = 'async';
    image.addEventListener('error', () => handleCardImageError(image));
    slide.append(image);
    slide.style.cursor = 'pointer';
    slide.style.pointerEvents = index === 0 ? 'auto' : 'none';
    slide.setAttribute('aria-label', item.post.title);
    slide.addEventListener('click', function(event) { event.preventDefault(); navigateTo(item.post.id); });
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

function buildFadeHero() { renderHeroItems(getCurrentHeroItems()); }
function refreshEditorialHome() { buildFadeHero(); buildLatestStrip(); }

const EDITORIAL_TOPICS = window.JR_TOPICS || {topics: [], newsIds: [], languageIds: []};
const NEWS_IDS = new Set(EDITORIAL_TOPICS.newsIds);
const SEARCH_TOPICS = new Map(EDITORIAL_TOPICS.topics.map(topic => [topic.id, {...topic, postIds: new Set(topic.postIds)}]));
SEARCH_TOPICS.set('japones', {id: 'japones', label: 'Japonês no cotidiano', postIds: new Set(EDITORIAL_TOPICS.languageIds)});

function initSearch() {
  const dialog = document.getElementById('searchDialog');
  if (!dialog) return;
  const input = document.getElementById('searchInput');
  const list = document.getElementById('searchResults');
  const status = document.getElementById('searchStatus');
  const more = document.getElementById('searchMore');
  let topic = '', limit = 30, index = null, opener = null;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function render() {
    list.replaceChildren();
    if (!DB || !recentPosts.length) {
      status.textContent = 'O acervo está indisponível. Recarregue a página para tentar novamente.';
      more.hidden = true; return;
    }
    if (!index) index = recentPosts.map(post => ({post, text: normalize(post.title + ' ' + post.tag + ' ' + (post.subtitle || '') + ' ' + extractExcerpt(post.content, 100000))}));
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    const results = index.filter(({post, text}) => terms.every(term => text.includes(term)) && (!topic || SEARCH_TOPICS.get(topic)?.postIds.has(post.id)));
    status.textContent = results.length ? results.length + (results.length === 1 ? ' matéria encontrada' : ' matérias encontradas') + '. Exibindo ' + Math.min(limit, results.length) + '.' : 'Nenhuma matéria encontrada. Tente outra palavra ou remova o tema.';
    results.slice(0, limit).forEach(({post}) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = post.canonicalPath; link.textContent = post.title;
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); dialog.close(); navigateTo(post.id);
      });
      const meta = document.createElement('span'); meta.textContent = post.tag + ' · ' + post.date;
      item.append(link, meta); list.append(item);
    });
    more.hidden = results.length <= limit;
    document.getElementById('searchFilter').hidden = !topic;
    document.getElementById('searchTopic').textContent = topic ? 'Tema: ' + SEARCH_TOPICS.get(topic).label : '';
  }
  function open(selectedTopic) {
    opener = document.activeElement;
    if (opener.closest('#navLinks')) opener = matchMedia('(max-width: 1100px)').matches ? document.getElementById('navToggle') : document.querySelector('#navTopics summary');
    closeNavigation();
    topic = selectedTopic || ''; input.value = ''; limit = 30;
    status.textContent = 'Carregando o acervo…';
    dialog.showModal(); render(); input.focus();
  }
  document.getElementById('searchToggle').addEventListener('click', () => open(''));
  document.querySelectorAll('[data-jr-topic]').forEach(button => button.addEventListener('click', () => open(button.dataset.jrTopic)));
  document.getElementById('searchClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dialog.close(); }
  });
  dialog.addEventListener('close', () => { if (opener && opener.getClientRects().length) opener.focus(); });
  document.getElementById('searchForm').addEventListener('submit', event => { event.preventDefault(); limit = 30; render(); });
  input.addEventListener('input', () => { limit = 30; render(); });
  document.getElementById('searchClearTopic').addEventListener('click', () => { topic = ''; limit = 30; render(); input.focus(); });
  more.addEventListener('click', () => { const shown = list.children.length; limit += 30; render(); list.children[shown]?.querySelector('a').focus(); });
}

function closeNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.remove('is-open');
  const toggle = document.getElementById('navToggle');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  document.getElementById('navTopics').open = false;
}

function initMobileNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const topics = document.getElementById('navTopics');
  const summary = topics.querySelector('summary');
  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeNavigation();
    else {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || document.getElementById('searchDialog').open) return;
    if (topics.open) { topics.open = false; summary.focus(); }
    else if (nav.classList.contains('is-open')) { closeNavigation(); toggle.focus(); }
  });
  document.addEventListener('click', event => {
    const sectionLink = event.target.closest('[data-jr-scroll]');
    if (sectionLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault(); goToPortalSection(sectionLink.dataset.jrScroll); return;
    }
    if (!nav.contains(event.target)) closeNavigation();
    else if (event.target.closest('a')) closeNavigation();
  });
  topics.addEventListener('focusout', event => {
    if (!matchMedia('(max-width: 1100px)').matches && !topics.contains(event.relatedTarget)) topics.open = false;
  });
  nav.addEventListener('focusout', event => {
    if (!nav.contains(event.relatedTarget)) closeNavigation();
  });
  matchMedia('(max-width: 1100px)').addEventListener('change', closeNavigation);
  if (location.hash === '#sobre') document.body.classList.add('about-visible');
}

function redirectLegacyQuizLink() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('quiz') === 'jlpt') {
    window.location.replace('quiz.html');
    return;
  }
  var cat = params.get('cat');
  if (cat) {
    var validCats = Object.keys(CATEGORY_MAP).concat(['Idioma']);
    if (!validCats.includes(cat)) { filterCategory('all'); return; }
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
  setActiveNav(currentFilter);
  buildMainGrid(filteredPosts);
  buildFadeHero();
  buildLatestStrip();
  buildNewsArchive();
  initSearch();
  if (!posts.length) {
    document.getElementById('heroSlides').hidden = true;
    document.querySelector('.jr-hero-read').hidden = true;
    document.getElementById('ht-title').textContent = 'Acervo indisponível';
    document.getElementById('ht-sub').textContent = 'Não foi possível carregar as matérias. Recarregue a página para tentar novamente. Guias e ferramentas continuam nos links abaixo.';
    document.getElementById('ht-sub').setAttribute('role', 'alert');
  }
  checkHash();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
