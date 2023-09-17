import PropTypes from 'prop-types';
import Styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={Styles.modal_overlay} onClick={props.handleClose} >
    </div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default ModalOverlay;