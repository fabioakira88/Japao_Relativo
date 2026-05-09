"""
=======================================================
  JAPÃO RELATIVO — Script de publicação
=======================================================
  Como usar:
    1. Adicione o novo artigo na lista NOVOS_ARTIGOS abaixo
    2. Rode:  python3 publicar.py
    3. Pronto — portal e WordPress atualizados

  Campos obrigatórios:
    key     → slug único (ex: "nome-do-artigo-2026")
    title   → título completo
    tag     → "Cultura" | "Notícia" | "Idioma" | "Curiosidade" |
               "Saúde e Bem-Estar" | "Indústria Automotiva"
    date    → "DD de Mês de AAAA"
    thumb   → URL de imagem (Unsplash ou WP media)
    content → HTML do artigo (use h2, p, em para citações)
=======================================================
"""

import re
import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

# ── Configuração ──────────────────────────────────────
DOMINIO = "https://japaorelativo.com"
AUTH    = HTTPBasicAuth("procederfilosofico@gmail.com", "l5vq ChwA cFXq 9niF m58W fDhg")
DB_FILE = Path(__file__).parent / "japaorelativo.html"
# ──────────────────────────────────────────────────────


# ══════════════════════════════════════════════════════
#  ADICIONE NOVOS ARTIGOS AQUI
# ══════════════════════════════════════════════════════
NOVOS_ARTIGOS = [
    # Exemplo — descomente e preencha para adicionar:
    # {
    #     "key":   "nome-do-artigo-2026",
    #     "title": "Título do Artigo",
    #     "tag":   "Cultura",
    #     "date":  "09 de Maio de 2026",
    #     "thumb": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
    #     "content": """
    #         <p>Primeiro parágrafo do artigo.</p>
    #         <h2>Subtítulo</h2>
    #         <p>Mais conteúdo aqui.</p>
    #         <em>Citação ou destaque em bloco dourado.</em>
    #     """,
    # },
]
# ══════════════════════════════════════════════════════


def ler_db():
    """Lê o japaorelativo.html e extrai os metadados de todos os artigos."""
    html = DB_FILE.read_text(encoding="utf-8")
    db_start = html.find("const DB = {")
    db_end   = html.find("\n};", db_start)
    db_block = html[db_start:db_end]

    pat = re.compile(
        r'"([\w-]+)":\s*\{[^`]*?title:"([^"]+)"[^`]*?tag:"([^"]+)"'
        r'[^`]*?date:"([^"]+)"[^`]*?thumb:"([^"]+)"',
        re.DOTALL,
    )
    artigos = [
        {"key": m.group(1), "title": m.group(2), "tag": m.group(3),
         "date": m.group(4), "thumb": m.group(5)}
        for m in pat.finditer(db_block)
    ]
    return artigos, html


def adicionar_ao_db(html, novos):
    """Insere os novos artigos no topo do DB no HTML."""
    if not novos:
        return html

    insercao = ""
    for a in novos:
        content_escaped = a["content"].replace("`", "'")  # backticks no content
        insercao += (
            f'  "{a["key"]}": {{\n'
            f'    title:"{a["title"]}",\n'
            f'    tag:"{a["tag"]}",date:"{a["date"]}",\n'
            f'    thumb:"{a["thumb"]}",\n'
            f'    content:`{content_escaped}`\n'
            f'  }},\n'
        )

    return html.replace("const DB = {\n", "const DB = {\n" + insercao, 1)


def gerar_html_portal(artigos, html_base):
    """Substitui os divs vazios por cards pré-renderizados."""
    ARROW = ('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" '
             'stroke="currentColor" stroke-width="2">'
             '<path d="M5 12h14M12 5l7 7-7 7"/></svg>')
    READ = ('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" '
            'stroke="currentColor" stroke-width="2">'
            '<path d="M5 12h14M12 5l7 7-7 7"/></svg>')

    def bg(thumb):
        return (f"background-image:url('{thumb}');"
                "background-size:cover;background-position:center")

    # newsGrid: todos os artigos, primeiros 12 visíveis
    news_html = "\n".join(
        f'<a class="card" href="#" data-id="{a["key"]}" data-tag="{a["tag"]}"'
        f'{" style=\"display:none\"" if i >= 12 else ""}>'
        f'<div class="card-img" style="{bg(a["thumb"])}"></div>'
        f'<div class="card-arrow">{ARROW}</div>'
        f'<div class="card-body">'
        f'<div class="card-tag">{a["tag"]}</div>'
        f'<div class="card-title">{a["title"]}</div>'
        f'<div class="card-date">{a["date"]}</div>'
        f'</div></a>'
        for i, a in enumerate(artigos)
    )

    # moreGrid: artigos 8–16
    more_html = "\n".join(
        f'<a class="card-h" href="#" data-id="{a["key"]}" data-tag="{a["tag"]}">'
        f'<div class="card-h-img" style="{bg(a["thumb"])}"></div>'
        f'<div class="card-h-body">'
        f'<div class="card-h-tag">{a["tag"]}</div>'
        f'<div class="card-h-title">{a["title"]}</div>'
        f'<div class="card-h-date">{a["date"]}</div>'
        f'</div></a>'
        for a in artigos[8:16]
    )

    # strip: 3 primeiros
    strip_html = "\n".join(
        f'<div class="strip-item" data-id="{a["key"]}">'
        f'<div class="strip-tag">{a["tag"]}</div>'
        f'<div class="strip-title">{a["title"]}</div>'
        f'<div class="strip-link">Ler matéria {READ}</div>'
        f'</div>'
        for a in artigos[:3]
    )

    # footerRecent: 6 primeiros
    footer_html = "\n".join(
        f'<li><a href="#" data-id="{a["key"]}">'
        f'{a["title"][:50]}{"…" if len(a["title"]) > 50 else ""}'
        f'</a></li>'
        for a in artigos[:6]
    )

    novo = html_base

    # Substituir divs
    for div_id, conteudo in [
        ("newsGrid",    news_html),
        ("moreGrid",    more_html),
        ("strip",       strip_html),
    ]:
        pat = re.compile(r'(<div[^>]*\bid="' + div_id + r'"[^>]*>).*?(</div>)',
                         re.DOTALL)
        novo = pat.sub(r'\g<1>' + conteudo + r'\g<2>', novo, count=1)

    # footerRecent é <ul>
    ul_pat = re.compile(r'(<ul\s+id="footerRecent"[^>]*>).*?(</ul>)', re.DOTALL)
    novo = ul_pat.sub(r'\g<1>' + footer_html + r'\g<2>', novo, count=1)

    return novo


