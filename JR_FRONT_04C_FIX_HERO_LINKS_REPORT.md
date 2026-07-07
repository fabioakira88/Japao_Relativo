# JR-FRONT-04C — Fix Hero Slide Links Report

Data: 2026-07-07
Branch: `jr-front-04c-fix-hero-slide-links`

## Veredito

Correção aprovada tecnicamente para revisão. O bug da Hero foi tratado de forma cirúrgica em `SITE/index.html`, alterando apenas o JavaScript de comportamento dos slides. Não houve alteração em CSS, imagens, assets, layout, header, footer, cards, sitemap, workflow ou conteúdo editorial.

## Diagnóstico

A Hero monta 6 slides a partir do primeiro post mais recente de cada tag:

- `Notícia`.
- `Cultura`.
- `Idioma`.
- `Anime`.
- `Dicas`.
- `Artigos`.

O fundo de cada slide já recebia um listener com `navigateTo(item.post.id)`, mas todos os slides são `div`s absolutos sobrepostos. Slides invisíveis por `opacity: 0` continuavam aptos a receber eventos de ponteiro. Com isso, um slide invisível podia capturar o clique, criando a sensação de que a manchete ativa abria sempre a matéria errada.

Além disso, o painel de texto único (`#heroTextPanel`) ficava separado dos slides e não tinha destino próprio associado ao slide ativo.

## Causa Provável

- Slides invisíveis permaneciam interativos.
- O painel de texto não era tratado como link do slide ativo.
- A navegação dependia apenas do clique no fundo, mas a área visível/clicável para o usuário inclui o painel textual.

## Correção Aplicada

- Apenas o slide ativo recebe `pointer-events: auto`.
- Slides inativos recebem `pointer-events: none`.
- O painel de texto recebeu comportamento de link para o post do slide ativo.
- O painel também recebeu suporte mínimo de teclado com `Enter` e `Space`.
- `aria-label` do painel é atualizado conforme o slide ativo.
- Slides recebem `role="link"` e `aria-label` com o título da matéria.
- Nenhuma ordem de slide foi alterada.

## Slides Auditados

| Ordem | Categoria | Título | Imagem | Destino corrigido |
|---:|---|---|---|---|
| 1 | NOTÍCIA | Alerta De Calor No Japão: O Que É WBGT E Por Que Você Deve Olhar | `assets/covers/alerta-calor-tufoes-japao-verao-2026-cover.jpg` | `#alerta-calor-japao-wbgt-verao-2026` |
| 2 | CULTURA | O Cuidado Silencioso Que Organiza A Vida No Japão | `assets/covers/rotina-comunidade-japao-cuidado-silencioso-2026-cover.jpg` | `#rotina-comunidade-japao-cuidado-silencioso-2026` |
| 3 | IDIOMA | Japonês De Prefeitura: Frases Para Não Travar No Balcão | `assets/covers/frases-prefeitura-japones-sobrevivencia-2026-cover.jpg` | `#frases-prefeitura-japones-sobrevivencia-2026` |
| 4 | ANIME | Kaiba: O Anime Sobre Memória Antes Da Era Dos Avatares | `assets/covers/kaiba-anime-memoria-identidade-cover.jpg` | `#kaiba-anime-memoria-identidade` |
| 5 | DICAS | Boletos No Japão: Como Conferir Cobranças Antes De Pagar | `assets/covers/boletos-japao-conferir-cobrancas-2026-cover.jpg` | `#boletos-japao-conferir-cobrancas-2026` |
| 6 | ARTIGOS | O Japão Quer Estrangeiros, Mas Com Manual | `assets/covers/artigo-estrangeiros-com-manual.webp` | `#estrangeiros-com-manual-japao` |

## Arquivos Alterados

- `SITE/index.html`.

## Validações Executadas

- `git diff --check`: OK.
- Extração dos scripts embutidos para `/private/tmp/jr-front-04c-index-scripts.js`.
- `node --check /private/tmp/jr-front-04c-index-scripts.js`: OK.
- Teste funcional com DOM mínimo:
  - 6 slides montados.
  - clique direto de cada slide apontou para seu slug correto.
  - clique no painel após troca de slide apontou para o slug ativo correto.
  - slugs confirmados como existentes no `DB`.

## Confirmações

- Zero alteração em CSS.
- Zero alteração em imagens/assets.
- Zero alteração em layout.
- Zero alteração em header.
- Zero alteração em footer.
- Zero alteração em cards.
- Zero alteração em sitemap.
- Zero alteração em workflow.
- Zero alteração em conteúdo editorial.
- Zero troca de capas da Hero.
- Zero refatoração da Home.

## Riscos Pendentes

- A validação visual em navegador público deve ser repetida após deploy.
- A Hero ainda é implementada dentro da Home monolítica, o que aumenta custo de manutenção futura.

## Próxima Missão Recomendada

JR-FRONT-05 — semântica HTML das páginas internas.
