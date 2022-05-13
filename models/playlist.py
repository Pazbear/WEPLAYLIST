from typing import Optional
from datetime import datetime
from pydantic import BaseConfig, BaseModel, Field


class Playlist(BaseModel):
    id: Optional[str]
    name: str
    owner: str
    password: str
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class SavePlaylistModel(BaseModel):
    name: str
    password: str
