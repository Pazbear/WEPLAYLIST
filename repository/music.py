from datetime import datetime
from config.db import conn
from models.music import AddMusicModel, Music
from modules.hash import Hash


async def create_music(music: AddMusicModel):
    new_music = Music(
        name=music.name,
        artist=music.artist,
        length=music.length,
        playlist_id=music.playlist_id,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_music = dict(new_music)
    await conn.musics.insert_one(new_music)