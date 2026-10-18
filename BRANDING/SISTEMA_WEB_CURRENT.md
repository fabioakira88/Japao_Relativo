# Japão Relativo — Governança editorial e JR Web Design System 3.1

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

Aplicação web atualizada em 18/10/2026 conforme a prancha fornecida por Fábio: `SITE/assets/brand/jr-signature-horizontal.svg` é a assinatura horizontal transparente para cabeçalhos e rodapé; `SITE/assets/brand/jr-brandmark.svg` é o monograma com ponto vermelho para usos reduzidos. Favicon, ícones de dispositivo e preview social usam os mesmos elementos. A peça quadrada de apresentação deixou de ser aplicada como logo de navegação.

Os derivados transparentes foram preparados com a ferramenta image_gen a partir da referência enviada. As matrizes PNG ficam em `SITE/assets/brand/jr-signature-horizontal-v1.png` e `SITE/assets/brand/jr-brandmark-v1.png`; os SVGs de uso web incorporam versões raster otimizadas, com enquadramento ajustado à transparência. Isso não equivale à recuperação dos vetores originais. Método e vínculos constam de `SITE/assets/brand/identity-current.json`.

`SITE/assets/brand/jr-logo-master-3.png` permanece como a peça original extraída do manual 3.0, sem alteração dos seus pixels: 953 × 941 px; SHA-256 `0527d780cd62358487ebab1bb604891a5907e078ba32fc053b0d162fa09d9f1b`. É fonte documental; não é a assinatura atual dos cabeçalhos. Não reconstruir a marca com texto digitado no navegador. Aprovação de peça, verificação do arquivo original e autorização de publicação continuam estados diferentes.

Os padrões geométrico e de ondas em `jr-pattern-geometric.svg` e `jr-pattern-waves.svg` são elementos decorativos em SVG. Entram nas margens da abertura, nos detalhes das matérias e no rodapé, com intensidade baixa e sem disputar espaço com texto ou capas. O ponto/círculo vermelho usa `#C62828`, e as linhas usam cinza quente `#8D8781`, conforme a referência. A superfície marfim vigente, a tipografia editorial e os contrastes funcionais permanecem. Ornamentos não recebem foco, não capturam cliques e ficam ocultos para tecnologia assistiva.

## Aplicação por canal

Direção expressa de 14/10/2026: a estrutura do site JR usa marfim `#F7F3EB`, texto carvão `#151515` e vermelho JR `#A41118` para ênfase. Menu, abertura, blocos de editoria, cards de navegação, rodapé e leitor por hash seguem essa base clara, inclusive nos filtros Anime. Fotos e ilustrações preservam suas cores; manchetes ficam sobre papel com contraste conferido. A implementação está em `SITE/assets/css/portal-ivory.css`, limitada ao portal `body.jr-portal` e carregada após as camadas históricas.

Para o mesmo assunto, a arte deve circular entre o site e os próximos posts do Instagram, conforme confirmação do diretor em 15/10/2026. O acervo do site alimenta pautas futuras do novo perfil; publicação no portal não equivale a publicação no Instagram. A base própria do Notion mantém matéria, revisão de atualidade, capa e estado social separados. Novas ilustrações seguem a direção CURRENT; a igualdade com posts antigos só pode ser afirmada mediante comparação das exportações reais. Título, logo e formato final social são uma etapa própria de produção.

A integração é bidirecional: artigo existente pode originar recortes sociais; post efetivamente publicado pode originar artigo com pesquisa própria, fontes e aprofundamento. Antes de criar, conciliar URL canônica, permalink social, pauta e agenda existentes. Notion controla os vínculos e estados; repositório mantém texto e implementação; Drive preserva pesquisa e originais. Não expandir mecanicamente uma legenda nem cadastrar novamente o mesmo briefing.

Web usa assinatura no cabeçalho, título editorial, imagem com função, matéria legível e fontes. Folio e CTA de carrossel não são repetidos artificialmente em cada seção de uma matéria. Grid responsivo; composição variável e respiro moderado, sem regra 70/20/10. Enquadramentos preservam pessoas, mãos e objetos essenciais.

Social mantém a arquitetura CURRENT: capa e CTA com logo; internas apenas número, linha fina e editoria, sem brandmark. Uma pauta por ciclo; slides completos e individuais em ordem; correções localizadas. Legenda complementar, exatamente cinco hashtags, sem emojis, travessões, rótulos ou aviso automático de IA. Créditos e fontes factuais são registrados conforme a pauta.

As marcas Kira Nihongo e demais produtos mantêm seus sistemas próprios. Estilos editoriais não devem sobrescrever suas paletas por herança acidental.

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

## Arquitetura executável atual · 17/10/2026

