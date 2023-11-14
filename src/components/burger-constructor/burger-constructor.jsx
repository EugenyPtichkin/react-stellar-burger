import { useState, useEffect } from 'react'; //useContext
import Styles from './burger-constructor.module.css';
import ModalStyles from './../modal/modal.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../order-details/order-details';
import Modal from './../modal/modal';
//import { ConstructorContext, PriceContext } from '../../utils/ingredientsContext';
//import getOrderNumber from '../../utils/order-api';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIngredient } from './../services/actions/burger';
import { getOrder } from './../services/actions/order';

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const [modalErrorActive, setErrorActive] = useState(false); //Обработка ошибки - заказ без булки
  const [modalServerErrorActive, setServerErrorActive] = useState(false); //Отображение ошибки сервера
  //const { burgerIngredients, setBurgerIngredients } = useContext(ConstructorContext);
  //const { state, dispatch } = useContext(PriceContext);

  const { ingredients, bun } = useSelector(store => store.burger);
  const burgerIngredients = {bun, ingredients};
  //console.log(burgerIngredients);

  const dispatch = useDispatch();

  //cостояние заказа
    const { orderName, orderIsError, orderErrorType } = useSelector(store => store.order);  
/*  const [orderData, setOrderData] = useState({
    ids: [],
    name: '',
    order: 0,
    success: false,
    isError: false,
    errorType: ''
  });*/

  const handleSubmit = () => {
    if (!burgerIngredients.bun) {//Проверка на наличие булки в заказе - сервер не принимает заказы без кода булки
      handleErrorOpen(); 
    }
    else
    {
      const burgerIngredientsIds = [burgerIngredients.bun._id, ...burgerIngredients.ingredients.map(item => item._id)];
//    orderData.ids = burgerIngredientsIds;
//    console.log(orderData.ids);
//    getOrderNumber(orderData, setOrderData);
      dispatch(getOrder(burgerIngredientsIds));
      handleOpen();
    }
  };

  useEffect(() => {
    if ( orderIsError ) {   //orderData.isError
      handleClose();
      handleServerErrorOpen();
    }
  }, [orderName]); //orderData


  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  const handleErrorOpen = () => {
    setErrorActive(true);
  };

  const handleErrorClose = () => {
    setErrorActive(false);
  };

  const handleServerErrorOpen = () => {
    setServerErrorActive(true);
  };

  const handleServerErrorClose = () => {
    setServerErrorActive(false);
  };

  // Дописать к названию булочки "верх" или "низ" и отработать кнопку удаления
  function DisplayConstructorElement({ dataItem, style, lock }) {
    function handleDeleteItem() {
      dispatch(deleteIngredient(dataItem.uuid));    
/*    const copySet = Object.assign({}, burgerIngredients);
      const index = copySet.ingredients.findLastIndex(item => item.uniqueKey === dataItem.uniqueKey);
      dispatch({ type: 'deleteMeal', productPrice: copySet.ingredients[index].price });
      copySet.ingredients.splice(index, 1);
      setBurgerIngredients(copySet);*/
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
  function DisplayItem({ dataItem, style, lock }) {
    return (
      <section className={Styles.chosableItem}>
        {!lock && < DragIcon />}
        <DisplayConstructorElement dataItem={dataItem} style={style} lock={lock} />
      </section>
    );
  };

  return (
    <section className={Styles.contents}>
      {!burgerIngredients.bun && burgerIngredients.ingredients.length === 0 &&
        <p className={`text text_type_main-large ${Styles.empty_text}`}>Пусто</p>
      }
      {burgerIngredients.bun &&
        <section className={Styles.layout_first_last}> {
          <DisplayItem
            key={burgerIngredients.bun.uniqueKey}
            dataItem={burgerIngredients.bun}
            style={"top"}
            lock={true}
          />
        }
        </section>
      }
      {burgerIngredients.ingredients.length !== 0 &&
        <section className={Styles.scrolbarList}>
          <ul className={Styles.itemsList}>
            <li className={Styles.layout}>
              {burgerIngredients.ingredients.map((dataItem) =>
                <DisplayItem
                  key={dataItem.uuid}  //uniqueKey
                  dataItem={dataItem}
                  lock={false}
                />
              )}
            </li>
          </ul>
        </section>
      }
      {burgerIngredients.bun &&
        <section className={Styles.layout_first_last}> {
          <DisplayItem
            key={burgerIngredients.bun.uuid} //uniqueKey
            dataItem={burgerIngredients.bun}
            style={"bottom"}
            lock={true}
          />
        }
        </section>
      }

      <section className={Styles.info}>
        <div className={Styles.price}>
          <p className={Styles.price_value}>Цена</p>   {/*state.totalPrice*/}
          <div className={Styles.price_icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>
          Оформить заказ
        </Button>
      </section>

      {modalActive && //модальное окно с номером заказа
        <Modal title='' handleClose={handleClose} >
          <OrderDetails/>  {/* orderNumber={orderNumber}  orderData.order*/}
        </Modal>
      }

      {modalErrorActive && //модальное окно с сообщением об ошибке заказа
        <Modal title='Пожалуйста, добавьте булку в заказ!' handleClose={handleErrorClose} >
          <p></p>
        </Modal>
      }

      {modalServerErrorActive && //модальное окно с сообщением об ошибке сервера
        <Modal title='Ошибка запроса на сервер' handleClose={handleServerErrorClose} >
          <p className={`${ModalStyles.title_text} ${ModalStyles.error_text}`}>Код ошибки: {orderErrorType}</p> {/*orderData.errorType*/}
        </Modal>
      }

    </section>
  );
};

export default BurgerConstructor;