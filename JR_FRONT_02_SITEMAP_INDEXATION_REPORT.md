# JR-FRONT-02 - Sitemap e indexacao de paginas publicas

Data: 2026-07-07
Branch: `jr-front-02-sitemap-indexation`
Escopo: correcao controlada do sitemap, sem alteracao visual

## 1. Estado inicial

- Branch inicial: `main`
- Branch de trabalho criada: `jr-front-02-sitemap-indexation`
- `git status --short` inicial:
  - `?? JR_FRONT_01_SITEMAP_ASSETS_AUDIT_REPORT.md`
- Nenhum arquivo em `SITE/` estava modificado no inicio.
- Ultimos commits antes da branch:
  - `cc85ed7 Update finance guide covers`
  - `955e49e Update JR deploy editorial report`
  - `98230e3 Limit JR Pages deploy triggers`
  - `2e7a363 Add JR deploy editorial report`
  - `3e3aacf Add JR July editorial news and finance package`

## 2. Fonte de informacao

Foi lido o relatorio:

- `JR_FRONT_01_SITEMAP_ASSETS_AUDIT_REPORT.md`

Dados extraidos:

- 31 paginas HTML publicaveis encontradas.
- 22 URLs existentes no sitemap antes da correcao.
- 9 paginas ausentes no sitemap.
- 0 URLs quebradas no sitemap.
- Paginas orfas apontadas:
  - `https://japaorelativo.com/cursos/`
  - `https://japaorelativo.com/survival/obrigado/`
  - `https://japaorelativo.com/survival/restaurante-completo/`

## 3. Gerador de sitemap

Busca realizada por geradores ou scripts:

- termos: `sitemap`, `generate_seo`, `generate.*site`, `site_map`, `robots`, `package.json`, `scripts`, `automation`, `build`
- arquivos encontrados relevantes:
  - `SITE/sitemap.xml`
  - `SITE/robots.txt`
  - `build_japao_relativo_images.py`
  - `ARCHIVE/VITE-ANTIGO:/package.json`

Conclusao:

- Nao foi localizado gerador ativo de sitemap para o site publicavel atual.
- `SITE/sitemap.xml` foi editado manualmente, mantendo o padrao existente de URLs, `lastmod`, `changefreq` e `priority`.

## 4. Paginas HTML totais encontradas

Total: 31.

```text
SITE/bakari-somente-nada-alem/index.html
SITE/chotto-recusa-educada-japones/index.html
SITE/como-ler-holerite-japones-descontos-salario/index.html
SITE/cursos/ar-condicionado/index.html
SITE/cursos/index.html
SITE/financas-no-japao/index.html
SITE/furusato-nozei-passo-a-passo-brasileiros-japao-2026/index.html
SITE/fuyou-dependentes-japao-impostos-2026/index.html
SITE/guias/index.html
SITE/imposto-residencial-juminzei-japao-2026/index.html
SITE/index.html
SITE/kara-made-particulas-japones/index.html
SITE/mo-particula-tambem-japones/index.html
SITE/mou-mada-ja-ainda-japones/index.html
SITE/ni-de-lugar-acao-japones/index.html
SITE/nihongo/index.html
SITE/quiz-particulas.html
SITE/quiz.html
SITE/shakai-hoken-brasileiros-japao-2026/index.html
SITE/survival/index.html
SITE/survival/obrigado/index.html
SITE/survival/restaurante-completo/index.html
SITE/tai-expressando-desejos-japones-2026/index.html
SITE/tara-condicionais-japones-2026/index.html
SITE/te-kudasai-solicitando-instrucoes-japones-2026/index.html
SITE/te-mo-ii-pedindo-permissao-japones-2026/index.html
SITE/te-shimau-conclusao-involuntaria/index.html
SITE/wa-ga-particulas-japonesas/index.html
SITE/yappari-afinal-expectativa-japones/index.html
SITE/yori-hou-ga-ii-comparacoes-japones-2026/index.html
SITE/you-ni-naru-mudanca-habito-capacidade/index.html
```

## 5. URLs no sitemap antes

Total antes: 22 URLs.

As URLs existentes foram preservadas. Nao houve remocao de URLs.

## 6. Classificacao das 9 paginas ausentes

### Deve entrar no sitemap

1. `https://japaorelativo.com/chotto-recusa-educada-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

2. `https://japaorelativo.com/kara-made-particulas-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

3. `https://japaorelativo.com/mo-particula-tambem-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

4. `https://japaorelativo.com/mou-mada-ja-ainda-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

5. `https://japaorelativo.com/ni-de-lugar-acao-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

6. `https://japaorelativo.com/wa-ga-particulas-japonesas/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

7. `https://japaorelativo.com/yappari-afinal-expectativa-japones/`
   - Pagina publica real de Nihongo.
   - Possui title, description, canonical e Open Graph.
   - Linkada pela Home, pelo hub Nihongo e por paginas relacionadas.

### Nao deve entrar no sitemap agora

8. `https://japaorelativo.com/survival/obrigado/`
   - Pagina transacional de confirmacao.
   - Possui `<meta name="robots" content="noindex, nofollow">`.
   - Nao possui link interno publico claro.
   - Deve permanecer fora do sitemap.

