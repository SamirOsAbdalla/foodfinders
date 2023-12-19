import "bootstrap/dist/css/bootstrap.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BootstrapClient from "@/components/BootstrapClient"
import { ReduxProvider } from "@/redux/provider"
import Navbar from "@/components/Navbar/Navbar"
import Providers from "@/components/Providers"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'SpeedEats',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <ReduxProvider>
            <Navbar />
            {children}
            <BootstrapClient />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  )
}
