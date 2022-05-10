from fastapi import APIRouter, Depends, Response, status, HTTPException
from config.db import conn
from models.user import User, Token
from schemas.user import userEntity, usersEntity
from starlette.status import HTTP_204_NO_CONTENT
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from repository.user import auth, get_current_user
from modules.hash import Hash
from modules.jwt import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, verify_token


userApi = APIRouter()

"""
Service
"""


@userApi.post("/api/users/login", response_model=Token, tags=["User API"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        email = form_data.username  # email로 로그인
        password = form_data.password
        auth_result = await auth(email, password)
        if auth_result.get("success") == True:
            access_token = create_access_token(
                data={"sub": auth_result.get("data")},
            )
            return Token(access_token=access_token, token_type="bearer")
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Incorrect username or password",
            )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Incorrect username or password",
        )


@userApi.get("/api/users/me", response_model=User, tags=["User API"])
async def read_me(current_user: User = Depends(get_current_user)):
    return userEntity(current_user)
