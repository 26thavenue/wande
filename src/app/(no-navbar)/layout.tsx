import type { Metadata } from "next";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { JetBrains_Mono } from "next/font/google";

import { PuffLoader } from "react-spinners";
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
        <body className={jetbrains.className}>
           <ClerkLoading>
               <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <div className="">
                {children}
              </div>
            </ClerkLoaded>
          
          
          </body>
      </html>
      </ClerkProvider>
    
  );
}
