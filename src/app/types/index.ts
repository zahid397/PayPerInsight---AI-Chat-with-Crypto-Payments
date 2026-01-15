export type Role = 'user' | 'bot';

export interface Message {
  id: string;
  role: Role;
  text?: string;       // User message or Bot error/info
  preview?: string;    // Bot preview content
  fullAnswer?: string; // Bot hidden content
  price?: number;      // USDC Price
  isLocked?: boolean;  // Paywall state
  isLoading?: boolean; // For typing indicator
}

export interface ChatResponse {
  preview: string;
  full_answer_hidden: string;
  price_usdc: number;
  status: string;
}
