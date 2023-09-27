import { useState } from 'react';
import Styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { IngredientsContext, ConstructorContext } from '../../utils/ingredientsContext';
import { v4 as uuidv4 } from 'uuid';

const Main = (props) => {
  const localIngredients = props.ingredients.slice(); 
  localIngredients.forEach((item) => item.uniqueKey=uuidv4());
  const [allIngredients, setAllIngredients] = useState(localIngredients); //props.ingredients
  const [burgerIngredients, setBurgerIngredients] = useState({bun: null, ingredients:[]});

  return (
    <IngredientsContext.Provider value={{allIngredients}}>
      <ConstructorContext.Provider value={{burgerIngredients, setBurgerIngredients}}>
        <div className={Styles.main}>
          <BurgerIngredients/> 
          <BurgerConstructor/> 
        </div>
      </ConstructorContext.Provider>
    </IngredientsContext.Provider>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;
