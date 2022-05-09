from typing import Optional
from datetime import datetime
from pydantic import BaseModel, BaseConfig, EmailStr, Field


class User(BaseModel):
    id: Optional[str] = Field(...)
    username: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    created_at: datetime = Field(default=datetime.utcnow)
    updated_at: datetime = Field(default=datetime.utcnow)

    class Config(BaseConfig):
        allow_population_by_field_name = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None
    username: Optional[str] = None


class LoginModel(BaseModel):
    email: EmailStr
    password: str
