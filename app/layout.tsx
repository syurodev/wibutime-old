import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import Header from '@/components/shared/Header/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import QueryProvider from '@/components/providers/QueryProvider';
import ContextMenuComponent from '@/components/shared/ContextMenu/ContextMenuComponent';

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
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} w-screen`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <Header />
            <ContextMenuComponent>
              <main className='min-h-dvh w-screen overflow-hidden'>
                <QueryProvider>
                  {children}
                </QueryProvider>
                <Analytics />
              </main>
            </ContextMenuComponent>
            <Toaster />
            {/* <Footer /> */}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}