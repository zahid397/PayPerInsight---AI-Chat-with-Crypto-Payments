from typing import List

class PolicyEngine:
    def __init__(self):
        self.blocked_keywords = [
            "illegal", "harmful", "dangerous", "hate speech",
            "violence", "explicit", "malware", "phishing"
        ]
    
    def validate_question(self, question: str) -> bool:
        """Check if question violates content policy"""
        question_lower = question.lower()
        
        # Check for blocked content
        for keyword in self.blocked_keywords:
            if keyword in question_lower:
                return False
        
        # Check question length
        if len(question.strip()) < 3:
            return False
        
        # Check for gibberish (simple heuristic)
        words = question.split()
        if len(words) < 2 and len(question) > 20:
            return False
        
        return True
    
    def sanitize_response(self, response: str) -> str:
        """Sanitize AI response"""
        # Remove any potentially harmful content patterns
        lines = response.split('\n')
        safe_lines = []
        
        for line in lines:
            if not any(keyword in line.lower() for keyword in self.blocked_keywords):
                safe_lines.append(line)
        
        return '\n'.join(safe_lines)

policy_engine = PolicyEngine()
