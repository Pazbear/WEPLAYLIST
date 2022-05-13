from typing import Optional
from datetime import datetime
from pydantic import BaseModel, BaseConfig, EmailStr, Field


class User(BaseModel):
    id: Optional[str]
    username: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    created_at: Optional[datetime] = Field(default=datetime.now())
    updated_at: Optional[datetime] = Field(default=datetime.now())

    class Config(BaseConfig):
        allow_population_by_field_name = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class RegisterModel(BaseModel):
    username: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)


class LoginModel(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(min_length=6, max_length=12)
