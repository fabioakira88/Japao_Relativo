# Aion Content Engine

Fase 1 de uma API modular para automação de conteúdo.

Nesta etapa, o objetivo é validar arquitetura, organização e fluxo básico da aplicação. Não há integração com IA, Notion, GitHub, autenticação ou frontend.

## Stack

- Python 3.12
- FastAPI
- SQLite temporário
- SQLAlchemy, preparado para trocar `DATABASE_URL` para PostgreSQL futuramente

## Estrutura

```text
AION_CONTENT_ENGINE/
  app/
    main.py
    config.py
    api/
      routes.py
    database/
      db.py
      models.py
    modules/
      mountains.py
  tests/
    test_api.py
  requirements.txt
  README.md
```

## Como instalar

```bash
cd AION_CONTENT_ENGINE
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Se `python3.12` não estiver disponível no seu ambiente, use o Python 3 instalado:

```bash
python3 -m venv .venv
```

## Como executar

```bash
cd AION_CONTENT_ENGINE
source .venv/bin/activate
uvicorn app.main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

Documentação interativa:

```text
http://127.0.0.1:8000/docs
```

## Como testar a API

Health check:

```bash
curl http://127.0.0.1:8000/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "Aion Content Engine"
}
```

Produção mock de montanha:

```bash
curl -X POST http://127.0.0.1:8000/produce/mountain
```

Resposta esperada:

```json
{
  "name": "Mount Fuji",
  "country": "Japan",
  "altitude": 3776
}
```

## Como rodar testes automatizados

```bash
cd AION_CONTENT_ENGINE
source .venv/bin/activate
pytest
```

## Configuração

A aplicação usa `DATABASE_URL` por variável de ambiente.

Padrão local:

```text
sqlite:///./aion_content_engine.db
```

Exemplo futuro para PostgreSQL:

```text
postgresql+psycopg://user:password@localhost:5432/aion_content_engine
```

## Relatório da Fase 1

- `app/`: pacote principal da aplicação. Centraliza código executável da API.
- `app/main.py`: ponto de entrada FastAPI. Cria a aplicação e registra as rotas.
- `app/config.py`: concentra configurações globais por variáveis de ambiente, incluindo `DATABASE_URL`.
- `app/api/`: camada HTTP. Mantém endpoints separados da lógica de negócio.
- `app/api/routes.py`: define `/health` e `/produce/mountain`.
- `app/database/`: camada de persistência. Já nasce isolada para facilitar a troca de SQLite para PostgreSQL.
- `app/database/db.py`: cria engine SQLAlchemy, sessão e dependência `get_db`.
- `app/database/models.py`: modelos ORM iniciais. Inclui `ContentRecord` como base futura para registros de conteúdo.
- `app/modules/`: módulos de produção de conteúdo. É aqui que integrações futuras com OpenAI, Notion e GitHub devem se encaixar.
- `app/modules/mountains.py`: módulo mock da Fase 1 com `generate_mountain()`.
- `tests/`: valida os endpoints básicos sem depender de servidor externo.
- `requirements.txt`: dependências mínimas para rodar e testar a API.

