from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import conn
from models.music import ChangeMusicOrderModel, Music, AddMusicModel
from models.user import User
from modules.oauth import get_current_user
from repository.music import (
    change_music_order_by_id,
    create_music,
    find_musics_by_playlist_id,
)
from repository.playlist import verify_playlist_password
from schemas.music import musicEntity, musicsEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED


musicApi = APIRouter()

"""
CRUD
"""


@musicApi.post(
    "/api/musics/add", status_code=status.HTTP_201_CREATED, tags=["Music API"]
)
async def add_music(
    music: AddMusicModel, current_user: User = Depends(get_current_user)
):
    try:
        is_verified = await verify_playlist_password(music.playlist_id, music.password)
        print(is_verified)
        if is_verified:
            await create_music(music)
            return Response(status_code=HTTP_201_CREATED)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Incorrect username or password",
            )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )


@musicApi.get("/api/musics/get/", response_model=list[Music], tags=["Music API"])
async def get_musics_by_playlist_id(playlist_id: str = ""):
    try:
        musics = await find_musics_by_playlist_id(playlist_id)
        return musicsEntity(musics)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )


@musicApi.post(
    "/api/musics/change-order", status_code=status.HTTP_200_OK, tags=["Music API"]
)
async def change_musics_order(
    music_ids: ChangeMusicOrderModel, current_user: User = Depends(get_current_user)
):
    if music_ids.music_id1 == None or music_ids.music_id2 == None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )
    try:
        await change_music_order_by_id(music_ids.music_id1, music_ids.music_id2)
        return Response(status_code=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )
