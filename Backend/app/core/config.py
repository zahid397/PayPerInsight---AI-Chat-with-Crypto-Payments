import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "PayPerInsight API")
    VERSION: str = "1.0.0"
    
    # AI API Keys
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")

    # Payment API Keys
    CIRCLE_API_KEY: str = os.getenv("CIRCLE_API_KEY")

    # Check missing keys
    if not GROQ_API_KEY:
        print("⚠️ WARNING: GROQ_API_KEY is missing!")

settings = Settings()
