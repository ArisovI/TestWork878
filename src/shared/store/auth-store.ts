import { create } from 'zustand'
import { authApi } from '../services/services'
import { User } from '../types/api'
import Cookies from 'js-cookie'
import { http } from '../http/http'
import { COOKIE_TOKEN } from '../http/cookie'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  getMe: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ loading: true, error: null })

    try {
      const response = await authApi.login(username, password)
      const { accessToken, refreshToken, ...user } = response

      Cookies.set(COOKIE_TOKEN.ACCESS, accessToken, {
        expires: 1 / 24,
        path: '/',
      })

      Cookies.set(COOKIE_TOKEN.REFRESH, refreshToken, {
        expires: 90,
        path: '/',
      })

      set({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
    }
  },
  logout: () => {
    Cookies.remove(COOKIE_TOKEN.ACCESS)
    Cookies.remove(COOKIE_TOKEN.REFRESH)
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    })
  },

  getMe: async () => {
    try {
      const accessToken = Cookies.get(COOKIE_TOKEN.ACCESS)

      if (!accessToken) {
        set({ isAuthenticated: false, user: null })
        return
      }

      const { data } = await http('/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      set({ user: data, isAuthenticated: true })
    } catch (error) {
      set({ isAuthenticated: false, user: null })
      Cookies.remove(COOKIE_TOKEN.ACCESS)
      Cookies.remove(COOKIE_TOKEN.REFRESH)
      return error
    }
  },
}))
