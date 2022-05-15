from fastapi import APIRouter, Response, status
from config.db import conn
from models.music import Music
from schemas.music import musicEntity, musicsEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

music = APIRouter()

"""
CRUD
"""


@music.get("/musics", response_model=list[Music], tags=["musics"])
async def find_all_music():
    musics = []
    async for music in conn.musics.find():
        musics.append(music)
    return musicsEntity(musics)


@music.get("/musics/{id}", response_model=Music, tags=["musics"])
async def find_music(id: str):
    return musicEntity(await conn.musics.find_one({"_id": ObjectId(id)}))


@music.post("/musics", response_model=Music, tags=["musics"])
async def create_music(music: Music):
    new_music = dict(music)
    del new_music["id"]  # id가 null로 굳이 입력되는 것을 막기 위함.
    result = await conn.musics.insert_one(new_music)

    music = await conn.musics.find_one(
        {"_id": result.inserted_id}
    )  # 따라서 find_user와는 다름.
    return musicEntity(music)


@music.put("/musics/{id}", response_model=Music, tags=["musics"])
async def update_music(id: str, music: Music):
    music = dict(music)
    del music["id"]
    await conn.musics.find_one_and_update({"_id": ObjectId(id)}, {"$set": music})
    return musicEntity(await conn.musics.find_one({"_id": ObjectId(id)}))


@music.delete("/musics/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["musics"])
async def delete_music(id: str):
    musicEntity(await conn.musics.find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)
