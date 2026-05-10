# Ecossistema Digital — Arquitetura dos Sites
**Última atualização:** 10 de Maio de 2026  
**Repositório:** github.com/fabioakira88/meu-ecossistema-digital

---

## Visão Geral

Dois portais de conteúdo com arquiteturas distintas, hospedados na Hostinger:

| Site | URL | Tipo | Artigos |
|---|---|---|---|
| Japão Relativo | japaorelativo.com | Portal estático (HTML inline) | 32 |
| Proceder Filosófico | procederfilosofico.com.br | WordPress + injeção JS | 16 |

---

## 1. JAPÃO RELATIVO

### Arquitetura

```
JAPAO_RELATIVO/
│
├── index.html          ← HTML semântico puro (sem estilos, sem scripts)
├── style.css           ← TODO o CSS (variáveis de cor da logo no topo)
├── script.js           ← DB de 32 artigos + toda a lógica JS
├── posts.js            ← Backup do DB (referência, não usado no deploy)
│
├── gerar_portal.py     ← ÚNICO COMANDO DE DEPLOY
│
└── imagens/
    ├── imagens layolt/     → Logo, wallpapers originais
    ├── wallpaper jr/       → Fotos do hero carousel (5 slides, 7s)
    ├── ninguem pode saber/ → Fotos do artigo Sugamo 1988
    └── imagens aleatórias/ → Fotos para cards de artigos
```

### Como funciona o deploy

```
gerar_portal.py lê index.html + style.css + script.js
→ gera portal.html (HTML único, CSS e JS inline, ~92KB)
→ substitui caminhos locais por URLs do WP media
→ sobe portal.html ao WordPress media library
→ atualiza template front-page para redirecionar para portal.html
→ Site live serve portal.html diretamente
```

### Como publicar novo artigo

```
1. Abra posts.js → adicione no TOPO do const DB = {
2. Copie a mesma entrada para script.js (mesmo const DB)
3. python3 gerar_portal.py
```

### Paleta de cores (logo)

```css
--color-primary:   #cc1122   /* Vermelho Japão */
--color-secondary: #1428e0   /* Azul profundo */
--color-navy:      #0d1f35   /* Fundo escuro */
--color-gold:      #c8a84b   /* Acento dourado */
--color-bg:        #ffffff   /* Fundo branco */
--color-text:      #111111   /* Texto principal */
```

### Estrutura de um artigo (posts.js / script.js)

```javascript
"slug-do-artigo": {
  title:   "Título completo do artigo",
  tag:     "Cultura",         // Cultura | Anime | Idioma | Saúde | Notícia | Curiosidade
  date:    "10 de Maio de 2026",
  thumb:   "URL-da-imagem",  // Unsplash ou WP media
  content: `
    <p>Conteúdo HTML...</p>
    <h2>Subtítulo</h2>
    <p>Mais conteúdo...</p>
  `
},
```

### Credenciais WordPress (japaorelativo.com)

- **Usuário:** procederfilosofico@gmail.com
- **App Password:** l5vq ChwA cFXq 9niF m58W fDhg
- **REST API:** japaorelativo.com/wp-json/wp/v2/
- **Template FSE:** hostinger-ai-theme//front-page

### Imagens subidas no WP media

| Arquivo local | URL WordPress |
|---|---|
| imagens/wallpaper jr/IMG_2288.JPG | .../wallpaper-jr-1.jpg |
| imagens/wallpaper jr/IMG_2289.JPG | .../wallpaper-jr-2.jpg |
| imagens/wallpaper jr/IMG_2290.JPG | .../wallpaper-jr-3.jpg |
| imagens/wallpaper jr/IMG_2291.jpg | .../wallpaper-jr-4.jpg |
| imagens/wallpaper jr/ghibli.jpg | .../ghibli.jpg |
| imagens/wallpaper jr/kimetsu.jpg | .../kimetsu-rotated.jpg |
| imagens/wallpaper jr/kurai.jpg | .../kurai.jpg |
| imagens/imagens layolt/logo.PNG | .../logo-jr.png |

