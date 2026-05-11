"""
gerar_portal.py — Deploy do Japão Relativo
==========================================
Gera o portal.html inline (CSS + JS embutidos) e sobe ao WordPress.

USO:
    python3 gerar_portal.py

PARA ADICIONAR NOVO ARTIGO:
    1. Abra posts.js
    2. Adicione a entrada no topo do const DB = {
    3. Execute este script

ARQUITETURA:
    index.html  → estrutura HTML
    style.css   → todo o CSS (variáveis de cor da logo no topo)
    script.js   → DB dos artigos + toda a lógica
    posts.js    → backup do DB (não usado pelo deploy)
"""

import re, requests
from pathlib import Path
from requests.auth import HTTPBasicAuth

# ── Configuração ──────────────────────────────────────────────
DOMINIO = "https://japaorelativo.com"
AUTH    = HTTPBasicAuth("procederfilosofico@gmail.com", "l5vq ChwA cFXq 9niF m58W fDhg")
BASE    = f"{DOMINIO}/wp-json/wp/v2"
WP_MEDIA = f"{DOMINIO}/wp-content/uploads/2026/05"
DIR     = Path(__file__).parent

# Mapeamento: caminhos locais → URLs do WordPress media
IMG_MAP = {
    "imagens/imagens layolt/logo.PNG": f"{WP_MEDIA}/logo-jr.png",
    "wallpaper jr/IMG_2288.JPG":       f"{WP_MEDIA}/wallpaper-jr-1.jpg",
    "wallpaper jr/IMG_2289.JPG":       f"{WP_MEDIA}/wallpaper-jr-2.jpg",
    "wallpaper jr/IMG_2290.JPG":       f"{WP_MEDIA}/wallpaper-jr-3.jpg",
    "wallpaper jr/IMG_2291.jpg":       f"{WP_MEDIA}/wallpaper-jr-4.jpg",
    "imagens/wallpaper jr/IMG_2288.JPG": f"{WP_MEDIA}/wallpaper-jr-1.jpg",
    "imagens/wallpaper jr/IMG_2289.JPG": f"{WP_MEDIA}/wallpaper-jr-2.jpg",
    "imagens/wallpaper jr/IMG_2290.JPG": f"{WP_MEDIA}/wallpaper-jr-3.jpg",
    "imagens/wallpaper jr/IMG_2291.jpg": f"{WP_MEDIA}/wallpaper-jr-4.jpg",
}


def contar_artigos(script: str) -> int:
    db_start = script.find("const DB = {")
    db_end   = script.find("\nconst SLIDES")
    if db_end == -1:
        db_end = script.find("\nconst CARDS_POR_PAGINA")
    bloco = script[db_start:db_end] if db_end > 0 else script[db_start:]
    return len(re.findall(r'^\s+"[\w-]+":\s*\{', bloco, re.MULTILINE))


def gerar_html() -> str:
    """Lê index.html, style.css e script.js e gera um HTML único com tudo inline."""
    html = (DIR / "index.html").read_text(encoding="utf-8")
    css  = (DIR / "style.css").read_text(encoding="utf-8")
    js   = (DIR / "script.js").read_text(encoding="utf-8")

    # Substitui caminhos locais por URLs do WordPress
    for local, remote in IMG_MAP.items():
        html = html.replace(local, remote)
        js   = js.replace(local, remote)

    # Inline CSS
    html = html.replace(
        '<link rel="stylesheet" href="style.css">',
        f"<style>\n{css}\n</style>"
    )

    # Inline JS (suporta com ou sem posts.js)
    html = html.replace(
        '<script src="posts.js"></script>\n  <script src="script.js"></script>',
        f"<script>\n{js}\n</script>"
    )
    html = html.replace(
        '<script src="script.js"></script>',
        f"<script>\n{js}\n</script>"
    )

    return html


def upload_portal(html: str) -> str:
    """Deleta o portal.html antigo e sobe o novo. Retorna a URL."""
    # Remove o arquivo anterior se existir
    r = requests.get(f"{BASE}/media", auth=AUTH,
                     params={"search": "portal.html", "per_page": 10})
    for m in (r.json() if r.ok else []):
        if "portal.html" in m.get("source_url", ""):
            requests.delete(f"{BASE}/media/{m['id']}?force=true", auth=AUTH, timeout=20)
            print(f"  Removido portal.html anterior (media {m['id']})")

    resp = requests.post(
        f"{BASE}/media",
        headers={
            "Content-Disposition": 'attachment; filename="portal.html"',
            "Content-Type": "text/html; charset=utf-8",
        },
        data=html.encode("utf-8"),
        auth=AUTH,
        timeout=60,
    )
    resp.raise_for_status()
    url = resp.json()["source_url"]
    print(f"  ✓ portal.html subido: {url}")
    return url


def atualizar_template(url: str):
    """Aponta o template front-page para o novo portal.html."""
    content = (
        f'<!-- wp:html -->'
        f'<script>window.location.replace("{url}");</script>'
        f'<noscript><meta http-equiv="refresh" content="0;url={url}"></noscript>'
        f'<!-- /wp:html -->'
    )
    r = requests.post(
        f"{BASE}/templates/hostinger-ai-theme//front-page",
        json={"content": content, "status": "publish"},
        auth=AUTH,
        timeout=30,
    )
    if r.ok:
        print(f"  ✓ Template front-page atualizado")
    else:
        print(f"  ✗ Erro no template: {r.status_code}")


def main():
    print("=" * 52)
    print("  DEPLOY — Japão Relativo")
    print("=" * 52)

    print("\n[1] Gerando portal.html inline...")
    html = gerar_html()
    js_content = (DIR / "script.js").read_text(encoding="utf-8")
    n_artigos  = contar_artigos(js_content)
    print(f"  HTML gerado: {len(html):,} chars | {n_artigos} artigos")

    print("\n[2] Subindo ao WordPress...")
    url = upload_portal(html)

    print("\n[3] Atualizando template front-page...")
    atualizar_template(url)

    print("\n" + "=" * 52)
    print(f"  ✓ Deploy concluído!")
    print(f"  Site: {DOMINIO}")
    print(f"  Artigos: {n_artigos}")
    print("=" * 52)


if __name__ == "__main__":
    main()
