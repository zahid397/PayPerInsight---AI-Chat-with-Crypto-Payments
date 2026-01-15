// Configuration
const API_BASE_URL = 'http://localhost:8000';
let currentSessionId = null;

// DOM Elements
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const chatContainer = document.getElementById('chatContainer');
const paymentSection = document.getElementById('paymentSection');
const paymentPreview = document.getElementById('paymentPreview');
const priceDisplay = document.getElementById('priceDisplay');
const payButton = document.getElementById('payButton');
const paymentStatus = document.getElementById('paymentStatus');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');
const newQuestionButton = document.getElementById('newQuestionButton');

// Utility Functions
function showLoading(element, message = 'Loading...') {
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    element.style.display = 'block';
}

function showSuccess(element, message) {
    element.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    element.className = 'payment-status status-success';
    element.style.display = 'block';
}

function showError(element, message) {
    element.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    element.className = 'payment-status status-error';
    element.style.display = 'block';
}

function addMessageToChat(sender, content, isAgent = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isAgent ? 'agent' : 'user'}`;
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="sender">${sender}</span>
            <span class="timestamp">${timestamp}</span>
        </div>
        <div class="message-content">${content}</div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// API Functions
async function sendQuestion(question) {
    try {
        askButton.disabled = true;
        askButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
        
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error sending question:', error);
        showError(paymentStatus, 'Failed to process question. Please try again.');
        return null;
    } finally {
        askButton.disabled = false;
        askButton.innerHTML = '<i class="fas fa-paper-plane"></i> Ask';
    }
}

async function processPayment(sessionId) {
    try {
        showLoading(paymentStatus, 'Processing USDC payment on Arc testnet...');
        payButton.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                session_id: sessionId,
                payment_token: 'mock_payment_token_0x123abc' 
            })
        });
        
        if (!response.ok) {
            if (response.status === 402) {
                throw new Error('Payment verification failed');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Payment error:', error);
        showError(paymentStatus, error.message || 'Payment failed. Please try again.');
        return null;
    } finally {
        payButton.disabled = false;
    }
}

async function getResult(sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/result?session_id=${sessionId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error getting result:', error);
        return null;
    }
}

// Event Handlers
async function handleAsk() {
    const question = questionInput.value.trim();
    
    if (!question) {
        alert('Please enter a question');
        return;
    }
    
    // Add user message to chat
    addMessageToChat('👤 You', question, false);
    
    // Clear input
    questionInput.value = '';
    
    // Show loading in chat
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message agent';
    loadingDiv.innerHTML = `
        <div class="message-header">
            <span class="sender">🤖 PayPerInsight Agent</span>
        </div>
        <div class="message-content">
            <i class="fas fa-spinner fa-spin"></i> Analyzing your question and calculating insight value...
        </div>
    `;
    chatContainer.appendChild(loadingDiv);
    
    // Send question to API
    const result = await sendQuestion(question);
    
    // Remove loading message
    chatContainer.removeChild(loadingDiv);
    
    if (result) {
        // Add preview to chat
        addMessageToChat('🤖 PayPerInsight Agent', 
            `🔒 **Preview:** ${result.preview}\n\n💵 **Price:** ${result.price_usdc} USDC\n\n*Pay to unlock full insight*`);
        
        // Store session ID
        currentSessionId = result.session_id;
        
        // Show payment section
        paymentPreview.textContent = result.preview;
        priceDisplay.textContent = `${result.price_usdc} USDC`;
        paymentSection.style.display = 'block';
        resultSection.style.display = 'none';
        
        // Scroll to payment section
        paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

async function handlePayment() {
    if (!currentSessionId) return;
    
    showLoading(paymentStatus, 'Initiating USDC payment...');
    
    // Simulate payment processing
    const paymentResult = await processPayment(currentSessionId);
    
    if (paymentResult && paymentResult.success) {
        showSuccess(paymentStatus, paymentResult.message);
        
        // Wait a moment, then show result
        setTimeout(async () => {
            const result = await getResult(currentSessionId);
            
            if (result && result.paid) {
                // Show result section
                resultContent.textContent = result.full_answer;
                paymentSection.style.display = 'none';
                resultSection.style.display = 'block';
                
                // Add final message to chat
                addMessageToChat('🤖 PayPerInsight Agent', 
                    `✅ **Full Insight Unlocked!**\n\n${result.full_answer}\n\n💰 **Payment:** ${result.price_usdc} USDC settled on Arc`);
                
                // Scroll to result
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }
}

function handleNewQuestion() {
    // Reset UI
    currentSessionId = null;
    paymentSection.style.display = 'none';
    resultSection.style.display = 'none';
    paymentStatus.style.display = 'none';
    questionInput.value = '';
    questionInput.focus();
    
    // Scroll to input
    questionInput.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
askButton.addEventListener('click', handleAsk);
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAsk();
    }
});
payButton.addEventListener('click', handlePayment);
newQuestionButton.addEventListener('click', handleNewQuestion);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    questionInput.focus();
    
    // Demo: Add some example questions
    const examples = [
        "What are the top 3 investment trends for 2024?",
        "How can I optimize my e-commerce conversion rate?",
        "What's the future of decentralized AI?",
        "How to build a sustainable startup in climate tech?"
    ];
    
    // Show examples in console for judges
    console.log('PayPerInsight Demo Ready! Try these questions:', examples);
});
