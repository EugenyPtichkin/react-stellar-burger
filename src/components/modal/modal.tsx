import { FC, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

const modalRoot = document.getElementById('react-modals');

type TModal = {
  children: JSX.Element;
  handleClose(): void;
  title?: string;
}

const Modal: FC<TModal> = ({ children, handleClose, title }: TModal) => {
 
  const closeOnEscape = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape );
    }
  }, [closeOnEscape]);

  return ReactDOM.createPortal(
    <>
      <div className={Styles.modal}>
        <div className={Styles.title}>
          {title && <span>{title}</span>}
          <div className={Styles.close_button} onClick={handleClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose}></ModalOverlay>
    </>,
    modalRoot as HTMLElement
  );
};

export default Modal;