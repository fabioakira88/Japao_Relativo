# Ecossistema Digital — Fabio Tsugawa

Dois portais de conteúdo com deploy automatizado.

## Sites

| | Japão Relativo | Proceder Filosófico |
|---|---|---|
| **URL** | japaorelativo.com | procederfilosofico.com.br |
| **Stack** | HTML + CSS + JS vanilla | WordPress + Hostinger AI Theme |
| **Artigos** | 32 | 16 |
| **Deploy** | `python3 gerar_portal.py` | `python3 publicar_[nome].py` |

## Publicar novo artigo

### Japão Relativo
```bash
# 1. Adicione no topo do const DB em posts.js e script.js
# 2. Deploy:
python3 JAPAO_RELATIVO/gerar_portal.py
```

### Proceder Filosófico
```bash
# 1. Copie e adapte o script:
cp PROCEDER_FILOSOFICO/publicar_agostinho.py PROCEDER_FILOSOFICO/publicar_[nome].py
# 2. Ajuste os campos e execute:
python3 PROCEDER_FILOSOFICO/publicar_[nome].py
```

## Documentação completa

→ [`Documentação dos Sites/ARQUITETURA.md`](Documentação%20dos%20Sites/ARQUITETURA.md)
