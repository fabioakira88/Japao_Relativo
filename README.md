# Japão Relativo

Portal editorial sobre cultura, sociedade, notícias e vida cotidiana no Japão, com foco em análise acessível para brasileiros e descendentes que acompanham o país por dentro e por fora.

URL: `japaorelativo.com`

## Estrutura

| Pasta/arquivo | Função |
|---|---|
| `SITE/index.html` | Site principal em HTML, CSS e JavaScript vanilla. Contém layout, banco de artigos e lógica de navegação. |
| `BRANDING/` | Logos, paleta e materiais visuais da marca Japão Relativo. |
| `SOCIAL_MEDIA/` | Conteúdos e peças para redes sociais. |
| `VIDEO/` | Materiais de vídeo. |
| `DOCS/` | Documentação de arquitetura e referências. |
| `EXPORTS/` | Arquivos exportados e versões prontas para uso/publicação. |
| `ARCHIVE/` | Backups, versões antigas e material legado. |
| `CNAME` | Domínio usado pelo deploy estático. |

`SITE/index.html` é a fonte única do Japão Relativo. O antigo `JAPAO_RELATIVO/index.html` foi removido para evitar publicar ou editar a cópia errada.

## Stack

- HTML estático
- CSS embutido no `SITE/index.html`
- JavaScript vanilla
- GitHub Pages/hosting estático, com domínio via `CNAME`
- Deploy via `.github/workflows/deploy.yml`, que monta `_site` a partir de `SITE/index.html`, `EXPORTS/` e `BRANDING/`

## Conteúdo

O banco de matérias fica dentro de `SITE/index.html`, no objeto `DB`.

Cada entrada segue o formato:

```js
"slug-do-artigo": {
  title: "Título da matéria",
  tag: "Cultura",
  date: "30 de Maio de 2026",
  thumb: "caminho-ou-url-da-imagem",
  content: `
    <p>Conteúdo em HTML...</p>
  `
}
```

## Como editar uma matéria

1. Abra `SITE/index.html`.
2. Localize `const DB = { ... }`.
3. Edite a entrada pelo slug.
4. Teste abrindo `SITE/index.html` no navegador.
5. Faça commit das alterações.

## Como adicionar nova matéria

1. Crie um slug curto e estável.
2. Adicione a nova entrada no topo do `DB`.
3. Use uma `tag` consistente com as editorias já usadas.
4. Aponte `thumb` para uma imagem existente ou URL pública.
5. Abra o site localmente e confira card, filtro, leitura e responsividade.

## Cuidados

- Não salve credenciais reais neste repositório.
- Não edite arquivos em `ARCHIVE/` como fonte principal.
- Evite mexer em backups `*.bak*` salvo quando estiver recuperando alguma versão antiga.
- Antes de publicar, rode:

```bash
git status
```

## Documentação relacionada

- `DOCS/ARQUITETURA.md`
