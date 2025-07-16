'use client'

import { useEffect } from 'react'
import styles from './page.module.scss'
import { useAuthStore } from '@/shared/store/auth-store'
import { useProductStore } from '@/shared/store/products-store'
import { ProductCard, Spinner } from '@/components'
import { Container } from '@/shared/ui'

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const { products, loading, error, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) {
    return (
      <div className={styles.loader}>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button onClick={() => fetchProducts()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className={styles.homePage}>
      <Container>
        <h1 className={styles.title}>Our Products</h1>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showAddToCart={isAuthenticated}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
