/**
 * Utility Helpers
 * formatting, ID generation, and simulation tools.
 */

// 1. Generate unique IDs for chat messages (Better than using index)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// 2. Format Date like a terminal log (e.g., "10:45:22 AM")
export const formatTimestamp = () => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date());
};

// 3. Simulate "Thinking" time for Mock AI (Random delay)
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 4. Random Token Usage Generator (Just for "Enterprise" feel in UI)
export const calculateCost = (text) => {
  // Rough estimation: 1 token ~= 4 chars
  const tokens = Math.ceil(text.length / 4);
  const cost = (tokens * 0.00002).toFixed(5); // Fake cost calculation
  return { tokens, cost: `$${cost}` };
};

// 5. Clean Markdown (Optional: removes code blocks if you want plain text preview)
export const stripMarkdown = (text) => {
  return text.replace(/`/g, '').replace(/#/g, '').trim();
};
