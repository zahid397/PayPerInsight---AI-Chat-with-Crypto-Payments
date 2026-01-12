import { ProgrammableWallet } from '@circle-fin/circle-programmable-wallet-sdk';

let circleInstance: ProgrammableWallet | null = null;

export const initCircleWallet = () => {
  if (typeof window === 'undefined') return null;

  if (!circleInstance) {
    circleInstance = new ProgrammableWallet({
      appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID!,
      entitySecret: process.env.NEXT_PUBLIC_ENTITY_SECRET!,
      entityId: process.env.NEXT_PUBLIC_ENTITY_ID!,
    });
  }
  return circleInstance;
};

export const createPaymentSession = async (amount: string, userId: string) => {
  const response = await fetch('https://api.circle.com/v1/w3s/developer/transactions/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
    },
    body: JSON.stringify({
      userId,
      destinationAddress: process.env.NEXT_PUBLIC_MERCHANT_WALLET,
      amount: {
        amount,
        currency: 'USD',
      },
      fee: {
        type: 'level',
        config: {
          feeLevel: 'HIGH',
        },
      },
    }),
  });

  return await response.json();
};

export const checkPaymentStatus = async (transactionId: string) => {
  const response = await fetch(`https://api.circle.com/v1/w3s/developer/transactions/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
    },
  });
  return await response.json();
};
