"""
Pré-renderiza os cards do newsGrid como HTML estático em japaorelativo.html.
Isso garante que os cards apareçam mesmo se o JavaScript falhar no browser.
O JS continua funcionando normalmente (sobrescreve os cards com versões interativas).
"""
import re, html as html_module

with open('japaorelativo.html', 'r', encoding='utf-8') as f:
    source = f.read()

# ── Extrai o script principal ──────────────────────────────────────────────
script = re.search(r'<script>(.*?)</script>', source, re.DOTALL).group(1)
db_section = script[:script.find('// STATE')]

# ── Extrai slugs na ordem correta ──────────────────────────────────────────
slugs = re.findall(r'"([\w-]+)":\s*\{', db_section)
print(f"DB com {len(slugs)} entradas")

# ── Para cada slug, extrai os campos simples ───────────────────────────────
SVG_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'

def extract_field(chunk, key):
    m = re.search(rf'{key}:"([^"]*)"', chunk)
    return html_module.unescape(m.group(1)) if m else ''

def extract_excerpt(script_text, slug, max_len=110):
    marker = f'"{slug}":'
    pos = script_text.find(marker)
    if pos == -1:
        return ''
    content_pos = script_text.find('content:`', pos)
    if content_pos == -1:
        return ''
    c_start = content_pos + 9
    c_sample = script_text[c_start:c_start + 2000]
    plain = re.sub(r'<[^>]+>', '', c_sample).replace('\n', ' ').strip()
    return plain[:max_len] + '…' if len(plain) > max_len else plain

def card_img_style(thumb):
    return f"background-image:url('{thumb}');background-size:cover;background-position:center"

cards_html = []
for i, slug in enumerate(slugs):
    pos = db_section.find(f'"{slug}":')
    chunk = db_section[pos:pos + 600]

    title   = extract_field(chunk, 'title')
    tag     = extract_field(chunk, 'tag')
    date    = extract_field(chunk, 'date')
    thumb   = extract_field(chunk, 'thumb')
    excerpt = extract_excerpt(script, slug)

    # Primeiro card tem classe especial (grande)
    extra_class = ' card-featured' if i == 0 else ''

    card = f'''<a class="card{extra_class}" href="#{slug}" data-id="{slug}">
      <div class="card-img" style="{card_img_style(thumb)}"></div>
      <div class="card-arrow">{SVG_ARROW}</div>
      <div class="card-body">
        <div class="card-tag">{tag}</div>
        <div class="card-title">{title}</div>
        <div class="card-excerpt">{excerpt}</div>
        <div class="card-date">{date}</div>
      </div>
    </a>'''
    cards_html.append(card)

# Primeiros 12 cards (visibleCount inicial)
static_cards = '\n    '.join(cards_html[:12])

# ── Substitui o div vazio pelo conteúdo pré-renderizado ───────────────────
import re as _re
new_grid = f'<div class="news-grid" id="newsGrid">\n    {static_cards}\n  </div>'

# Substitui tanto o vazio quanto o já preenchido
start_marker = '<div class="news-grid" id="newsGrid">'
end_marker = '<div class="load-more-wrap">'
s_pos = source.find(start_marker)
e_pos = source.find(end_marker)
if s_pos == -1 or e_pos == -1:
    print("ERRO: div newsGrid não encontrado")
    exit(1)
# Fecha o newsGrid: pega o </div> imediatamente antes do end_marker
chunk = source[s_pos:e_pos]
last_close = chunk.rfind('</div>')
old_block = source[s_pos:s_pos + last_close + len('</div>')]
new_source = source[:s_pos] + new_grid + source[s_pos + last_close + len('</div>'):]
print(f"Cards pré-renderizados: {len(cards_html[:12])}")

# ── Salva ──────────────────────────────────────────────────────────────────
with open('japaorelativo.html', 'w', encoding='utf-8') as f:
    f.write(new_source)

print("japaorelativo.html atualizado com cards estáticos.")
print(f"Tamanho anterior: {len(source):,} chars → Novo: {len(new_source):,} chars")
