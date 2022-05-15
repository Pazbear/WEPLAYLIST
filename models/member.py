from typing import Optional
from datetime import datetime
from pydantic import BaseConfig, BaseModel, Field


class Member(BaseModel):
    id: Optional[str]
    user_id: str
    playlist_id: str
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class AddMemberModel(BaseModel):
    playlist_id: str
