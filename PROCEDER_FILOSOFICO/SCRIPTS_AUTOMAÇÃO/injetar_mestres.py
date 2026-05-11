import requests
from requests.auth import HTTPBasicAuth

AUTH = HTTPBasicAuth('procederfilosofico@gmail.com', 'LKG2 mbly DXxA Aive gW5v Snwp')
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'

# ── Dados dos filósofos ──────────────────────────────────────
# Para substituir a imagem: edite apenas o campo "img" de cada filósofo
FILOSOFOS = [
    {
        "nome": "Epicteto",
        "periodo": "50 — 135 d.C.",
        "corrente": "Estoicismo",
        "img": "https://procederfilosofico.com.br/wp-content/uploads/2026/05/epicteto.png",
        "bio": "Nasceu escravo em Hierápolis. Tornou-se o mais radical dos estoicos: para ele, a liberdade não está nas correntes ou na ausência delas — está na distinção entre o que depende de nós e o que não depende. Seu <em>Enchiridion</em> é um dos manuais práticos de filosofia mais influentes já escritos."
    },
    {
        "nome": "Marco Aurélio",
        "periodo": "121 — 180 d.C.",
        "corrente": "Estoicismo",
        "img": "SUBSTITUIR_CANVA_MARCO_AURELIO",
        "bio": "Imperador de Roma por quase duas décadas, governou durante guerras, pragas e crises de fronteira. Mesmo no poder absoluto, escrevia para si mesmo: <em>Meditações</em> não foi escrito para publicação, mas como diário de um homem tentando ser melhor do que o cargo exigia. O filósofo-rei que Platão sonhou."
    },
    {
        "nome": "Sêneca",
        "periodo": "4 a.C. — 65 d.C.",
        "corrente": "Estoicismo",
        "img": "https://procederfilosofico.com.br/wp-content/uploads/2026/05/seneca.png",
        "bio": "Conselheiro de Nero, um dos homens mais ricos de Roma — e o mais contraditório dos estoicos. Pregou a moderação enquanto acumulava fortunas. Mas suas <em>Cartas a Lucílio</em> permanecem entre os textos mais honestos sobre o tempo, a amizade e o medo da morte que a filosofia produziu."
    },
    {
        "nome": "Platão",
        "periodo": "428 — 348 a.C.",
        "corrente": "Filosofia Clássica",
        "img": "https://procederfilosofico.com.br/wp-content/uploads/2026/05/platao-mestre.jpeg",
        "bio": "Fundou a Academia de Atenas — a primeira instituição de ensino superior do Ocidente. Discípulo de Sócrates, mestre de Aristóteles. Para Platão, o mundo que vemos é sombra de um mundo mais real, acessível apenas pela razão. Toda a filosofia ocidental, dizia Whitehead, é uma série de notas de rodapé a Platão."
    },
    {
        "nome": "Aristóteles",
        "periodo": "384 — 322 a.C.",
        "corrente": "Filosofia Clássica",
        "img": "https://procederfilosofico.com.br/wp-content/uploads/2026/05/aristoteles-mestre.jpeg",
        "bio": "Discípulo de Platão e tutor de Alexandre, o Grande. Escreveu sobre lógica, biologia, política, poética, metafísica e ética com igual profundidade. Onde Platão buscava o eterno, Aristóteles observava o concreto. A <em>Ética a Nicômaco</em> continua sendo o texto fundador da filosofia moral."
    },
    {
        "nome": "Nietzsche",
        "periodo": "1844 — 1900",
        "corrente": "Filosofia Moderna",
        "img": "https://procederfilosofico.com.br/wp-content/uploads/2026/05/nietzsche-mestre.jpg",
        "bio": "Anunciou a morte de Deus — não com alegria, mas com espanto diante do que isso significa. Filólogo antes de filósofo, Nietzsche atacou a moral, o niilismo e o conformismo com um martelo. O eterno retorno, o além-homem, a vontade de potência: conceitos que o século XX não conseguiu ignorar nem digerir completamente."
    },
    {
        "nome": "Hannah Arendt",
        "periodo": "1906 — 1975",
        "corrente": "Filosofia Contemporânea",
        "img": "SUBSTITUIR_CANVA_HANNAH_ARENDT",
        "bio": "Refugiada judia que fugiu do nazismo e se tornou a pensadora política mais importante do século XX. Cunhou a expressão 'banalidade do mal' ao cobrir o julgamento de Eichmann. Em <em>A Condição Humana</em>, distinguiu trabalho, obra e ação — e defendeu que é na ação política que a liberdade se torna real."
    },
]

