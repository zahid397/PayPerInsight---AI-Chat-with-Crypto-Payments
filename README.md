
# 🧠 ArcMind: Autonomous Agentic Commerce



> **"One Task. One Payment. Infinite Possibilities."**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)](https://fastapi.tiangolo.com/)
[![Groq](https://img.shields.io/badge/AI-Groq-orange)](https://groq.com/)
[![Circle](https://img.shields.io/badge/Payments-USDC-blue)](https://www.circle.com/)
[![Arc](https://img.shields.io/badge/Network-Arc_Testnet-bd00ff)](https://arc.circle.com/)

## 🚀 Overview

**ArcMind** is an autonomous AI agent built for the **Agentic Commerce on Arc** hackathon. Unlike traditional chatbots, ArcMind doesn't just talk—it **acts** and **pays**.

It autonomously analyzes user requests, calculates the necessary budget, and executes micropayments using **USDC on the Arc Network** to fetch premium data (Weather, Stocks) or generate high-fidelity content (Images).

### 🌟 Key Features
* **🤖 Hybrid AI Brain:** Powered by **Groq (Mixtral)** for lightning-fast reasoning and **Google Gemini** as a robust fallback.
* **💸 Autonomous Payments:** The agent autonomously executes **USDC micropayments** via Circle Gateway on the Arc Testnet.
* **🧠 Transparent Reasoning:** Visualizes the agent's internal thought process ("Reasoning") and tool selection logic.
* **🎨 Cyberpunk UI:** A modern, glassmorphism-inspired interface built with **Tailwind CSS** and **Framer Motion**.
* **⚡ Real-time Settlement:** Payments are verified instantly with transaction hash links to the Arc Explorer.

---

## 🏗️ Architecture

The system consists of a high-performance **FastAPI Backend** and a reactive **Next.js Frontend**.

```mermaid
graph LR
    A[User Request] --> B(Next.js Frontend)
    B --> C{FastAPI Backend}
    C -->|1. Reasoning| D[Groq / Gemini AI]
    C -->|2. Cost Calc| E[Logic Engine]
    C -->|3. Payment| F[Circle / Arc Network]
    F -->|Tx Hash| C
    D -->|Content| C
    C -->|Response| B
    B --> G[UI Display]

🛠️ Tech Stack
Frontend
 * Framework: Next.js 14 (App Router)
 * Styling: Tailwind CSS, Framer Motion
 * Icons: Lucide React
 * State: React Hooks
Backend
 * API: FastAPI (Python)
 * AI Models: Groq (Mixtral-8x7b), Google Gemini Pro
 * Validation: Pydantic
 * Server: Uvicorn
⚡ Installation & Setup
Follow these steps to run ArcMind locally.
1. Backend Setup
Navigate to the backend folder and install dependencies:
cd arcmind-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

Create a .env file in arcmind-backend/:
GROQ_API_KEY=gsk_your_groq_key
GEMINI_API_KEY=your_gemini_key
CIRCLE_API_KEY=your_circle_key
PROJECT_NAME="ArcMind Agent"

Run the server:
uvicorn app.main:app --reload

Backend runs on: http://localhost:8000
2. Frontend Setup
Navigate to the frontend folder:
cd arcmind-frontend
npm install

Create a .env.local file in arcmind-frontend/:
NEXT_PUBLIC_API_URL=http://localhost:8000/api/agent/execute

Run the frontend:
npm run dev

Frontend runs on: http://localhost:3000
📸 Demo Scenarios
Try these prompts to see the agent in action:
 * "Generate a cyberpunk city image"
   * Agent Action: Selects Image Tool → Pays $0.020 USDC → Generates Image.
 * "What is the current weather in Dhaka?"
   * Agent Action: Selects Weather API → Pays $0.005 USDC → Fetches Data.
 * "Check Bitcoin price"
   * Agent Action: Selects Oracle Feed → Pays $0.002 USDC → Returns Price.
📂 API Documentation
The backend provides auto-generated Swagger documentation.
Access it at: http://localhost:8000/docs
POST /api/agent/execute
Request:
{
  "task": "Draw a sunset",
  "model_preference": "groq"
}

Response:
{
  "status": "success",
  "content": "Here is the image...",
  "reasoning": "Image generation requires GPU compute...",
  "transaction": {
    "amount": "0.020",
    "currency": "USDC",
    "tx_hash": "0x7a...",
    "explorer_url": "[https://explorer.arc.circle.com/](https://explorer.arc.circle.com/)..."
  }
}

👥 Contributors
 * Zahid Hasan - Lead Developer - GitHub
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

