from collections.abc import Iterable
from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.models import Content
from app.schemas import ContentCreate


def build_available_slug(db: Session, base_slug: str, reserved_slugs: Optional[set[str]] = None) -> str:
    reserved = reserved_slugs or set()
    slug = base_slug
    suffix = 2
    while slug in reserved or db.scalar(select(Content.id).where(Content.slug == slug)) is not None:
        slug = f"{base_slug}-{suffix}"
        suffix += 1
    return slug


def create_content(db: Session, content_in: ContentCreate) -> Content:
    return create_contents(db, [content_in])[0]


def create_contents(db: Session, contents_in: Iterable[ContentCreate]) -> list[Content]:
    contents: list[Content] = []
    reserved_slugs: set[str] = set()

    for content_in in contents_in:
        data = content_in.model_dump(mode="json")
        data["slug"] = build_available_slug(db, content_in.slug, reserved_slugs)
        reserved_slugs.add(data["slug"])
        contents.append(Content(**data))

    db.add_all(contents)
    db.commit()
    for content in contents:
        db.refresh(content)
    return contents


def list_contents(db: Session) -> list[Content]:
    statement = select(Content).order_by(Content.created_at.desc(), Content.id.desc())
    return list(db.scalars(statement))


def get_content(db: Session, content_id: int) -> Optional[Content]:
    return db.get(Content, content_id)
