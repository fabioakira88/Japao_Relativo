# MISSION JR-DEPLOY-02 — Editorial, Recent News And Pages Report

## Branch

`main`

## HEAD Inicial

`191c221 Trigger JR Pages deploy`

## HEAD Final

`3e3aacf Add JR July editorial news and finance package`

## Commits Criados Nesta Missão

- `2c9f696 Fix GitHub Pages deploy workflow`
- `3887f45 Fix JR recent content ordering and section limits`
- `3e3aacf Add JR July editorial news and finance package`

## GitHub Pages

Erro original encontrado:

`Deployment failed, try again later.`

Diagnóstico:

- `checkout`: success
- `configure-pages`: success
- `prepare static site`: success
- `upload-pages-artifact`: success
- `deploy-pages`: failure
- artefato gerado corretamente, cerca de 87 MB
- Pages configurado como `build_type: workflow`
- ambiente `github-pages` com branch policy para `main`
- permissões do workflow continham `pages: write` e `id-token: write`

Ação tomada:

- Removido o override experimental `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` do workflow.
- Deploy voltou a concluir com sucesso no commit `2c9f696`.

Status final do Pages:

- Deploy `28789096989`: success
- Site público validado em `https://japaorelativo.com/`

## Conteúdos Novos Criados

1. `cnis-gps-meu-inss-diferenca-japao-2026`
2. `comprovantes-inss-japao-organizacao-2026`
3. `boletos-japao-conferir-cobrancas-2026`
4. `prefeitura-japao-documentos-basicos-brasileiros-2026`
5. `alerta-calor-japao-wbgt-verao-2026`
6. `tufao-japao-apps-alertas-multilingues-2026`
7. `frases-prefeitura-japones-sobrevivencia-2026`
8. `frases-banco-japones-conta-cartao-2026`
9. `frases-hospital-japones-sintomas-2026`
10. `rotina-comunidade-japao-cuidado-silencioso-2026`

Conteúdo já existente e confirmado/publicado:

- `inss-brasil-japao-aposentadoria-cnis-2026`

## Categorias Usadas

- `Finanças`
- `Dicas`
- `Notícia`
- `Idioma`
- `Cultura`

## Fontes Usadas

- Meu INSS / gov.br
- INSS sobre CNIS e GPS
- Tabela oficial de códigos de pagamento do INSS
- Decreto 3.048/1999
- Japan Meteorological Agency
- Portais oficiais japoneses de orientação meteorológica e municipal
- Observação cultural e prática administrativa cotidiana no Japão

## Imagens Criadas/Adicionadas

- `SITE/assets/covers/cnis-gps-meu-inss-diferenca-japao-2026-cover.jpg` — 286 KB
- `SITE/assets/covers/prefeitura-japao-documentos-basicos-brasileiros-2026-cover.jpg` — 246 KB
- `SITE/assets/covers/boletos-japao-conferir-cobrancas-2026-cover.jpg` — 345 KB
- `SITE/assets/covers/frases-prefeitura-japones-sobrevivencia-2026-cover.jpg` — 307 KB
- `SITE/assets/covers/alerta-calor-tufoes-japao-verao-2026-cover.jpg` — 335 KB
- `SITE/assets/covers/rotina-comunidade-japao-cuidado-silencioso-2026-cover.jpg` — 426 KB

Regra visual aplicada:

- sem texto embutido;
- sem logo;
- sem watermark;
- sem placa textual;
- sem personagem reconhecível;
- sem referência protegida.

## Contagem Final

- Total de posts: `216`
- Total de slugs únicos: `216`

## Validações

Assets:

- Referências estáticas verificadas: OK
- Assets ausentes: `0`

JS:

- Scripts embutidos validados: `scripts_ok=3`

Diff:

- `git diff --check`: OK
- `git diff --cached --check`: OK antes dos commits

Servidor local:

- `http://127.0.0.1:8090/index.html`: 200
- `http://127.0.0.1:8090/financas-no-japao/`: 200
- novas capas testadas localmente: 200

Público:

- Home pública contém novos slugs: OK
- Página pública de Finanças contém INSS/CNIS/GPS e simulação: OK
- capa pública `rotina-comunidade-japao-cuidado-silencioso-2026-cover.jpg`: 200

## Ordenação e Exibição Recente

Correção aplicada:

- criada ordenação por data descendente com parser para `YYYY-MM-DD` e datas em português;
- Home usa `recentPosts`;
- blocos principais usam lista recente;
- filtros retornam conteúdos ordenados por data;
- últimas publicações e hero usam posts recentes;
- limite de mini notícias ampliado.

Validação:

Os conteúdos de `2026-07-06` aparecem antes dos conteúdos de `2026-07-05`, e estes aparecem antes das matérias antigas.

## Setor Finanças

Atualizações:

- página `SITE/financas-no-japao/index.html` ganhou link para a matéria INSS;
- ganhou link para `CNIS, GPS e Meu INSS`;
- ganhou simulação informativa com códigos `1406`, `1473` e `1929`;
- aviso editorial incluído informando que a simulação não substitui INSS, contador ou especialista previdenciário.

## Riscos Pendentes

- O commit `191c221` é um commit vazio anterior, usado antes desta missão para tentar destravar Pages. Ele permanece no histórico porque não houve reset nem force push.
- O pacote editorial novo priorizou guias e matérias de serviço com fontes oficiais. Notícias quentes devem continuar sendo adicionadas em pacotes separados, com checagem fonte a fonte.
- Algumas capas antigas do acervo ainda podem merecer auditoria visual futura.

## Próxima Missão Recomendada

`JR-DEPLOY-03 — Auditoria visual pública pós-publicação e expansão de notícias com fontes recentes`

Foco:

- abrir Home e Finanças em desktop/mobile;
- conferir cortes de capa;
- conferir console do navegador;
- adicionar pacote menor de notícias recentes com fontes jornalísticas primárias.
