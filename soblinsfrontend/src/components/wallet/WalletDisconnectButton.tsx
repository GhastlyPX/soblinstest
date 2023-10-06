import { useWallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEventHandler } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { ButtonProps } from './Button';
import { WalletIcon } from './WalletIcon';

export const WalletDisconnectButton: FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  ...props
}) => {
  const { wallet, disconnect, disconnecting } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) disconnect().catch(() => {});
    },
    [onClick, disconnect]
  );

  const content = useMemo(() => {
    if (children) return children;
    if (disconnecting) return 'Disconnecting ...';
    if (wallet) return 'Disconnect';
    return 'Disconnect Wallet';
  }, [children, disconnecting, wallet]);

  return (
    <button
      className="flex flex-row items-center gap-1 hover:text-gbgGold-200 duration-300 transition ease-in-out"
      disabled={disabled || !wallet}
      onClick={handleClick}
      {...props}
    >
      <p>Disconnect Wallet</p>
    </button>
  );
};
