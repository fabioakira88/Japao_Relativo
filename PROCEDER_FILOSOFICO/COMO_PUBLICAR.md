# Como publicar um novo artigo — Proceder Filosófico

## Estrutura

| Arquivo          | Função                              |
|---|---|
| `posts.js`       | Banco de artigos (dados)            |
| `index.html`     | Protótipo local do site             |
| `publicar_*.py`  | Scripts de publicação no WordPress  |

## Como adicionar um novo artigo

1. Abra `posts.js` e adicione no array `POSTS`:

```javascript
{
  id:       "slug-do-filosofo",
  tag:      "FILOSOFIA CLÁSSICA",
  title:    "Título do Artigo",
  excerpt:  "Resumo de 1-2 linhas...",
  date:     "10 de Maio de 2026",
  thumb:    "imagens filosofia /foto.jpeg",
  featured: false,
  content:  `<p>Conteúdo HTML completo...</p>`
},
```

2. Para publicar no site live (`procederfilosofico.com.br`):

```bash
# Cria um script similar ao publicar_socrates.py
# O artigo é injetado via POSTS.unshift() na page 68 do WordPress
python3 publicar_socrates.py   # adapte o slug/conteúdo
```

## Como funciona o site live

O WordPress serve `front-page.php` com `var POSTS = []` hardcoded.
A **page 68** injeta novos artigos via `POSTS.unshift()` no `<head>`.
O script sempre VERIFICA se o artigo já existe antes de publicar (sem duplicatas).

## Imagens

Use imagens de `Canva - Proceder/Filósofos/` ou suba via WP media API.
O script de publicação faz o upload automaticamente.

