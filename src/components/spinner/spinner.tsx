import styles from './spinner.module.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

export const Spinner = ({ size = 'medium' }: Props) => {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <div className={styles.circle}></div>
    </div>
  )
}
