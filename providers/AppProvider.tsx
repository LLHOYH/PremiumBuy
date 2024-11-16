'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia, celo, celoAlfajores } from 'wagmi/chains';

import Layout from '../components/Layout';
import {
  injectedWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { IWeb3AuthCoreOptions, WEB3AUTH_NETWORK } from '@web3auth/base';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { AuthAdapter } from "@web3auth/auth-adapter";

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        injectedWallet,
        walletConnectWallet,
        coinbaseWallet,
        trustWallet,],
    },
  ],
  {
    appName: 'Celo Composer',
    projectId: process.env.WC_PROJECT_ID ?? '044601f65212332475a09bc14ceb3c34',
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores, base, baseSepolia],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  syncConnectedChain: true, // Add this if not present
});

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout>{children}</Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
