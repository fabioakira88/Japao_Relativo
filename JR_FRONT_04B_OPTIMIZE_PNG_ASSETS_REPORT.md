# JR-FRONT-04B — Optimize PNG Assets Report

Data: 2026-07-07
Branch: `jr-front-04b-optimize-png-assets`

## Veredito

Pacote aprovado tecnicamente para revisão: os 7 PNGs acima de 800 KB foram analisados e recomprimidos com `ffmpeg` mantendo formato, nome, caminho, dimensões, transparência e pixels decodificados. Não houve conversão para WebP, remoção de arquivos, troca editorial de imagem ou alteração em HTML, CSS, JavaScript, sitemap, workflow, layout, Hero, header, footer, cards ou conteúdo.

## Ferramentas Verificadas

- Disponível: `ffmpeg`, `sips`.
- Indisponíveis: `pngquant`, `oxipng`, `zopflipng`, `optipng`, `pngcrush`, ImageMagick, Pillow.
- `sips` foi descartado porque aumentou o tamanho de testes em PNG.
- `ffmpeg` foi usado com recompressão PNG e validação por `framemd5`.

## Inventário e Ação

| Arquivo | Uso encontrado | Tipo | Alfa | Antes | Depois | Ação |
|---|---|---|---|---:|---:|---|
| `SITE/assets/hero/tokyo.png` | Sem referência direta em `SITE/` | hero legado, possível órfão | Não | 2,101,058 B | 2,074,316 B | Recompressão PNG lossless |
| `SITE/assets/hero/fuji-sakura.png` | Sem referência direta em `SITE/` | hero legado, possível órfão | Não | 2,074,506 B | 2,032,951 B | Recompressão PNG lossless |
| `SITE/assets/hero/arrozal.png` | Sem referência direta em `SITE/` | hero legado, possível órfão | Não | 2,083,094 B | 2,081,106 B | Recompressão PNG lossless |
| `SITE/assets/covers/anime-default.png` | Fallback em `SITE/index.html` | capa fallback | Não | 2,111,065 B | 2,045,871 B | Recompressão PNG lossless |
| `SITE/assets/hero/folclore.png` | Sem referência direta em `SITE/` | hero legado, possível órfão | Não | 1,964,294 B | 1,943,109 B | Recompressão PNG lossless |
| `SITE/assets/hero/arquitetura.png` | Sem referência direta em `SITE/` | hero legado, possível órfão | Não | 2,020,434 B | 1,988,837 B | Recompressão PNG lossless |
| `SITE/assets/logo.png` | Metadados, favicon e UI | logo | Sim | 1,341,173 B | 1,206,328 B | Recompressão PNG lossless com alfa preservado |

Total dos 7 arquivos:

- Antes: 13,695,624 B.
- Depois: 13,372,518 B.
- Redução: 323,106 B.

## Referências

Referências diretas encontradas:

- `SITE/assets/logo.png`: usado em metadados Open Graph/Twitter, favicon em páginas internas e imagem no `SITE/index.html`.
- `SITE/assets/covers/anime-default.png`: usado como fallback de capa no `SITE/index.html`.

Sem referência direta em `SITE/`:

- `SITE/assets/hero/tokyo.png`.
- `SITE/assets/hero/fuji-sakura.png`.
- `SITE/assets/hero/arrozal.png`.
- `SITE/assets/hero/folclore.png`.
- `SITE/assets/hero/arquitetura.png`.

Esses arquivos foram tratados como possíveis órfãos, mas não foram apagados. A remoção exige missão separada com comprovação de não uso público e decisão editorial.

## Validações

- Dimensões preservadas:
  - hero PNGs: `1672x941`.
  - `anime-default.png`: `1254x1254`.
  - `logo.png`: `1024x1024`.
- Transparência preservada:
  - `logo.png`: `hasAlpha: yes` antes e depois.
  - demais PNGs: `hasAlpha: no`.
- Validação de pixels:
  - `ffmpeg framemd5`: `PIXELS_OK` para todos os 7 PNGs.
- Extensões preservadas: `.png`.
- Caminhos públicos preservados.
- Nenhuma referência atualizada, porque não houve conversão de formato.
- `SITE/assets/covers`: aproximadamente 68 MB após a missão.

## PNGs Acima de 800 KB Restantes

Os 7 PNGs ainda permanecem acima de 800 KB após recompressão lossless:

- `SITE/assets/hero/tokyo.png`.
- `SITE/assets/hero/fuji-sakura.png`.
- `SITE/assets/hero/arrozal.png`.
- `SITE/assets/covers/anime-default.png`.
- `SITE/assets/hero/folclore.png`.
- `SITE/assets/hero/arquitetura.png`.
- `SITE/assets/logo.png`.

Motivo: reduzir abaixo de 800 KB exigiria conversão de formato, redimensionamento, quantização com perda ou remoção. Essas ações foram evitadas nesta missão para preservar compatibilidade, transparência, rotas públicas e zero regressão visual.

## Confirmações

- Zero alteração em HTML.
- Zero alteração em CSS.
- Zero alteração em JS.
- Zero alteração em sitemap.
- Zero alteração em workflow.
- Zero alteração em layout, Hero, header, footer, cards ou Home.
- Zero revisão editorial de capas.
- Zero troca de imagem por outra.
- Zero remoção de asset.

## Riscos Pendentes

- Os cinco PNGs antigos em `SITE/assets/hero/` parecem órfãos porque existem versões WebP equivalentes e não há referência direta em `SITE/`, mas a remoção deve ser tratada em missão separada.
- `logo.png` continua acima de 800 KB por preservar transparência e compatibilidade com metadados/favicons.
- `anime-default.png` continua acima de 800 KB por ser fallback do JS e não ter sido convertido.

## Próxima Missão Recomendada

JR-FRONT-05 — semântica HTML das páginas internas.

Missões futuras opcionais:

1. Auditoria de assets órfãos em `SITE/assets/hero/`.
2. Estratégia de fallback moderno para `anime-default.png`.
3. Estratégia de logo responsivo com variantes menores preservando transparência.
