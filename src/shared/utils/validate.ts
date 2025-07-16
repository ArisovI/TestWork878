import { FormBody, FormErrors } from '@/shared/types/types'

export const validateLoginForm = (formData: FormBody): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.username.trim()) {
    errors.username = 'Username is required'
  } else if (formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters'
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required'
  } else if (formData.password.trim().length < 3) {
    errors.password = 'Password must be at least 3 characters'
  }

  return errors
}
