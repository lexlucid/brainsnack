"use client"
import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from './lib/context/user';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}