import { routeAI } from './router';

export async function processQuery(prompt) {
  // 1. রাউটার কল করে সঠিক প্রভাইডার সিলেক্ট করা
  const provider = routeAI(prompt);

  try {
    // 2. জেনারেট ফাংশন কল করা
    return await provider.generate(prompt);
  } catch (error) {
    console.error("AI Error:", error);
    // 3. ফেইল সেফ (Fail-safe)
    return "Analysis Interrupted: Internal system latency. Retrying strictly suggested.";
  }
}
