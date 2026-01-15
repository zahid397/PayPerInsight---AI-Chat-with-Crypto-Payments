from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multi-Model AI Agent Backend (Groq, DeepSeek, Gemini)"
)

# CORS (Open for Hackathon)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(router, prefix="/api/v1", tags=["Agent"])

@app.get("/")
def health_check():
    return {
        "status": "active", 
        "ai_models": ["groq", "deepseek", "gemini"],
        "payment_provider": "Circle"
    }
  
