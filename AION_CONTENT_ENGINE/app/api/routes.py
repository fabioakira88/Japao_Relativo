from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Content
from app.schemas import ContentCreate, ContentResponse, ContentStatus
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
