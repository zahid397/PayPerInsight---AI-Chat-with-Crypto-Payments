import { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, ExternalLink, Zap, BrainCircuit } from 'lucide-react';
import { Message } from '@/types';

export default function AgentMessage({ msg }: { msg: Message }) {
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <div className="flex gap-4 max-w-3xl animate-fade-in-up">
      {/* Bot Icon */}
      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
        <Bot size={20} />
      </div>

      <div className="flex-1 space-y-3">
        
        {/* 1. Reasoning Accordion (Collapsible) */}
        {msg.reasoning && (
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
            <button 
              onClick={() => setShowReasoning(!showReasoning)}
              className="w-full flex items-center justify-between p-2.5 px-4 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors bg-slate-900/40"
            >
              <div className="flex items-center gap-2">
                <BrainCircuit size={14} /> Agent Reasoning
              </div>
              {showReasoning ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {showReasoning && (
              <div className="p-3 px-4 border-t border-slate-700/50 text-sm text-slate-300 bg-slate-950/30">
                <p className="mb-2"><span className="text-cyan-500 font-bold">Thought:</span> {msg.reasoning}</p>
                <p><span className="text-purple-400 font-bold">Tool:</span> {msg.tool_used}</p>
              </div>
            )}
          </div>
        )}

        {/* 2. Payment Badge (Arc Network) */}
        {msg.transaction && (
          <div className="flex items-center gap-3 p-2.5 px-4 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <div className="p-1 bg-emerald-500/10 rounded-full">
              <Zap size={12} fill="currentColor" />
            </div>
            <div className="flex-1">
              PAID <span className="font-bold text-white">{msg.transaction.amount} {msg.transaction.currency}</span> ON ARC
            </div>
            <a 
              href={msg.transaction.explorer_url}
              target="_blank"
              className="flex items-center gap-1 hover:text-emerald-300 hover:underline"
            >
              TX HASH <ExternalLink size={10} />
            </a>
          </div>
        )}

        {/* 3. Content Bubble */}
        <div className="bg-slate-800/40 border border-white/10 p-5 rounded-2xl rounded-tl-none text-slate-100 leading-relaxed shadow-lg backdrop-blur-md">
          <p className="whitespace-pre-wrap">{msg.content}</p>
          
          {/* Image Display */}
          {msg.image_url && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 relative group">
              <img src={msg.image_url} alt="Generated" className="w-full object-cover" />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-[10px] rounded text-white backdrop-blur-md">
                AI GENERATED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
