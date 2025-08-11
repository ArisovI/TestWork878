import axios from 'axios'
import { http } from '../http/http'
import { LoginResponse, Product, ProductsResponse } from '../types/api'
import Cookies from 'js-cookie'
import { COOKIE_TOKEN } from '../http/cookie'

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await http.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      })
      const { accessToken, refreshToken, ...user } = res.data

      Cookies.set(COOKIE_TOKEN.ACCESS, accessToken, { expires: 1 / 24, path: '/' })
      Cookies.set(COOKIE_TOKEN.REFRESH, refreshToken, { expires: 90, path: '/' })

      return {
        ...user,
        accessToken,
        refreshToken,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Invalid credentials')
      }
      throw new Error('Network error occurred')
    }
  },
}

export const productsApi = {
  getProducts: async (limit = 12): Promise<Product[]> => {
    try {
      const response = await http.get<ProductsResponse>('/products', {
        params: { limit },
      })
      return response.data.products
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch products',
        )
      }
      throw new Error('Network error occurred')
    }
  },
}
