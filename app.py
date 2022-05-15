from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user as userRouter
from routes.playlist import playlist as playlistRouter
from routes.music import music as musicRouter
from routes.user_api import userApi as userApiRouter
from routes.playlist_api import playlistApi as playlistApiRouter
from docs import tags_metadata
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="WEPLAYLIST",
    description="WEPLAYLIST Apis",
    version="0.0.1",
    openapi_tags=tags_metadata,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
CRUD Router
"""
app.include_router(userRouter)
app.include_router(playlistRouter)
app.include_router(musicRouter)

"""
API Router
"""
app.include_router(userApiRouter)
app.include_router(playlistApiRouter)
