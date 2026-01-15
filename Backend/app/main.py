from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.config import settings
from app.routes import chat, pay, result
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="PayPerInsight API",
    description="ChatGPT-style AI agent with USDC micropayments",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, tags=["Chat"])
app.include_router(pay.router, tags=["Payment"])
app.include_router(result.router, tags=["Result"])

@app.get("/")
async def root():
    return {
        "message": "PayPerInsight API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "payperinsight"}

# Custom OpenAPI schema
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="PayPerInsight API",
        version="1.0.0",
        description="AI agent with USDC micropayments on Arc testnet",
        routes=app.routes,
    )
    
    # Add Arc network info
    openapi_schema["info"]["x-arc-network"] = "testnet"
    openapi_schema["info"]["x-currency"] = "USDC"
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting PayPerInsight API on port {settings.port}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, reload=True)