A home foi separada em estrutura (`SITE/index.html`), conteúdo (`SITE/data/editorial-posts.json`), runtime (`SITE/assets/js/editorial.js`) e estilo (`SITE/assets/css/editorial.css`). `scripts/build-editorial.js` gera o bundle e o sitemap; os dois validadores conferem assets, navegação, sintaxe e cobertura. O acervo ativo contém 356 registros, 110 páginas HTML e 107 rotas indexáveis. Páginas estáticas existentes continuam fontes próprias até a reconciliação editorial; não sobrescrever seu texto automaticamente pelo registro legado. A navegação prefere a rota estática quando existe; demais registros usam leitura por hash.

Deploy por PR validado, respeitando a proteção de main. A Consultoria permanece sem endpoint público configurado; sucesso foi testado apenas com resposta simulada. Newsletter não oferece cadastro enquanto não houver serviço real. Agendamento social no Notion continua separado da entrega de artes e do agendamento na rede.

## Registro de capas · 16/10/2026

`SITE/data/editorial-covers.json` vincula os 356 registros ativos a uma capa, descrição, natureza da imagem e estado de revisão. O gerador aplica o vínculo ao bundle e às capas/metadados das páginas estáticas alteradas, preservando o texto das matérias. O runtime usa o mesmo registro em cards, destaque, leitor e compartilhamento. Não substituir uma falha de carregamento por capa de outra editoria ou bloquear uma franquia por palavras no nome do arquivo.

O registro ativo mantém 42 ilustrações conceituais e as reassociações de assets aplicáveis ao acervo atual. As 22 artes externas mantidas tiveram título e URL conferidos no AniList; isso não comprova licença social. O restante do acervo segue com revisão de proveniência/estilo antes de produção social. Arquivos originais permanecem locais; o site recebe JPEG integral e preview menor, sem recorte criativo. `SITE/data/cover-art-prompts.json` registra prompts e hashes. `scripts/validate-covers.js` confere cobertura, identidade e sincronização; CI também detecta divergência dos HTML gerados.


## Ajustes da auditoria visual · 16/10/2026

A home prioriza cultura e cotidiano com destaque estático, manchete em coluna própria e arte integral ao lado no desktop, abaixo do texto no mobile. Cards preservam imagens verticais com `contain`; o leitor não aplica degradê sobre a capa. Notícias permanecem em um arquivo recolhível com data, após a seleção editorial. A estrutura, tipografia e controles não usam sombras ou efeitos de profundidade; o volume pertence às imagens. Cabeçalhos e rodapé não repetem uma assinatura digitada ao lado do lockup original.

Para um mesmo assunto, o site deve receber a mesma exportação final aprovada no Instagram, preservando proporção, manchete e logo. Uma ilustração conceitual semelhante não atende a esse critério. As ilustrações conceituais não equivalem a capas sociais aprovadas. O benchmark Saijō e o protocolo Nada V4 foram consultados no Notion, mas seus arquivos binários finais não foram recuperados nesta etapa. A comparação direta e a substituição pelas exportações aprovadas permanecem pendentes de acesso aos originais.

Kira Nihongo passa a ser o nome público das ferramentas antes apresentadas como Yumi e Survival. A aplicação usa marfim `#F8F3EA`, sumi `#1A1817` e dourado `#D4A13A` como detalhe. Texto pequeno em dourado usa tom funcional `#705012` para contraste. `SITE/assets/nihongo/kira-current.css` controla a apresentação; endpoints, seletores, arquivos de dados e chaves de armazenamento legados continuam identificadores técnicos para preservar links e progresso. A revelação dos flashcards é plana e sinaliza o estado para tecnologias assistivas. Nenhuma nova logo ou versão de mascote foi criada; o hamster legado deixou de ser exibido.

A revisão visual anterior incluiu testes de layout, leitura, filtros e amostras com axe WCAG A/AA. Foram corrigidos contraste dos exercícios e rolagem interna inacessível nas frases. Navegação do destaque por teclado, filtros de kanji e persistência de progresso após recarregar passaram; dados de exercícios e pixels da logo original permaneceram idênticos. A amostra não certifica acessibilidade global nem substitui a revisão factual do acervo.


## JR Web Design System 3.1 · 18/10/2026 · CURRENT

Extensão digital do Brand System 3.0, aplicada inicialmente à home e à leitura de artigos conforme a auditoria UX/UI fornecida pelo diretor. Não substitui a identidade institucional nem transforma as notas heurísticas do relatório em métricas de usuários. As solicitações expressas de superfície marfim e as homologações CURRENT mais recentes continuam prevalecendo. Ilustração contextual e fotografia documental verificável são linguagens válidas; nenhuma fotografia, capa social ou aprovação foi inventada nesta implementação.

### Composição e descoberta

