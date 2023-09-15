import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal_overlay} onClick={props.handleClose} >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ModalOverlay;