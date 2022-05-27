from datetime import datetime

from bson import ObjectId
from config.db import conn
from models.subscription import CreateSubscriptionModel, Subscription
from modules.convert import Convert
from modules.hash import Hash
from repository.user import get_user_without_password
from schemas.subscription import subscriptionsEntity
import pafy


async def add_subscription(from_user_id: str, to_user_id: str):
    new_subscript = CreateSubscriptionModel(
        from_user=from_user_id,
        to_user=to_user_id,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_subscript = dict(new_subscript)
    await conn.subscriptions.insert_one(new_subscript)


async def find_subscriptions(from_user_id: str):
    subscriptions = []
    async for subscription in conn.subscriptions.find({"from_user": from_user_id}):
        subscription["to_user"] = await get_user_without_password(
            id=subscription["to_user"]
        )
        subscriptions.append(subscription)
    return subscriptions
