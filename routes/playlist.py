from fastapi import APIRouter, Response, status
from config.db import conn
from models.playlist import Playlist
from schemas.playlist import playlistEntity, playlistsEntity
from modules.hash import Hash
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

playlist = APIRouter()

"""
CRUD
"""


@playlist.get("/playlists", response_model=list[Playlist], tags=["playlists"])
async def find_all_playlist():
    playlists = []
    async for playlist in conn.playlists.find():
        playlists.append(playlist)
    return playlistsEntity(playlists)


@playlist.get("/playlists/{id}", response_model=Playlist, tags=["playlists"])
async def find_playlist(id: str):
    return playlistEntity(await conn.playlists.find_one({"_id": ObjectId(id)}))


@playlist.post("/playlists", response_model=Playlist, tags=["playlists"])
async def create_playlist(playlist: Playlist):
    new_playlist = dict(playlist)
    new_playlist["password"] = Hash.bcrypt(new_playlist["password"])  # 비밀번호 해싱
    del new_playlist["id"]  # id가 null로 굳이 입력되는 것을 막기 위함.
    result = await conn.playlists.insert_one(new_playlist)

    playlist = await conn.playlists.find_one(
        {"_id": result.inserted_id}
    )  # 따라서 find_user와는 다름.
    return playlistEntity(playlist)


@playlist.put("/playlists/{id}", response_model=Playlist, tags=["playlists"])
async def update_playlist(id: str, playlist: Playlist):
    playlist = dict(playlist)
    del playlist["id"]
    await conn.playlists.find_one_and_update({"_id": ObjectId(id)}, {"$set": playlist})
    return playlistEntity(await conn.playlists.find_one({"_id": ObjectId(id)}))


@playlist.delete(
    "/playlists/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["playlists"]
)
async def delete_playlist(id: str):
    playlistEntity(await conn.playlists.find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)
