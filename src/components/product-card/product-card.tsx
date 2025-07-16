import Image from 'next/image'
import styles from './product-card.module.scss'
import { Product } from '@/shared/types/api'
import { Button } from '@/shared/ui'

interface ProductCardProps {
  product: Product
  showAddToCart: boolean
}

export const ProductCard = ({ product, showAddToCart }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          fill
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price}</p>

        {showAddToCart && <Button>Add to cart</Button>}
      </div>
    </div>
  )
}
