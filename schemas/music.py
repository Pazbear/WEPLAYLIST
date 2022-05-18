def musicEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "artist": item["owner"],
        "youtube_url": item["youtube_url"],
        "length": item["length"],
        "playlist_id": item["playlist_id"],
        "created_at": item["created_at"],
        "updated_at": item["updated_at"],
    }


def musicsEntity(entity) -> list:
    return [musicEntity(item) for item in entity]
