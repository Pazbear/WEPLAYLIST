from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SALT = "Jih2ZnyffxkbhIJZULZVu1"


class Hash:
    def bcrypt(password: str):
        return pwd_context.hash(password, salt=SALT)

    def verify(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
