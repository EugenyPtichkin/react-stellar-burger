import { useState, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { fillItem, clearItem } from './../../services/actions/ingredient';
import { useDrag } from 'react-dnd';

const BurgerContent = ({ dataItem, children }) => {
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: dataItem,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleOpen = () => {
    dispatch(fillItem(dataItem));
    setModalActive(true);
  };

  const handleClose = () => {
    dispatch(clearItem(dataItem));
    setModalActive(false);
  };

  /*  const sectionRef = useRef(null);
    console.log(sectionRef);  
    const ingredientPos = sectionRef.current?.getBoundingClientRect();
    console.log(ingredientPos);  */

  const { bun, ingredients } = useSelector(store => store.burger);

  function CollapsableTextContent({ quantity }) {
    if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={isDragging ? `${Styles.item} ${Styles.itemDrag}` : `${Styles.item}`} onClick={handleOpen} ref={dragRef} >
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
          (dataItem.type === 'bun') && bun && (dataItem._id === bun._id) ? 2 : 0 +
          (dataItem.type !== 'bun') && ingredients.filter(item => item._id === dataItem._id).length} />
      </section>
      {modalActive &&
        <div > {/*  onClick={handleAdd} > */}
          <Modal title="Детали ингредиента" handleClose={handleClose}>
            <IngredientDetails />
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

