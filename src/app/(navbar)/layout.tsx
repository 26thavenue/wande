import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";


const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
      <html lang="en">
        <body className={jetbrains.className}>{children}</body>
      </html>
      </ClerkProvider>
    
    
  );
}
