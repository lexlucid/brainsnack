
import './globals.css'
import { Dashboard } from '@/components/dashboard'
import App from './App'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body>

          {children}
        </body>
      </html>
  )
}