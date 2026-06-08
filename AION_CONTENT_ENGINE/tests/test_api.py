from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "Aion Content Engine",
    }


def test_produce_mountain() -> None:
    response = client.post("/produce/mountain")

    assert response.status_code == 200
    assert response.json() == {
        "name": "Mount Fuji",
        "country": "Japan",
        "altitude": 3776,
    }
