from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Content
from app.modules.mountains import Mountain, generate_mountain, generate_mountains
from app.schemas import ContentCreate, ContentResponse, ContentStatus, ProductionRequest
from app.services import content_service


class HealthResponse(BaseModel):
    status: str
    service: str


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", service="Aion Content Engine")


@router.post("/contents", response_model=ContentResponse, status_code=status.HTTP_201_CREATED)
def create_content(content_in: ContentCreate, db: Session = Depends(get_db)) -> Content:
    return content_service.create_content(db, content_in)


@router.get("/contents", response_model=list[ContentResponse])
def list_contents(db: Session = Depends(get_db)) -> list[Content]:
    return content_service.list_contents(db)


@router.get("/contents/{content_id}", response_model=ContentResponse)
def get_content(content_id: int, db: Session = Depends(get_db)) -> Content:
    content = content_service.get_content(db, content_id)
    if content is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content not found")
    return content


def mountain_to_content_create(mountain: Mountain) -> ContentCreate:
    return ContentCreate(
        project="elevacao",
        content_type="mountain",
        title=mountain.name,
        slug=mountain.name.lower().replace(" ", "-"),
        status=ContentStatus.DRAFT,
        payload_json={
            "name": mountain.name,
            "country": mountain.country,
            "altitude": mountain.altitude,
        },
    )


@router.post("/produce/mountain", response_model=ContentResponse, status_code=status.HTTP_201_CREATED)
def produce_mountain(db: Session = Depends(get_db)) -> Content:
    return content_service.create_content(db, mountain_to_content_create(generate_mountain()))


@router.post("/produce/mountains/batch", response_model=list[ContentResponse], status_code=status.HTTP_201_CREATED)
def produce_mountain_batch(
    request: ProductionRequest,
    db: Session = Depends(get_db),
) -> list[Content]:
    contents_in = [
        mountain_to_content_create(mountain)
        for mountain in generate_mountains(request.quantity)
    ]
    return content_service.create_contents(db, contents_in)
