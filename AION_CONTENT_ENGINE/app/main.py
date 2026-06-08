from fastapi import FastAPI

from app.api.routes import router
from app.config import settings


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Modular API for automated content workflows.",
    )
    app.include_router(router)
    return app


app = create_app()
