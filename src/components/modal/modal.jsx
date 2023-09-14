import ReactDOM from 'react-dom'
import styles from './modal.module.css';
import { ModalOverlay } from '../modalOverlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

/*const modalRoot = document.getElementById('react-modals');*/

export const Modal = ({ title, children, handleClose}) => {
  /*console.log(modalRoot);*/
  return ReactDOM.createPortal(
    <ModalOverlay handleClose={handleClose}>
      <div className={styles.modal} >
        <div className={styles.title}>
            <p className={styles.title_text}>{title}</p>
            <CloseIcon type="primary" className={styles.close_button} onClick={handleClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
  /*modalRoot*/
  document.getElementById('react-modals')
  );
};