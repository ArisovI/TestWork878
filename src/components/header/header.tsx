'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import { useAuthStore } from '@/shared/store/auth-store'
import { Button, Container } from '@/shared/ui'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { COOKIE_TOKEN } from '@/shared/http/cookie'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const { isAuthenticated, user, logout, getMe } = useAuthStore()

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  useEffect(() => {
    const token = Cookies.get(COOKIE_TOKEN.ACCESS)
    if (token) {
      getMe()
    }
  }, [getMe])

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logo}>
            Abelohost Shop
          </Link>

          <nav className={styles.nav}>
            {isAuthenticated && user ? (
              <div className={styles.userSection}>
                <span className={styles.userName}>
                  {user.firstName} {user.lastName}
                </span>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Link href="/login" className={styles.loginLink}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
