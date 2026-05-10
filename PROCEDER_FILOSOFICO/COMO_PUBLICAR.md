# Como publicar — Proceder Filosófico

## Arquivos ativos

| Arquivo | Função |
|---|---|
| `posts.js` | Array POSTS com 16 artigos |
| `index.html` | Protótipo local (dark navy) |
| `publicar_agostinho.py` | Template base para publicação |

## Adicionar novo artigo

**Passo 1** — Copie o script template:
```bash
cp publicar_agostinho.py publicar_[filosofo].py
```

**Passo 2** — Edite os campos no novo script:
- `slug`, `title`, `tag`, `date`, `excerpt`, `content`
- Coloque a imagem em `Canva - Proceder/Filósofos/`

**Passo 3** — Publique:
```bash
python3 publicar_[filosofo].py
```

O script verifica duplicatas automaticamente.

## Tags disponíveis

`FILOSOFIA CLÁSSICA` | `FILOSOFIA MEDIEVAL` | `FILOSOFIA MODERNA` | `EXISTENCIALISMO` | `FILOSOFIA ORIENTAL` | `FILOSOFIA CRÍTICA` | `METAFÍSICA`
