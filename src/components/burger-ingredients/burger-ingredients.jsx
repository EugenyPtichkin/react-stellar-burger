import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from './../../utils/data';
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

function BurgerIngredients(props) {
  console.log(props.ingredients);
  return (
    <section className={styles.contents}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        <ShowTab />
      </section>
      <section className={styles.scrollbar}>
        <DisplayItem dataSet={props.ingredients} productName={bunsName} />
        <DisplayItem dataSet={props.ingredients} productName={saucesName} />
        <DisplayItem dataSet={props.ingredients} productName={mainsName} />
      </section>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  props: ingredientPropType.isRequired
};

