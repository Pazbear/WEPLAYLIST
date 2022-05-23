from datetime import datetime

from bson import ObjectId
from config.db import conn
from models.music import AddMusicModel, Music
from modules.convert import Convert
from modules.hash import Hash
from schemas.music import musicsEntity
import pafy


async def create_music(music: AddMusicModel):
    print(music)
    try:
        video = pafy.new(music.youtube_url)
    except Exception as e:
        print("err")
        print(e)
    new_music = Music(
        name=music.name,
        artist=music.artist,
        length=Convert.secToMin(video.length),
        youtube_url=music.youtube_url,
        playlist_id=music.playlist_id,
        order=music.order,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_music = dict(new_music)
    await conn.musics.insert_one(new_music)


async def find_musics_by_playlist_id(playlist_id: str):
    musics = []
    async for music in conn.musics.find({"playlist_id": playlist_id}).sort("order", -1):
        musics.append(music)
    return musics


async def change_music_order_by_id(music_id1: str, music_id2: str):
    music1 = await conn.musics.find_one({"_id": ObjectId(music_id1)})
    music2 = await conn.musics.find_one({"_id": ObjectId(music_id2)})
    await conn.musics.update_one(
        {"_id": ObjectId(music_id1)}, {"$set": {"order": music2.order}}
    )
    await conn.musics.update_one(
        {"_id": ObjectId(music_id2)}, {"$set": {"order": music1.order}}
    )
