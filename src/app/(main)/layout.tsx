import type { Metadata } from 'next'
import {  JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const jetBrains= JetBrains_Mono({
   subsets: ['latin'] ,
  variable:"--font-jetBrains"})

const Ojuju = localFont(
  {
  src : './font/Ojuju-VariableFont_wght.ttf',
  variable:"--font-ojuju"}
   )

const Satoshi = localFont({
  src : './font/Satoshi-Variable.ttf',
   variable:"--font-satoshi"
})

const clashGrotesk = localFont({
  src : './font/ClashGrotesk-Variable.ttf',
   variable:"--font-clashGrotesk"})


export const metadata: Metadata = {
  title: 'Nuno Stores ',
  description: 'Your one stop for all things building materials',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${Satoshi.variable} ${Ojuju.variable} ${jetBrains.variable} ${clashGrotesk.variable} flex flex-col min-h-screen`}>
          <Navbar />
          <div className="flex-grow flex justify-center items-center ">
            {children}
          </div>
          <Footer />
          </body>
      </html>
    </ClerkProvider>
  )
}
