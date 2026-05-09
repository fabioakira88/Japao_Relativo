"""
Gera portal.html com cards pré-renderizados (sem depender de JS para exibição inicial).
Sobe o arquivo ao WordPress.
"""
import re
import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

HTML_FILE    = Path(__file__).parent / "japaorelativo.html"
DOMINIO      = "https://japaorelativo.com"
AUTH         = HTTPBasicAuth("procederfilosofico@gmail.com", "l5vq ChwA cFXq 9niF m58W fDhg")

# ─── 1. LER ARQUIVO LOCAL ─────────────────────────────────────────
html = HTML_FILE.read_text(encoding="utf-8")

# ─── 2. EXTRAIR ARTIGOS DO DB ────────────────────────────────────
db_start = html.find("const DB = {")
db_end   = html.find("\n};", db_start)
db_block = html[db_start:db_end]

# Extrai: key, title, tag, date, thumb  (não o content, que tem backticks)
pat = re.compile(
    r'"([\w-]+)":\s*\{[^`]*?title:"([^"]+)"[^`]*?tag:"([^"]+)"[^`]*?date:"([^"]+)"[^`]*?thumb:"([^"]+)"',
    re.DOTALL,
)
articles = []
for m in pat.finditer(db_block):
    articles.append({
        "key":   m.group(1),
        "title": m.group(2),
        "tag":   m.group(3),
        "date":  m.group(4),
        "thumb": m.group(5),
    })

print(f"Artigos encontrados: {len(articles)}")
for a in articles[:5]:
    print(f"  [{a['tag']}] {a['title'][:55]}")

# ─── 3. GERAR HTML DOS CARDS ─────────────────────────────────────
ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
READ_SVG  = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'

def card_html(a, hidden=False):
    bg = f"background-image:url('{a['thumb']}');background-size:cover;background-position:center"
    style = ' style="display:none"' if hidden else ""
    return (
        f'<a class="card" href="javascript:void(0)" data-id="{a["key"]}" data-tag="{a["tag"]}"{style}>'
        f'<div class="card-img" style="{bg}"></div>'
        f'<div class="card-arrow">{ARROW_SVG}</div>'
        f'<div class="card-body">'
        f'<div class="card-tag">{a["tag"]}</div>'
        f'<div class="card-title">{a["title"]}</div>'
        f'<div class="card-date">{a["date"]}</div>'
        f'</div></a>'
    )

def card_h_html(a):
    bg = f"background-image:url('{a['thumb']}');background-size:cover;background-position:center"
    return (
        f'<a class="card-h" href="javascript:void(0)" data-id="{a["key"]}" data-tag="{a["tag"]}">'
        f'<div class="card-h-img" style="{bg}"></div>'
        f'<div class="card-h-body">'
        f'<div class="card-h-tag">{a["tag"]}</div>'
        f'<div class="card-h-title">{a["title"]}</div>'
        f'<div class="card-h-date">{a["date"]}</div>'
        f'</div></a>'
    )

def strip_item_html(a):
    return (
        f'<div class="strip-item" data-id="{a["key"]}">'
        f'<div class="strip-tag">{a["tag"]}</div>'
        f'<div class="strip-title">{a["title"]}</div>'
        f'<div class="strip-link">Ler matéria {READ_SVG}</div>'
        f'</div>'
    )

# newsGrid: primeiros 12 visíveis, restantes ocultos
news_html = "\n".join(
    card_html(a, hidden=(i >= 12))
    for i, a in enumerate(articles)
)

# moreGrid: artigos 8-16
more_html = "\n".join(card_h_html(a) for a in articles[8:16])

# strip: primeiros 3
strip_html = "\n".join(strip_item_html(a) for a in articles[:3])

# footerRecent: primeiros 6 links
footer_links = "\n".join(
    f'<li><a href="javascript:void(0)" data-id="{a["key"]}">'
    f'{a["title"][:50]}{"…" if len(a["title"]) > 50 else ""}'
    f'</a></li>'
    for a in articles[:6]
)

# ─── 4. NOVO JAVASCRIPT (filtros + abrir artigo, sem renderização inicial) ───
NEW_INIT_JS = """
// ======================================================
// INIT — cards já estão pré-renderizados no HTML
// ======================================================
function attachCardListeners() {
  document.querySelectorAll('[data-id]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      openPost(el.dataset.id);
    });
  });
}

function updateLoadMoreVisibility() {
  var hidden = document.querySelectorAll('#newsGrid .card[style*="display:none"], #newsGrid .card[style*="display: none"]');
  document.getElementById('loadMoreBtn').style.display = hidden.length ? 'inline-flex' : 'none';
}

// Filtro por categoria
document.getElementById('filterGroup').addEventListener('click', function(e) {
  var btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var filter = btn.dataset.filter;
  var shown = 0;
  document.querySelectorAll('#newsGrid .card').forEach(function(card) {
    var match = filter === 'all' || card.dataset.tag === filter || card.dataset.tag.indexOf(filter) !== -1;
    if (match) {
      card.style.display = '';
      shown++;
    } else {
      card.style.display = 'none';
    }
  });
  // Forçar reflow do first-child CSS
  var grid = document.getElementById('newsGrid');
  grid.style.display = 'none'; grid.offsetHeight; grid.style.display = '';
});

// Load more
document.getElementById('loadMoreBtn').addEventListener('click', function() {
  var hidden = document.querySelectorAll('#newsGrid .card[style*="display:none"], #newsGrid .card[style*="display: none"]');
  var count = 0;
  hidden.forEach(function(c) { if (count < 8) { c.style.display = ''; count++; } });
  updateLoadMoreVisibility();
});

// Footer filter shortcut
function filterCategory(cat) {
  window.location.hash = '#grid-section';
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  document.querySelectorAll('#newsGrid .card').forEach(function(card) {
    var match = card.dataset.tag === cat || card.dataset.tag.indexOf(cat) !== -1;
    card.style.display = match ? '' : 'none';
  });
  setTimeout(function() {
    document.getElementById('grid-section').scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function init() {
  attachCardListeners();
  updateLoadMoreVisibility();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
"""

