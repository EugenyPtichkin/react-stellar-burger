import styles from './modal-overlay.module.css';

export const ModalOverlay = ({handleClose}) => {
  return (
    <div className={styles.modal_overlay} onClick={handleClose} >
    </div>
  );
}