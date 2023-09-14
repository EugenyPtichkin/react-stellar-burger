import React from 'react';
import styles from './burger-ingredients.module.css';
import { data } from './../../utils/data';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContent } from './burger-content/burger-content';
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

function DisplayItem({ dataSet, productName }) {
  return (
    <>
      <h2 className={styles.subtitle}>{productName[1]}</h2>
      <div className={styles.layout}>  {
        dataSet.map((dataItem) => ((dataItem.type === productName[0]) &&
          <BurgerContent key={dataItem._id} dataItem={dataItem}>
              <img src={dataItem.image} alt={dataItem.name} />
          </BurgerContent>
        ))
      }
      </div>
    </>
  );
}

export function BurgerIngredients() {
  return (
    <section className={styles.contents}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        <ShowTab />
      </section>
      <section className={styles.scrollbar}>
        <DisplayItem dataSet={data} productName={bunsName} />
        <DisplayItem dataSet={data} productName={saucesName} />
        <DisplayItem dataSet={data} productName={mainsName} />
      </section>
    </section>
  );
};


BurgerIngredients.propTypes = {
  props: ingredientPropType.isRequired
};

