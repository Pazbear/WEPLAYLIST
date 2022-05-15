from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import conn
from models.music import Music, AddMusicModel
from models.user import User
from modules.oauth import get_current_user
from repository.music import create_music
from schemas.music import musicEntity, musicsEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED


musicApi = APIRouter()

"""
CRUD
"""


@musicApi.post("/api/musics/add", response_model=Music, tags=["Music API"])
async def add_music(
    music: AddMusicModel, current_user: User = Depends(get_current_user)
):
    try:
        await create_music(music)
        return Response(status_code=HTTP_201_CREATED)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )