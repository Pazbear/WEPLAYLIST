from fastapi import APIRouter, Response, status
from config.db import conn
from models.user import User
from schemas.user import userEntity, usersEntity
from passlib.hash import sha256_crypt
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

user = APIRouter()

"""
CRUD
"""


@user.get("/users", response_model=list[User], tags=["users"])
async def find_all_user():
    users = []
    async for user in conn.users.find():
        users.append(user)
    return usersEntity(users)


@user.get("/users/{id}", response_model=User, tags=["users"])
async def find_user(id: str):
    return userEntity(await conn.users.find_one({"_id": ObjectId(id)}))


@user.post("/users", response_model=User, tags=["users"])
async def create_user(user: User):
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user["password"])  # 비밀번호 해싱
    del new_user["id"]  # id가 null로 굳이 입력되는 것을 막기 위함.
    id = await conn.users.insert_one(new_user).inserted_id  # id 타입은 ObjectId

    user = await conn.users.find_one({"_id": id})  # 따라서 find_user와는 다름.
    return userEntity(user)


@user.put("/users/{id}", response_model=User, tags=["users"])
async def update_user(id: str, user: User):
    user = dict(user)
    del user["id"]
    await conn.users.find_one_and_update({"_id": ObjectId(id)}, {"$set": user})
    return userEntity(await conn.users.find_one({"_id": ObjectId(id)}))


@user.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["users"])
async def delete_user(id: str):
    userEntity(await conn.users.find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)
