from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import conn
from models.playlist import Playlist, SavePlaylistModel
from models.user import User
from modules.oauth import get_current_user
from schemas.playlist import playlistEntity, playlistsEntity
from modules.hash import Hash
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED

from repository.playlist import create_playlist, find_playlists_by_name

playlistApi = APIRouter()

"""
CRUD
"""


@playlistApi.post("/playlists/save", response_model=Playlist, tags=["Playlist API"])
async def save_playlist(
    playlist: SavePlaylistModel, current_user: User = Depends(get_current_user)
):
    try:
        await create_playlist(playlist, current_user.id)
        return Response(status_code=HTTP_201_CREATED)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )


@playlistApi.get(
    "/playlists/search/{name}", response_model=list[Playlist], tags=["Playlist API"]
)
async def search_playlist(name: str):
    try:
        searched_playlists = await find_playlists_by_name(name)
        return playlistsEntity(searched_playlists)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )
