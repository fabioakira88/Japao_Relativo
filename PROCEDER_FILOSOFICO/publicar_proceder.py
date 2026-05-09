import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

# ── Configuração ──────────────────────────────────────────────
DOMINIO      = "https://procederfilosofico.com.br"
USUARIO      = "procederfilosofico@gmail.com"
APP_PASSWORD = "LKG2 mbly DXxA Aive gW5v Snwp"

HTML_FILE    = Path(__file__).parent / "proceder.html"
IMAGEM_FILE  = Path(__file__).parent / "imagens filosofia " / "santo_agostinho.jpeg"
TITULO       = "As Confissões de Santo Agostinho: seis momentos que mudaram a filosofia ocidental"
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


def upload_imagem():
    """Faz upload da imagem e retorna (media_id, url) ou (None, None)."""
    if not IMAGEM_FILE.exists():
        print("⚠ Imagem não encontrada, publicando sem foto.")
        return None, None

    # Verifica se já existe no servidor
    r = requests.get(
        f"{DOMINIO}/wp-json/wp/v2/media",
        params={"search": IMAGEM_FILE.name, "per_page": 5},
        auth=AUTH,
        timeout=20,
    )
    if r.status_code == 200:
        for m in r.json():
            if IMAGEM_FILE.stem in m.get("source_url", ""):
                print(f"  ✓ Imagem já existe: {m['source_url']}")
                return m["id"], m["source_url"]

    print("↑ Fazendo upload da imagem...")
    with open(IMAGEM_FILE, "rb") as f:
        resp = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/media",
            headers={
                "Content-Disposition": f'attachment; filename="{IMAGEM_FILE.name}"',
                "Content-Type": "image/jpeg",
            },
            data=f,
            auth=AUTH,
            timeout=60,
        )
    if resp.status_code in (200, 201):
        dados = resp.json()
        print(f"  ✓ Imagem enviada: {dados['source_url']}")
        return dados["id"], dados["source_url"]
    else:
        print(f"  ✗ Erro no upload: {resp.status_code}")
        return None, None


def publicar():
    conteudo = HTML_FILE.read_text(encoding="utf-8")

    _, media_url = upload_imagem()

    if media_url:
        bloco_imagem = (
            f'<figure class="wp-block-image size-large" style="text-align:center;margin-bottom:2em;">'
            f'<img src="{media_url}" alt="Santo Agostinho de Hipona" style="max-width:100%;border-radius:4px;"/>'
            f'<figcaption>Santo Agostinho de Hipona (354–430 d.C.)</figcaption>'
            f'</figure>\n\n'
        )
        conteudo = bloco_imagem + conteudo

    post_id = buscar_post_existente(TITULO)

    if post_id:
        print(f"Post já existe (ID {post_id}). Atualizando...")
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts/{post_id}"
    else:
        print("Nenhum post encontrado. Criando novo...")
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts"

    payload = {
        "title":   TITULO,
        "content": conteudo,
        "status":  STATUS,
        "format":  "standard",
    }

    resposta = requests.post(endpoint, json=payload, auth=AUTH, timeout=30)

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
