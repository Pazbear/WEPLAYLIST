from typing import Optional
from datetime import datetime
from pydantic import BaseConfig, BaseModel, Field


class Music(BaseModel):
    id: Optional[str]
    name: str
    artist: str
    youtube_url: str
    length: str
    playlist_id: str
    order: int
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class AddMusicModel(BaseModel):
    name: str
    artist: str
    youtube_url: str
    playlist_id: str
    password: str
    order: int


class ChangeMusicOrderModel(BaseModel):
    music_id1: str
    music_id2: str
