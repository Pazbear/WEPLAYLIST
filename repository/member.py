from datetime import datetime
from config.db import conn
from models.member import Member
from modules.hash import Hash


async def create_member(current_user_id: str, playlist_id: str):
    new_member = Member(
        user_id=current_user_id,
        playlist_id=playlist_id,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    new_member = dict(new_member)
    await conn.members.insert_one(new_member)
