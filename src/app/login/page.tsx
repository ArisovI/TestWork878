'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './login.module.scss'
import { useAuthStore } from '@/shared/store/auth-store'
import { LoginForm } from '@/components'
import { Container } from '@/shared/ui'

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <section>
      <Container>
        <div className={styles.login}>
          <h1>Login</h1>
          <LoginForm />
        </div>
      </Container>
    </section>
  )
}
