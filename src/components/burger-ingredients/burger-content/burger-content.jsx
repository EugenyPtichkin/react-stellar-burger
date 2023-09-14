import React from 'react';
import styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
/*import { contentPropType } from './../../../utils/prop-types';*/

function CollapsableTextContent({ quantity }) {
  if (quantity === 0) {
    return null;
  }
  return <Counter count={quantity} size="default" extraClass='m-1' />
}

function BurgerContent({ children, dataItem }) {
  const [modalActive, setModalActive] = React.useState(false);

  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <>
      <section className={styles.item} onClick={handleOpen}>
        <div className={styles.image} >
          {children}
        </div>
        <div className={styles.price}>
          <div className={styles.price_value}>
            {dataItem.price}
          </div>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <p className={styles.name}>{dataItem.name}</p>
        <CollapsableTextContent quantity={dataItem.__v} />
      </section>
      {modalActive &&
        <Modal title="Детали ингредиента" handleClose={handleClose} >
          <IngredientDetails data={dataItem} />
        </Modal>
      }
    </>
  )
}

export default BurgerContent;

/*BurgerContent.propTypes = {
  props: contentPropType.isRequired
};*/