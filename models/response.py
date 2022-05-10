from fastapi import status


def ResponseModel(data, message: str):
    return {"data": data, "status_code": status.HTTP_200_OK, "message": message}


def ErrorResponseModel(error, code: status, message: str):
    return {"error": error, "status_code": code, "message": message}
