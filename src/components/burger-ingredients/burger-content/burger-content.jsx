import { useState } from 'react';
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
/*import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';*/
import { useDispatch, useSelector } from 'react-redux';
import { fillItem, clearItem } from '../../../services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const BurgerContent = ({ dataItem, children }) => {
  const location = useLocation();
  const ingredientId = dataItem._id;

/*const [modalActive, setModalActive] = useState(false);*/

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
/*    setModalActive(true);*/
  };

/*const handleClose = () => {
    dispatch(clearItem(dataItem));
    setModalActive(false);
  };*/

  const { bun, ingredients } = useSelector(store => store.burger);

  function CollapsableTextContent({ quantity }) {
    if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <Link
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={Styles.link}
        onClick={handleOpen}
      >
        <section className={isDragging ? `${Styles.item} ${Styles.itemDrag}` : `${Styles.item}`} onClick={handleOpen} ref={dragRef} >  
          <div className={Styles.image}> {/*} ref={ref}> */}
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
        {/*  {modalActive &&
          <div >
            <Modal title="Детали ингредиента" handleClose={handleClose}>
              <IngredientDetails />
            </Modal>
          </div>
        }  */}
      </Link>
    </>
  )
}

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired,
  children: PropTypes.node.isRequired,
  //handleModal: PropTypes.func.isRequired,
};

export default BurgerContent;

