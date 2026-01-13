'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
// 👇 Wallet icon add kora hoyeche
import { Loader2, Shield, Zap, Wallet } from 'lucide-react'; 
import { toast } from 'sonner';

// Components
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import { PayWallModal } from '@/components/PayWallModal';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  paid?: boolean;
};

export default function Home() {
  const { isConnected } = useAccount();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayWall, setShowPayWall] = useState(false);
  const [pendingQuery, setPendingQuery] = useState('');

  const handleSendMessage = async (content: string) => {
    // Wallet connection check
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!content.trim()) return;

    // Check if user has paid or needs to pay (First 3 queries free)
    const hasPaid = messages.length < 3; 

    if (!hasPaid) {
      setPendingQuery(content);
      setShowPayWall(true);
      return;
    }

    await processMessage(content, true);
  };

  const processMessage = async (content: string, isPaid: boolean) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      paid: isPaid,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 👇 Hackathon Demo Logic (Replace with actual API call later)
      // const response = await fetch('/api/generate', ...);
      
      // Simulating API Call
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "This is a secure AI response powered by Groq & Circle! 🚀 (Demo Mode)",
          role: 'assistant',
          timestamp: new Date(),
          paid: isPaid,
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        toast.success('AI response generated successfully!');
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response');
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    if (pendingQuery) {
      processMessage(pendingQuery, true);
      setPendingQuery('');
    }
    setShowPayWall(false);
    toast.success('Payment Verified! Generating answer...');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          PayPerInsight AI
          <span className="block text-lg font-normal text-gray-600 dark:text-gray-400 mt-2">
            Pay 0.01 USDC per query • First 3 queries free
          </span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Super Fast Responses</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800">
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Secure Crypto Payments</span>
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
               <Wallet className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Connect Your Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Connect your Circle Wallet or any EVM wallet to start chatting with AI securely.
            </p>
            {/* Note: Connect Button usually comes from Web3Modal or Custom Button */}
            <button className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30">
               Please Connect via Navbar ↗
            </button>
            <p className="mt-4 text-xs text-gray-500">
              First 3 queries are free! Then pay just 0.01 USDC per query
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <ChatMessages messages={messages} isLoading={isLoading} />
            
            {/* 👇 Corrected Props for ChatInput */}
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-800/30">
              <h4 className="font-semibold mb-1 text-purple-900 dark:text-purple-100">💡 Smart Responses</h4>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Powered by Groq&apos;s fastest AI models
              </p>
            </div>
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800/30">
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">🔒 Secure Payments</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Circle Wallet integration for safe transactions
              </p>
            </div>
            <div className="p-4 rounded-xl border border-green-100 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800/30">
              <h4 className="font-semibold mb-1 text-green-900 dark:text-green-100">⚡ Instant Processing</h4>
              <p className="text-xs text-green-700 dark:text-green-300">
                AI responses in milliseconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-3" />
            <p className="text-sm font-medium">Generating AI response...</p>
          </div>
        </div>
      )}

      {/* PayWall Modal (যদি টাকা লাগে) */}
      {showPayWall && (
        <PayWallModal /> 
        // Note: I kept it simple as per previous component. 
        // If you need props like isOpen/onClose, let me know to update the Modal!
      )}
    </div>
  );
}