# ─── 5. SUBSTITUIR DIVS VAZIOS ────────────────────────────────────
def replace_div(content, div_id, new_inner):
    """Substitui o conteúdo interno de <div ... id="div_id"></div>."""
    # Match empty div
    pattern = re.compile(
        r'(<div[^>]*\bid="' + div_id + r'"[^>]*>)(</div>)',
        re.DOTALL
    )
    result = pattern.sub(r'\g<1>' + new_inner + r'\g<2>', content)
    if result == content:
        print(f"  AVISO: div #{div_id} não foi substituída")
    return result

new_html = html
new_html = replace_div(new_html, "newsGrid",    news_html)
new_html = replace_div(new_html, "moreGrid",    more_html)
new_html = replace_div(new_html, "strip",       strip_html)
# footerRecent is a <ul>, not a <div>
ul_pattern = re.compile(r'(<ul\s+id="footerRecent"[^>]*>)(</ul>)', re.DOTALL)
new_html = ul_pattern.sub(r'\g<1>' + footer_links + r'\g<2>', new_html)
if new_html == html:
    print("  AVISO: ul #footerRecent não encontrada")

# ─── 6. SUBSTITUIR BLOCO JS DE FILTROS/INIT (preservar openPost e carousel) ─
# Substitui APENAS o trecho de filtros e init antigos
# Preserva: initCarousel, openPost, btnBack, scroll listener

OLD_FILTER_START = "document.getElementById('filterGroup').addEventListener('click', e => {"
NEW_SECTION_END  = "// ======================================================\n// FILM CAROUSEL"

idx_start = new_html.find(OLD_FILTER_START)
idx_end   = new_html.find(NEW_SECTION_END, idx_start)

if idx_start != -1 and idx_end != -1:
    # Substitui apenas filtros+loadMore+filterCategory+init antigos
    new_html = new_html[:idx_start] + NEW_INIT_JS + "\n" + new_html[idx_end:]
    print("  JS atualizado com sucesso")
else:
    # Fallback: substitui o init direto no final
    old_init = "buildStrip();\nbuildMainGrid(filteredPosts);\nbuildMoreGrid();\nbuildFooterRecent();"
    new_init = NEW_INIT_JS
    if old_init in new_html:
        new_html = new_html.replace(old_init, new_init)
        print("  JS atualizado (fallback)")
    else:
        print("  AVISO: bloco JS não encontrado — mantendo original")

print(f"\nHTML original: {len(html):,} chars")
print(f"HTML novo:     {len(new_html):,} chars")

# ─── 7. UPLOAD PARA O WORDPRESS ──────────────────────────────────
print("\nEnviando portal.html ao WordPress...")

r = requests.get(
    f"{DOMINIO}/wp-json/wp/v2/media?search=portal&per_page=10",
    auth=AUTH, timeout=20
)
existing = [m for m in (r.json() if r.status_code == 200 else [])
            if "portal.html" in m.get("source_url", "")]

content_bytes = new_html.encode("utf-8")

if existing:
    # Deleta o antigo e cria novo (update via API não substitui o arquivo)
    old_id = existing[0]["id"]
    requests.delete(f"{DOMINIO}/wp-json/wp/v2/media/{old_id}?force=true", auth=AUTH, timeout=20)
    print(f"  Deletado media {old_id}")

resp = requests.post(
    f"{DOMINIO}/wp-json/wp/v2/media",
    headers={
        "Content-Disposition": 'attachment; filename="portal.html"',
        "Content-Type": "text/html",
    },
    data=content_bytes,
    auth=AUTH,
    timeout=60,
)

if resp.status_code in (200, 201):
    url = resp.json().get("source_url", "")
    print(f"  ✓ Portal enviado: {url}")
    # Atualiza o redirect
    portal_url = url or f"{DOMINIO}/wp-content/uploads/2026/05/portal.html"
    redirect_content = (
        f'<!-- wp:html -->'
        f'<script>window.location.replace("{portal_url}");</script>'
        f'<noscript><meta http-equiv="refresh" content="0;url={portal_url}"></noscript>'
        f'<!-- /wp:html -->'
    )
    rr = requests.post(
        f"{DOMINIO}/wp-json/wp/v2/templates/hostinger-ai-theme//front-page",
        json={"content": redirect_content, "status": "publish"},
        auth=AUTH, timeout=30,
    )
    print(f"  Redirect atualizado: {rr.status_code}")
    print(f"\n✓ Portal disponível em: {portal_url}")
else:
    print(f"  ✗ Erro {resp.status_code}: {resp.text[:200]}")
