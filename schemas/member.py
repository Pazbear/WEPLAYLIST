def memberEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "user_id": item["user_id"],
        "playlist_id": item["playlist_id"],
        "created_at": item["created_at"],
        "updated_at": item["updated_at"],
    }


def membersEntity(entity) -> list:
    return [memberEntity(item) for item in entity]
