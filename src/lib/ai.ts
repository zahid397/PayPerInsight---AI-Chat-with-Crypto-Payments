import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateAIResponse(prompt: string, context?: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: context || 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'mixtral-8x7b-32768', // Fast and free on Groq
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    return completion.choices[0]?.message?.content || 'No response generated.';
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate AI response');
  }
}
