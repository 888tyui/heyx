import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/WalletProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "HELIX - Permanent Encrypted Storage",
  description: "Store files permanently on Arweave with military-grade encryption. Powered by Solana.",
  keywords: ["decentralized storage", "arweave", "solana", "encryption", "blockchain", "irys", "web3"],
  icons: {
    icon: "/lb.png",
    shortcut: "/lb.png",
    apple: "/lb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${instrumentSerif.variable} ${jetbrains.variable} font-sans antialiased`}>
        <WalletProvider>
          {/* Noise overlay */}
          <div className="noise" />

          {/* Vignette effect */}
          <div className="vignette" />

          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
