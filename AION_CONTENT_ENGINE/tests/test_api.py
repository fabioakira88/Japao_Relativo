from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.database.db import Base, get_db
from app.main import app


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    testing_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db() -> Generator[Session, None, None]:
        db = testing_session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


def test_health_check(client: TestClient) -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "Aion Content Engine",
    }


def test_create_content(client: TestClient) -> None:
    payload = {
        "project": "japao-relativo",
        "content_type": "article",
        "title": "A arquitetura do silêncio",
        "slug": "arquitetura-do-silencio",
        "status": "draft",
        "payload_json": {"language": "pt-BR"},
    }

    created = client.post("/contents", json=payload)

    assert created.status_code == 201
    assert created.json()["id"] == 1
    assert created.json()["project"] == "japao-relativo"
    assert created.json()["payload_json"] == {"language": "pt-BR"}

def test_list_contents(client: TestClient) -> None:
    for index in range(2):
        response = client.post(
            "/contents",
            json={
                "project": "japao-relativo",
                "content_type": "article",
                "title": f"Conteúdo {index + 1}",
                "slug": f"conteudo-{index + 1}",
                "payload_json": {},
            },
        )
        assert response.status_code == 201

    response = client.get("/contents")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_content_by_id(client: TestClient) -> None:
    created = client.post(
        "/contents",
        json={
            "project": "japao-relativo",
            "content_type": "article",
            "title": "Conteúdo pesquisável",
            "slug": "conteudo-pesquisavel",
            "payload_json": {},
        },
    )

    response = client.get(f"/contents/{created.json()['id']}")

    assert response.status_code == 200
    assert response.json()["title"] == "Conteúdo pesquisável"


def test_produce_mountain(client: TestClient) -> None:
    response = client.post("/produce/mountain")
    content = response.json()

    assert response.status_code == 201
    assert content["project"] == "elevacao"
    assert content["content_type"] == "mountain"
    assert content["status"] == "draft"
    assert content["payload_json"] == {
        "name": "Mount Fuji",
        "country": "Japan",
        "altitude": 3776,
    }


def test_produce_mountain_batch(client: TestClient) -> None:
    response = client.post("/produce/mountains/batch", json={"quantity": 5})
    contents = response.json()
    names = [content["payload_json"]["name"] for content in contents]

    assert response.status_code == 201
    assert len(contents) == 5
    assert len(set(names)) == 5
    assert all(content["project"] == "elevacao" for content in contents)
    assert all(content["content_type"] == "mountain" for content in contents)
