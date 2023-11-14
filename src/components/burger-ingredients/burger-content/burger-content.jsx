import { useState } from 'react'; //useContext
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
//import { ConstructorContext, PriceContext } from '../../../utils/ingredientsContext';
//import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import { addBuns, addIngredient } from './../../services/actions/burger';
import {fillItem, clearItem} from './../../services/actions/ingredient';

const BurgerContent = ({ dataItem, children }) => {
  const [modalActive, setModalActive] = useState(false);
//  const { burgerIngredients, setBurgerIngredients } = useContext(ConstructorContext);
//  const { state, dispatch } = useContext(PriceContext);  

  
  const dispatch = useDispatch();      
  
  const handleAdd = () => {
    if (dataItem.type === 'bun') {
      dispatch(addBuns(dataItem))
    } else {
      dispatch(addIngredient(dataItem))      
    }
      
/*    const copySet = Object.assign({}, burgerIngredients);
    const copyItem = Object.assign({}, dataItem);
    copyItem.uniqueKey = uuidv4();    //присвоить однократно уникальный код при добавлении ингредиента
    copyItem.type == 'bun' ? copySet.bun = copyItem : copySet.ingredients.push(copyItem);    
    copyItem.type == 'bun' ? dispatch({type: 'addBun', productPrice: copyItem.price}) : dispatch({type: 'addMeal', productPrice: copyItem.price}) ;
    setBurgerIngredients(copySet);    */
  };

  const handleOpen = () => {
    dispatch(fillItem(dataItem));
    setModalActive(true);
  };

  const handleClose = () => {
    dispatch(clearItem(dataItem));
    setModalActive(false);
  };

  const { bun, ingredients } = useSelector(store => store.burger);  
 
  function CollapsableTextContent({quantity}) {
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
        <CollapsableTextContent quantity={
          (dataItem.type === 'bun') && bun && (dataItem._id === bun._id) ? 1 : 0  +
          (dataItem.type !== 'bun') && ingredients.filter(item => item._id === dataItem._id).length } />
      </section>
      {modalActive &&
        <div onClick={handleAdd}>
          <Modal title="Детали ингредиента" handleClose={handleClose}>
            <IngredientDetails/> {/* data={dataItem} */}
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

