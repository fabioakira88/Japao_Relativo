// ONI is a separate editorial area. It never enters the JR cultural feed.
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const site = path.join(__dirname, "../SITE");
const registry = JSON.parse(
  fs.readFileSync(path.join(site, "data/oni-posts.json"), "utf8"),
);
const posts = registry.posts;
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
const header = `<a class="skip" href="#conteudo">Pular para o conteúdo</a><header class="oni-header"><div class="oni-wrap oni-header-inner"><a class="oni-mark" href="/oni-animes/" aria-label="Oni Animes — início"><img src="${brand}brandmark-web.png" width="52" height="52" alt=""></a><nav aria-label="Navegação Oni Animes"><a href="/oni-animes/#destaque">Destaque</a><a href="/oni-animes/#caminhos">Leituras</a><a href="/oni-animes/#leituras">Acervo</a><a href="${social}" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a><a class="oni-return" href="/">Japão Relativo <span aria-hidden="true">↗</span></a></nav></div></header>`;
const footer = `<footer class="oni-footer oni-wrap"><p>Oni Animes <span>Uma área editorial no Japão Relativo.</span></p><a href="${social}" target="_blank" rel="noopener noreferrer">@oni_animes_ <span aria-hidden="true">↗</span></a><a href="/">Voltar ao Japão Relativo</a></footer>`;
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
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#F4F1EB"><title>${esc(title)} — Oni Animes</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${origin + route}">${noindex ? '<meta name="robots" content="noindex,follow">' : ""}<meta property="og:site_name" content="Oni Animes"><meta property="og:type" content="${noindex ? "article" : "website"}"><meta property="og:title" content="${esc(title)} — Oni Animes"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${origin + route}"><meta property="og:image" content="${origin + (image || brand + "logo-web.png")}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="${brand}brandmark-web.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="${brand}oni.css?v=20261023-oni-v1">${jsonld ? '<script type="application/ld+json">' + jsonld.replace(/</g, "\\u003c") + "</script>" : ""}</head><body class="oni-site">${header}<main id="conteudo">${content}</main>${footer}${script ? '<script src="' + brand + 'oni.js" defer></script>' : ""}</body></html>\n`;
}
function image(p, eager = false) {
  if (!p.cover) return "";
  return `<img src="/${esc(p.cover.src)}" alt="${esc(p.cover.alt)}" width="360" height="510" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}>`;
}
const selected = [
  "monster-raciocinio-investigacao-moral",
  "steins-gate-anime-jogo-visual-novel",
  "serial-experiments-lain-biografia-anime-classico",
].map((id) => posts.find((p) => p.id === id));
const lead = posts.find((p) => p.id === "akira-biografia-anime-classico");
const home = `<section class="oni-intro oni-wrap" aria-labelledby="oni-title"><div><p class="oni-eyebrow">Anime, mangá e cultura de produção</p><h1 id="oni-title">Personagens,<br>estúdios e <em>bastidores.</em></h1><p class="oni-deck">Leituras sobre as escolhas que constroem uma obra: direção, música, simbolismo e história da animação.</p><a class="oni-action" href="#leituras">Explorar as leituras <span aria-hidden="true">↓</span></a></div><img class="oni-logo" src="${brand}logo-web.png" alt="Oni Animes" width="1254" height="1254"></section>
<section id="destaque" class="oni-feature oni-wrap" aria-labelledby="feature-title"><div class="oni-feature-copy"><p class="oni-eyebrow">Em foco / Clássicos</p><h2 id="feature-title"><a href="${url(lead)}">Akira e a construção de Neo-Tokyo</a></h2><p>${esc(lead.subtitle)}</p><a class="oni-action" href="${url(lead)}">Ler a matéria <span aria-hidden="true">→</span></a><p class="oni-small">Do acervo · ${esc(lead.date)}</p></div><a class="oni-feature-image" href="${url(lead)}" aria-label="Ler: ${esc(lead.title)}">${image(lead, true)}</a></section>
<section id="caminhos" class="oni-selection oni-wrap" aria-labelledby="selection-title"><div class="oni-section-head"><p class="oni-eyebrow">Três caminhos de leitura</p><h2 id="selection-title">Memória, escolhas e identidade.</h2></div><div class="oni-selection-grid">${selected.map((p) => `<article><a class="oni-selection-image" href="${url(p)}" tabindex="-1" aria-hidden="true">${image(p)}</a><p class="oni-eyebrow">${esc(groupFor(p).label)}</p><h3><a href="${url(p)}">${esc(p.title.split(":")[0])}</a></h3><p>${esc(p.subtitle)}</p><a class="oni-action" href="${url(p)}">Ler análise <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
<section id="leituras" class="oni-library oni-wrap" aria-labelledby="library-title"><div class="oni-section-head"><p class="oni-eyebrow">Acervo Oni Animes</p><h2 id="library-title">Encontre sua próxima leitura.</h2><p>As matérias mantêm suas datas originais. Notícias e anúncios refletem o momento da publicação; não são um calendário atualizado de estreias.</p></div><form id="oni-search" role="search"><label for="oni-query">Buscar por obra, personagem ou assunto</label><div class="oni-search-row"><input id="oni-query" name="q" type="search" placeholder="Ex.: Evangelion, memória, música" autocomplete="off"><button type="submit">Buscar</button></div></form><div class="oni-filters" role="group" aria-label="Filtrar por assunto"><button type="button" data-topic="todos" aria-pressed="true">Todas <span>${posts.length}</span></button>${groups.map((g) => `<button type="button" data-topic="${g.id}" aria-pressed="false">${g.label} <span>${posts.filter((p) => groupFor(p).id === g.id).length}</span></button>`).join("")}</div><p id="oni-status" class="oni-small" role="status" aria-live="polite">${posts.length} matérias no acervo.</p><div class="oni-results" id="oni-results">${posts.map((p) => `<article class="oni-result${p.cover ? " has-image" : ""}" data-topic="${groupFor(p).id}" data-search="${esc(p.title + " " + p.subtitle + " " + p.category)}">${p.cover ? `<a class="oni-result-image" href="${url(p)}" tabindex="-1" aria-hidden="true">${image(p)}</a>` : ""}<div><p class="oni-eyebrow">${esc(groupFor(p).label)}</p><h3><a href="${url(p)}">${esc(p.title)}</a></h3><p>${esc(p.subtitle)}</p><p class="oni-small">Publicado em ${esc(p.date)} <span aria-hidden="true">·</span> Acervo</p></div></article>`).join("")}</div><button id="oni-more" type="button" hidden>Mostrar mais matérias</button><p id="oni-empty" hidden>Nenhuma matéria encontrada. Tente outra palavra ou selecione “Todas”.</p></section>
<section class="oni-social oni-wrap" aria-labelledby="social-title"><p class="oni-eyebrow">Continue a leitura no Instagram</p><h2 id="social-title">Oni Animes, em outros formatos.</h2><p>Carrosséis e recortes sobre personagens, estúdios, simbolismo e bastidores.</p><a class="oni-action" href="${social}" target="_blank" rel="noopener noreferrer">Acompanhar @oni_animes_ <span aria-hidden="true">↗</span></a></section>`;
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
  const body = `<article class="oni-article oni-wrap"><nav class="oni-breadcrumb" aria-label="Você está aqui"><a href="/oni-animes/">Oni Animes</a><span aria-hidden="true">/</span><a href="/oni-animes/?tema=${groupFor(p).id}#leituras">${esc(groupFor(p).label)}</a></nav><header class="oni-article-heading"><p class="oni-eyebrow">${esc(p.category)}</p><h1>${esc(p.title)}</h1><p class="oni-deck">${esc(p.subtitle)}</p><p class="oni-small">Publicado em ${esc(p.date)} · Acervo Oni Animes</p></header><aside class="oni-archive-note"><strong>Do acervo.</strong> Texto publicado originalmente em ${esc(p.date)}. Anúncios, números e disponibilidade refletem esse período e podem ter mudado.</aside>${p.cover ? `<figure class="oni-article-cover">${image(p, true)}<figcaption>Arte da obra no <a href="${esc(p.cover.source)}" target="_blank" rel="noopener noreferrer">catálogo AniList</a>. Direitos dos respectivos titulares.</figcaption></figure>` : ""}<div class="oni-prose">${p.content}</div>${related.length ? `<aside class="oni-related" aria-labelledby="related-title"><h2 id="related-title">Outras leituras</h2><ul>${related.map((r) => `<li><a href="${url(r)}">${esc(r.title)}</a></li>`).join("")}</ul></aside>` : ""}<a class="oni-action" href="/oni-animes/#leituras">Voltar às leituras <span aria-hidden="true">→</span></a></article>`;
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
