from fastapi import status
from http.client import HTTPException
from pydantic import EmailStr
from modules.hash import Hash
from config.db import conn


async def auth(email: EmailStr, password: str):

    try:
        user = await get_user(email)
        if user is None:
            return {"success": False, "message": "존재하지 않는 이메일입니다."}
        is_valid_password = Hash.verify(password, user["password"])
        if is_valid_password:
            return {"success": True, "data": str(user["_id"])}
        else:
            return {"success": False, "message": "비밀번호가 틀렸습니다."}
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )


async def get_user(email: EmailStr):
    try:
        user = await conn.users.find_one({"email": email})
        return user
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )
