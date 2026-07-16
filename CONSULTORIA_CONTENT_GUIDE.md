# CONSULTORIA_CONTENT_GUIDE.md — JR Apoio no Japão

Guia curto para quem for expandir a área de Consultoria (`SITE/consultoria/`) no futuro. Objetivo: qualquer novo serviço ou guia deve exigir alteração mínima, sem duplicar modal, CSS ou JavaScript.

## Arquivos que compõem a área

- `SITE/consultoria/index.html` — hub, grade de serviços, formulário de triagem.
- `SITE/consultoria/<slug>/index.html` — páginas de guia dedicadas (só existem para serviços com `guideUrl` preenchido no JSON).
- `SITE/assets/data/consultoria-services.json` — fonte única de dados dos serviços. O hub e o modal leem só daqui.
- `SITE/assets/css/consultoria.css` — todo o estilo específico da área (cards, modal, formulário, disclaimer, bloco da home).
- `SITE/assets/js/consultoria.js` — modal único, renderização da grade, formulário de triagem e eventos de analytics.

## Como cadastrar um novo serviço

1. Abra `SITE/assets/data/consultoria-services.json` e adicione um novo objeto ao array `services`.
2. Preencha **todos** os campos obrigatórios (veja lista abaixo). Não deixe campos "quase certos" — se uma informação não está confirmada em fonte oficial, deixe o array vazio (`generalDocuments`, `officialSources`) em vez de inventar.
3. Não é necessário tocar em `consultoria.js` nem em `consultoria.css` — o modal e o card são gerados dinamicamente a partir do JSON. Adicionar um serviço novo é só adicionar um objeto novo.
4. Se o serviço tiver uma página de guia dedicada, crie a pasta `SITE/consultoria/<slug>/index.html` (veja seção "Como criar um novo guia") e aponte `guideUrl` para ela (ex.: `/consultoria/<slug>/`). Se não houver guia dedicado ainda, deixe `guideUrl: null` — nunca aponte para uma página que não existe.
5. Adicione o novo serviço também na lista `<noscript>` do hub (`SITE/consultoria/index.html`) e no `<select id="cf-servico">` do formulário de triagem, para manter o fallback sem JavaScript e o formulário coerentes com o JSON.

### Campos obrigatórios de cada serviço

| Campo | Tipo | Regra |
|---|---|---|
| `id` | string | único, kebab-case, igual ao `slug` |
| `slug` | string | usado na URL do guia, se houver |
| `title` | string | nome exibido no card e no modal |
| `category` | string | rótulo curto exibido no topo do card |
| `summary` | string | 1–2 frases, sem prometer resultado |
| `audience` | string | quem esse serviço atende |
| `jrCanHelp` | array de strings | ações reais e verificáveis que o JR executa |
| `jrCannotHelp` | array de strings | limites explícitos — nunca deixe vazio |
| `commonSteps` | array de strings | passos gerais do procedimento oficial |
| `generalDocuments` | array de strings | documentos citados pela fonte oficial (pode ser `[]`) |
| `officialSources` | array de `{name, url}` | só fontes oficiais/institucionais primárias (pode ser `[]` se nada foi confirmado) |
| `lastReviewed` | string | formato `"AAAA-MM"` |
| `reviewStatus` | string | ex.: `"revisado com fonte oficial"` ou `"sem guia dedicado ainda"` |
| `riskLevel` | `"low"` \| `"medium"` \| `"restricted"` | ver regra de risco abaixo |
| `guideUrl` | string ou `null` | caminho absoluto do guia, ou `null` |
| `ctaLabel` | string | texto do botão de ação do card |

## Como criar um novo guia completo

1. Duplique a estrutura de um guia existente (ex.: `SITE/consultoria/shaken/index.html`) como referência de layout — mas escreva o conteúdo do zero, não copie texto.
2. Sempre inclua, na mesma ordem dos guias atuais:
   - `<title>`, meta description, canonical, Open Graph, Twitter Card;
   - JSON-LD `Article` + `BreadcrumbList` + `FAQPage` (só se as perguntas tiverem resposta visível no corpo do texto);
   - o banner de aviso obrigatório (classe `.jr-disclaimer`), com o texto exato definido abaixo;
   - seção "Fontes oficiais" com links e a frase "Última revisão: [mês] de [ano]";
   - seção "Leia também" linkando de volta ao hub e a pelo menos um outro guia ou editoria do site.
