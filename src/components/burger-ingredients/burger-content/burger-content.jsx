import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
import { ConstructorContext } from '../../../utils/ingredientsContext';
import { v4 as uuidv4 } from 'uuid';

const BurgerContent = ({ dataItem, children }) => {
  const [modalActive, setModalActive] = useState(false);
  const { burgerIngredients, setBurgerIngredients } = useContext(ConstructorContext);

  const handleAdd = () => {
    let copy = Object.assign({}, burgerIngredients);
    console.log(dataItem.uniqueKey);
    (dataItem.type === "bun") ? copy.bun = dataItem : copy.ingredients.push(dataItem);
    if (dataItem.type !== "bun") {
      copy.ingredients[copy.ingredients.length - 1].uniqueKey = uuidv4();
      console.log(copy.ingredients[copy.ingredients.length - 1].uniqueKey); //новый uniqueKey!
      console.log(copy.ingredients[copy.ingredients.length - 1]);           //старый uniqueKey - общий для всех одинаковых dataItem
      console.log(copy);                                                    //старый uniqueKey - общий для всех одинаковых dataItem
    }
    setBurgerIngredients(copy);
  };

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
        <div onClick={handleAdd}>
          <Modal title="Детали ингредиента" handleClose={handleClose}>
            <IngredientDetails data={dataItem} />
          </Modal>
        </div>
      }
    </>
  )
}

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default BurgerContent;

