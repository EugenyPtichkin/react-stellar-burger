import { useState, useContext }  from 'react';
import Styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from './../../utils/data';
import { sglDataPropType } from './../../utils/prop-types';
//import { IngredientsContext } from '../../utils/ingredientsContext';
import {useSelector} from 'react-redux';

function BurgerIngredients() {
//  const ingredientsObject = useContext(IngredientsContext);
//  const ingredients = ingredientsObject.allIngredients;  
  const { ingredients } = useSelector(store => store.ingredients);
//  console.log(ingredients);
  
  function ShowTab() {
    const [current, setCurrent] = useState('Булки')
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

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired
}

export default BurgerIngredients;