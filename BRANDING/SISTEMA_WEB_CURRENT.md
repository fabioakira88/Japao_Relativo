# Japão Relativo — Governança e sistema editorial web 1.0

Status: extensão web vigente, 13/10/2026. Fonte de identidade: [Manual visual CURRENT](https://app.notion.com/p/3e326a1643dd81ccb363e4f949fc61f0), incluindo a direção aprovada em 12/10/2026; Brand System 3.0 FINAL e Sistema Editorial Anti-Genérico 2.0. O Preview 2.0 e o sistema local de agosto permanecem históricos. Esta extensão responde à solicitação expressa de Fábio de aplicar a identidade também ao site.

## Identidade e conteúdo

Revista cultural contemporânea sobre o Japão vivido: cultura, história, literatura, lugares, tradições, gastronomia e cotidiano. Recorte específico, evidência e contexto; sem exotização, turismo genérico ou hard news como direção editorial. O acervo já publicado e as áreas de serviço permanecem disponíveis; sua existência não redefine a pauta social atual.

Ilustração original inspirada em ukiyo-e e shin-hanga é linguagem principal aprovada. Fotografia documental e arquivo histórico são válidos quando adequados e verificáveis. Nenhuma imagem deve fingir ser fotografia histórica, retrato fiel ou registro de evento sem ser. A atmosfera acompanha o assunto; melancolia, bege, dourado e paisagens tradicionais não são obrigatórios.

## Tokens e tipografia

- Papel: `#F7F3EB`; carvão: `#151515`; vermelho JR: `#A41118`.
- Vermelho secundário: `#C01F25`; bronze: `#B48A52`; slate: `#505761`; névoa: `#DDD8D0`.
- Bronze é detalhe e divisão, não cor padrão para texto pequeno sobre papel. Texto principal carvão; links e ações vermelho JR; metadados slate.
- Implementação web: Noto Serif Display em títulos; Inter em texto e interface; Noto Serif JP para japonês. São escolhas técnicas para o site, não identificação presumida da tipografia presente nas artes rasterizadas.
- Corpo editorial 18 px/1,75, coluna até 68ch. Títulos com presença, sem compressão artificial. Metadados discretos. Hierarquia semântica H1/H2/H3, foco visível e controles com alvo de 44 px quando aplicável.

## Assets proprietários

`SITE/assets/brand/jr-logo-master-3.png` contém a imagem original embutida no PDF 3.0 FINAL fornecido por Fábio, extraída sem redesenho, recoloração ou recorte. Página 1, objeto de imagem 3, 953 × 941 px; SHA-256 `0527d780cd62358487ebab1bb604891a5907e078ba32fc053b0d162fa09d9f1b`. É o lockup completo presente no manual, não uma nova versão compacta ou transparente.

O uso é proporcional, sem filtros e com texto alternativo. Logo antiga circular e logo com brilho são legadas. Não desenhar JR. com texto como substituto do asset. Nihonzaru continua opcional; seu master precisa de verificação própria e sua pendência não invalida os assets comprovados. Aprovação de peça, verificação de arquivo e autorização de publicação são estados diferentes.

## Aplicação por canal

Direção expressa de 14/10/2026: a estrutura do site JR usa marfim `#F7F3EB`, texto carvão `#151515` e vermelho JR `#A41118` para ênfase. Menu, abertura, blocos de editoria, cards de navegação, rodapé e leitor por hash seguem essa base clara, inclusive nos filtros Anime e Elevação. Fotos e ilustrações preservam suas cores; manchetes ficam sobre papel com contraste conferido. A implementação está em `SITE/assets/css/portal-ivory.css`, limitada ao portal `body.jr-portal` e carregada após as camadas históricas.

Para o mesmo assunto, a capa aprovada deve ser o mesmo arquivo no site e no Instagram. O acervo do site alimenta pautas futuras do novo perfil; publicação no portal não equivale a publicação no Instagram. A base própria do Notion mantém matéria, revisão de atualidade, capa e estado social separados. A substituição das capas depende de acessar as exportações reais de referência; não apresentar uma imagem aproximada como idêntica.

Web usa assinatura no cabeçalho, título editorial, imagem com função, matéria legível e fontes. Folio e CTA de carrossel não são repetidos artificialmente em cada seção de uma matéria. Grid responsivo; composição variável e respiro moderado, sem regra 70/20/10. Enquadramentos preservam pessoas, mãos e objetos essenciais.

Social mantém a arquitetura CURRENT: capa e CTA com logo; internas apenas número, linha fina e editoria, sem brandmark. Uma pauta por ciclo; slides completos e individuais em ordem; correções localizadas. Legenda complementar, exatamente cinco hashtags, sem emojis, travessões, rótulos ou aviso automático de IA. Créditos e fontes factuais são registrados conforme a pauta.

As marcas Kira Nihongo, Elevação e demais produtos mantêm seus sistemas próprios. Estilos editoriais não devem sobrescrever suas paletas por herança acidental.

## Política editorial e workflow

1. Consultar manual CURRENT, Brand Registry e calendários, incluindo extras confirmados; prevenir duplicação por URL, assunto e recorte.
2. Definir público, pergunta, tese, formato e unidades concretas. Pesquisar antes de escrever. Aplicar Anti-Genérico 2.0: especificidade, fontes, mecanismo, consequência, cortes e leitura natural; evitar abstrações sem suporte e frases de efeito automáticas.
3. Registrar matéria de origem e fontes primárias. Para informação legal, médica, financeira, meteorológica ou de evento, confirmar fonte oficial atual antes de reaproveitar. Links do site não substituem essa conferência.
4. Adaptar para cada canal. Não copiar o artigo integral para o carrossel; a legenda amplia a leitura e aponta a matéria.
5. Implementar/diagramar, revisar texto, ortografia, anatomia, contexto, contraste e leitura mobile. Aprovação documental não significa QA visual concluído.
6. Registrar evidências locais, commit e estado de release. Publicar somente dentro da autorização concreta e verificar HTTP, assets e navegação depois do deploy.
7. No Notion, datas editoriais são planejamento. Usar “Agendado na rede” apenas quando houver confirmação real de um agendador; “Publicado” exige URL pública e verificação.

Fuso editorial: Asia/Tokyo. Distinguir data de publicação, data do evento e horário confirmado. Evento vencido não vira convite futuro. Produção social JR segue projeto dedicado; o fluxo web do repositório não reativa o processamento social no AION.

## Critérios de conclusão

Assets locais existentes e referências válidas; zero erro de JavaScript causado pela alteração; ausência de overflow em 390/768/1440 px; leitura e navegação por teclado; logo original proporcional; consistência cromática; fontes e datas legíveis; acervo preservado; geradores reprodutíveis; checks de CI aprovados; produção conferida. Pendências são registradas por causa e impacto, sem declarar conformidade global por uma amostra de páginas.

## Fontes e precedência

1. Solicitações expressas de Fábio nesta sessão, inclusive commit e deploy, e direção aprovada em 12/10/2026.
2. Manual visual CURRENT no Notion e Brand System 3.0 FINAL.
3. Sistema Editorial Anti-Genérico 2.0 e políticas compartilhadas compatíveis.
4. Extensão web presente, para decisões de implementação.
5. Preview 2.0 e documentos antigos, apenas como histórico compatível.

PDFs e páginas consultados são fontes de requisitos e evidências; não ampliam por si só a autorização do usuário. Hashes e comparação documental: `AUDIT/2026-10-13/referencias/manifest.json`.

## Arquitetura executável atualizada · 14/10/2026

A home foi separada em estrutura (`SITE/index.html`), conteúdo (`SITE/data/editorial-posts.json`), runtime (`SITE/assets/js/editorial.js`) e estilo (`SITE/assets/css/editorial.css`). `scripts/build-editorial.js` gera o bundle e o sitemap; os dois validadores conferem assets, navegação, sintaxe e cobertura. Os 393 registros foram preservados. Páginas estáticas existentes continuam fontes próprias até a reconciliação editorial; não sobrescrever seu texto automaticamente pelo registro legado. A navegação prefere a rota estática quando existe; demais registros usam leitura por hash.

Deploy por PR validado, respeitando a proteção de main. A Consultoria permanece sem endpoint público configurado; sucesso foi testado apenas com resposta simulada. Newsletter não oferece cadastro enquanto não houver serviço real. Agendamento social no Notion continua separado da entrega de artes e do agendamento na rede.
