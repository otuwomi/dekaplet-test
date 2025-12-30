from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    interest: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    interest: str
    message: str

class Newsletter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Dekaplet API - Powering Crypto Payments"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoint
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(contact_data: ContactFormCreate):
    """
    Submit a contact form inquiry
    """
    try:
        contact_dict = contact_data.model_dump()
        contact_obj = ContactForm(**contact_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Save to database
        await db.contact_forms.insert_one(doc)
        
        # In production, you would send an email notification here
        logger.info(f"New contact form submission from {contact_obj.email}")
        
        return contact_obj
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# Get all contact forms (admin endpoint)
@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms(skip: int = 0, limit: int = 50):
    """
    Retrieve all contact form submissions (admin use)
    """
    try:
        contact_forms = await db.contact_forms.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime objects
        for form in contact_forms:
            if isinstance(form['created_at'], str):
                form['created_at'] = datetime.fromisoformat(form['created_at'])
        
        return contact_forms
    except Exception as e:
        logger.error(f"Error retrieving contact forms: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve contact forms")

# Newsletter subscription endpoint
@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(newsletter_data: NewsletterCreate):
    """
    Subscribe to newsletter
    """
    try:
        # Check if email already exists
        existing = await db.newsletters.find_one({"email": newsletter_data.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        
        newsletter_obj = Newsletter(**newsletter_data.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = newsletter_obj.model_dump()
        doc['subscribed_at'] = doc['subscribed_at'].isoformat()
        
        await db.newsletters.insert_one(doc)
        
        logger.info(f"New newsletter subscription: {newsletter_obj.email}")
        return newsletter_obj
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc),
        "service": "Dekaplet API"
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()