'use client'

import { useState } from 'react'
import { useAuthStore } from '@/shared/store/auth-store'
import { Spinner } from '../spinner/spinner'
import { FormBody, FormErrors } from '@/shared/types/types'
import { validateLoginForm } from '@/shared/utils/validate'
import { Button, Input } from '@/shared/ui'
import styles from './login-form.module.scss'

export const LoginForm = () => {
  const [formData, setFormData] = useState<FormBody>({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const { login, loading, error } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateLoginForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    await login(formData.username, formData.password)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        disabled={loading}
        placeholder="Enter your username"
      />

      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
        disabled={loading}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner size="small" /> : 'Login'}
      </Button>
    </form>
  )
}
