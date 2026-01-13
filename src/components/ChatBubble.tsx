'use client';

interface ChatBubbleProps {
  content: string;
  role: 'user' | 'assistant';
}

export default function ChatBubble({ content, role }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm ${
          isUser
            ? 'bg-purple-600 text-white rounded-br-none' // ইউজারের স্টাইল
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none' // AI স্টাইল
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
