import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

# ── Configuração ──────────────────────────────────────────────
DOMINIO      = "https://japaorelativo.com"
USUARIO      = "procederfilosofico@gmail.com"
APP_PASSWORD = "l5vq ChwA cFXq 9niF m58W fDhg"

HTML_FILE    = Path(__file__).parent / "japaorelativo.html"
TITULO       = "Portal Japão Relativo"
STATUS       = "draft"   # mude para "publish" quando quiser publicar
# ─────────────────────────────────────────────────────────────

AUTH = HTTPBasicAuth(USUARIO, APP_PASSWORD)


def buscar_post_existente(titulo: str):
    """Retorna o ID do post se o título já existir, ou None."""
    r = requests.get(
        f"{DOMINIO}/wp-json/wp/v2/posts",
        params={"search": titulo, "per_page": 5, "status": "any"},
        auth=AUTH,
        timeout=20,
    )
    if r.status_code == 200:
        for post in r.json():
            if post.get("title", {}).get("rendered", "").strip() == titulo.strip():
                return post["id"]
    return None


def publicar():
    conteudo = HTML_FILE.read_text(encoding="utf-8")

    post_id = buscar_post_existente(TITULO)

    if post_id:
        print(f"Post já existe (ID {post_id}). Atualizando...")
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts/{post_id}"
        method   = requests.post
    else:
        print("Nenhum post encontrado. Criando novo...")
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts"
        method   = requests.post

    payload = {
        "title":   TITULO,
        "content": conteudo,
        "status":  STATUS,
        "format":  "standard",
    }

    resposta = method(endpoint, json=payload, auth=AUTH, timeout=30)

    if resposta.status_code in (200, 201):
        dados = resposta.json()
        acao  = "Atualizado" if post_id else "Publicado"
        print(f"✓ {acao} com sucesso!")
        print(f"  ID     : {dados['id']}")
        print(f"  Status : {dados['status']}")
        print(f"  URL    : {dados['link']}")
    else:
        print(f"✗ Erro {resposta.status_code}")
        print(resposta.text[:300])


if __name__ == "__main__":
    publicar()
