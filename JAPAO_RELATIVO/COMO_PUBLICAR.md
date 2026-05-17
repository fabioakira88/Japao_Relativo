# Como publicar — Japão Relativo

## Arquivos (não alterar estrutura)

| Arquivo | Função | Edite quando |
|---|---|---|
| `posts.js` | Banco de artigos (backup) | Adicionar artigo |
| `script.js` | DB ativo + toda a lógica | Adicionar artigo |
| `style.css` | CSS com variáveis da logo | Nunca |
| `index.html` | HTML estrutural | Nunca |
| `gerar_portal.py` | Script de deploy | Nunca |

## Adicionar novo artigo

**Passo 1** — Abra `posts.js` E `script.js`, adicione no TOPO do `const DB = {`:

```javascript
"slug-unico-do-artigo": {
  title:   "Título do Artigo",
  tag:     "Cultura",
  date:    "10 de Maio de 2026",
  thumb:   "https://japaorelativo.com/wp-content/uploads/2026/05/IMAGEM.jpg",
  content: `<p>Conteúdo HTML...</p>`
},
```

**Passo 2** — Deploy:

```bash
python3 gerar_portal.py
```

## Tags disponíveis

`Cultura` | `Anime` | `Idioma` | `Saúde` | `Notícia` | `Curiosidade`
