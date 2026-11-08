// ONI is a separate editorial area. It never enters the JR cultural feed.
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const site = path.join(__dirname, "../SITE");
const registry = JSON.parse(
  fs.readFileSync(path.join(site, "data/oni-posts.json"), "utf8"),
);
const posts = registry.posts;
const illustrations = JSON.parse(fs.readFileSync(path.join(site, "data/oni-illustrations.json"), "utf8")).illustrations;
for (const art of illustrations) {
  for (const key of ["src", "thumbnail"]) {
    if (!/^assets\/oni-animes\/illustrations\/[a-z0-9-]+\.webp$/.test(art[key]) || !fs.existsSync(path.join(site, art[key]))) throw Error("Invalid illustration: " + art.id);
  }
  if (createHash("sha256").update(fs.readFileSync(path.join(site, art.src))).digest("hex") !== art.sha256) throw Error("Changed illustration: " + art.id);
}
function illustratedContent(p) {
  const art = illustrations.find(a => a.kind === "interior" && a.articleId === p.id);
  if (!art) return p.content;
  const figure = '<figure class="oni-inline-illustration"><img src="/' + esc(art.src) + '" srcset="/' + esc(art.thumbnail) + ' 600w, /' + esc(art.src) + ' ' + art.width + 'w" sizes="(max-width: 760px) 92vw, 760px" width="' + art.width + '" height="' + art.height + '" loading="lazy" decoding="async" alt="' + esc(art.alt) + '"><figcaption>' + esc(art.caption) + ' Ilustração editorial gerada com IA.</figcaption></figure>';
  let inserted = false;
  const content = p.content.replace(/<\/p>/i, end => { inserted = true; return end + figure; });
  return inserted ? content : content + figure;
}
const identity = JSON.parse(
  fs.readFileSync(path.join(site, "assets/oni-animes/identity.json"), "utf8"),
);
for (const [name, asset] of Object.entries(identity.assets)) {
  const actual = createHash("sha256")
    .update(
      fs.readFileSync(path.join(site, "assets/oni-animes", name + ".png")),
    )
    .digest("hex");
  if (actual !== asset.sha256)
    throw Error("ONI original identity changed: " + name);
}
const nightIdentity = JSON.parse(fs.readFileSync(path.join(site, "assets/oni-animes/night-identity.json"), "utf8"));
for (const [filename, asset] of Object.entries(nightIdentity.assets)) {
  if (!/^[a-z0-9-]+\.png$/.test(filename)) throw Error("Invalid ONI asset path");
  const actual = createHash("sha256").update(fs.readFileSync(path.join(site, "assets/oni-animes", filename))).digest("hex");
  if (actual !== asset.sha256) throw Error("ONI Night identity changed: " + filename);
}
const esc = (s) =>
  String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const url = (p) => "/oni-animes/" + p.id + "/";