9. `https://japaorelativo.com/survival/restaurante-completo/`
   - Pagina de acesso manual/premium do Survival.
   - Possui `<meta name="robots" content="noindex, nofollow, noarchive">`.
   - Nao possui link interno publico claro.
   - Deve permanecer fora do sitemap enquanto a intencao publica nao for alterada.

### Precisa de decisao posterior

- Nenhuma das 9 paginas ficou nesta categoria apos a checagem.
- A decisao sobre `cursos/` nao faz parte das 9 ausentes, pois `cursos/` ja esta no sitemap. Ela segue como tema de linkagem interna futura.

## 7. Auditoria de links internos

As 7 paginas Nihongo adicionadas aparecem linkadas em combinacoes de:

- `SITE/index.html`
- `SITE/nihongo/index.html`
- paginas Nihongo relacionadas

Resumo de linkagem encontrada:

```text
chotto-recusa-educada-japones: Home, Nihongo, mou/mada, yappari
kara-made-particulas-japones: Home, Nihongo, mo, ni/de
mo-particula-tambem-japones: Home, Nihongo, wa/ga, ni/de
mou-mada-ja-ainda-japones: Home, Nihongo, kara/made, yappari, chotto
ni-de-lugar-acao-japones: Home, Nihongo, wa/ga, kara/made
wa-ga-particulas-japonesas: Home, Nihongo, mo, kara/made, ni/de
yappari-afinal-expectativa-japones: Home, Nihongo, mou/mada, chotto
```

Paginas orfas/sem link interno claro mantidas para missao futura:

- `https://japaorelativo.com/cursos/`
- `https://japaorelativo.com/survival/obrigado/`
- `https://japaorelativo.com/survival/restaurante-completo/`

## 8. Paginas adicionadas ao sitemap

Total adicionado: 7 URLs.

```text
https://japaorelativo.com/wa-ga-particulas-japonesas/
https://japaorelativo.com/ni-de-lugar-acao-japones/
https://japaorelativo.com/mo-particula-tambem-japones/
https://japaorelativo.com/kara-made-particulas-japones/
https://japaorelativo.com/mou-mada-ja-ainda-japones/
https://japaorelativo.com/yappari-afinal-expectativa-japones/
https://japaorelativo.com/chotto-recusa-educada-japones/
```

Padrao usado:

- `lastmod`: `2026-06-22`
- `changefreq`: `monthly`
- `priority`: `0.7`

Motivo:

- Mesmo padrao usado pelas demais paginas Nihongo standalone ja existentes no sitemap.

## 9. Paginas nao adicionadas

```text
https://japaorelativo.com/survival/obrigado/
https://japaorelativo.com/survival/restaurante-completo/
```

Motivo:

- Ambas possuem `meta robots noindex`.
- Ambas nao apresentam intencao clara de indexacao publica.
- Adicionar paginas `noindex` ao sitemap criaria sinal contraditorio para buscadores.

## 10. Arquivos alterados

Arquivos alterados/criados nesta missao:

```text
SITE/sitemap.xml
JR_FRONT_02_SITEMAP_INDEXATION_REPORT.md
```

Arquivo local preexistente e ainda untracked:

```text
JR_FRONT_01_SITEMAP_ASSETS_AUDIT_REPORT.md
```

Observacao:

- O relatorio JR-FRONT-01 foi usado como fonte, mas nao e parte da alteracao funcional do sitemap.

## 11. Validacoes executadas

Executado:

```text
git status --short
git branch --show-current
git log --oneline -5
rg por geradores de sitemap
leitura de SITE/sitemap.xml
checagem de links/metadados das 9 paginas ausentes
validacao XML de SITE/sitemap.xml via xml.etree.ElementTree
validacao de URLs do sitemap contra arquivos reais em SITE/
```

Resultados:

```text
XML do sitemap: OK
URLs no sitemap depois: 29
URLs quebradas no sitemap: 0
survival/obrigado no sitemap: nao
survival/restaurante-completo no sitemap: nao
```

## 12. Confirmacao de zero alteracao visual

Confirmado:

- Nenhum layout alterado.
- Nenhum CSS alterado.
- Nenhum JS funcional alterado.
- Nenhum asset alterado.
- Nenhuma imagem alterada.
- Nenhum card alterado.
- Nenhum header alterado.
- Nenhum footer alterado.
- Nenhum conteudo editorial de pagina alterado.
- Home monolitica nao foi refatorada.

## 13. Proxima missao recomendada

JR-FRONT-03 - Linkagem interna de paginas orfas e decisao de indexacao de fluxos

Escopo sugerido:

1. Decidir se `cursos/` precisa de link interno claro em Home, Guias ou footer.
2. Manter `survival/obrigado/` fora de indexacao.
3. Manter `survival/restaurante-completo/` fora de indexacao enquanto tiver `noindex`, ou transformar oficialmente em pagina publica em missao especifica.
4. Nao mexer ainda em imagens pesadas.

Depois:

- JR-FRONT-04: otimizacao dos 16 assets acima de 800 KB.
- JR-FRONT-05: semantica HTML das paginas internas.
- JR-FRONT-06: componentes reutilizaveis.

## 14. Veredito

JR-FRONT-02 cumprida em escopo tecnico local.

O sitemap foi corrigido para incluir as paginas Nihongo publicas que ja tinham valor editorial, metadados e linkagem interna. As paginas Survival com `noindex` foram mantidas fora, evitando sinal contraditorio para buscadores.