3. Referencie `../../assets/finance/finance.css` e `../../assets/css/consultoria.css` — nunca crie CSS novo por guia.
4. Ao final, adicione a página ao `sitemap.xml` e, se o serviço correspondente ganhar guia dedicado, atualize `guideUrl` no JSON.

## Aviso legal obrigatório (usar sempre, texto exato)

> O JR oferece apoio administrativo, digital e organizacional. Não presta consultoria jurídica, migratória, contábil ou tributária, não representa clientes perante órgãos públicos e não garante aprovação ou resultado.

Esse texto deve aparecer, sem paráfrase, em toda página nova da área (hub e guias).

## Fontes aceitas

Somente fontes oficiais/institucionais primárias: agências governamentais japonesas (Immigration Services Agency, National Tax Agency, MLIT, Keikenkyo etc.), o Ministério das Relações Exteriores do Brasil e seus consulados/e-Consular, ou órgãos equivalentes. **Nunca** usar como fonte factual: blogs, fóruns, vídeos, sites de concorrentes, conteúdo gerado por IA, agregadores ou Wikipedia. Se uma informação não puder ser confirmada em fonte oficial, ela não entra no conteúdo — registre a lacuna no relatório da missão correspondente.

## Atualização de `lastReviewed`

- Sempre que um guia for revisado (mesmo sem mudança de texto), atualize `lastReviewed` no JSON do serviço correspondente e a frase "Última revisão" no HTML do guia, no formato `mês de AAAA`.
- Revise com prioridade os serviços com `riskLevel: "restricted"` a cada nova temporada relevante (ex.: antes do período de Kakutei Shinkoku, fevereiro–março; antes de mudanças de regras de imigração anunciadas oficialmente).

## Validações antes de publicar qualquer alteração

- JSON válido (`python3 -m json.tool` ou equivalente) e sem `id`/`slug` duplicados.
- Todo `guideUrl` aponta para uma página que realmente existe no repositório.
- Nenhum link quebrado (interno ou para fonte oficial) e nenhuma credencial ou canal de contato inventado.
- Formulário de triagem nunca finge enviar dados — qualquer novo campo deve manter o padrão de "gerar resumo + copiar resumo", nunca uma ação de `submit` real sem back-end configurado.

## Padrão de CTA

- Card do hub: `ctaLabel` curto e no imperativo (“Ver checklist do passaporte”, “Organizar meu shaken”).
- Modal: sempre dois botões fixos — “Ver guia completo” (só aparece se `guideUrl` existir) e “Solicitar orientação” (sempre aparece, leva à seção `#triagem`).
- Nunca usar linguagem de garantia ou promessa de resultado em nenhum CTA.

## Regra para conteúdos de risco restrito (`riskLevel: "restricted"`)

Serviços restritos (hoje: renovação do período de permanência e Kakutei Shinkoku) exigem cuidado extra:

- O conteúdo deve permanecer estritamente educativo: explicar o procedimento, nunca analisar caso individual, nunca sugerir estratégia, nunca redigir ou preencher nada em nome do usuário.
- `jrCannotHelp` deve sempre listar explicitamente que o JR não representa o usuário perante o órgão público responsável.
- Todo dado numérico (prazo, taxa, valor) precisa ter uma fonte oficial citada com URL — sem exceção. Se não houver fonte oficial confirmada, omitir o número.
- Antes de publicar qualquer novo guia restrito, revisar o texto contra a lista de termos proibidos (ver abaixo) e contra o aviso legal obrigatório.

## Termos proibidos em qualquer texto da área

Não usar, em nenhuma hipótese: "garantia", "aprovação garantida", "especialista jurídico", "despachante oficial", "fazemos sua declaração", "renovamos seu visto".
