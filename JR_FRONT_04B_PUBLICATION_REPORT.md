# JR-FRONT-04B — Publication Report

Data: 2026-07-07

## Resultado

JR-FRONT-04B publicada com sucesso.

## Branch e PR

- Branch de trabalho: `jr-front-04b-optimize-png-assets`.
- PR: `#22` — `JR-FRONT-04B: otimiza PNGs restantes`.
- URL: `https://github.com/fabioakira88/Japao_Relativo/pull/22`.
- Commit da missão: `00c5b6c` — `JR-FRONT-04B: optimize remaining PNG assets`.
- Merge commit em `main`: `7b1e324`.

## Arquivos Publicados

- `JR_FRONT_04B_OPTIMIZE_PNG_ASSETS_REPORT.md`.
- `SITE/assets/logo.png`.
- `SITE/assets/covers/anime-default.png`.
- `SITE/assets/hero/tokyo.png`.
- `SITE/assets/hero/fuji-sakura.png`.
- `SITE/assets/hero/arrozal.png`.
- `SITE/assets/hero/folclore.png`.
- `SITE/assets/hero/arquitetura.png`.

## Redução

- Total antes: 13,695,624 B.
- Total depois: 13,372,518 B.
- Redução: 323,106 B.

## Deploy

- Workflow: `Deploy Japão Relativo`.
- Run: `28838468362`.
- Status: `success`.
- URL: `https://github.com/fabioakira88/Japao_Relativo/actions/runs/28838468362`.

## Validação Pública

URLs verificadas com `curl -I -L`:

- `https://japaorelativo.com/` — HTTP 200.
- `https://japaorelativo.com/sitemap.xml` — HTTP 200.
- `https://japaorelativo.com/assets/logo.png` — HTTP 200, `content-length: 1206328`.
- `https://japaorelativo.com/assets/covers/anime-default.png` — HTTP 200, `content-length: 2045871`.
- `https://japaorelativo.com/assets/hero/tokyo.png` — HTTP 200, `content-length: 2074316`.

## Confirmações

- `main` local alinhada com `origin/main` após merge.
- Deploy verde.
- Nenhum HTML, CSS, JavaScript, sitemap ou workflow foi alterado.
- Nenhuma referência de imagem foi alterada.
- Nenhum asset foi apagado.
- Nenhuma conversão de formato foi feita.
- Nenhuma revisão editorial de capa foi feita.
- `logo.png` preservou transparência.
- Todos os 7 PNGs tiveram validação de pixels com `ffmpeg framemd5`.

## Pendências

- Os 7 PNGs continuam acima de 800 KB, agora documentados como limite seguro de recompressão lossless local.
- Redução adicional deve ser feita somente em missão separada envolvendo conversão planejada para WebP/AVIF, variações responsivas, auditoria de órfãos ou estratégia específica para `logo.png`.
