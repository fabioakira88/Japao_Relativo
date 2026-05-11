import requests
from requests.auth import HTTPBasicAuth

AUTH = HTTPBasicAuth('procederfilosofico@gmail.com', 'LKG2 mbly DXxA Aive gW5v Snwp')
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'

CATEGORY_META = {
    'FILOSOFIA CLÁSSICA':    {'period': 'Séc. VI – IV a.C.', 'icon': 'Ω', 'desc': 'Da arkhé à forma: os pensadores que fundaram a razão ocidental.'},
    'FILOSOFIA MEDIEVAL':    {'period': 'Séc. IV – XIV d.C.', 'icon': '✦', 'desc': 'Fé, razão e Deus: a herança grega no mundo cristão.'},
    'FILOSOFIA MODERNA':     {'period': 'Séc. XVII – XVIII', 'icon': '◈', 'desc': 'Cogito, tábula rasa e crítica: a era do sujeito conhecedor.'},
    'EXISTENCIALISMO':       {'period': 'Séc. XIX – XX', 'icon': '∃', 'desc': 'A existência precede a essência. Liberdade como destino.'},
    'METAFÍSICA':            {'period': 'Perene', 'icon': '∞', 'desc': 'O que existe? O que é real? A pergunta antes de todas.'},
    'FILOSOFIA ORIENTAL':    {'period': 'Séc. VI a.C. –', 'icon': '道', 'desc': 'Confúcio, Lao-Tsé e o pensamento além do Ocidente.'},
    'FILOSOFIA CRÍTICA':     {'period': 'Séc. XX', 'icon': '⊗', 'desc': 'Adorno, Frankfurt e a crítica da razão instrumental.'},
    'FILOSOFIA E PSICOLOGIA':{'period': 'Séc. XIX – XXI', 'icon': 'Ψ', 'desc': 'Quando a mente encontra a filosofia: arquétipos, síndromes e o self.'},
}

