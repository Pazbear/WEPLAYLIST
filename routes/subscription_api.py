from typing import List
from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import conn
from models.music import ChangeMusicOrderModel, Music, AddMusicModel
from models.subscription import SubscriptModel, Subscription
from models.user import User
from modules.oauth import get_current_user
from repository.music import (
    change_music_order_by_id,
    create_music,
    find_musics_by_playlist_id,
)
from repository.playlist import verify_playlist_password
from repository.subscription import add_subscription, find_subscriptions
from schemas.music import musicEntity, musicsEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED

from schemas.subscription import subscriptionsEntity


subscriptionApi = APIRouter()


@subscriptionApi.post(
    "/api/subscriptions/add",
    status_code=status.HTTP_201_CREATED,
    tags=["Subscription API"],
)
async def subscript(
    subscription: SubscriptModel, current_user: User = Depends(get_current_user)
):
    try:
        await add_subscription(
            from_user_id=current_user.id, to_user_id=subscription.to_user_id
        )
        return Response(status_code=HTTP_201_CREATED)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )


@subscriptionApi.get(
    "/api/subscriptions/get",
    response_model=List[Subscription],
    tags=["Subscription API"],
)
async def getSubscription(current_user: User = Depends(get_current_user)):
    try:
        subscriptions = await find_subscriptions(from_user_id=current_user.id)
        return subscriptionsEntity(subscriptions)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="서버 내부 에러",
        )
