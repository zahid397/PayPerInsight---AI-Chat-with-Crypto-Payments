import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap } from 'lucide-react';
import GlassCard from './components/GlassCard';
import ChatBubble from './components/ChatBubble';
import PaywallModal from './components/PaywallModal';
import { processQuery } from './ai/engine'; // Imported from previous context
import { useUsageStore } from './store/usageStore';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Payperinsight AI initialized. Ready for query.' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  
  const { incrementUsage, remaining, upgradeToPremium } = useUsageStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!incrementUsage()) {
      setShowPaywall(true);
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Direct call to the AI Engine provided earlier
      const aiResponse = await processQuery(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error: System unreachable.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {showPaywall && <PaywallModal onUpgrade={() => {
        upgradeToPremium();
        setShowPaywall(false);
      }} />}

      <GlassCard className="w-full max-w-4xl h-[85vh] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <h1 className="font-semibold tracking-wide">PAYPERINSIGHT</h1>
          </div>
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Zap size={12} className={remaining === 'Unlimited' ? 'text-yellow-500' : ''} />
            CREDITS: {remaining}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="text-zinc-500 text-xs font-mono animate-pulse ml-12">
              PROCESSING DATA STREAM...
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter directive..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white placeholder-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-3 top-3 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      </GlassCard>
    </div>
  );
}

export default App;
