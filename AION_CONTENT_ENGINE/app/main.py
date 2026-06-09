from fastapi import FastAPI

from app.api.routes import router
from app.config import settings
from app.database.db import init_db


def create_app() -> FastAPI:
    init_db()
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Modular API for automated content workflows.",
    )
    app.include_router(router)
    return app


app = create_app()
