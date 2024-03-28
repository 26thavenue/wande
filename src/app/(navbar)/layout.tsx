import type { Metadata } from "next";
// import { ClerkProvider } from '@clerk/nextjs'
import { JetBrains_Mono ,} from "next/font/google";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { PuffLoader } from "react-spinners";
// import Loading from "@/components/loading";
import localFont from 'next/font/local'

const myFont = localFont({ src: './ojuju.tff' })

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nuno Store",
  description: "An e-commerce store for building materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      
      <html lang="en">
        <ClerkProvider>
           
            
        <body className={jetbrains.className}>
          <Toaster toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
              padding: '16px',
            }
          
          }}/>
           <ClerkLoading>
              <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>
             
            </ClerkLoading>
          <ClerkLoaded>
            <div className="flex flex-col min-h-screen">
             <Navbar />
             <div className="flex-grow">
              {children}
             </div>
            
            <Footer />
          </div>
          </ClerkLoaded>
          
         
          </body>
          </ClerkProvider>
      </html>
      
    
    
  );
}
