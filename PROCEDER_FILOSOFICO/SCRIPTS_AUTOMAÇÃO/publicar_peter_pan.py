import requests, mimetypes
from requests.auth import HTTPBasicAuth

AUTH = HTTPBasicAuth('procederfilosofico@gmail.com', 'LKG2 mbly DXxA Aive gW5v Snwp')
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'

SLUG    = 'peter-pan-sindrome-amadurecimento'
TITLE   = "J.M. Barrie e a Síndrome de Peter Pan — quando crescer dói demais"
TAG     = 'FILOSOFIA E PSICOLOGIA'
DATE    = '09 de Maio de 2026'
EXCERPT = "Peter Pan não é uma história infantil. É um diagnóstico. Existe uma pergunta que a maioria das pessoas evita fazer em voz alta: eu realmente cresci, ou apenas aprendi a fingir que cresci?"

CONTENT = """
<p>Hoje, 9 de maio, nasceu o homem que criou o menino que nunca quis crescer. Mas Peter Pan não é uma história infantil. É um diagnóstico.</p>

<p>Existe uma pergunta que a maioria das pessoas evita fazer em voz alta: <strong>eu realmente cresci, ou apenas aprendi a fingir que cresci?</strong></p>

<p>James Matthew Barrie nasceu em 9 de maio de 1860, na Escócia. Era o nono filho de uma família humilde e carregava uma história pessoal marcada por perda — seu irmão mais velho, David, morreu em um acidente aos 13 anos, e a mãe de Barrie nunca se recuperou completamente do luto. David foi, para ela, eternamente jovem. Eternamente perfeito. Eternamente criança.</p>

<p>Barrie cresceu à sombra de um morto que nunca envelheceu. E criou Peter Pan.</p>

<hr>

<h2>A síndrome que não está no manual</h2>

<p>Em 1983, o psicólogo americano Dan Kiley publicou o livro <em>The Peter Pan Syndrome</em>, descrevendo um padrão de comportamento em adultos — majoritariamente homens, mas não exclusivamente — que resistem profundamente às responsabilidades da vida madura: relacionamentos comprometidos, trabalho estável, independência emocional, capacidade de lidar com frustrações.</p>

<p>O perfil clássico não é o do "irresponsável óbvio". É muito mais sutil. É o adulto encantador, criativo, cheio de energia — que some quando as coisas ficam sérias. Que muda de emprego antes de ser avaliado. Que sabota relacionamentos no momento em que a profundidade começa a assustá-lo. Que vive em modo de preview, sempre se preparando para a vida que vai começar "em breve".</p>

<p>Kiley identificou seis características centrais: irresponsabilidade, ansiedade, solidão, dependência, problemas de relacionamento e narcisismo. Mas há uma raiz comum a todas elas — o medo. Não o medo da morte, como Freud sugeria. <strong>O medo de tornar-se.</strong></p>

<hr>

<h2>Peter Pan na cultura pop: o espelho que não mente</h2>

<p>A cultura pop é o lugar onde a filosofia aparece sem pedir licença. E a síndrome de Peter Pan está em todo lugar — só precisamos aprender a reconhecê-la.</p>

<p>Walter White, de <em>Breaking Bad</em>, passa cinco temporadas convencendo a si mesmo de que está "agindo por sua família" quando, na verdade, está finalmente se permitindo existir fora das expectativas alheias — como uma criança que descobriu que pode fazer o que quer quando os adultos saem de casa.</p>

<p>Tony Stark, antes de se tornar Homem de Ferro, é a síndrome de Peter Pan em forma de bilionário: genial, encantador, incapaz de intimidade real, sempre em fuga para a próxima aventura tecnológica. O arco de <em>Iron Man</em> é, no fundo, a história de um homem aprendendo — dolorosamente — a crescer.</p>

<p>Até <em>Bohemian Rhapsody</em> toca nesse nervo. Freddie Mercury viveu em perpétua tensão entre a criança que queria ser amada incondicionalmente e o adulto que sabia que o amor real exige presença — e presença dói.</p>

<p>E no anime? O Japão é o mestre absoluto dessa narrativa. <em>Neon Genesis Evangelion</em> é inteiramente sobre um adolescente que se recusa a amadurecer porque amadurecer significa ser responsável pelo fim do mundo. <em>Your Lie in April</em> é sobre aprender a sentir novamente depois de ter anestesiado a própria infância. <em>Spirited Away</em>, de Miyazaki, é a jornada de uma criança que só pode salvar os pais — e a si mesma — crescendo dentro de um mundo que não faz sentido.</p>

<hr>

<h2>O que a filosofia tem a dizer sobre isso</h2>

<p>Nietzsche propôs o eterno retorno como teste de afirmação da vida: se você tivesse que viver sua vida exatamente como ela é, infinitas vezes, você diria sim? A síndrome de Peter Pan é a resposta não disfarçada de <em>talvez</em>. É a vida pausada no modo rascunho, esperando condições ideais que nunca chegam.</p>

<p>Carl Jung chamaria o Peter Pan interno de <em>puer aeternus</em> — o eterno jovem, um arquétipo que habita o inconsciente e se recusa a se integrar à vida adulta. Jung não via isso como fraqueza moral, mas como um desequilíbrio psíquico: a energia do <em>puer</em> é criativa, espontânea e vital — mas sem o contrapeso do <em>senex</em> (o ancião interior, a sabedoria da experiência), ela se torna autodestrutiva.</p>

<blockquote><em>O objetivo não é matar Peter Pan. É aprender a voar e pousar.</em></blockquote>

<hr>

<h2>Crescer não é trair a criança que você foi</h2>

<p>O maior equívoco sobre amadurecimento é acreditar que ele exige abandono — que se tornar adulto significa deixar para trás a curiosidade, a imaginação, a leveza. Essa confusão é o que alimenta a síndrome.</p>

<p>Amadurecer, no sentido psicológico profundo, não é perder o encantamento. É ser capaz de <strong>sustentar o encantamento mesmo quando a vida cobra o preço da realidade</strong>. É poder amar sem fugir. Trabalhar sem se autossabotar. Estar presente sem precisar transformar cada momento em aventura para suportar a intensidade de simplesmente existir.</p>

<p>Barrie passou a vida criando histórias. Nunca se casou com plena felicidade. Teve uma relação complexa com os filhos da família Llewelyn Davies, que o inspiraram a criar Peter Pan, e que carregaram o peso dessa inspiração de formas muito diferentes ao longo de suas vidas.</p>

<p>O criador de Peter Pan, talvez mais do que qualquer outro, sabia o que custava não conseguir pousar.</p>

<p>Em 9 de maio, vale a pena perguntar: <strong>em que parte de Neverland você ainda está esperando para voltar para casa?</strong></p>
"""

