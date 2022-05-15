from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import conn
from models.member import Member
from models.user import User
from modules.oauth import get_current_user
from repository.member import create_member
from schemas.member import memberEntity, membersEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED


memberApi = APIRouter()

"""
Member API
"""


@memberApi.post(
    "/api/member/add", status_code=status.HTTP_201_CREATED, tags=["Member API"]
)
async def add_member(playlist_id: str, current_user: User = Depends(get_current_user)):
    try:
        await create_member(current_user_id=current_user.id, playlist_id=playlist_id)
        return Response(status_code=HTTP_201_CREATED)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )
