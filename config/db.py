import os
from pymongo import MongoClient
import motor.motor_asyncio

MONGODB_URL = os.environ["MONGODB_URL"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)

conn = client.wpl
