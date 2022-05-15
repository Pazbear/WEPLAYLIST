from datetime import datetime
from config.db import conn
from models.playlist import Playlist, SavePlaylistModel
from modules.hash import Hash


async def find_my_playlist(current_user_id: str):
    return await conn.playlists.find_one({"owner": current_user_id})


async def create_playlist(playlist: SavePlaylistModel, owner: str):
    new_playlist = Playlist(
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
        playlists.append(playlist)
    return playlists
