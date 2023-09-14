import styles from './modal-overlay.module.css';

export const ModalOverlay = (props) => {
  return (
    <div className={styles.modal_overlay} onClick={props.handleClose} >
      {props.children}
    </div>
  );
}