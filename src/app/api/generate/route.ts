import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Hackathon Demo: Fake AI Response
    // (Later you can add real Groq/OpenAI logic here)
    const fakeResponse = `AI Analysis for: "${prompt}"\n\nBased on the current market data, the trend appears bullish. Security protocols are active. 🚀`;

    return NextResponse.json({ response: fakeResponse });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
