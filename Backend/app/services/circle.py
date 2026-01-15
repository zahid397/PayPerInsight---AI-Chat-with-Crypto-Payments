import random
import time

def execute_autonomous_payment(amount: str):
    """
    Simulates a payment on Arc Network (Testnet).
    """
    # Simulate Network Latency
    time.sleep(0.5)
    
    # Generate Fake Hash for Hackathon
    chars = "0123456789abcdef"
    tx_hash = "0x" + "".join(random.choice(chars) for _ in range(64))
    
    return {
        "amount": amount,
        "currency": "USDC",
        "tx_hash": f"{tx_hash[:10]}...{tx_hash[-8:]}",
        "explorer_url": f"https://explorer.testnet.arc.circle.com/tx/{tx_hash}" 
    }
  
