/**
 * Groq Provider - OPTIMIZED FOR SPEED
 * Uses Llama-3-8b-8192 for sub-second latency.
 * No SDK required - uses native fetch for lightweight performance.
 */

export const groqAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // 1. Safety Check
    if (!apiKey) {
      console.warn("Groq API Key missing");
      throw new Error("Groq Config Error");
    }

    try {
      // 2. Direct API Call (OpenAI Compatible Endpoint)
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
              content: "You are Payperinsight, an enterprise AI assistant. Be concise, professional, and data-driven. Do not use filler words."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          model: "llama3-8b-8192", // Super fast model
          temperature: 0.5,       // Low temp for factual answers
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });

      // 3. Error Handling for API issues
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Groq API Error: ${errData.error?.message || response.statusText}`);
      }

      // 4. Parse Response
      const data = await response.json();
      return data.choices[0]?.message?.content || "No insight generated.";

    } catch (error) {
      console.error("Groq Provider Failed:", error);
      // Engine will catch this and swap to Mock/Other provider
      throw error;
    }
  }
};
