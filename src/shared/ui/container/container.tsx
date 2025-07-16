import styles from './container.module.scss'

type Props = {
  children?: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}
