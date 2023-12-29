import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ title, children, handleClose}) => {
  const closeOnEscape = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    }
  },[]);

  return ReactDOM.createPortal(
    <>
      <div className={Styles.modal}>
        <div className={Styles.title}>
          <div className={Styles.close_button} onClick={handleClose}>
            <CloseIcon type="primary"/>
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose}></ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;