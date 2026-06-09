from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ContentStatus(str, Enum):
    DRAFT = "draft"
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ContentCreate(BaseModel):
    project: str = Field(..., min_length=1, max_length=120)
    content_type: str = Field(..., min_length=1, max_length=80)
    title: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255)
    status: ContentStatus = ContentStatus.DRAFT
    payload_json: dict[str, Any] = Field(default_factory=dict)


class ContentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project: str
    content_type: str
    title: str
    slug: str
    status: ContentStatus
    payload_json: dict[str, Any]
    created_at: datetime
    updated_at: datetime


class ProductionRequest(BaseModel):
    quantity: int = Field(default=1, ge=1, le=5)