JS_BLOCK = """<!-- wp:html -->
<style>
  /* ── Mestres do Pensamento ──────────────────────────── */
  #mestres-section {
    padding: 72px 24px;
    max-width: 1040px;
    margin: 0 auto;
    font-family: 'Lato', sans-serif;
  }
  .mestres-header {
    text-align: center;
    margin-bottom: 52px;
  }
  .mestres-label {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: #C9A84C;
    text-transform: uppercase;
    display: block;
    margin-bottom: 14px;
  }
  .mestres-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 4vw, 38px);
    color: #ffffff;
    font-weight: 700;
    margin: 0 0 12px;
  }
  .mestres-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.40);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }
  #mestres-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .mestre-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    aspect-ratio: 3 / 4;
    transition: transform 0.22s, border-color 0.22s;
  }
  .mestre-card:hover {
    transform: translateY(-4px);
    border-color: rgba(201,168,76,0.45);
  }
  .mestre-card:hover .mestre-bio-overlay,
  .mestre-card.active .mestre-bio-overlay {
    opacity: 1;
    transform: translateY(0);
  }
  .mestre-card:hover .mestre-footer,
  .mestre-card.active .mestre-footer {
    opacity: 0;
  }
  .mestre-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.35s;
    filter: grayscale(20%) brightness(0.88);
  }
  .mestre-card:hover .mestre-img {
    transform: scale(1.04);
    filter: grayscale(0%) brightness(0.72);
  }
  /* Placeholder quando não tem imagem do Canva */
  .mestre-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(160deg, #0d1930 0%, #060D1E 100%);
    gap: 12px;
    transition: filter 0.35s;
  }
  .mestre-card:hover .mestre-placeholder {
    filter: brightness(0.65);
  }
  .mestre-placeholder-icon {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    color: rgba(201,168,76,0.35);
  }
  .mestre-placeholder-text {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.1em;
    text-align: center;
    padding: 0 12px;
  }
  /* Rodapé visível (nome + corrente) */
  .mestre-footer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 40px 16px 16px;
    background: linear-gradient(to top, rgba(6,13,30,0.95) 0%, transparent 100%);
    transition: opacity 0.25s;
  }
  .mestre-nome {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: #ffffff;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .mestre-corrente {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.14em;
    color: #C9A84C;
    text-transform: uppercase;
  }
  /* Overlay de bio (aparece no hover/clique) */
  .mestre-bio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(170deg, rgba(6,13,30,0.97) 0%, rgba(13,25,48,0.97) 100%);
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.28s, transform 0.28s;
  }
  .mestre-bio-periodo {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.14em;
    color: rgba(201,168,76,0.70);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .mestre-bio-nome {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #ffffff;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .mestre-bio-corrente-tag {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: #060D1E;
    background: #C9A84C;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
    text-transform: uppercase;
  }
  .mestre-bio-text {
    font-size: 12.5px;
    color: rgba(255,255,255,0.68);
    line-height: 1.75;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    #mestres-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
  }
  @media (max-width: 600px) {
    #mestres-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .mestre-bio-text { -webkit-line-clamp: 5; font-size: 11.5px; }
    .mestre-bio-nome { font-size: 15px; }
    #mestres-section { padding: 48px 16px; }
  }
</style>

<section id="mestres-section">
  <div class="mestres-header">
    <span class="mestres-label">Galeria Filosófica</span>
    <h2 class="mestres-title">Mestres do Pensamento</h2>
    <p class="mestres-subtitle">Passe o mouse ou toque na imagem para conhecer a trajetória de cada filósofo.</p>
  </div>
  <div id="mestres-grid"></div>
</section>

<script>
(function() {
  if (window.__mestresInjected) return;
  window.__mestresInjected = true;

  var FILOSOFOS = """ + str(FILOSOFOS).replace("True","true").replace("False","false").replace('"img": "SUBSTITUIR_CANVA_', '"img": "PLACEHOLDER_') + """;

  function isPlaceholder(src) {
    return !src || src.indexOf('PLACEHOLDER') === 0 || src.indexOf('SUBSTITUIR') === 0;
  }

  function buildMestres() {
    var grid = document.getElementById('mestres-grid');
    if (!grid) return;

    FILOSOFOS.forEach(function(f) {
      var card = document.createElement('div');
      card.className = 'mestre-card';

      var imgHTML = isPlaceholder(f.img)
        ? '<div class="mestre-placeholder">' +
            '<div class="mestre-placeholder-icon">◆</div>' +
            '<div class="mestre-placeholder-text">Imagem Canva<br>em breve</div>' +
          '</div>'
        : '<img class="mestre-img" src="' + f.img + '" alt="' + f.nome + '" loading="lazy">';

      card.innerHTML =
        imgHTML +
        '<div class="mestre-footer">' +
          '<div class="mestre-nome">' + f.nome + '</div>' +
          '<div class="mestre-corrente">' + f.corrente + '</div>' +
        '</div>' +
        '<div class="mestre-bio-overlay">' +
          '<div class="mestre-bio-periodo">' + f.periodo + '</div>' +
          '<div class="mestre-bio-nome">' + f.nome + '</div>' +
          '<div class="mestre-bio-corrente-tag">' + f.corrente + '</div>' +
          '<div class="mestre-bio-text">' + f.bio + '</div>' +
        '</div>';

      // Mobile: toque alterna o card ativo
      card.addEventListener('click', function() {
        var isActive = card.classList.contains('active');
        document.querySelectorAll('.mestre-card.active').forEach(function(c) {
          c.classList.remove('active');
        });
        if (!isActive) card.classList.add('active');
      });

      grid.appendChild(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMestres);
  } else {
    buildMestres();
  }
})();
</script>
<!-- /wp:html -->"""

