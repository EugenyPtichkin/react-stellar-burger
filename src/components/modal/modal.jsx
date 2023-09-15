import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ title, children, handleClose }) => {

  const closeOnEscape = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    }
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={handleClose}>
      <div className={styles.modal} >
        <div className={styles.title}>
          <p className={styles.title_text}>{title}</p>
          <CloseIcon type="primary" className={styles.close_button} onClick={handleClose} />
        </div>
        {children}
      </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;