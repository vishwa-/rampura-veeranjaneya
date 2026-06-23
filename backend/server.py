from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# FastAPI app + /api router
app = FastAPI(title="Rampura Temple API")
api_router = APIRouter(prefix="/api")


# ------------------------------ Models ------------------------------
class EventRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[EmailStr] = None
    phone: str
    attendees: int = 1
    event_id: str
    event_title: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EventRegistrationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: Optional[EmailStr] = None
    phone: str = Field(min_length=6, max_length=20)
    attendees: int = Field(default=1, ge=1, le=50)
    event_id: str
    event_title: str
    message: Optional[str] = Field(default=None, max_length=500)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-()+]", "", v)
        if not cleaned.isdigit():
            raise ValueError("Phone must contain only digits and +, -, spaces, ()")
        return v.strip()


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=5, max_length=2000)


# ------------------------------ Routes ------------------------------
@api_router.get("/")
async def root():
    return {"message": "Sri Anjaneya Swamy Temple, Rampura — API"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "rampura-temple-api"}


@api_router.post("/events/register", response_model=EventRegistration)
async def register_for_event(payload: EventRegistrationCreate):
    obj = EventRegistration(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.event_registrations.insert_one(doc)
    return obj


@api_router.get("/events/registrations", response_model=List[EventRegistration])
async def list_event_registrations(event_id: Optional[str] = None):
    query = {}
    if event_id:
        query["event_id"] = event_id
    docs = await db.event_registrations.find(query, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except ValueError:
                pass
    return docs


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_message(payload: ContactMessageCreate):
    obj = ContactMessage(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return obj


# ------------------------------ App wiring --------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
