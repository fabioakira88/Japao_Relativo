"""
publicar_todos.py
Extrai os 29 artigos do japaorelativo.html e publica no WordPress.
Cria categorias, sobe imagens destacadas e protege contra duplicatas.
"""

import re
import requests
import tempfile
from pathlib import Path
from requests.auth import HTTPBasicAuth

# ── Configuração ──────────────────────────────────────────────
DOMINIO      = "https://japaorelativo.com"
USUARIO      = "procederfilosofico@gmail.com"
APP_PASSWORD = "l5vq ChwA cFXq 9niF m58W fDhg"
HTML_FILE    = Path(__file__).parent / "japaorelativo.html"
STATUS       = "draft"   # troque para "publish" quando quiser ir ao ar
# ─────────────────────────────────────────────────────────────

AUTH = HTTPBasicAuth(USUARIO, APP_PASSWORD)

MESES = {
    "Janeiro":"01","Fevereiro":"02","Março":"03","Abril":"04",
    "Maio":"05","Junho":"06","Julho":"07","Agosto":"08",
    "Setembro":"09","Outubro":"10","Novembro":"11","Dezembro":"12"
}

# Imagens locais para o artigo "Ninguém Pode Saber"
_NS = Path(__file__).parent / "imagens" / "ninguem pode saber"
IMAGENS_LOCAIS = {
    "imagens/ninguem pode saber/IMG_2242.JPG": _NS / "IMG_2242.JPG",
    "imagens/ninguem pode saber/IMG_2244.JPG": _NS / "IMG_2244.JPG",
    "imagens/ninguem pode saber/IMG_2245.JPG": _NS / "IMG_2245.JPG",
    "imagens/ninguem pode saber/IMG_2246.JPG": _NS / "IMG_2246.JPG",
    "imagens/ninguem pode saber/IMG_2247.JPG": _NS / "IMG_2247.JPG",
    "imagens/ninguem pode saber/IMG_2251.JPG": _NS / "IMG_2251.JPG",
}


# ─────────────────────────────────────────────────────────────
# EXTRAÇÃO DO HTML
# ─────────────────────────────────────────────────────────────

def extrair_artigos():
    html = HTML_FILE.read_text(encoding="utf-8")
    db_start = html.find("const DB = {")
    db_end   = html.find("// STATE", db_start)
    db_block = html[db_start:db_end]

    slugs = [(m.start(), m.group(1))
             for m in re.finditer(r'^\s{2}"([^"]+)":\s*\{', db_block, re.MULTILINE)]

    artigos = []
    for i, (pos, slug) in enumerate(slugs):
        end = slugs[i + 1][0] if i + 1 < len(slugs) else len(db_block)
        chunk = db_block[pos:end]

        title = _campo_str(chunk, "title")
        tag   = _campo_str(chunk, "tag")
        date  = _campo_str(chunk, "date")
        thumb = _campo_str(chunk, "thumb")
        content = _campo_backtick(chunk)

        artigos.append(dict(slug=slug, title=title, tag=tag,
                            date=date, thumb=thumb, content=content))
    return artigos


def _campo_str(chunk, key):
    idx = chunk.find(f'{key}:')
    if idx == -1:
        return ""
    rest = chunk[idx + len(key) + 1:].lstrip()
    if rest.startswith('"'):
        end = rest.find('",', 1)
        if end == -1:
            end = rest.find('"\n', 1)
        return rest[1:end] if end != -1 else ""
    return ""


def _campo_backtick(chunk):
    idx = chunk.find("content:`")
    if idx == -1:
        idx = chunk.find("content: `")
    if idx == -1:
        return ""
    start = chunk.find("`", idx) + 1
    end   = chunk.rfind("`")
    return chunk[start:end].strip()


def iso_date(date_str):
    m = re.match(r"(\d+) de (\w+) de (\d{4})", date_str)
    if m:
        dia, mes_nome, ano = m.groups()
        mes = MESES.get(mes_nome, "01")
        return f"{ano}-{mes}-{dia.zfill(2)}T12:00:00"
    return None


# ─────────────────────────────────────────────────────────────
# CATEGORIAS
# ─────────────────────────────────────────────────────────────

_cat_cache = {}

def obter_ou_criar_categoria(nome):
    if nome in _cat_cache:
        return _cat_cache[nome]

    r = requests.get(f"{DOMINIO}/wp-json/wp/v2/categories",
                     params={"search": nome, "per_page": 10},
                     auth=AUTH, timeout=15)
    for c in (r.json() if r.ok else []):
        if c["name"].strip().lower() == nome.strip().lower():
            _cat_cache[nome] = c["id"]
            return c["id"]

    r = requests.post(f"{DOMINIO}/wp-json/wp/v2/categories",
                      json={"name": nome}, auth=AUTH, timeout=15)
    if r.status_code in (200, 201):
        cat_id = r.json()["id"]
        _cat_cache[nome] = cat_id
        return cat_id
    return None


# ─────────────────────────────────────────────────────────────
# IMAGENS
# ─────────────────────────────────────────────────────────────

_media_cache = {}

