# Japão Relativo

Revista cultural sobre história, tradições, lugares e vida cotidiana no Japão. Branding CURRENT: Brand System 3.0 FINAL com a direção aprovada no Notion em 12/10/2026. O acervo e os produtos existentes permanecem acessíveis.

Site: https://japaorelativo.com/

## Fontes de verdade

- [Governança e sistema editorial web](BRANDING/SISTEMA_WEB_CURRENT.md): paleta, tipografia, política, assets, workflow e critérios de release.
- [Manual visual no Notion](https://app.notion.com/p/3e326a1643dd81ccb363e4f949fc61f0): identidade e direção social atual.
- `SITE/index.html`: home, objeto DB e navegação dinâmica editorial.
- `SITE/<slug>/index.html`: páginas estáticas de matérias e produtos. Uma mudança no DB não sincroniza automaticamente a página estática; revisar ambas as superfícies.
- `SITE/assets/`: imagens, estilos, scripts e dados de produtos.
- `scripts/validate-jr-assets.js`: valida referências, hosts e uso de capas.
- `.github/workflows/deploy.yml`: valida e publica o conteúdo de SITE, com CNAME, no GitHub Pages.
- `DOCS/`, `AUDIT/`: documentação, diagnóstico e evidências locais. Relatórios antigos registram a fase em que foram escritos.

## Edição e publicação

1. Consultar o CURRENT e registrar pauta, recorte, fontes e matéria de origem no Notion.
2. Editar DB e/ou página estática conforme o tipo de conteúdo. Preservar slugs já publicados.
3. Usar logo original, tokens do sistema e uma imagem que corresponda ao assunto.
4. Executar `node scripts/validate-jr-assets.js` e verificar desktop, tablet, celular e funções afetadas.
5. Revisar diff e arquivos de deploy. Fazer commit e push somente dentro da autorização vigente.
6. Aguardar o workflow e conferir a versão pública. Registrar o SHA e a evidência, sem confundir planejamento social com agendamento na rede.

As áreas Kira Nihongo e Elevação mantêm identidade própria. Não incluir credenciais, snapshots internos do Notion, exportações brutas ou arquivos temporários na publicação.
