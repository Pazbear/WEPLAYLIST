from typing import Optional
from datetime import datetime
from pydantic import BaseConfig, BaseModel, Field

from models.user import User


class Subscription(BaseModel):
    from_user: str
    to_user: User
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class CreateSubscriptionModel(BaseModel):
    from_user: str
    to_user: str
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class SubscriptModel(BaseModel):
    to_user_id: str
