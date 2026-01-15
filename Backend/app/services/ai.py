from groq import Groq
import google.generativeai as genai
import requests
from app.core.config import settings

# 1. Groq Setup
groq_client = Groq(api_key=settings.GROQ_API_KEY)

# 2. Gemini Setup
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_insight(question: str, model_type: str = "groq"):
    try:
        full_response = ""

        # --- Option A: Use Groq (Fastest & Default) ---
        if model_type == "groq":
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a crypto market analyst. Give a teaser insight."},
                    {"role": "user", "content": question}
                ],
                model="mixtral-8x7b-32768",
            )
            full_response = chat_completion.choices[0].message.content

        # --- Option B: Use Gemini ---
        elif model_type == "gemini" and settings.GEMINI_API_KEY:
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(question)
            full_response = response.text

        # --- Option C: Use DeepSeek (via direct API call) ---
        elif model_type == "deepseek" and settings.DEEPSEEK_API_KEY:
            headers = {"Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}"}
            data = {
                "model": "deepseek-chat",
                "messages": [{"role": "user", "content": question}]
            }
            # DeepSeek Endpoint (Standard)
            resp = requests.post("https://api.deepseek.com/v1/chat/completions", json=data, headers=headers)
            if resp.status_code == 200:
                full_response = resp.json()['choices'][0]['message']['content']
            else:
                full_response = "DeepSeek API Error."

        else:
            full_response = "Invalid model selected or API key missing."

        # Process Response (Split Teaser / Hidden)
        preview_text = full_response[:150] + "..."
        price = 0.10  # USDC

        return {
            "model_used": model_type,
            "preview": preview_text,
            "full_answer_hidden": full_response,
            "price_usdc": price,
            "status": "success"
        }

    except Exception as e:
        print(f"❌ AI Error: {str(e)}")
        return {
            "model_used": model_type,
            "preview": "Error generating insight.",
            "full_answer_hidden": "",
            "price_usdc": 0.00,
            "status": "error"
        }
      