JS_BLOCK = r"""<!-- wp:html -->
<style>
  /* ── Área de Estudo ─────────────────────────────────── */
  #area-estudo {
    padding: 72px 24px;
    max-width: 960px;
    margin: 0 auto;
    font-family: 'Lato', sans-serif;
  }
  #area-estudo .ae-header {
    text-align: center;
    margin-bottom: 52px;
  }
  #area-estudo .ae-label {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: #C9A84C;
    text-transform: uppercase;
    display: block;
    margin-bottom: 14px;
  }
  #area-estudo .ae-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 4vw, 38px);
    color: #ffffff;
    font-weight: 700;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  #area-estudo .ae-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.45);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }
  #ae-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 18px;
  }
  .ae-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.14);
    border-radius: 10px;
    padding: 28px 24px;
    cursor: pointer;
    transition: background 0.22s, border-color 0.22s, transform 0.18s;
    position: relative;
    overflow: hidden;
  }
  .ae-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #C9A84C, transparent);
    opacity: 0;
    transition: opacity 0.22s;
  }
  .ae-card:hover {
    background: rgba(201,168,76,0.07);
    border-color: rgba(201,168,76,0.40);
    transform: translateY(-3px);
  }
  .ae-card:hover::before { opacity: 1; }
  .ae-card-icon {
    font-size: 28px;
    color: #C9A84C;
    margin-bottom: 14px;
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }
  .ae-card-period {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(201,168,76,0.65);
    margin-bottom: 8px;
    font-family: 'Cinzel', serif;
  }
  .ae-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: #ffffff;
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 1.3;
  }
  .ae-card-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
    margin-bottom: 18px;
  }
  .ae-card-count {
    font-size: 12px;
    color: #C9A84C;
    font-weight: 600;
    letter-spacing: 0.06em;
  }
  /* ── Overlay de artigos filtrados ───────────────────── */
  #ae-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(6,13,30,0.97);
    z-index: 9999;
    overflow-y: auto;
    padding: 0;
    animation: aeFadeIn 0.25s ease;
  }
  @keyframes aeFadeIn { from { opacity:0 } to { opacity:1 } }
  #ae-overlay.active { display: block; }
  #ae-overlay-inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 52px 24px 80px;
  }
  #ae-overlay-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 40px;
    background: none;
    border: none;
    padding: 0;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  #ae-overlay-back:hover { color: #C9A84C; }
  #ae-overlay-cat-label {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: #C9A84C;
    text-transform: uppercase;
    display: block;
    margin-bottom: 10px;
  }
  #ae-overlay-cat-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 4vw, 34px);
    color: #ffffff;
    font-weight: 700;
    margin: 0 0 40px;
  }
  #ae-articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  .ae-article-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.18s;
  }
  .ae-article-card:hover {
    border-color: rgba(201,168,76,0.45);
    transform: translateY(-2px);
  }
  .ae-article-thumb {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    background: rgba(255,255,255,0.05);
  }
  .ae-article-body {
    padding: 20px 18px;
  }
  .ae-article-tag {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #C9A84C;
    font-family: 'Cinzel', serif;
    margin-bottom: 8px;
  }
  .ae-article-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: #ffffff;
    font-weight: 700;
    line-height: 1.35;
    margin-bottom: 8px;
  }
  .ae-article-excerpt {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .ae-article-date {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    margin-top: 12px;
  }
  /* ── Modal de artigo completo ───────────────────────── */
  #ae-modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(6,13,30,0.99);
    z-index: 10000;
    overflow-y: auto;
    animation: aeFadeIn 0.25s ease;
  }
  #ae-modal.active { display: block; }
  #ae-modal-inner {
    max-width: 720px;
    margin: 0 auto;
    padding: 52px 24px 100px;
  }
  #ae-modal-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 40px;
    background: none;
    border: none;
    padding: 0;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  #ae-modal-back:hover { color: #C9A84C; }
  #ae-modal-content h1, #ae-modal-content h2 {
    font-family: 'Playfair Display', serif;
    color: #ffffff;
  }
  #ae-modal-content h1 { font-size: clamp(24px, 4vw, 36px); margin-bottom: 8px; }
  #ae-modal-content h2 { font-size: 20px; margin: 36px 0 14px; }
  #ae-modal-content p { color: rgba(255,255,255,0.72); line-height: 1.85; margin-bottom: 18px; font-size: 16px; }
  #ae-modal-content blockquote {
    border-left: 3px solid #C9A84C;
    padding: 12px 20px;
    margin: 24px 0;
    background: rgba(201,168,76,0.06);
    border-radius: 0 6px 6px 0;
  }
  #ae-modal-content blockquote em { color: rgba(255,255,255,0.80); font-size: 15px; line-height: 1.8; }
  #ae-modal-content strong { color: rgba(255,255,255,0.92); }
  #ae-modal-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 36px 0; }
  #ae-modal-content img { max-width: 100%; border-radius: 8px; margin: 20px 0; }
  .ae-modal-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .ae-modal-tag {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #060D1E;
    background: #C9A84C;
    padding: 4px 12px;
    border-radius: 20px;
  }
  .ae-modal-date { font-size: 13px; color: rgba(255,255,255,0.35); }
  @media (max-width: 600px) {
    #ae-grid { grid-template-columns: 1fr; }
    #ae-articles-grid { grid-template-columns: 1fr; }
    #area-estudo { padding: 48px 16px; }
    #ae-overlay-inner, #ae-modal-inner { padding: 36px 16px 60px; }
  }
</style>

<div id="area-estudo">
  <div class="ae-header">
    <span class="ae-label">Navegue pelo Conhecimento</span>
    <h2 class="ae-title">Área de Estudo</h2>
    <p class="ae-subtitle">Explore os filósofos por período histórico e corrente de pensamento.</p>
  </div>
  <div id="ae-grid"></div>
</div>

<!-- Overlay: lista de artigos da categoria -->
<div id="ae-overlay">
  <div id="ae-overlay-inner">
    <button id="ae-overlay-back" onclick="window.__aeCloseOverlay()">← Voltar às categorias</button>
    <span id="ae-overlay-cat-label"></span>
    <h2 id="ae-overlay-cat-title"></h2>
    <div id="ae-articles-grid"></div>
  </div>
</div>

<!-- Modal: artigo completo -->
<div id="ae-modal">
  <div id="ae-modal-inner">
    <button id="ae-modal-back" onclick="window.__aeCloseModal()">← Voltar</button>
    <div id="ae-modal-content"></div>
  </div>
</div>

<script>
(function() {
  if (window.__aeInjected) return;
  window.__aeInjected = true;

  var CATEGORY_META = """ + str(CATEGORY_META).replace("'", '"').replace('True', 'true').replace('False', 'false') + """;

  function waitForPosts(cb, tries) {
    tries = tries || 0;
    if (typeof POSTS !== 'undefined' && POSTS.length > 0) { cb(); }
    else if (tries < 40) { setTimeout(function(){ waitForPosts(cb, tries+1); }, 150); }
  }

  function buildGrid() {
    var grid = document.getElementById('ae-grid');
    if (!grid) return;

    // Agrupa artigos por tag
    var groups = {};
    POSTS.forEach(function(p) {
      var t = p.tag || 'OUTROS';
      if (!groups[t]) groups[t] = [];
      groups[t].push(p);
    });

    // Ordem de exibição
    var order = [
      'FILOSOFIA CLÁSSICA','FILOSOFIA MEDIEVAL','FILOSOFIA MODERNA',
      'EXISTENCIALISMO','METAFÍSICA','FILOSOFIA ORIENTAL',
      'FILOSOFIA CRÍTICA','FILOSOFIA E PSICOLOGIA'
    ];
    // Adiciona categorias não previstas no final
    Object.keys(groups).forEach(function(k){ if (order.indexOf(k) < 0) order.push(k); });

    order.forEach(function(cat) {
      if (!groups[cat]) return;
      var meta = CATEGORY_META[cat] || { period:'', icon:'◆', desc:'' };
      var count = groups[cat].length;
      var card = document.createElement('div');
      card.className = 'ae-card';
      card.innerHTML =
        '<div class="ae-card-icon">' + meta.icon + '</div>' +
        '<div class="ae-card-period">' + meta.period + '</div>' +
        '<div class="ae-card-name">' + cat.replace('FILOSOFIA ', 'Filosofia ') + '</div>' +
        '<div class="ae-card-desc">' + meta.desc + '</div>' +
        '<div class="ae-card-count">' + count + ' ' + (count === 1 ? 'artigo' : 'artigos') + ' →</div>';
      card.onclick = function() { window.__aeOpenCategory(cat, groups[cat]); };
      grid.appendChild(card);
    });
  }

  window.__aeOpenCategory = function(cat, articles) {
    var overlay = document.getElementById('ae-overlay');
    var label   = document.getElementById('ae-overlay-cat-label');
    var title   = document.getElementById('ae-overlay-cat-title');
    var grid    = document.getElementById('ae-articles-grid');
    if (!overlay) return;

    label.textContent = 'Área de Estudo';
    title.textContent = cat.charAt(0) + cat.slice(1).toLowerCase().replace('filosofia ','Filosofia ');
    grid.innerHTML = '';

    articles.forEach(function(p) {
      var card = document.createElement('div');
      card.className = 'ae-article-card';
      var thumbSrc = p.thumb || '';
      card.innerHTML =
        (thumbSrc ? '<img class="ae-article-thumb" src="' + thumbSrc + '" alt="" loading="lazy">' : '') +
        '<div class="ae-article-body">' +
          '<div class="ae-article-tag">' + (p.tag||'') + '</div>' +
          '<div class="ae-article-title">' + (p.title||'') + '</div>' +
          '<div class="ae-article-excerpt">' + (p.excerpt||'') + '</div>' +
          '<div class="ae-article-date">' + (p.date||'') + '</div>' +
        '</div>';
      card.onclick = function() { window.__aeOpenArticle(p); };
      grid.appendChild(card);
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  };

  window.__aeCloseOverlay = function() {
    var overlay = document.getElementById('ae-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.__aeOpenArticle = function(p) {
    var modal   = document.getElementById('ae-modal');
    var content = document.getElementById('ae-modal-content');
    if (!modal || !content) return;

    content.innerHTML =
      '<h1>' + (p.title||'') + '</h1>' +
      '<div class="ae-modal-meta">' +
        '<span class="ae-modal-tag">' + (p.tag||'') + '</span>' +
        '<span class="ae-modal-date">' + (p.date||'') + '</span>' +
      '</div>' +
      (p.content||'<p>Conteúdo em breve.</p>');

    modal.classList.add('active');
    modal.scrollTop = 0;
  };

  window.__aeCloseModal = function() {
    var modal = document.getElementById('ae-modal');
    if (modal) modal.classList.remove('active');
  };

  // Fecha com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.__aeCloseModal();
      window.__aeCloseOverlay();
      document.body.style.overflow = '';
    }
  });

  waitForPosts(buildGrid);
})();
</script>
<!-- /wp:html -->"""

# ── Injeta na page 68 ────────────────────────────────────────
print("[1] Buscando page 68...")
r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context': 'edit'})
current_raw = r0.json().get('content', {}).get('raw', '')
print(f'  raw: {len(current_raw)} chars')

if 'area-estudo' in current_raw:
    print('  AVISO: Área de Estudo já injetada. Abortando.')
    exit(0)

# Injeta antes do bloco da newsletter (que já está no final)
if 'proceder-newsletter' in current_raw:
    new_content = current_raw.replace(
        '<!-- wp:html -->\n<style>\n  /* ── Lead Magnet',
        JS_BLOCK + '\n\n<!-- wp:html -->\n<style>\n  /* ── Lead Magnet'
    )
else:
    new_content = current_raw + '\n\n' + JS_BLOCK

print("[2] Injetando Área de Estudo...")
resp = requests.post(
    f'{BASE}/pages/68',
    auth=AUTH,
    json={'content': new_content, 'status': 'publish'}
)
print(f'  Status: {resp.status_code}')
if resp.ok:
    print('  ✓ Área de Estudo publicada em procederfilosofico.com.br!')
else:
    print(resp.text[:300])
