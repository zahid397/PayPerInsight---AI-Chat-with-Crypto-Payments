/**
 * Groq Provider - OPTIMIZED FOR SPEED
 * Uses Llama-3-8b-8192 for sub-second latency.
 */

export const groqAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      console.warn("Groq API Key missing");
      // Fallback message if key is missing during build/runtime
      return "Groq Key Missing. Switched to simulation mode.";
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Payperinsight. Be concise and professional."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          model: "llama3-8b-8192",
          temperature: 0.5,
          max_tokens: 1024,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "No insight generated.";

    } catch (error) {
      console.error("Groq Provider Failed:", error);
      throw error;
    }
  }
};
