import React from 'react';
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';

const BurgerContent = ({dataItem, children}) => {
  const [modalActive, setModalActive] = React.useState(false);

  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  function CollapsableTextContent({ quantity }) {
   if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={Styles.item} onClick={handleOpen}>
        <div className={Styles.image} >
          {children}
        </div>
        <div className={Styles.price}>
          <div className={Styles.price_value}>
            {dataItem.price}
          </div>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <p className={Styles.name}>{dataItem.name}</p>
        <CollapsableTextContent quantity={dataItem.quantity} />
      </section>
      {modalActive &&
        <Modal title="Детали ингредиента" handleClose={handleClose}  >
          <IngredientDetails data={dataItem}/>
        </Modal>
      }
    </>
  )
}

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default BurgerContent;