def upload_imagem_url(url):
    """Baixa imagem de uma URL e sobe no WordPress. Retorna media_id."""
    if url in _media_cache:
        return _media_cache[url]

    try:
        resp = requests.get(url, timeout=20, stream=True)
        if not resp.ok:
            return None
        ext = url.split("?")[0].rsplit(".", 1)[-1].lower() or "jpg"
        mime = f"image/{ext}" if ext != "jpg" else "image/jpeg"
        filename = url.split("/")[-1].split("?")[0] or "imagem.jpg"

        r = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/media",
            headers={"Content-Disposition": f'attachment; filename="{filename}"',
                     "Content-Type": mime},
            data=resp.content,
            auth=AUTH,
            timeout=60,
        )
        if r.status_code in (200, 201):
            mid = r.json()["id"]
            _media_cache[url] = mid
            return mid
    except Exception as e:
        print(f"    ⚠ Erro ao baixar imagem: {e}")
    return None


def upload_imagem_local(path: Path):
    """Sobe imagem local no WordPress. Retorna media_id."""
    key = str(path)
    if key in _media_cache:
        return _media_cache[key]

    if not path.exists():
        return None

    with open(path, "rb") as f:
        r = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/media",
            headers={"Content-Disposition": f'attachment; filename="{path.name}"',
                     "Content-Type": "image/jpeg"},
            data=f,
            auth=AUTH,
            timeout=60,
        )
    if r.status_code in (200, 201):
        dados = r.json()
        mid = dados["id"]
        url = dados["source_url"]
        _media_cache[key] = mid
        _media_cache[url] = mid
        return mid
    return None


def substituir_imagens_locais(content):
    """Sobe imagens locais do artigo 'Ninguém Pode Saber' e substitui as URLs no conteúdo."""
    for local_path_str, local_path in IMAGENS_LOCAIS.items():
        if local_path_str in content:
            mid = upload_imagem_local(local_path)
            if mid:
                r = requests.get(f"{DOMINIO}/wp-json/wp/v2/media/{mid}", auth=AUTH, timeout=10)
                if r.ok:
                    url = r.json().get("source_url", "")
                    if url:
                        content = content.replace(local_path_str, url)
    return content


# ─────────────────────────────────────────────────────────────
# POSTS
# ─────────────────────────────────────────────────────────────

def post_existente(titulo):
    r = requests.get(f"{DOMINIO}/wp-json/wp/v2/posts",
                     params={"search": titulo[:50], "per_page": 10, "status": "any"},
                     auth=AUTH, timeout=15)
    for p in (r.json() if r.ok else []):
        if p.get("title", {}).get("rendered", "").strip() == titulo.strip():
            return p["id"]
    return None


def publicar_artigo(artigo):
    titulo  = artigo["title"]
    content = artigo["content"]
    tag     = artigo["tag"]
    thumb   = artigo["thumb"]
    slug    = artigo["slug"]
    date    = artigo["date"]

    print(f"\n  [{tag}] {titulo[:70]}")

    # Substitui imagens locais no conteúdo
    content = substituir_imagens_locais(content)

    # Categoria
    cat_id = obter_ou_criar_categoria(tag)

    # Duplicata?
    post_id = post_existente(titulo)
    if post_id:
        print(f"    → Já existe (ID {post_id}). Atualizando conteúdo...")
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts/{post_id}"
    else:
        endpoint = f"{DOMINIO}/wp-json/wp/v2/posts"

    payload = {
        "title":      titulo,
        "content":    content,
        "status":     STATUS,
        "slug":       slug,
        "categories": [cat_id] if cat_id else [],
        "format":     "standard",
    }
    data_iso = iso_date(date)
    if data_iso:
        payload["date"] = data_iso

    r = requests.post(endpoint, json=payload, auth=AUTH, timeout=30)
    if r.status_code not in (200, 201):
        print(f"    ✗ Erro {r.status_code}: {r.text[:200]}")
        return

    post_id = r.json()["id"]
    acao = "Atualizado" if "Atualizando" in str(r) or post_id else "Criado"
    print(f"    ✓ {acao} — ID {post_id}")

    # Upload e set da imagem destacada (PATCH após criação evita bug do tema)
    if thumb:
        if thumb.startswith("http"):
            media_id = upload_imagem_url(thumb)
        else:
            local = Path(__file__).parent / thumb
            media_id = upload_imagem_local(local)

        if media_id:
            requests.post(
                f"{DOMINIO}/wp-json/wp/v2/posts/{post_id}",
                json={"featured_media": media_id},
                auth=AUTH,
                timeout=15,
            )
            print(f"    ✓ Imagem destacada definida (media {media_id})")


# ─────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────

def main():
    artigos = extrair_artigos()
    print(f"✓ {len(artigos)} artigos extraídos do HTML\n")
    print(f"Status: {STATUS.upper()}")
    print("=" * 60)

    for a in artigos:
        publicar_artigo(a)

    print("\n" + "=" * 60)
    print("✓ Concluído!")
    print(f"  Painel WP: {DOMINIO}/wp-admin/edit.php")


if __name__ == "__main__":
    main()
