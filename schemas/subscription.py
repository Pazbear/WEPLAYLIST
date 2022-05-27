from schemas.user import userEntity


def subscriptionEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "from_user": item["from_user"],
        "to_user": userEntity(item["to_user"]),
        "created_at": item["created_at"],
        "updated_at": item["updated_at"],
    }


def subscriptionsEntity(entity) -> list:
    return [subscriptionEntity(item) for item in entity]
