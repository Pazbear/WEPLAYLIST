from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user as userRouter
from docs import tags_metadata


app = FastAPI(
    title="WEPLAYLIST",
    description="WEPLAYLIST Apis",
    version="0.0.1",
    openapi_tags=tags_metadata,
)

app.include_router(userRouter)
