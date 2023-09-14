import React from 'react';
import styles from './burger-constructor.module.css';
import { orderNumber, bunsName } from './../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorPropType } from './../../utils/prop-types';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../orderDetails/order-details';
import Modal from './../modal/modal';

/* Дописать к названию булочки "верх" или "низ" */
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

/* Добавить к разметке иконку перетаскивания*/
function DisplayItem({ dataItem, style, lock }) {
  if (!lock) {
    return <section className={styles.chosableItem}>
      <DragIcon />
      <DisplayConstructorElement dataItem={dataItem} style={style} lock={lock} />
    </section>
  }
  return (
    <DisplayConstructorElement dataItem={dataItem} style={style} lock={lock} />
  );
};

/* Цикл для отображения переносимых элементов */
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


function BurgerConstructor({ingredients}) {
  console.log(ingredients);

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
  let bunIndexFirst = ingredients.findIndex(item => item.type === bunsName[0] );
  //если не выбрана ни одна булка, выбрать первую по списку для заказа
  let bunIndex = bunIndexNonZero === -1 ? bunIndexFirst : bunIndexNonZero;

  return (
    <section className={styles.contents}>
      <section className={styles.layout_first_last}> {
        <DisplayItem key={ingredients[bunIndex]._id} dataItem={ingredients[bunIndex]} style="top" lock={true} />
      }
      </section>

      <section className={styles.scrolbarList}>
        <ul className={styles.itemsList}>
          <li className={styles.layout}>
            {ingredients.map((dataItem) => ((dataItem.type !== bunsName[0]) && (dataItem.__v !== 0) &&
              <DisplayItems key={dataItem._id} dataItem={dataItem} num={dataItem.__v} />
            ))
            }
          </li>
        </ul>
      </section>

      <section className={styles.layout_first_last}> {
         <DisplayItem key={ingredients[bunIndex]._id} dataItem={ingredients[bunIndex]} style="bottom" lock={true} />
        }
      </section>

      <section className={styles.info}>
        <div className={styles.price}>
          <p className={styles.price_value}>610</p>
          <div className={styles.price_icon}><CurrencyIcon /></div>
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

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  props: constructorPropType.isRequired
};