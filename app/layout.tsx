"use client";

import { Inter } from "next/font/google";
import "./globals.css";

import { sepolia } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const inter = Inter({ subsets: ["latin"] });

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
    chains: [sepolia],
    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <body className={inter.className}>{children}</body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
