import styles from './modal-overlay.module.css';

const ModalOverlay = ({handleClose}) => {
  return (
    <div className={styles.modal_overlay} onClick={handleClose} >
    </div>
  );
}
export default ModalOverlay;