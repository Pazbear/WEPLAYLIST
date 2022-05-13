def playlistEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "owner": item["owner"],
        "password": item["password"],
        "created_at": item["created_at"],
        "updated_at": item["updated_at"],
    }


def playlistsEntity(entity) -> list:
    return [playlistEntity(item) for item in entity]