---

## 2. PROCEDER FILOSÓFICO

### Arquitetura

```
PROCEDER_FILOSOFICO/
│
├── index.html          ← Protótipo local (dark navy, 16 artigos)
├── posts.js            ← Array POSTS com 16 artigos
├── style.css           ← CSS do protótipo local
│
├── publicar_agostinho.py   ← Template para publicar novo artigo
├── publicar_socrates.py    ← Script do artigo Sócrates
├── publicar_proceder.py    ← Script genérico (legado)
│
├── Canva - Proceder/
│   ├── Filósofos/          → Imagens dos filósofos (para thumbs)
│   ├── PDF - Filosofia/    → PDFs: Schopenhauer, Hegel, Pessoa
│   └── plutarco vs Epicuro/→ PDF do Epicuro (subido ao WP)
│
├── Marca Proceder/         → Logos SVG/PNG da marca
└── PDF ENEM/               → Provas ENEM 2021–2025
```

### Como funciona o site live

```
procederfilosofico.com.br
→ WordPress com Hostinger AI Theme
→ front-page.php hardcoda: var slides = [...] e var POSTS = [...]
→ Page 68: injeta novos artigos via POSTS.unshift() 
→ Page 68: injeta menu PDF via script JS na nav
→ Artigos aparecem na grade como cards interativos
```

### Como publicar novo artigo

```
1. Copie publicar_agostinho.py → publicar_[filosofo].py
2. Ajuste: slug, title, tag, date, excerpt, thumb, content
3. Coloque imagem em Canva - Proceder/Filósofos/
4. python3 publicar_[filosofo].py
   → Faz upload da imagem
   → Injeta via POSTS.unshift() na page 68
   → Verifica duplicata automaticamente
```

### Paleta de cores (site live)

```css
--bg: #060D1E           /* Navy escuro */
--gold: #C9A84C         /* Dourado */
--gold2: #D4B96B        /* Dourado claro */
--red: #cc2200          /* Vermelho CTA */
Fontes: Playfair Display + Cinzel + Lato
```

### Credenciais WordPress (procederfilosofico.com.br)

- **Usuário:** procederfilosofico@gmail.com
- **App Password:** LKG2 mbly DXxA Aive gW5v Snwp
- **REST API:** procederfilosofico.com.br/wp-json/wp/v2/
- **Page 68:** homepage anchor (injeta POSTS.unshift)
- **page_on_front:** 68

### Menu PDF (biblioteca)

Botão "PDFs" na nav abre painel overlay com:
- Epicuro vs Plutarco → plutarco-vs-epicuro.pdf
- Schopenhauer → artigo-schopenhauer.pdf
- Hegel → fenomenologia-hegel.pdf

---

## Regras de ouro

1. **Nunca alterar** `index.html`, `style.css`, `script.js` do JR sem deploy
2. **Sempre verificar** duplicatas antes de publicar (scripts verificam automaticamente)
3. **Imagens locais** nunca funcionam no live — sempre subir ao WP media primeiro
4. **Deploy JR:** `python3 gerar_portal.py` — um comando, tudo automatizado
5. **Deploy Proceder:** `python3 publicar_[nome].py` — um artigo por vez

---

## Fluxo completo de publicação

```
NOVO ARTIGO
    │
    ├── Japão Relativo
    │   ├── 1. posts.js: adiciona no topo do const DB
    │   ├── 2. script.js: copia a mesma entrada
    │   └── 3. python3 gerar_portal.py → LIVE
    │
    └── Proceder Filosófico
        ├── 1. Copia publicar_agostinho.py → publicar_[nome].py
        ├── 2. Ajusta os campos do artigo
        ├── 3. Coloca imagem em Canva - Proceder/Filósofos/
        └── 4. python3 publicar_[nome].py → LIVE
```
