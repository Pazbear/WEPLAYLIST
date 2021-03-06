import ssl
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_api import userApi as userApiRouter
from routes.playlist_api import playlistApi as playlistApiRouter
from routes.music_api import musicApi as musicApiRouter
from routes.subscription_api import subscriptionApi as subscriptionApiRouter
from docs import tags_metadata
from fastapi.middleware.cors import CORSMiddleware

ssl._create_default_https_context = ssl._create_unverified_context


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
API Router
"""
app.include_router(userApiRouter)
app.include_router(playlistApiRouter)
app.include_router(musicApiRouter)
app.include_router(subscriptionApiRouter)
