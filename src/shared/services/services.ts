import axios from 'axios'
import { http } from '../http/http'
import { LoginResponse, Product, ProductsResponse } from '../types/api'

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await http.post('/auth/login', {
        username,
        password,
      })
      return response.data
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
