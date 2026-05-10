/* ============================================================
   JAPÃO RELATIVO — script.js
   Interações: carousel, cards, filtros, modal de leitura
   Depende de: posts.js (const DB)
   ============================================================ */

/* ── CONFIGURAÇÃO ────────────────────────────────────────── */
const SLIDES = [
  'wallpaper jr/IMG_2288.JPG',
  'wallpaper jr/IMG_2289.JPG',
  'wallpaper jr/IMG_2290.JPG',
  'wallpaper jr/IMG_2291.jpg',
];
const CARDS_POR_PAGINA = 12;
const ARROW = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

/* ── ESTADO ──────────────────────────────────────────────── */
let posts        = [];
let filteredPosts = [];
let visibleCount = CARDS_POR_PAGINA;
let currentFilter = 'all';

/* ── HERO CAROUSEL ───────────────────────────────────────── */
function initCarousel() {
  const slidesEl = document.getElementById('heroSlides');
  const dotsEl   = document.getElementById('heroDots');
  if (!slidesEl || !SLIDES.length) return;

  SLIDES.forEach((src, i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide' + (i === 0 ? ' active' : '');
    s.style.backgroundImage = `url('${src}')`;
    slidesEl.appendChild(s);
  });

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

function renderCards() {
  const grid = document.getElementById('cardGrid');
  if (!grid) return;
  grid.innerHTML = '';
  filteredPosts.slice(0, visibleCount).forEach(p => grid.appendChild(criarCard(p)));
  atualizarLoadMore();
}

function atualizarLoadMore() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  btn.style.display = visibleCount >= filteredPosts.length ? 'none' : 'inline-flex';
}

/* ── FILTROS ─────────────────────────────────────────────── */
function initFiltros() {
  const group = document.getElementById('filterGroup');
  if (!group) return;

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
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter || 'all';
    filteredPosts = currentFilter === 'all' ? [...posts] : posts.filter(p => p.tag === currentFilter);
    visibleCount = CARDS_POR_PAGINA;
    renderCards();
  });
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
  posts         = Object.entries(DB).map(([id, data]) => ({ id, ...data }));
  filteredPosts = [...posts];

  initCarousel();
  renderCards();
  initFiltros();
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