# ── 1. Upload da imagem ──────────────────────────────────────
IMG_PATH = "Canva - Proceder/peter-pan.png"
print("[1] Subindo imagem...")
with open(IMG_PATH, 'rb') as f:
    img_data = f.read()

mime = mimetypes.guess_type(IMG_PATH)[0] or 'image/png'
r_img = requests.post(
    f'{BASE}/media',
    auth=AUTH,
    headers={
        'Content-Disposition': 'attachment; filename="peter-pan.png"',
        'Content-Type': mime,
    },
    data=img_data
)
if not r_img.ok:
    print(f'Erro no upload: {r_img.status_code}')
    print(r_img.text[:300])
    exit(1)

IMG_URL = r_img.json()['source_url']
print(f'  ✓ Imagem: {IMG_URL}')

# ── 2. Verifica duplicata na page 68 ────────────────────────
print("[2] Verificando duplicata...")
r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context': 'edit'})
current_raw = r0.json().get('content', {}).get('raw', '')
print(f'  Page 68: {len(current_raw)} chars')

if SLUG in current_raw:
    print(f'  AVISO: {SLUG} já publicado. Abortando.')
    exit(0)

# ── 3. Escapa conteúdo para template literal JS ─────────────
def js_escape(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

content_js  = js_escape(CONTENT.strip())
title_safe  = TITLE.replace("'", "\\'")
excerpt_safe = EXCERPT[:200].replace("'", "\\'")

# ── 4. Monta bloco JS ───────────────────────────────────────
js_block = (
    "<!-- wp:html -->\n"
    "<script>\n"
    "(function() {\n"
    "  if (typeof POSTS === 'undefined') return;\n"
    "  POSTS.unshift({\n"
    f"    slug:     '{SLUG}',\n"
    f"    title:    '{title_safe}',\n"
    f"    tag:      '{TAG}',\n"
    f"    date:     '{DATE}',\n"
    f"    excerpt:  '{excerpt_safe}',\n"
    f"    thumb:    '{IMG_URL}',\n"
    "    featured: true,\n"
    f"    content:  `{content_js}`\n"
    "  });\n"
    "})();\n"
    "</script>\n"
    "<!-- /wp:html -->"
)

new_content = js_block + '\n' + current_raw

# ── 5. Publica na page 68 ───────────────────────────────────
print("[3] Publicando na page 68...")
resp = requests.post(
    f'{BASE}/pages/68',
    auth=AUTH,
    json={'content': new_content, 'status': 'publish'}
)
print(f'  Status: {resp.status_code}')
if resp.ok:
    print(f'  Link: {resp.json().get("link", "N/A")}')
    print('  ✓ Peter Pan publicado no Proceder Filosófico!')
else:
    print(resp.text[:400])
