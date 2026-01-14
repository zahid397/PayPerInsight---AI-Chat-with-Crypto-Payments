import React from 'react';
import { Bot, User } from 'lucide-react';

export default function ChatBubble({ role, content }) {
  const isAi = role === 'ai';

  return (
    <div className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
        ${isAi ? 'bg-blue-600/20 text-blue-400' : 'bg-zinc-700/50 text-white'}`}>
        {isAi ? <Bot size={18} /> : <User size={18} />}
      </div>
      
      <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed 
        ${isAi ? 'bg-white/5 border border-white/5' : 'bg-blue-600 text-white'}`}>
        <div className="whitespace-pre-wrap font-mono">{content}</div>
      </div>
    </div>
  );
}
