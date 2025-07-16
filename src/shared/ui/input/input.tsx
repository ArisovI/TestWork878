import styles from './input.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id?: string
}

export const Input = ({ label, error, id, ...props }: Props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
