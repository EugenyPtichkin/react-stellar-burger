/*import React from 'react';*/
import styles from './burger-constructor.module.css';
import { data } from './../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ScrollBar } from './../scrollbar/scrollbar';
import { constructorPropType } from './../../utils/prop-types';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { bunsName } from './../main/main';


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

export function BurgerConstructor() {
  return (
    <section className={styles.contents}>

      <section className={styles.layout_first_last}> {
        data.map((dataItem) => ((dataItem.type === bunsName[0]) && (dataItem.__v !== 0) &&
          <DisplayItem key={dataItem._id} dataItem={dataItem} style="top" lock={true} />
        ))}
      </section>

      <section className={styles.scrolbarList}>
        <ScrollBar scrollHeight="464px" thumbHeight="100px" thumpOffset="0px" />
        <ul className={styles.itemsList}>
          <li className={styles.layout}>
            {data.map((dataItem) => ((dataItem.type !== bunsName[0]) && (dataItem.__v !== 0) &&
              <DisplayItems key={dataItem._id} dataItem={dataItem} num={dataItem.__v} />
            ))
            }
          </li>
        </ul>
      </section>

      <section className={styles.layout_first_last}> {
        data.map((dataItem) => ((dataItem.type === bunsName[0]) && (dataItem.__v !== 0) &&
          <DisplayItem dataItem={dataItem} key={dataItem._id} style="bottom" lock={true} />
        ))}
      </section>

      <section className={styles.info}>
        <div className={styles.price}>
          <p className={styles.price_value}>610</p>
          <div className={styles.price_icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </section>

    </section>
  );
};

BurgerConstructor.propTypes = {
  props: constructorPropType.isRequired
};