const groups = [
  { id: "classicos", label: "Clássicos", categories: ["Clássicos", "Gundam"] },
  { id: "jogos", label: "Dos jogos ao anime", categories: ["Jogos", "Games"] },
  { id: "terror", label: "Terror", categories: ["Terror"] },
  {
    id: "investigacao",
    label: "Investigação e psicologia",
    categories: ["Raciocínio"],
  },
  {
    id: "obras",
    label: "Obras e personagens",
    categories: ["Recomendações", "Personagens", "Fantasia", "Nova geração"],
  },
  {
    id: "industria",
    label: "Indústria e temporadas",
    categories: [
      "Produção",
      "Cinema",
      "TV",
      "Streaming",
      "Temporada",
      "Animes",
      "Estreias",
      "Turismo pop",
      "One Piece",
      "JoJo's Bizarre Adventure",
      "Anime",
      "Sinopses",
    ],
  },
];
const groupFor = (p) => groups.find((g) => g.categories.includes(p.category));
const known = new Set();
for (const p of posts) {
  if (!/^[a-z0-9-]+$/.test(p.id) || known.has(p.id) || !groupFor(p))
    throw Error("Invalid ONI record: " + p.id);
  known.add(p.id);
  if (
    p.cover &&
    (!p.cover.source || !fs.existsSync(path.join(site, p.cover.src)))
  )
    throw Error("Missing ONI cover/source: " + p.id);
  if (/<(?:img|script|iframe)\b/i.test(p.content))
    throw Error("Unreviewed embedded ONI media: " + p.id);
}
const origin = "https://japaorelativo.com";
const social = "https://www.instagram.com/oni_animes_/";
const brand = "/assets/oni-animes/";
const header = `<a class="skip" href="#conteudo">Pular para o conteúdo</a><header class="oni-header"><div class="oni-wrap oni-header-inner"><a class="oni-mark" href="/oni-animes/" aria-label="Oni Animes — início"><img class="oni-full-logo" src="${brand}oni-logo-transparent.png" width="90" height="106" alt="Oni Animes"></a><nav aria-label="Navegação Oni Animes"><a href="/oni-animes/#leituras">Acervo</a><a href="${social}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a class="oni-return" href="/">Japão Relativo ↗</a></nav></div></header>`;
const footer = `<footer class="oni-footer oni-wrap"><a href="/oni-animes/" aria-label="Oni Animes — início"><img class="oni-full-logo" src="${brand}oni-logo-transparent.png" width="90" height="106" alt="Oni Animes"></a><p>Uma área editorial no Japão Relativo.<br><span>Anime, mangá e histórias que ficam.</span></p><a href="${social}" target="_blank" rel="noopener noreferrer">@oni_animes_ ↗</a><a href="/">Voltar ao Japão Relativo</a></footer>`;
function page({
  title,
  description,
  route,
  content,
  image,
  noindex = false,
  script = false,
  jsonld = "",
}) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#090A0C"><title>${esc(title)} — Oni Animes</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${origin + route}">${noindex ? '<meta name="robots" content="noindex,follow">' : ""}<meta property="og:site_name" content="Oni Animes"><meta property="og:type" content="${noindex ? "article" : "website"}"><meta property="og:title" content="${esc(title)} — Oni Animes"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${origin + route}"><meta property="og:image" content="${origin + (image || brand + "oni-mask-original.png")}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="${brand}oni-mask-original.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="${brand}oni.css?v=20261023-oni-v1">${jsonld ? '<script type="application/ld+json">' + jsonld.replace(/</g, "\\u003c") + "</script>" : ""}</head><body class="oni-site">${header}<main id="conteudo">${content}</main>${footer}${'<script src="' + brand + 'oni.js" defer></script>'}</body></html>\n`;
}
function image(p, eager = false) {
  if (!p.cover) return "";
  return `<img src="/${esc(p.cover.src)}" alt="${esc(p.cover.alt)}" width="${p.cover.width || 360}" height="${p.cover.height || 510}"${p.cover.thumbnail ? ` srcset="/${esc(p.cover.thumbnail)} 600w, /${esc(p.cover.src)} ${p.cover.width}w" sizes="${eager ? "(max-width: 760px) 92vw, 900px" : "(max-width: 760px) 92vw, 420px"}"` : ""} loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}>`;
}
const selected = [
  "monster-raciocinio-investigacao-moral",
  "steins-gate-anime-jogo-visual-novel",
  "serial-experiments-lain-biografia-anime-classico",
].map((id) => posts.find((p) => p.id === id));
const lead = posts.find((p) => p.id === "akira-biografia-anime-classico");
const home = `<section class="oni-intro oni-wrap" aria-labelledby="oni-title"><div><p class="oni-eyebrow">Anime é só o começo</p><h1 id="oni-title">O episódio acaba.<br><em>A história, não.</em></h1><p class="oni-deck">Personagens que ficam. Histórias que provocam. Um olhar sobre anime, mangá e tudo o que continua depois dos créditos.</p><a class="oni-action oni-primary" href="#leituras">Encontre sua próxima leitura <span aria-hidden="true">↓</span></a><p class="oni-hero-note">${posts.length} matérias no acervo · Uma identidade própria dentro do JR.</p></div><div class="oni-emblem"><span>IDENTIDADE / ONI</span><img src="${brand}oni-mask-original.png" alt="Máscara Oni original, com olhos e corte vermelhos" width="1254" height="1254" fetchpriority="high"><span>FORÇA. MISTÉRIO. PAIXÃO PELA HISTÓRIA.</span></div></section>
<section id="leituras" class="oni-library oni-wrap" aria-labelledby="library-title"><div class="oni-section-head"><p class="oni-eyebrow">Acervo Oni Animes</p><h2 id="library-title">Encontre sua próxima leitura.</h2><p>As matérias mantêm suas datas originais. Notícias e anúncios refletem o momento da publicação; não são um calendário atualizado de estreias.</p></div><form id="oni-search" role="search"><label for="oni-query">Buscar por obra, personagem ou assunto</label><div class="oni-search-row"><input maxlength="120" id="oni-query" name="q" type="search" placeholder="Ex.: Evangelion, memória, música" autocomplete="off"><button type="submit">Buscar</button></div></form><div class="oni-filters" role="group" aria-label="Filtrar por assunto"><button type="button" data-topic="todos" aria-pressed="true">Todas <span>${posts.length}</span></button>${groups.map((g) => `<button type="button" data-topic="${g.id}" aria-pressed="false">${g.label} <span>${posts.filter((p) => groupFor(p).id === g.id).length}</span></button>`).join("")}</div><p id="oni-status" class="oni-small" role="status" aria-live="polite">${posts.length} matérias no acervo.</p><div class="oni-results" id="oni-results">${posts.map((p) => `<article id="card-${p.id}" class="oni-result${p.cover ? " has-image" : ""}" data-topic="${groupFor(p).id}" data-search="${esc(p.title + " " + p.subtitle + " " + p.category)}">${p.cover ? `<a class="oni-result-image" href="${url(p)}" tabindex="-1" aria-hidden="true">${image(p)}</a>` : ""}<div><p class="oni-eyebrow">${esc(groupFor(p).label)}</p><h3><a href="${url(p)}">${esc(p.title)}</a></h3><p>${esc(p.subtitle)}</p><p class="oni-small">Publicado em ${esc(p.date)} <span aria-hidden="true">·</span> Acervo</p></div></article>`).join("")}</div><button id="oni-more" type="button" hidden>Mostrar mais matérias</button><div id="oni-empty" hidden><h3>Uma leitura pode estar em outro tema.</h3><p id="oni-empty-message">Tente outra palavra ou categoria.</p><button id="oni-all-topics" type="button">Buscar em todos os temas</button><button id="oni-clear" type="button">Limpar busca e filtros</button></div></section>
<section id="destaque" class="oni-feature oni-wrap" aria-labelledby="feature-title"><div class="oni-feature-copy"><p class="oni-eyebrow">Em foco / Clássicos</p><h2 id="feature-title"><a href="${url(lead)}">Akira e a construção de Neo-Tokyo</a></h2><p>${esc(lead.subtitle)}</p><a class="oni-action" href="${url(lead)}">Ler a matéria <span aria-hidden="true">→</span></a><p class="oni-small">Do acervo · ${esc(lead.date)}</p></div><a class="oni-feature-image" href="${url(lead)}" aria-label="Ler: ${esc(lead.title)}">${image(lead, true)}</a></section>
<section id="caminhos" class="oni-selection oni-wrap" aria-labelledby="selection-title"><div class="oni-section-head"><p class="oni-eyebrow">Três caminhos de leitura</p><h2 id="selection-title">Memória, escolhas e identidade.</h2></div><div class="oni-selection-grid">${selected.map((p) => `<article><a class="oni-selection-image" href="${url(p)}" tabindex="-1" aria-hidden="true">${image(p)}</a><p class="oni-eyebrow">${esc(groupFor(p).label)}</p><h3><a href="${url(p)}">${esc(p.title.split(":")[0])}</a></h3><p>${esc(p.subtitle)}</p><a class="oni-action" href="${url(p)}">Ler análise <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
<section class="oni-social oni-wrap" aria-labelledby="social-title"><div><p class="oni-eyebrow">O olhar Oni</p><h2 id="social-title">Além da superfície.</h2><p>Direção, personagens, memória e cultura. Cada leitura abre outra perspectiva sobre a obra.</p><a class="oni-action" href="${social}" target="_blank" rel="noopener noreferrer">Acompanhar @oni_animes_ ↗</a></div><img src="${brand}oni-mascot-cutout.png" width="160" height="240" loading="lazy" alt="Mascote Oni de cabelos brancos, chifres pretos e roupa preta e vermelha"></section>`;
const dir = path.join(site, "oni-animes");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  path.join(dir, "index.html"),
  page({
    title: "Personagens, estúdios e bastidores",
    description:
      "Oni Animes: análises de obras, personagens, direção, simbolismo e história da animação. Uma área editorial no Japão Relativo.",
    route: "/oni-animes/",
    content: home,
    script: true,
  }),
);
for (const p of posts) {
  const related = posts
    .filter((r) => r.id !== p.id && groupFor(r).id === groupFor(p).id)
    .slice(0, 2);
  const body = `<article class="oni-article oni-wrap"><nav class="oni-breadcrumb" aria-label="Você está aqui"><a href="/oni-animes/">Oni Animes</a><span aria-hidden="true">/</span><a href="/oni-animes/?tema=${groupFor(p).id}#leituras">${esc(groupFor(p).label)}</a></nav><header class="oni-article-heading"><p class="oni-eyebrow">${esc(p.category)}</p><h1>${esc(p.title)}</h1><p class="oni-deck">${esc(p.subtitle)}</p><p class="oni-small">Publicado em ${esc(p.date)} · Acervo Oni Animes</p></header><aside class="oni-archive-note"><strong>Do acervo.</strong> Texto publicado originalmente em ${esc(p.date)}. Anúncios, números e disponibilidade refletem esse período e podem ter mudado.</aside>${p.cover ? `<figure class="oni-article-cover">${image(p, true)}<figcaption>${p.cover.kind === "editorial-illustration" ? "Ilustração editorial gerada com IA para Oni Animes; interpretação visual do tema, sem vínculo oficial com a obra." : `Arte da obra no <a href="${esc(p.cover.source)}" target="_blank" rel="noopener noreferrer">catálogo AniList</a>. Direitos dos respectivos titulares.`}</figcaption></figure>` : ""}<div class="oni-prose">${illustratedContent(p)}</div>${related.length ? `<aside class="oni-related" aria-labelledby="related-title"><h2 id="related-title">Outras leituras</h2><ul>${related.map((r) => `<li><a href="${url(r)}">${esc(r.title)}</a></li>`).join("")}</ul></aside>` : ""}<a class="oni-action oni-back" href="/oni-animes/#leituras">Voltar às leituras <span aria-hidden="true">→</span></a></article>`;
  const folder = path.join(dir, p.id);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(
    path.join(folder, "index.html"),
    page({
      title: p.title,
      description: p.subtitle,
      route: url(p),
      content: body,
      image: p.cover ? "/" + p.cover.src : undefined,
      noindex: true,
      jsonld: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        mainEntityOfPage: origin + url(p),
        publisher: {
          "@type": "Organization",
          name: "Oni Animes",
          url: origin + "/oni-animes/",
        },
      }),
    }),
  );
}
console.log(
  "Built ONI: " +
    posts.length +
    " archive articles, " +
    groups.length +
    " reviewed topics; JR feed remains separate.",
);
