'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sticky bottom-0 z-10">
      <div className="relative max-w-4xl mx-auto flex items-center bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all shadow-sm">
        
        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Thinking..." : "Ask something..."}
          disabled={isLoading}
          className="flex-1 bg-transparent px-6 py-4 text-sm focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 disabled:opacity-50"
        />
        
        {/* Icon Button */}
        <div className="pr-2">
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-full transition-all flex items-center justify-center ${
              !input.trim() || isLoading
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md transform hover:scale-105 active:scale-95'
            }`}
          >
            {/* Up Arrow SVG Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
