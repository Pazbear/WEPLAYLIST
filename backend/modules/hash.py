from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    def bcrypt(password: str):
        return pwd_cxt.hash(password)

    def verify(hashed: str, normal: str):
        return pwd_cxt.verify(normal, hashed)
