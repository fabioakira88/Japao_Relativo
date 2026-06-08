from pydantic import BaseModel, ConfigDict
from fastapi import APIRouter

from app.modules.mountains import Mountain, generate_mountain


class HealthResponse(BaseModel):
    status: str
    service: str


class MountainResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    country: str
    altitude: int


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", service="Aion Content Engine")


@router.post("/produce/mountain", response_model=MountainResponse)
def produce_mountain() -> Mountain:
    return generate_mountain()
