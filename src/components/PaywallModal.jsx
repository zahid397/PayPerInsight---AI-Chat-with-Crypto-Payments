import React from 'react';
import { Lock } from 'lucide-react';
import GlassCard from './GlassCard';

export default function PaywallModal({ onUpgrade }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <GlassCard className="p-8 max-w-md w-full text-center border-blue-500/30">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
          <Lock size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Free Tier Limit Reached</h2>
        <p className="text-zinc-400 mb-8 text-sm">
          Upgrade to Payperinsight Enterprise for unlimited queries, advanced reasoning models, and zero latency.
        </p>
        <button 
          onClick={onUpgrade}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
        >
          Unlock Enterprise Access
        </button>
      </GlassCard>
    </div>
  );
}
