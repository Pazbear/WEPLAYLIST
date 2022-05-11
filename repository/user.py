from datetime import datetime
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from pydantic import EmailStr
from models.user import RegisterModel, User
from modules.hash import Hash
from config.db import conn
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from modules.jwt import verify_token
from modules.oauth import oauth2_scheme


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_data = verify_token(token)
        user = await get_user_without_password(token_data.id)
        if user is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user


async def create_user(user: RegisterModel):
    new_user = User(
        username=user.username,
        email=user.email,
        password=Hash.bcrypt(user.password),
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_user = dict(new_user)
    await conn.users.insert_one(new_user)


async def auth(email: EmailStr, password: str):
    user = await get_user(email)
    if user is None:
        return {"success": False, "status_code": 200, "message": "존재하지 않는 이메일입니다."}
    is_valid_password = Hash.verify(password, user["password"])
    if is_valid_password:
        return {
            "success": True,
            "data": user["_id"],
            "status_code": 200,
            "data": str(user["_id"]),
        }
    else:
        return {"success": False, "status_code": 200, "message": "비밀번호가 틀렸습니다."}


async def get_user(email: EmailStr):
    user = await conn.users.find_one({"email": email})
    return user


async def get_user_without_password(id: str):
    user = await conn.users.find_one({"_id": ObjectId(id)})
    user["password"] = ""
    return user
