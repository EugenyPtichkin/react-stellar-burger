import { FC } from 'react';
import Styles from './modal-overlay.module.css';

const ModalOverlay: FC<{handleClose():void}> = ({handleClose}: {handleClose():void}) => {
  return (
    <div className={Styles.modal_overlay} onClick={handleClose} >
    </div>
  );
}

export default ModalOverlay;