# ── Injeta na page 68 ────────────────────────────────────────
print("[1] Buscando page 68...")
r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context': 'edit'})
current_raw = r0.json().get('content', {}).get('raw', '')
print(f'  raw: {len(current_raw)} chars')

if 'mestres-section' in current_raw:
    print('  AVISO: Mestres do Pensamento já injetado. Abortando.')
    exit(0)

# Injeta antes da newsletter
NEWSLETTER_MARKER = '<!-- wp:html -->\n<style>\n  /* ── Lead Magnet'
if NEWSLETTER_MARKER in current_raw:
    new_content = current_raw.replace(NEWSLETTER_MARKER, JS_BLOCK + '\n\n' + NEWSLETTER_MARKER, 1)
else:
    new_content = current_raw + '\n\n' + JS_BLOCK

print(f'  novo raw: {len(new_content)} chars')
print("[2] Injetando Mestres do Pensamento...")
resp = requests.post(
    f'{BASE}/pages/68',
    auth=AUTH,
    json={'content': new_content, 'status': 'publish'}
)
print(f'  Status: {resp.status_code}')
if resp.ok:
    print('  ✓ Mestres do Pensamento publicado!')
    print()
    print('  Para substituir imagens no futuro, edite o array FILOSOFOS no script')
    print('  e rode novamente com a flag --update')
else:
    print(resp.text[:300])
