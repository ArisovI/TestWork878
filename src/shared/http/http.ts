import axios from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL } from '../constants/http'
import { COOKIE_TOKEN } from './cookie'

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const refreshAccessToken = async (): Promise<string> => {
  const response = await http.post('/auth/refresh', {
    expiresInMins: 30,
  })
  const { accessToken, refreshToken } = response.data

  Cookies.set(COOKIE_TOKEN.ACCESS, accessToken, { expires: 1 / 24, path: '/' })
  Cookies.set(COOKIE_TOKEN.REFRESH, refreshToken, { expires: 90, path: '/' })

  return accessToken
}

http.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(COOKIE_TOKEN.ACCESS)
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      const originalRequest = error.config
      originalRequest._retry = true

      const refreshToken = Cookies.get(COOKIE_TOKEN.REFRESH)
      if (!refreshToken) {
        Cookies.remove(COOKIE_TOKEN.ACCESS)
        return Promise.reject(error)
      }

      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return http(originalRequest)
      } catch (err) {
        Cookies.remove(COOKIE_TOKEN.ACCESS)
        Cookies.remove(COOKIE_TOKEN.REFRESH)
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)
