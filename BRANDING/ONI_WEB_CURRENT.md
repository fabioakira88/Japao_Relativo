# Oni Animes — extensão web 1.0 · CURRENT

Direção expressa de Fábio em 18/10/2026: Oni Animes é uma área própria dentro do Japão Relativo, em `/oni-animes/`. Esta decisão autoriza a migração controlada do antigo acervo Anime para a área Oni; não restaura a editoria genérica no feed cultural do JR. Os projetos compartilham hospedagem, mantendo identidade, acervos e operação social distintos.

## Fontes e precedência

- [Central Editorial & Design System CURRENT](https://app.notion.com/p/3f226a1643dd81618e9fc110f17ad7d9).
- [Adendo de direção de arte V3.2](https://app.notion.com/p/3fa26a1643dd819f837acd2a495b1a10) e [Branding Visual Oficial](https://app.notion.com/p/3e126a1643dd815cbea4e285f7208e97).
- Brand System 2.2 e Manual Técnico 2.1 fornecidos nesta solicitação, lidos integralmente; páginas de identidade e exemplos renderizados e inspecionados.
- Perfil público [@oni_animes_](https://www.instagram.com/oni_animes_/) inspecionado em navegador: assinatura, bio e miniaturas visíveis. Isso não equivale a recuperar todas as exportações sociais nem a homologar seus dados ou direitos.

Regras nos documentos são referência de marca e produção. Não acionam agendamentos, automações, novos carrosséis ou mudanças nas redes por si. A confirmação expressa do usuário define o escopo de hospedagem desta implementação.

## Tradução para a web

Marfim `#F4F1EB`, carvão `#171717`, vermelho `#B3141B` como acento e cinza `#666666`. Títulos serifados em Noto Serif Display; interface e leitura em Inter. São escolhas técnicas da extensão web, não uma identificação da fonte exata das artes rasterizadas. Texto e navegação permanecem prioritários. Sem cenografia genérica, filtros sépia, glow, kanji decorativo, glass obrigatório ou ornamentos de preenchimento.

Página de entrada com logo completa, destaque editorial, três percursos de leitura, busca, seis filtros por assunto, lista progressiva e vínculo ao perfil correto. Matérias usam brandmark no cabeçalho, tipografia legível, fontes preservadas e acesso de retorno ao JR. Folio e margin lines de carrosséis não são simulados como interface de artigo. O CSS Oni é isolado e não altera Kira, as matérias culturais ou a capa atual de Tanbo.

## Integridade dos ativos

Arquivos recebidos do diretor são preservados integralmente em `SITE/assets/oni-animes/logo-original.png` e `brandmark-original.png`. A logo corresponde ao último arquivo completo enviado, `EBCC63F5-78C2-47F7-BF5A-93D54D80CD32.PNG`; o brandmark corresponde a `15709936-CAFA-48EB-BBA1-18695FA27C78.PNG`. Não houve desenho generativo, reconstrução tipográfica, remoção de fundo, recorte criativo ou recoloração da marca.

Versões web são reduções proporcionais determinísticas em PNG, preservando o fundo original da logo. `identity.json` registra hashes dos originais e derivados; o build bloqueia alteração dos bytes sem atualização explícita desse registro. Isto não declara recuperação de vetores ou homologação de arquivos externos ao material fornecido. O mascote não foi recortado da prancha nem recriado.

## Acervo e imagens

`SITE/data/oni-posts.json` contém 57 matérias migradas do commit `df97db12ccf2d0e52a4b478f588ee3e49cd09431`, com títulos e datas originais. Textos não foram promovidos a notícias novas. Figuras antigas e imagens embutidas foram retiradas da apresentação; links internos entre os textos migrados passam a apontar às rotas Oni. As 22 capas com vínculo de catálogo já identificado foram recuperadas, servidas localmente e inspecionadas; fonte e URL original constam de cada registro. As demais matérias usam composição tipográfica, sem capa inventada, fanart gerada ou imagem de outra obra. A origem no catálogo não equivale a licença social ou aprovação de carrossel.

Matérias carregam nota de acervo, data e `noindex,follow` enquanto não passarem por revisão factual própria. A página da área é indexável; o arquivo não oferece anúncios antigos como agenda atual de estreias. Datas de disponibilidade, rankings e números devem ser reapurados antes de uma nova publicação ou reutilização social. Nenhuma matéria foi marcada como publicada no Instagram nem ganhou aprovação de capa por esta migração.

`scripts/build-oni.js` gera a entrada e 57 páginas estáticas com URLs próprias. É chamado pelo build editorial antes do sitemap. O portal cultural continua com seus 299 registros e seis temas; Oni oferece seis percursos próprios: Clássicos, Dos jogos ao anime, Terror, Investigação e psicologia, Obras e personagens, Indústria e temporadas. Notícias e indústria ficam no acervo, sem pauta fresca presumida.

## Navegação e verificação

Acesso “Oni Animes” no menu Temas, chamada contextual e rodapé do JR. Na área Oni, navegação para leituras, perfil social e retorno ao Japão Relativo. Busca com acentos normalizados, filtros combinados, contagem anunciada, URL recuperável, lotes de 12, foco após expansão e conteúdo integral disponível sem JavaScript. Identidade JR não se sobrepõe ao leitor Oni.

QA local: 58 rotas em 320, 768 e 1440 px; navegação JR em seis larguras; busca, seis filtros, zero resultados, paginação e versão sem JavaScript. Amostras com axe WCAG A/AA na entrada e leitores. Logo e brandmark conferidos contra seus hashes, 57 datas/títulos preservados, fonte JR e Tanbo intactos. A verificação automatizada não certifica acessibilidade global nem a atualidade factual de cada matéria histórica.

## Governança

Notion Oni permanece fonte da identidade e calendário Oni. Não misturar calendário JR, Oni ou AION, nem reativar rotinas pausadas. Os registros legados retirados das URLs antigas do JR continuam históricos; a migração web é identificada pela nova área e seu manifesto. Calendários, horários e estados sociais não foram alterados. As regras de produção individual, revisão de fontes, fidelidade aos ativos e aprovação social continuam vigentes.
