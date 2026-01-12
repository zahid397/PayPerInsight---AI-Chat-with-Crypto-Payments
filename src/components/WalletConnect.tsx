'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, LogOut } from 'lucide-react';
import { Button } from './ui/Button';

export function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="gap-2"
                    variant="default"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="text-sm font-medium">
                      {account.displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {chain?.name}
                    </p>
                  </div>
                  <Button
                    onClick={openAccountModal}
                    variant="outline"
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
