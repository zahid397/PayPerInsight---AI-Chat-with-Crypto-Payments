from typing import Dict
import re

class PricingEngine:
    def __init__(self):
        self.base_price = 0.10  # Base 10 cents in USDC
        self.complexity_multipliers = {
            "simple": 1.0,
            "medium": 1.5,
            "complex": 2.5,
            "expert": 4.0
        }
    
    def analyze_complexity(self, question: str) -> str:
        """Analyze question complexity"""
        question_lower = question.lower()
        
        # Complexity indicators
        complex_keywords = [
            "strategy", "investment", "forecast", "predict",
            "analysis", "technical", "financial", "market",
            "trend", "algorithm", "model", "optimize"
        ]
        
        simple_keywords = [
            "what is", "who is", "when", "where",
            "definition", "explain briefly", "simple"
        ]
        
        # Check length
        word_count = len(question.split())
        
        # Determine complexity
        complex_count = sum(1 for kw in complex_keywords if kw in question_lower)
        simple_count = sum(1 for kw in simple_keywords if kw in question_lower)
        
        if word_count > 20 or complex_count >= 3:
            return "expert"
        elif complex_count >= 2:
            return "complex"
        elif simple_count >= 2 or word_count < 10:
            return "simple"
        else:
            return "medium"
    
    def calculate_price(self, question: str, preview: str) -> float:
        """Calculate price in USDC"""
        complexity = self.analyze_complexity(question)
        multiplier = self.complexity_multipliers.get(complexity, 1.0)
        
        # Adjust based on preview length (proxy for answer depth)
        preview_words = len(preview.split())
        length_factor = min(2.0, max(0.5, preview_words / 20))
        
        price = self.base_price * multiplier * length_factor
        
        # Round to nearest cent (0.01 USDC)
        return round(price, 2)

pricing_engine = PricingEngine()
