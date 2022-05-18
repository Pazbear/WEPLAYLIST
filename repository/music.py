from datetime import datetime
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
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_music = dict(new_music)
    await conn.musics.insert_one(new_music)


async def find_musics_by_playlist_id(playlist_id: str):
    musics = []
    async for music in conn.musics.find():
        musics.append(music)
    return musics