def upload_portal(html_content: str) -> str:
    """Faz upload do portal.html para o WordPress."""
    # Remove versão antiga
    r = requests.get(
        f"{DOMINIO}/wp-json/wp/v2/media?search=portal&per_page=10",
        auth=AUTH, timeout=20,
    )
    for m in (r.json() if r.status_code == 200 else []):
        if "portal.html" in m.get("source_url", ""):
            requests.delete(
                f"{DOMINIO}/wp-json/wp/v2/media/{m['id']}?force=true",
                auth=AUTH, timeout=20,
            )

    resp = requests.post(
        f"{DOMINIO}/wp-json/wp/v2/media",
        headers={"Content-Disposition": 'attachment; filename="portal.html"',
                 "Content-Type": "text/html"},
        data=html_content.encode("utf-8"),
        auth=AUTH,
        timeout=60,
    )
    if resp.status_code in (200, 201):
        return resp.json().get("source_url", "")
    raise RuntimeError(f"Upload falhou: {resp.status_code} {resp.text[:200]}")


def atualizar_redirect(portal_url: str):
    """Garante que japaorelativo.com aponta para o portal."""
    content = (
        f'<!-- wp:html -->'
        f'<script>window.location.replace("{portal_url}");</script>'
        f'<noscript><meta http-equiv="refresh" content="0;url={portal_url}"></noscript>'
        f'<!-- /wp:html -->'
    )
    requests.post(
        f"{DOMINIO}/wp-json/wp/v2/templates/hostinger-ai-theme//front-page",
        json={"content": content, "status": "publish"},
        auth=AUTH, timeout=30,
    )


def publicar_rascunhos_wp(novos):
    """Publica os novos artigos como rascunhos no painel WordPress."""
    for a in novos:
        r = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/posts",
            json={
                "title":   a["title"],
                "content": a.get("content", ""),
                "status":  "draft",
                "slug":    a["key"],
            },
            auth=AUTH, timeout=30,
        )
        if r.status_code in (200, 201):
            print(f"    Rascunho WP criado: ID {r.json()['id']}")
        else:
            print(f"    Rascunho WP erro: {r.status_code}")


def main():
    print("\n═══ JAPÃO RELATIVO — Publicação ═══\n")

    # 1. Ler DB atual
    print("1. Lendo artigos do banco de dados...")
    artigos, html = ler_db()
    print(f"   {len(artigos)} artigos existentes")

    # 2. Adicionar novos artigos ao HTML
    if NOVOS_ARTIGOS:
        print(f"\n2. Adicionando {len(NOVOS_ARTIGOS)} novo(s) artigo(s)...")
        html = adicionar_ao_db(html, NOVOS_ARTIGOS)
        DB_FILE.write_text(html, encoding="utf-8")
        artigos_novos_meta = [
            {"key": a["key"], "title": a["title"], "tag": a["tag"],
             "date": a["date"], "thumb": a["thumb"]}
            for a in NOVOS_ARTIGOS
        ]
        artigos = artigos_novos_meta + artigos
        print(f"   {len(artigos)} artigos no total")

        print("   Publicando rascunhos no painel WordPress...")
        publicar_rascunhos_wp(NOVOS_ARTIGOS)
    else:
        print("2. Nenhum artigo novo (NOVOS_ARTIGOS está vazio)")

    # 3. Gerar portal com cards pré-renderizados
    print("\n3. Gerando portal com cards estáticos...")
    html_portal = gerar_html_portal(artigos, html)
    print(f"   {html.count('class=\"card\"')} cards → "
          f"{html_portal[:html_portal.find('<script>')].count('class=\"card\"')} cards estáticos")

    # 4. Upload
    print("\n4. Enviando portal para o servidor...")
    portal_url = upload_portal(html_portal)
    print(f"   ✓ {portal_url}")

    # 5. Atualizar redirect
    atualizar_redirect(portal_url)
    print("   ✓ Redirect da homepage atualizado")

    print(f"\n✓ Publicação concluída!")
    print(f"  Portal: {portal_url}")
    print(f"  Painel: {DOMINIO}/wp-admin/edit.php")
    print("═══════════════════════════════════\n")


if __name__ == "__main__":
    main()
