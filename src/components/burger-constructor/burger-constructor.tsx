import { useState, useEffect, useMemo, useCallback, FC } from 'react'; //useContext
import Styles from './burger-constructor.module.css';
import ModalStyles from './../modal/modal.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerItem } from '../burger-item/burger-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { updateIngredients, deleteAllIngredients } from '../../services/actions/burger';
import { getOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { addBuns, addIngredient } from '../../services/actions/burger';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { TBun, TBurger, TIngredient, TUser } from '../../services/types/data';

const BurgerConstructor: FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalServerErrorActive, setServerErrorActive] = useState(false); //Отображение ошибки сервера
  const user: TUser | null = useSelector(store => store.user.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: { dataItem: TIngredient }) {
      if (item.dataItem.type === 'bun') {
        dispatch(addBuns(item.dataItem))
      } else {
        dispatch(addIngredient(item.dataItem))
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const { bun, ingredients }: TBurger = useSelector(store => store.burger);
  const burgerIngredients: TBurger = { bun, ingredients };

  const burgerPrice: number = useMemo(() => {
    return (bun ? (bun.price * 2) : 0) + ingredients.reduce((acc, item) => acc + item.price, 0);
  }, [bun, ingredients]);

  //cостояние заказа
  const { orderIsError } = useSelector(store => store.order);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
    dispatch(deleteAllIngredients());
  }, [dispatch]);

  const handleServerErrorOpen = useCallback(() => {
    setServerErrorActive(true);
  }, []);

  const handleSubmit = () => {
    if (user) {
      const burgerIngredientsIds: Array<string> = [burgerIngredients.bun ? burgerIngredients.bun._id : '', ...burgerIngredients.ingredients.map(item => item._id), burgerIngredients.bun ? burgerIngredients.bun._id : ''];
      dispatch(getOrder(burgerIngredientsIds));
      handleModalOpen();
    }
    else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (orderIsError) {
      handleModalClose();
      handleServerErrorOpen();
    }
  }, [orderIsError, handleModalClose, handleServerErrorOpen]);


  const handleModalOpen = () => {
    setModalActive(true);
  };

  const handleServerErrorClose = () => {
    setServerErrorActive(false);
  };

  // Дописать к названию булочки "верх" или "низ" и отработать кнопку удаления
  const DisplayElement: FC<{ dataItem: TBun, style: string, lock: boolean }> = ({ dataItem, style, lock }: { dataItem: TBun, style: string, lock: boolean }) => {
    //  function handleDeleteItem() {
    //    dispatch(deleteIngredient(dataItem.uuid));
    //  }
    const newtext: string = (style === 'top') ? [dataItem.name, ' (верх)'].join('') :
      (style === 'bottom') ? [dataItem.name, ' (низ)'].join('') : dataItem.name;
    
      type TConsructorElementStyle = 'top' | 'bottom' | undefined;
      let consructorElementStyle: TConsructorElementStyle;
      consructorElementStyle = (style === 'top')? consructorElementStyle = style : 
      (style === 'bottom') ? consructorElementStyle = 'bottom' : undefined;
        
    return (
      <ConstructorElement
        type={consructorElementStyle}
        isLocked={lock}
        text={newtext}
        price={dataItem.price}
        thumbnail={dataItem.image}
        handleClose={undefined} //Bun нельзя удалить, только заменить
      />
    )
  }
  // Добавить к разметке иконку перетаскивания 
  const BunItem: FC<{ dataItem: TBun, style: string }> = ({ dataItem, style }: { dataItem: TBun, style: string }) => {
    return (
      <section className={Styles.chosableItem}>
        <DisplayElement dataItem={dataItem} style={style} lock={true} />
      </section>
    );
  };

  const handleSwitchItems = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragItem: TIngredient = ingredients[dragIndex];
    const updatedIngredients: Array<TIngredient> = [...ingredients];
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
            style={`top`}
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
            style={`bottom`}
          />
        }
        </section>
      }

      <section className={Styles.info}>
        <div className={Styles.price}>
          <p className={Styles.price_value}>{burgerPrice}</p>
          <div className={Styles.price_icon}><CurrencyIcon type='primary' /></div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}
          disabled={!burgerIngredients.bun} >
          Оформить заказ
        </Button>
      </section>

      {modalActive && //модальное окно с номером заказа
        <Modal title='' handleClose={handleModalClose} >
          <OrderDetails />
        </Modal>
      }

      {modalServerErrorActive && //модальное окно с сообщением об ошибке сервера
        <Modal title='Ошибка запроса на сервер' handleClose={handleServerErrorClose} >
          <p className={`${ModalStyles.title_text} ${ModalStyles.error_text}`}></p>
        </Modal>
      }

    </section>
  );
};

export default BurgerConstructor;