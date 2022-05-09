from fastapi import APIRouter, Response, status
from config.db import conn
from models.user import User
from schemas.user import userEntity, usersEntity
from passlib.hash import sha256_crypt
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

from models.user import LoginModel

userApi = APIRouter()

"""
Service
"""


@userApi.get("api/user/login", tags=["user_api"])
async def login(request: LoginModel):
    print(request)