A abertura usa imagem integral com maior presença, chamada serifada de escala controlada, resumo em sans e ação de leitura. O destaque real é gerado no HTML, antes do JavaScript, para evitar deslocamento durante a carga e manter uma entrada funcional sem script. `SITE/data/editorial-home.json` controla a seleção e a chamada; `scripts/build-editorial.js` sincroniza HTML e bundle. O conteúdo de abertura é determinístico, sem rotação automática com uma única matéria.

Ordem da home: destaque, últimas matérias, Seleção JR, leituras por tema, guias, Kira Nihongo, acervo de notícias, serviços e Sobre/rodapé. Últimas matérias segue a ordenação por data do acervo editorial e exclui as três matérias da seleção e o destaque para não repetir cards. Datas são de publicação, não uma declaração de reapuração. A seleção combina uma matéria principal e duas chamadas menores; filtros usam um grid, sem repetir três grandes faixas alternadas.

Cultura, História, Sociedade, Lugares, Gastronomia e Anime abrem a busca com um tema. São caminhos de descoberta por palavras do título, resumo e tag, não uma reclassificação silenciosa do banco. Anime usa a classificação existente. Notícias continuam disponíveis no acervo datado e na busca, depois das áreas culturais e de aprendizado.

### Componentes e estados

`SITE/assets/css/web-current.css` concentra a extensão do portal e do leitor; o template estático usa `brand-current.css`. Títulos em Noto Serif Display, interface/resumos em Inter; papel #F7F3EB, carvão #151515, vermelho #A41118 e metadados #505761. Escala responsiva, margens de 16–56 px, corpo editorial 18 px/1,75 e coluna até 68ch. Apoios contextuais não introduzem uma nova paleta institucional ou fundo escuro obrigatório. Ornamentos permanecem discretos nas margens, sem volume na interface.

Busca nativa em dialog, campo rotulado, contagem anunciada, normalização de acentos, palavras combinadas, tema removível, lote de 30 resultados e navegação por URL canônica. Escape fecha a busca e devolve o foco; menu mobile também responde a Escape. Foco visível, link para pular a navegação e alvos funcionais de pelo menos 44 px. Títulos e resumos são inseridos como texto. Extração de conteúdo usa template inerte: abrir a busca não pode baixar as imagens de todo o acervo.

Falha do bundle apresenta mensagem de indisponibilidade; resultado vazio orienta outra busca; falha de imagem recebe texto honesto, sem capa de outra matéria. Sem JavaScript, o destaque real continua como link e a mensagem aponta guias e Kira. Removidos os preloads de Fuji sem uso e as requisições de cotação de um bloco já oculto. Retrato de Sobre usa carregamento adiado e dimensões explícitas.

### Limites de validação e continuidade

Validação de layout, busca, navegação, leitores, imagens e amostra axe registrada em `AUDIT/2026-10-18/web-3-1/`, fora da publicação. Medições de LCP/CLS são de laboratório em Chromium, sem representar dados de campo/Core Web Vitals da audiência. Fontes remotas e o bundle legado de aproximadamente 1,18 MB continuam fatores a acompanhar; não afirmar desempenho global aprovado por uma medição local.

Textos, registros de capas, fontes e datas do acervo permanecem preservados. Exportações finais aprovadas do Instagram continuam necessárias para confirmar igualdade literal de capas; esta release reorganiza a apresentação dos arquivos existentes. O Notion mantém pauta mestre, fonte, URL do site, permalink social, atualização e estados de aprovação/publicação separados, sem novas pautas duplicadas ou mudança automática de calendário. A implantação das demais editorias pode evoluir a partir deste padrão validado.

## Navegação do portal · 18/10/2026 · CURRENT

Cabeçalho em marfim com assinatura horizontal proporcional, separado do hero e disponível durante a rolagem da home e no leitor por hash. Ordem principal: Revista, Editorias, Guias, Kira Nihongo, JR Apoio e Sobre; busca visível em controle próprio. Editorias agrupa Cultura, História, Sociedade, Lugares, Gastronomia e Anime, com Seleção JR e notícias do acervo em um nível secundário. Temas abrem a busca existente; Anime abre a curadoria já disponível. O rodapé segue os mesmos nomes e a mesma ordem de leitura.

`SITE/assets/css/navigation.css` concentra a apresentação; `editorial.js` controla as transições. Abaixo de 1100 px, menu recolhível com altura limitada à tela e rolagem própria; Editorias usa disclosure nativo. Teclado, Escape, clique externo, saída de foco e mudança de largura fecham as camadas correspondentes. Ao fechar uma busca aberta pelo submenu, o foco retorna ao título de Editorias no desktop ou ao botão Menu no mobile. A navegação para uma seção considera a altura do cabeçalho, revela Sobre/arquivo quando necessário e atualiza o estado acessível. Sair do leitor restaura os metadados do portal. Links, textos, capas e dados de progresso existentes permanecem preservados.
