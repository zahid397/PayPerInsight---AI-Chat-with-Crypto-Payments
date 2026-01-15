# 💡 PayPerInsight

**ChatGPT-style AI agent with USDC micropayments • One insight, one payment**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Arc Network](https://img.shields.io/badge/Arc%20Network-Testnet-4F46E5)](https://arc.network)
[![USDC](https://img.shields.io/badge/USDC-Micropayments-26A17B)](https://www.circle.com/en/usdc)

## 🎯 What is PayPerInsight?

PayPerInsight is a **single-turn AI agent** that provides valuable insights for micropayments in USDC. Unlike subscription models, you pay only for the insights you need, when you need them.

### 🤔 Why Pay-Per-Insight Matters

Traditional AI services use subscription models where you pay monthly regardless of usage. PayPerInsight introduces **agentic commerce**:
- **No subscriptions** – Pay only for valuable insights
- **Micro-value** – Small payments (10¢ - $1) for targeted knowledge
- **Instant settlement** – Payments settle on Arc testnet in seconds
- **Quality guarantee** – Pricing based on insight complexity and value

## 🏗️ Architecture Overview

### Backend (FastAPI)
- **Agent Engine**: Analyzes queries, generates previews, calculates prices
- **Payment Gateway**: Handles USDC payments via Circle Gateway
- **Settlement Verifier**: Confirms payments on Arc testnet
- **Session Manager**: Tracks user sessions and payment status

### Frontend (Vanilla JS)
- **Clean Chat Interface**: ChatGPT-style conversation UI
- **Payment Flow**: Preview → Price → Pay → Unlock
- **Real-time Updates**: Status messages and result display

## 🔄 How It Works

### 1. **Ask a Question**
User submits any question to the AI agent.

### 2. **Receive Preview & Price**
Agent analyzes the question, generates a **teaser preview**, and calculates a **USDC price** based on:
- Question complexity
- Insight depth required
- Processing resources needed

### 3. **Pay with USDC**
User pays the calculated amount in USDC. Payment settles on **Arc testnet** via Circle Gateway.

### 4. **Unlock Full Insight**
Once payment is verified, the **full, valuable answer** is unlocked and displayed.

## 🛠️ Tech Stack

### Backend
- **FastAPI** – Modern Python web framework with auto-generated docs
- **Groq API** – High-speed LLM inference (Llama 3 70B)
- **Arc RPC** – Settlement verification on testnet
- **Circle Gateway** – USDC payment processing (mock for demo)
- **In-memory Storage** – Session management

### Frontend
- **HTML5/CSS3** – Clean, responsive interface
- **Vanilla JavaScript** – No frameworks, minimal dependencies
- **Font Awesome** – Icon system

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Groq API key (free at [groq.com](https://groq.com))
- Node.js (for serving frontend)

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your Groq API key

pip install -r requirements.txt
python -m app.main
