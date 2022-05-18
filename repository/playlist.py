from datetime import datetime

from bson import ObjectId
from config.db import conn
from models.playlist import CreatePlaylistModel, Playlist, SavePlaylistModel
from modules.hash import Hash
from repository.user import get_user_without_password


async def verify_playlist_password(playlist_id: str, password: str):
    playlist = await conn.playlists.find_one({"_id": ObjectId(playlist_id)})
    return Hash.verify(password, playlist["password"])


async def find_my_playlist(current_user_id: str):
    return await conn.playlists.find_one({"owner": current_user_id})


async def find_playlist_by_id(playlist_id: str):
    return await conn.playlists.find_one({"_id": ObjectId(playlist_id)})


async def create_playlist(playlist: SavePlaylistModel, owner: str):
    new_playlist = CreatePlaylistModel(
        name=playlist.name,
        owner=owner,
        password=Hash.bcrypt(playlist.password),
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_playlist = dict(new_playlist)
    del new_playlist["id"]
    await conn.playlists.insert_one(new_playlist)


async def find_playlists_by_name(name: str):
    playlists = []
    async for playlist in conn.playlists.find({"name": {"$regex": name}}):
        playlist["owner"] = await get_user_without_password(id=playlist["owner"])
        playlists.append(playlist)
    return playlists
