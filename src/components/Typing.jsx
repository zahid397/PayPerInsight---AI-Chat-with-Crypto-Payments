import React from 'react';

export default function Typing() {
  return (
    <div className="flex items-center gap-2 ml-12 py-2">
      <div className="text-xs font-mono text-blue-400 animate-pulse">
        AI PROCESSING
      </div>
      <div className="flex gap-1">
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
      </div>
    </div>
  );
}
