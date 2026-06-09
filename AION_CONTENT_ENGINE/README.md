# Aion Content Engine

API modular para automação de conteúdo.

## Fase Atual

Esta é a Fase 2 do projeto.

A Fase 1 validou a arquitetura básica com FastAPI, rotas iniciais e um mock de montanha.

A Fase 2 adiciona persistência local com SQLite, tabela `contents`, schemas Pydantic e fluxo básico de produção mock salvando dados no banco.

Ainda não há integração com OpenAI, Notion, GitHub, autenticação ou frontend.

## Stack

- Python 3.12
- FastAPI
- SQLite
- SQLAlchemy
- Pydantic

## Estrutura

```text
AION_CONTENT_ENGINE/
  app/
    main.py
    config.py
    schemas.py
    api/
      routes.py
    database/
      db.py
      models.py
    modules/
      mountains.py
    services/
      content_service.py
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

Se `python3.12` não estiver disponível no seu ambiente local:

```bash
python3 -m venv .venv
```

## Como rodar

```bash
cd AION_CONTENT_ENGINE
source .venv/bin/activate
uvicorn app.main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

## Documentação interativa

Abra:

```text
http://127.0.0.1:8000/docs
```

## Endpoints

### Health check

```bash
curl http://127.0.0.1:8000/health
```

### Criar conteúdo manual

```bash
curl -X POST http://127.0.0.1:8000/contents \
  -H "Content-Type: application/json" \
  -d '{
    "project": "japao-relativo",
    "content_type": "article",
    "title": "A arquitetura do silêncio",
    "slug": "arquitetura-do-silencio",
    "status": "draft",
    "payload_json": {
      "language": "pt-BR"
    }
  }'
```

### Listar conteúdos

```bash
curl http://127.0.0.1:8000/contents
```

### Buscar conteúdo por ID

```bash
curl http://127.0.0.1:8000/contents/1
```

### Produzir uma montanha mock

```bash
curl -X POST http://127.0.0.1:8000/produce/mountain
```

Esse endpoint gera uma montanha mock, salva no banco como:

```text
project = elevacao
content_type = mountain
status = draft
```

### Produzir batch de montanhas mock

```bash
curl -X POST http://127.0.0.1:8000/produce/mountains/batch \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

O batch aceita `quantity` entre 1 e 5 e não repete montanhas no mesmo lote.

## Como rodar testes

```bash
cd AION_CONTENT_ENGINE
source .venv/bin/activate
pytest
```

## Banco de Dados

A aplicação usa SQLite por padrão:

```text
sqlite:///./aion_content_engine.db
```

A tabela criada nesta fase é `contents`, com os campos:

- `id`
- `project`
- `content_type`
- `title`
- `slug`
- `status`
- `payload_json`
- `created_at`
- `updated_at`

## Preparação para PostgreSQL

A configuração fica em `DATABASE_URL`, então a troca futura para PostgreSQL deve acontecer sem alterar as rotas principais:

```text
postgresql+psycopg://user:password@localhost:5432/aion_content_engine
```

## Diferença Entre Fase 1 e Fase 2

Fase 1:

- API modular inicial.
- `/health`.
- Produção mock de montanha sem persistência.
- Estrutura preparada para crescer.

Fase 2:

- SQLite funcional.
- Modelo ORM `Content`.
- Schemas Pydantic.
- Criação manual de conteúdo.
- Listagem de conteúdos.
- Busca por ID.
- Produção mock salvando no banco.
- Batch de montanhas mock.
- Status de produção tipados.
- Camada de serviço para separar HTTP e persistência.
- Testes cobrindo fluxo básico.

## Limitações Atuais

- Sem IA.
- Sem Notion.
- Sem GitHub.
- Sem autenticação.
- Sem frontend.
- Sem migrações Alembic.
- Sem paginação.
- Sem filtros avançados.

## Próxima Fase Recomendada

Na Fase 3, recomenda-se adicionar:

- Migrações com Alembic.
- Paginação e filtros em `GET /contents`.
- Endpoint para atualizar status de produção.
- Camada de produtores com interfaces bem definidas.
- Tratamento centralizado de erros e logs estruturados.
