'use client'

import { useAuthStore } from '@/shared/store/auth-store'
import styles from './footer.module.scss'
import { Container } from '@/shared/ui'

export const Footer = () => {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.text}>
          {new Date().getFullYear()}
          {isAuthenticated && user && <span> - Logged as {user.email}</span>}
        </p>
      </Container>
    </footer>
  )
}
