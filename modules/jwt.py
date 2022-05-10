from datetime import datetime, timedelta
from jose import JWTError, jwt

from models.user import TokenData

SECRET_KEY = "SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    id: str = payload.get("sub")
    if id is None:
        return None
    return TokenData(id=id)
