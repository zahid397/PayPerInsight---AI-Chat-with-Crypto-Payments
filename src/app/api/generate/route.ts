import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, hasPaid } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // In production, verify payment with Circle API here
    if (!hasPaid && process.env.NODE_ENV === 'production') {
      // Verify payment status
      // const paymentVerified = await verifyPayment(sessionId);
      // if (!paymentVerified) {
      //   return NextResponse.json(
      //     { error: 'Payment required' },
      //     { status: 402 }
      //   );
      // }
    }

    // Generate AI response
    const response = await generateAIResponse(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
