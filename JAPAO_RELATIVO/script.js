/* ============================================================
   JAPÃO RELATIVO — script.js
   Interações: carousel, cards, filtros, modal de leitura
   Depende de: posts.js (const DB)
   ============================================================ */

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

// PROMPT 2 — Cards placeholder (usados se posts.js não carregar)
const CARDS_PLACEHOLDER = [
  {
    id:      'top-animes-temporada',
    tag:     'Anime',
    title:   'Top 5 Animes da Temporada de Verão',
    excerpt: 'Da ação ao slice-of-life, a temporada de verão trouxe lançamentos imperdíveis. Confira os cinco títulos que estão dominando as listas.',
    date:    '10 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1542051812871-7575058e4e28?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
  {
    id:      'cultura-matsuri',
    tag:     'Cultura',
    title:   'Matsuri: os Festivais que Definem o Japão',
    excerpt: 'Cada região do Japão tem seu próprio matsuri. Descubra os mais importantes e o que eles significam para os japoneses.',
    date:    '09 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
  {
    id:      'japones-cotidiano',
    tag:     'Idioma',
    title:   'As 10 Frases em Japonês que Você Precisa Saber',
    excerpt: 'Expressões do dia a dia que vão além do "arigatou". Aprenda como os japoneses realmente se comunicam em situações comuns.',
    date:    '08 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
  {
    id:      'saude-japonesa',
    tag:     'Saúde',
    title:   'Por Que os Japoneses Vivem Mais? A Ciência Explica',
    excerpt: 'Dieta, movimento e ikigai. Um olhar científico sobre os hábitos que colocam o Japão no topo da longevidade mundial.',
    date:    '07 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
  {
    id:      'tokyo-bairros',
    tag:     'Cultura',
    title:   'Os 7 Bairros de Tokyo que Todo Viajante Deve Conhecer',
    excerpt: 'De Shibuya a Yanaka, cada bairro de Tokyo conta uma história diferente. Qual combina com o seu estilo de viagem?',
    date:    '06 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
  {
    id:      'manga-origens',
    tag:     'Anime',
    title:   'Manga: Da Folha de Papel ao Fenômeno Global',
    excerpt: 'A história do mangá desde os ukiyo-e do século XVIII até os best-sellers digitais de hoje. Uma jornada pelo traço japonês.',
    date:    '05 de Maio de 2026',
    thumb:   'https://images.unsplash.com/photo-1542051812871-7575058e4e28?w=800&q=80',
    content: '<p>Conteúdo em breve.</p>',
  },
];

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
