import React from 'react';
import Styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from './../../utils/data';
import { dataPropType } from './../../utils/prop-types';

function BurgerIngredients({ingredients}) {

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

  function DisplayItem({ dataSet, productName}) {
    return (
      <>
        <h2 className={Styles.subtitle}>{productName[1]}</h2>
        <div className={Styles.layout}>  {
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

  return (
    <section className={Styles.contents}>
      <h1 className={Styles.title}>Соберите бургер</h1>
      <section className={Styles.tab}>
        <ShowTab />
      </section>
      <section className={Styles.scrollbar}>
        <DisplayItem dataSet={ingredients} productName={bunsName} />
        <DisplayItem dataSet={ingredients} productName={saucesName} />
        <DisplayItem dataSet={ingredients} productName={mainsName} />
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
 ingredients: dataPropType.isRequired
};

export default BurgerIngredients;