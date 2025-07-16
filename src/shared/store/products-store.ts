import { create } from 'zustand'
import { Product } from '../types/api'
import { productsApi } from '../services/services'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })

    try {
      const products = await productsApi.getProducts(12)
      set({ products, loading: false })
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
      })
    }
  },
}))
