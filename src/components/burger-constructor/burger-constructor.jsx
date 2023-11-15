import { useState, useEffect, useMemo, useCallback } from 'react'; //useContext
import Styles from './burger-constructor.module.css';
import ModalStyles from './../modal/modal.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerItem } from './../burger-item/burger-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../order-details/order-details';
import Modal from './../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIngredient, updateIngredients } from './../services/actions/burger';
import { getOrder } from './../services/actions/order';
import { useDrop } from 'react-dnd';
import { addBuns, addIngredient } from './../services/actions/burger';

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const [modalServerErrorActive, setServerErrorActive] = useState(false); //Отображение ошибки сервера

  const dispatch = useDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      console.log(item);
      if (item.type === 'bun') {
        dispatch(addBuns(item))
      } else {
        dispatch(addIngredient(item))
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const { bun, ingredients } = useSelector(store => store.burger);
  const burgerIngredients = { bun, ingredients };

  const burgerPrice = useMemo(() => {
    return (bun && bun.price * 2) + ingredients.reduce((acc, item) => acc + item.price, 0);
  }, [bun, ingredients]);

  //cостояние заказа
  const { orderIsError, orderErrorType } = useSelector(store => store.order);

  const handleSubmit = () => {
    const burgerIngredientsIds = [burgerIngredients.bun._id, ...burgerIngredients.ingredients.map(item => item._id)];
    dispatch(getOrder(burgerIngredientsIds));
    handleOpen();
  };

  useEffect(() => {
    if (orderIsError) {
      handleClose();
      handleServerErrorOpen();
    }
  }, [orderIsError]);


  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  const handleServerErrorOpen = () => {
    setServerErrorActive(true);
  };

  const handleServerErrorClose = () => {
    setServerErrorActive(false);
  };

  // Дописать к названию булочки "верх" или "низ" и отработать кнопку удаления
  function DisplayElement({ dataItem, style, lock }) {
    function handleDeleteItem() {
      dispatch(deleteIngredient(dataItem.uuid));
    }
    const newtext = (style === "top") ? [dataItem.name, " (верх)"].join('') :
      (style === "bottom") ? [dataItem.name, " (низ)"].join('') : dataItem.name;
    return (
      <ConstructorElement
        type={style}
        isLocked={lock}
        text={newtext}
        price={dataItem.price}
        thumbnail={dataItem.image}
        handleClose={handleDeleteItem}
      />
    )
  }
  // Добавить к разметке иконку перетаскивания 
  function BunItem({ dataItem, style }) {
    return (
      <section className={Styles.chosableItem}>
        <DisplayElement dataItem={dataItem} style={style} lock={true} />
      </section>
    );
  };

  const handleSwitchItems = useCallback((dragIndex, hoverIndex) => {
    const dragItem = ingredients[dragIndex];
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(dragIndex, 1);          //удалить переносимый
    updatedIngredients.splice(hoverIndex, 0, dragItem);//вставить внутрь
    dispatch(updateIngredients(updatedIngredients));
  }, [dispatch, ingredients]);

  return (
    <section className={isOver ? `${Styles.contents} ${Styles.isOver}` : `${Styles.contents}`} ref={dropRef}>
      {!burgerIngredients.bun && burgerIngredients.ingredients.length === 0 &&
        <p className={`text text_type_main-large ${Styles.empty_text}`}>Перетяните сюда булку!</p>
      }
      {burgerIngredients.bun &&
        <section className={Styles.layout_first_last}> {
          <BunItem
            key={burgerIngredients.bun.uuid}
            dataItem={burgerIngredients.bun}
            style={"top"}
          />
        }
        </section>
      }
      {burgerIngredients.ingredients.length !== 0 &&
        <section className={Styles.scrolbarList}>
          <ul className={Styles.itemsList} >
            {burgerIngredients.ingredients.map((dataItem, index) =>
              <BurgerItem
                key={dataItem.uuid}
                dataItem={dataItem}
                index={index}
                handleSwitchItems={handleSwitchItems}
              />
            )}
          </ul>
        </section>
      }
      {burgerIngredients.bun &&
        <section className={Styles.layout_first_last}> {
          <BunItem
            key={burgerIngredients.bun.uuid}
            dataItem={burgerIngredients.bun}
            style={"bottom"}
          />
        }
        </section>
      }

      <section className={Styles.info}>
        <div className={Styles.price}>
          <p className={Styles.price_value}>{burgerPrice}</p>
          <div className={Styles.price_icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}
          disabled={!burgerIngredients.bun} >
          Оформить заказ
        </Button>
      </section>

      {modalActive && //модальное окно с номером заказа
        <Modal title='' handleClose={handleClose} >
          <OrderDetails />
        </Modal>
      }

      {modalServerErrorActive && //модальное окно с сообщением об ошибке сервера
        <Modal title='Ошибка запроса на сервер' handleClose={handleServerErrorClose} >
          <p className={`${ModalStyles.title_text} ${ModalStyles.error_text}`}>Код ошибки: {orderErrorType}</p>
        </Modal>
      }

    </section>
  );
};

export default BurgerConstructor;