import type { Metadata } from 'next'
import { Footer, Header } from '@/components'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abeloshop Store',
  description: 'Abeloshop is a modern e-commerce platform built with Next.js',
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
