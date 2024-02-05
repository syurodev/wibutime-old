import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import Header from '@/components/shared/Header/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Footer from '@/components/shared/Footer/Footer'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import QueryProvider from '@/components/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wibutime',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} w-screen`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <Header />
            <main className='min-h-dvh pt-20 pb-5 px-4 max-w-[1280px] mx-auto'>
              <QueryProvider>
                {children}
              </QueryProvider>
              <Analytics />
            </main>
            <Toaster />
            {/* <Footer /> */}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
