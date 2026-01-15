from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import ResultResponse
from app.storage.memory import storage
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/result", response_model=ResultResponse)
async def get_result(session_id: str = Query(...)):
    """Get full answer if paid, otherwise error"""
    
    try:
        # Get session
        session = storage.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        if session.paid:
            return ResultResponse(
                session_id=session_id,
                question=session.question,
                preview=session.preview,
                full_answer=session.full_answer,
                price_usdc=session.price_usdc,
                paid=True,
                message="Full insight unlocked!"
            )
        else:
            return ResultResponse(
                session_id=session_id,
                question=session.question,
                preview=session.preview,
                full_answer=None,
                price_usdc=session.price_usdc,
                paid=False,
                message="Payment required to unlock full insight"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting result: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
