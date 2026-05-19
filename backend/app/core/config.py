from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Smart Lecture API"
    api_prefix: str = "/api"
    frontend_url: str = "http://localhost:8080"
    debug: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_prefix="FASTAPI_")


settings = Settings()
