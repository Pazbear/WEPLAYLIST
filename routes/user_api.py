from fastapi import APIRouter, Depends, Response, status, HTTPException
from models.user import RegisterModel, User, Token
from schemas.user import userEntity
from starlette.status import HTTP_201_CREATED
from fastapi.security import OAuth2PasswordRequestForm

from repository.user import (
    auth,
    create_user,
    get_current_user,
    get_user_without_password,
)
from modules.hash import Hash
from modules.jwt import create_access_token


userApi = APIRouter()

"""
Service
"""


@userApi.get("/api/users/me", response_model=User, tags=["User API"])
async def read_me(current_user: User = Depends(get_current_user)):
    return userEntity(current_user)


@userApi.get("/api/users/{user_id}", response_model=User, tags=["User API"])
async def get_user(user_id: str):
    return userEntity(await get_user_without_password(user_id))


@userApi.post("/api/users/register", status_code=HTTP_201_CREATED, tags=["User API"])
async def register(user: RegisterModel):
    try:
        await create_user(user)
        return Response(status_code=HTTP_201_CREATED)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )


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
