// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const API_URL = "http://127.0.0.1:8000/api/v1/ask"; // FastAPI Backend URL

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const welcomeScreen = document.getElementById('welcomeScreen');

// ---------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------

// Handle Enter Key
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleSend();
});

// Auto-scroll to bottom
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ---------------------------------------------------------
// CORE FUNCTIONS
// ---------------------------------------------------------

async function handleSend() {
    const question = userInput.value.trim();
    if (!question) return;

    // 1. UI Updates (Hide Welcome, Clear Input)
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    userInput.value = '';

    // 2. Show User Message
    addMessage('user', question);

    // 3. Show Loading Indicator
    const loadingId = addLoading();

    try {
        // 4. Call FastAPI Backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                question: question, 
                model: "groq" // or 'deepseek', 'gemini'
            })
        });

        if (!response.ok) {
            throw new Error("Backend connection failed");
        }

        const data = await response.json();

        // 5. Remove Loading & Show Paywall Card
        document.getElementById(loadingId).remove();
        addPaywallMessage(data);

    } catch (error) {
        document.getElementById(loadingId).remove();
        addMessage('bot', `<span style="color: #ff4d4d;">⚠️ Error: Is the backend running? (${error.message})</span>`);
        console.error(error);
    }
}

// ---------------------------------------------------------
// UI RENDERING FUNCTIONS
// ---------------------------------------------------------

function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    
    // Icons based on role
    const icon = role === 'user' ? 'fa-user' : 'fa-robot';
    const avatarClass = role === 'user' ? 'user-avatar' : 'bot-avatar';

    div.innerHTML = `
        <div class="avatar ${avatarClass}">
            <i class="fa-solid ${icon}"></i>
        </div>
        <div class="bubble">${text}</div>
    `;
    
    chatContainer.appendChild(div);
    scrollToBottom();
}

function addLoading() {
    const id = 'loading-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'message bot';
    div.innerHTML = `
        <div class="avatar bot-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="bubble">
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
    `;
    chatContainer.appendChild(div);
    scrollToBottom();
    return id;
}

function addPaywallMessage(data) {
    const div = document.createElement('div');
    div.className = 'message bot';
    
    // Dynamic ID for unlocking later
    const cardId = `paywall-${Date.now()}`;

    // HTML Structure matching the Cyberpunk CSS
    div.innerHTML = `
        <div class="avatar bot-avatar"><i class="fa-solid fa-brain"></i></div>
        <div class="bubble" style="width: 100%; max-width: 85%;">
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                <strong style="color: var(--primary); font-size: 0.9rem; text-transform: uppercase;">
                    <i class="fa-solid fa-eye"></i> Analysis Preview
                </strong>
                <p style="margin-top: 5px; color: #e2e8f0;">${data.preview}</p>
            </div>

            <div class="paywall-card" id="${cardId}">
                
                <div class="blur-text" style="filter: blur(8px); opacity: 0.6; user-select: none;">
                    ${data.full_answer_hidden || "Detailed strategic analysis hidden. Unlock to view full market insights..."}
                    <br><br>
                    <span style="opacity: 0.5;">(Premium Data) Lorem ipsum dolor sit amet, consectetur adipiscing elit...</span>
                </div>

                <div class="unlock-overlay">
                    <button class="pay-btn" onclick="unlockContent(this, '${cardId}')">
                        <i class="fa-solid fa-lock"></i> Unlock • $${data.price_usdc} USDC
                    </button>
                </div>

            </div>

            <div style="margin-top: 10px; font-size: 0.75rem; color: var(--text-muted); text-align: right;">
                Powered by ${data.model_used.toUpperCase()} • Arc Network
            </div>
        </div>
    `;

    chatContainer.appendChild(div);
    scrollToBottom();
}

// ---------------------------------------------------------
// PAYMENT SIMULATION LOGIC
// ---------------------------------------------------------

function unlockContent(btn, cardId) {
    // 1. Visual Feedback (Processing)
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying on Arc...';
    btn.style.borderColor = '#06b6d4';
    btn.style.color = '#06b6d4';

    // 2. Simulate Delay (Hackathon Demo Mode)
    setTimeout(() => {
        const card = document.getElementById(cardId);
        const overlay = btn.parentElement;
        const blurText = card.querySelector('.blur-text');

        // 3. Unlock Animation
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500); // Remove button layer

        // 4. Reveal Text
        blurText.style.filter = 'none';
        blurText.style.opacity = '1';
        blurText.style.color = '#fff';
        blurText.style.textShadow = '0 0 10px rgba(255,255,255,0.1)';
        
        // 5. Show Success Badge
        card.style.border = '1px solid #00ff88'; // Green border
        card.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)';
        
    }, 2000); // 2 seconds delay
}
