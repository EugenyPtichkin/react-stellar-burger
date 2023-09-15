import React from 'react';
import { dataPropType } from './../../utils/prop-types';
import Styles from './burger-constructor.module.css';
import { orderNumber, bunsName } from './../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../orderDetails/order-details';
import Modal from './../modal/modal';

function BurgerConstructor({ ingredients }) {

  const [modalActive, setModalActive] = React.useState(false);

  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  //найти первую по списку выбранную булку (с ненулевым счетчиком) - вторую отбросит
  let bunIndexNonZero = ingredients.findIndex(item => item.type === bunsName[0] && item.__v !== 0);
  //найти первую по списку булку (с любым счетчиком) - вторую отбросит
  let bunIndexFirst = ingredients.findIndex(item => item.type === bunsName[0]);
  //если не выбрана ни одна булка, выбрать первую по списку для заказа
  let bunIndex = bunIndexNonZero === -1 ? bunIndexFirst : bunIndexNonZero;

  // Дописать к названию булочки "верх" или "низ" 
  function DisplayConstructorElement({ dataItem, style, lock }) {
    let newtext = (style === "top") ? [dataItem.name, " (верх)"].join('') :
      (style === "bottom") ? [dataItem.name, " (низ)"].join('') : dataItem.name;
    return (
      <ConstructorElement
        type={style}
        isLocked={lock}
        text={newtext}
        price={dataItem.price}
        thumbnail={dataItem.image}
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

  // Цикл для отображения переносимых элементов 
  function DisplayItems({ dataItem, num }) {
    return (
      Array(num).fill().map((item, index) =>
        <DisplayItem
          key={[dataItem._id, index.toString()].join('')}
          dataItem={dataItem}
          lock={false}
        />
      ))
  };

  return (
    <section className={Styles.contents}>
      <section className={Styles.layout_first_last}> {
        <DisplayItem key={ingredients[bunIndex]._id} dataItem={ingredients[bunIndex]} style="top" lock={true} />
      }
      </section>

      <section className={Styles.scrolbarList}>
        <ul className={Styles.itemsList}>
          <li className={Styles.layout}>
            {ingredients.map((dataItem) => ((dataItem.type !== bunsName[0]) && (dataItem.__v !== 0) &&
              <DisplayItems key={dataItem._id} dataItem={dataItem} num={dataItem.__v} />
            ))
            }
          </li>
        </ul>
      </section>

      <section className={Styles.layout_first_last}> {
        <DisplayItem key={ingredients[bunIndex]._id} dataItem={ingredients[bunIndex]} style="bottom" lock={true} />
      }
      </section>

      <section className={Styles.info}>
        <div className={Styles.price}>
          <p className={Styles.price_value}>610</p>
          <div className={Styles.price_icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpen}>
          Оформить заказ
        </Button>
      </section>

      {modalActive &&
        <Modal title='' handleClose={handleClose} >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: dataPropType.isRequired
};

export default BurgerConstructor;