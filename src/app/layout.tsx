import "bootstrap/dist/css/bootstrap.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BootstrapClient from "@/components/BootstrapClient"
import { ReduxProvider } from "@/redux/provider"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Finders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <BootstrapClient />
        </ReduxProvider>
      </body>
    </html>
  )
}
