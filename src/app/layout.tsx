'use client'
import { Footer, Header } from '@/components'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { useAuthStore } from '@/shared/store/auth-store'
import Cookies from 'js-cookie'
import { COOKIE_TOKEN } from '@/shared/http/cookie'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const getMe = useAuthStore((state) => state.getMe)

  useEffect(() => {
    const token = Cookies.get(COOKIE_TOKEN.ACCESS)
    if (token) {
      getMe()
    }
  }, [getMe])

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
