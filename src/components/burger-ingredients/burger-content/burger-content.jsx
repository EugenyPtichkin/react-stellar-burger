import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
import { ConstructorContext, PriceContext } from '../../../utils/ingredientsContext';
import { v4 as uuidv4 } from 'uuid';

const BurgerContent = ({ dataItem, children }) => {
  const [modalActive, setModalActive] = useState(false);
  const { burgerIngredients, setBurgerIngredients } = useContext(ConstructorContext);
  const { state, dispatch } = useContext(PriceContext);  

  const handleAdd = () => {
    const copySet = Object.assign({}, burgerIngredients);
    const copyItem = Object.assign({}, dataItem);
    copyItem.uniqueKey = uuidv4();    //присвоить однократно уникальный код при добавлении ингредиента
    copyItem.type == 'bun' ? copySet.bun = copyItem : copySet.ingredients.push(copyItem);    
    copyItem.type == 'bun' ? dispatch({type: 'addBun', productPrice: copyItem.price}) : dispatch({type: 'addMeal', productPrice: copyItem.price}) ;
    setBurgerIngredients(copySet);    
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

