import React from 'react';
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';

const BurgerContent = (props) => {
  const [modalActive, setModalActive] = React.useState(false);
  const [currentQuantity, setCurrentQuantity] = React.useState(props.dataItem.__v);

  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  const incrementQuantity = () => {
    setCurrentQuantity(currentQuantity + 1);  
  }

  function CollapsableTextContent({ quantity }) {
   if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={styles.item} onClick={handleOpen}>
        <div className={styles.image} >
          {props.children}
        </div>
        <div className={styles.price}>
          <div className={styles.price_value}>
            {props.dataItem.price}
          </div>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <p className={styles.name}>{props.dataItem.name}</p>
        <CollapsableTextContent quantity={props.dataItem.__v} />
      </section>
      {modalActive &&
        <Modal title="Детали ингредиента" handleClose={handleClose} onClick={incrementQuantity}>
          <IngredientDetails data={props.dataItem}/>
        </Modal>
      }
    </>
  )
}

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired,
  children: PropTypes.node.isRequired
};

export default BurgerContent;

