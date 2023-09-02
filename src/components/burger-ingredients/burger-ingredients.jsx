import React from 'react';
import styles from './burger-ingredients.module.css';
import { data } from './../../utils/data';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContent } from './burger-content/burger-content';
import { ScrollBar } from './../scrollbar/scrollbar';
import { bunsName, saucesName, mainsName } from './../main/main';
import { ingredientPropType } from './../../utils/prop-types';

function ShowTab() {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent} >
        {bunsName[1]}
      </Tab>
      <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
        {saucesName[1]}
      </Tab>
      <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
        {mainsName[1]}
      </Tab>
    </div>
  )
}

function DisplayItem({ dataItem, quantity }) {
  return (
    <>
      <BurgerContent key={dataItem._id} name={dataItem.name} price={dataItem.price} quantity={quantity}>
        <img src={dataItem.image} alt={dataItem.name} />
      </BurgerContent>
    </>
  );
};

export function BurgerIngredients() {
  return (
    <section className={styles.contents}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        <ShowTab />
      </section>
      <section className={styles.scrollbar}>
        <ScrollBar scrollHeight="664px" thumbHeight="224px" thumpOffset="0px" />
        <section>
          <h2 className={styles.subtitle}>{bunsName[1]}</h2>
          <div className={styles.layout}>
            {data.map((dataItem) => ((dataItem.type === bunsName[0]) &&
              <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v} />
            ))
            }
          </div>
        </section>

        <section>
          <h2 className={styles.subtitle}>{saucesName[1]}</h2>
          <div className={styles.layout}>
            {data.map((dataItem) => ((dataItem.type === saucesName[0]) &&
              <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v} />
            ))
            }
          </div>
        </section>

        <section>
          <h2 className={styles.subtitle}>{mainsName[1]}</h2>
          <div className={styles.layout}>
            {data.map((dataItem) => ((dataItem.type === mainsName[0]) &&
              <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v} />
            ))
            }
          </div>
        </section>

      </section>
    </section>
  );
};


BurgerIngredients.propTypes = {
  props: ingredientPropType.isRequired
};

