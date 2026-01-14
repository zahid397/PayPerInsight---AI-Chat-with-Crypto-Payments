import React from 'react';

export default function ChatBox({ children, scrollRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
      {children}
      {/* Auto-scroll anchor */}
      <div ref={scrollRef} />
    </div>
  );
}
