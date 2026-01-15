import { useState } from 'react';
import { User, Bot, Lock, Eye, CheckCircle2, Loader2 } from 'lucide-react';
import { Message } from '@/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  message: Message;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(!message.isLocked);

  const handleUnlock = () => {
    setUnlocking(true);
    // Simulate Payment Delay
    setTimeout(() => {
      setUnlocking(false);
      setUnlocked(true);
    }, 2000);
  };

  if (message.isLoading) {
    return (
      <div className="flex gap-4 animate-slide-up">
        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]">
          <Bot className="w-6 h-6" />
        </div>
        <div className="bg-slate-800/60 border border-primary/20 p-4 rounded-xl rounded-tl-sm flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx("flex gap-4 w-full max-w-4xl", isUser ? "flex-row-reverse ml-auto" : "")}
    >
      {/* Avatar */}
      <div className={clsx(
        "w-10 h-10 min-w-[40px] rounded-lg flex items-center justify-center shadow-lg",
        isUser 
          ? "bg-gradient-to-br from-secondary to-violet-600 text-white shadow-[0_0_15px_rgba(189,0,255,0.3)]" 
          : "bg-slate-900 border border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
      </div>

      {/* Content Bubble */}
      <div className={clsx(
        "p-5 rounded-xl relative overflow-hidden backdrop-blur-sm",
        isUser 
          ? "bg-secondary/10 border border-secondary/40 text-white rounded-tr-sm text-right"
          : "bg-slate-900/80 border border-primary/20 text-slate-200 rounded-tl-sm border-l-4 border-l-primary w-full"
      )}>
        {isUser ? (
          <p>{message.text}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Preview Section */}
            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase mb-1">
                <Eye className="w-3 h-3" /> Analysis Preview
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{message.preview}</p>
            </div>

            {/* Paywall / Hidden Section */}
            <div className={clsx(
              "relative p-4 rounded-lg border transition-all duration-500",
              unlocked 
                ? "bg-emerald-500/10 border-emerald-500/50" 
                : "bg-slate-950/50 border-secondary/50 border-dashed"
            )}>
              <div className={clsx("transition-all duration-700", !unlocked && "blur-sm opacity-50 select-none")}>
                {message.fullAnswer || "Hidden high-value content..."}
              </div>

              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[1px]">
                  <button 
                    onClick={handleUnlock}
                    disabled={unlocking}
                    className="group relative px-6 py-2 bg-transparent border border-primary text-primary font-mono font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,242,255,0.1)] hover:shadow-[0_0_20px_rgba(0,242,255,0.6)]"
                  >
                    {unlocking ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Unlock • ${message.price} USDC
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {unlocked && (
              <div className="text-right text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3 h-3" /> Transaction Settled on Arc
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
