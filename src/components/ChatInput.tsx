import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
        <div className="relative flex items-center bg-slate-900 rounded-lg p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Jarvis for market insights..."
            disabled={disabled}
            className="w-full bg-transparent text-white p-4 outline-none placeholder:text-slate-500 font-light"
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="p-3 mr-1 rounded-md bg-primary text-black hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {disabled ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="text-center mt-3 text-[10px] text-slate-500 font-mono">
          POWERED BY GROQ AI • SECURED BY ARC • PAYMENTS VIA CIRCLE
        </div>
      </form>
    </div>
  );
}
