# Como publicar um novo artigo — Japão Relativo

## Estrutura dos arquivos

| Arquivo      | Função                        | Edite quando...           |
|---|---|---|
| `posts.js`   | Banco de artigos (dados)      | Adicionar/editar artigo   |
| `script.js`  | Lógica e interações           | Nunca (exceto bugs)       |
| `style.css`  | Visual e cores                | Nunca (exceto design)     |
| `index.html` | Estrutura HTML                | Nunca                     |

## Como adicionar um novo artigo

Abra `posts.js` e adicione uma nova entrada no `const DB = {`:

```javascript
"slug-do-artigo": {
  title:   "Título do Artigo",
  tag:     "Cultura",          // Cultura | Idioma | Saúde | Anime | Curiosidade | Notícia
  date:    "10 de Maio de 2026",
  thumb:   "URL-DA-IMAGEM",   // Use Unsplash ou URL do WP media
  content: `
    <p>Primeiro parágrafo...</p>
    <h2>Subtítulo</h2>
    <p>Mais conteúdo...</p>
  `
},
```

Coloque o novo artigo **no topo** do DB (primeiro) para que apareça primeiro no grid.

## Para publicar no site (japaorelativo.com)

```bash
python3 gerar_portal.py
```

Este script:
1. Lê todos os artigos do `posts.js` (via `japaorelativo.html`)
2. Gera o portal com cards pré-renderizados
3. Sobe para o WordPress automaticamente

