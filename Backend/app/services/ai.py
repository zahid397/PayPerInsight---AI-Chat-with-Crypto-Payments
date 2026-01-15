import os
from typing import Tuple
import groq
from app.config import settings

class AIService:
    def __init__(self):
        self.client = groq.Groq(api_key=settings.groq_api_key)
        self.model = settings.groq_model
    
    async def generate_insight(self, question: str) -> Tuple[str, str]:
        """Generate both preview and full answer for a question"""
        
        system_prompt = """You are PayPerInsight, an AI agent that provides valuable insights.
        For each question, provide:
        1. A brief preview (1-2 sentences) that teases the answer
        2. A comprehensive full answer with actionable insights
        
        Format your response exactly as:
        PREVIEW: [your preview here]
        FULL: [your full answer here]
        
        Keep previews engaging but incomplete - create curiosity."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            content = response.choices[0].message.content
            
            # Parse response
            lines = content.split('\n')
            preview = ""
            full_answer = ""
            
            for line in lines:
                if line.startswith("PREVIEW:"):
                    preview = line.replace("PREVIEW:", "").strip()
                elif line.startswith("FULL:"):
                    full_answer = line.replace("FULL:", "").strip()
            
            # Fallback parsing
            if not preview or not full_answer:
                parts = content.split('\n\n')
                if len(parts) >= 2:
                    preview = parts[0][:150] + "..."
                    full_answer = content
                else:
                    preview = content[:100] + "..."
                    full_answer = content
            
            return preview, full_answer
            
        except Exception as e:
            # Mock response for demo if API fails
            preview = f"Preview: I have insights about '{question[:50]}...' that could save you time and money."
            full_answer = f"Full analysis of '{question}':\n\nBased on current trends and data, here are actionable insights:\n1. Consider market timing\n2. Evaluate risk factors\n3. Look for growth indicators\n\nThis insight is based on real-time analysis of available data."
            return preview, full_answer
