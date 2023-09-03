import styles from './scrollbar.module.css';

export function ScrollBar(props) {
  return (
    <div className={styles.scrollbar} style={{height: props.scrollHeight}} >
        <div className={styles.scrollbar_thumb} style={{height: props.thumbHeight, top: props.thumbOffset}}>
        </div>
    </div>
  )
}