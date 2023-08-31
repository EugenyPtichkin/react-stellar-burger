import styles from './scrollbar.module.css';

export function ScrollBar() {
  return (
    <div className={styles.scrollbar}>
        <div className={styles.scrollbar_thumb}>
        </div>
    </div>
  )
}
