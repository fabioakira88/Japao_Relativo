// posts.js — base de dados dos artigos do Proceder Filosófico
// Para adicionar um novo artigo, insira um objeto neste array.
// Campos obrigatórios: id, href, tag, title, excerpt, date, thumb
// Opcional: featured (boolean) — card ocupa a linha toda

const POSTS = [
  {
    id:       "confissoes-santo-agostinho",
    href:     "artigo-agostinho.html",
    tag:      "Filosofia Medieval",
    title:    "As Confissões de Santo Agostinho: seis momentos que mudaram a filosofia ocidental",
    excerpt:  "Escrito entre 397 e 400 d.C., As Confissões não é uma autobiografia. É um longo diálogo com Deus — seis momentos que atravessam séculos e ainda falam ao coração de quem os lê.",
    date:     "09 de Maio de 2026",
    thumb:    "imagens%20filosofia%20/santo_agostinho.jpeg",
    featured: true
  }
  // Próximo artigo — copie o bloco acima e preencha os campos:
  // {
  //   id:      "slug-do-artigo",
  //   href:    "artigo-slug.html",
  //   tag:     "Categoria",
  //   title:   "Título do Artigo",
  //   excerpt: "Resumo de até 2 linhas.",
  //   date:    "DD de Mês de AAAA",
  //   thumb:   "imagens%20filosofia%20/imagem.jpg"
  // }
];
