# MISSION JR-CONSULTORIA HUB MVP REPORT

## Estado

- Branch: `feature/jr-consultoria-hub-mvp-claude`
- Base comum informada: `main` em `5cb8571`
- Head auditado antes desta correção: `2911319`
- Resultado: `READY FOR VISUAL AND EDITORIAL REVIEW — NO PUSH / NO DEPLOY`

## Escopo concluído

- Hub `/consultoria/` preservado como base vencedora.
- Sete serviços carregados por `SITE/assets/data/consultoria-services.json`.
- Quatro guias completos preservados:
  - `/consultoria/renovacao-periodo-permanencia/`
  - `/consultoria/passaporte-brasileiro/`
  - `/consultoria/kakutei-shinkoku/`
  - `/consultoria/shaken/`
- Card/link de `JR Apoio no Japão` adicionado em `/guias/`.
- GA4 revisado para evitar duplicação de snippets e chamadas de configuração nas páginas de consultoria.
- Bloco de chamada na home mantido e validado visualmente.
- Dados sensíveis e regulatórios revisados contra fontes oficiais citadas nos guias.

## Arquivos alterados nesta etapa

- `SITE/assets/js/jr-ga4.js`
- `SITE/assets/css/consultoria.css`
- `SITE/consultoria/index.html`
- `SITE/consultoria/renovacao-periodo-permanencia/index.html`
- `SITE/consultoria/passaporte-brasileiro/index.html`
- `SITE/consultoria/kakutei-shinkoku/index.html`
- `SITE/consultoria/shaken/index.html`
- `SITE/guias/index.html`
- `MISSION_JR_CONSULTORIA_HUB_MVP_REPORT.md`

## GA4

Antes da correção, cada página da área de consultoria repetia o snippet completo do Google Tag Manager/GA4.

Correção aplicada:

- criado `SITE/assets/js/jr-ga4.js`;
- removidos snippets inline repetidos das páginas de consultoria;
- páginas passam a carregar um helper único com `defer`;
- o helper injeta `gtag/js` somente quando o script ainda não existe;
- o helper protege `gtag("config", "G-HXLGFZ5H4Q")` com `window.__jrGa4Configured`.

O `SITE/index.html` foi preservado sem alteração nesta etapa.

## Revisão sensível e regulatória

Revisão feita em julho de 2026, sem alterar o teor editorial porque os guias já estavam com limites corretos:

- Renovação do período de permanência: mantém órgão correto, janela de aproximadamente três meses, processamento estimado, taxa presencial e taxa online como informação sujeita a conferência na Immigration Services Agency.
- Passaporte brasileiro: mantém separação entre e-Consular, jurisdição, menores, correio e taxas consulares; fontes oficiais do Itamaraty permanecem visíveis no guia.
- Kakutei Shinkoku: mantém linguagem educativa, sem promessa de restituição, sem aconselhamento tributário individual e com fontes da NTA/e-Tax.
- Shaken: mantém distinção entre inspeção, manutenção, validade e serviços automotivos, sem promessa de aprovação.

Informações omitidas intencionalmente:

- listas documentais completas por status de residência;
- valores finais individualizados;
- análise jurídica, migratória, contábil ou tributária personalizada;
- garantia de prazo, aprovação, restituição ou resultado.

## Validações executadas

- `git diff --check`
- sintaxe de `SITE/assets/js/jr-ga4.js`
- sintaxe de `SITE/assets/js/consultoria.js`
- validade estrutural de `SITE/assets/data/consultoria-services.json`
- inspeção de snippets GA4 em `SITE/consultoria/`
- HTTP local para home, `/guias/`, hub e quatro guias
- QA visual do bloco de consultoria na home
- QA visual do hub e de guia em mobile/desktop
- checagem de overflow horizontal em viewports mobile

## Screenshots

Capturas geradas em `/private/tmp/jr-consultoria-claude-final-qa/`:

- `home-consult-390x844.png`
- `home-consult-1440x900.png`
- `hub-390x844.png`
- `hub-1440x900.png`
- `renovacao-390x844.png`
- `renovacao-1440x900.png`
- `guias-390x844.png`

## QA visual

- Home: bloco de consultoria validado em `390x844` e `1440x900`; sem overflow horizontal real no documento.
- Hub: validado em `390x844` e `1440x900`; sete cards renderizados; título e aviso corrigidos para caber naturalmente em mobile.
- Guia de renovação: validado em `390x844` e `1440x900`; sem corte lateral.
- Utilidades: card de consultoria validado em `390x844`; link presente.
- Interação: modal abre, `Esc` fecha e formulário de triagem gera resumo sem envio falso.

## Restrições respeitadas

- Nenhum push.
- Nenhum PR.
- Nenhum merge.
- Nenhum deploy.
- Branch `feature/jr-consultoria-hub-mvp` preservada como backup e não alterada.
- Branches `content/jr-amazon-flex-japan-guide`, `style/jr-typography-calibration` e `content/jr-fix-more-generic-covers` não foram tocadas.
