import { useState, useReducer, useMemo } from 'react';
import Styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { IngredientsContext, ConstructorContext, PriceContext } from '../../utils/ingredientsContext';
//import { v4 as uuidv4 } from 'uuid';

const Main = (props) => {
  //добавить ко всем элементам поле для уникального id без значения
  const localIngredients = props.ingredients.slice();
  localIngredients.forEach((item) => item.uniqueKey = ''); //uuidv4()
  const [allIngredients] = useState(localIngredients);
  const [burgerIngredients, setBurgerIngredients] = useState({ bun: null, ingredients: [] });

  //подсчет стоимости через useReducer
  const initialPrice = { bunsPrice: 0, ingredientsPrice: 0, totalPrice: 0 };
  function reducer(state, action) {
    switch (action.type) {
      case "addBun":
        return {
          bunsPrice: action.productPrice * 2,
          ingredientsPrice: state.ingredientsPrice,
          totalPrice: state.ingredientsPrice + action.productPrice * 2
        };
      case "addMeal":
        return {
          bunsPrice: state.bunsPrice,
          ingredientsPrice: state.ingredientsPrice + action.productPrice,
          totalPrice: state.bunsPrice + state.ingredientsPrice + action.productPrice
        };
      case "deleteMeal":
        return {
          bunsPrice: state.bunsPrice,
          ingredientsPrice: state.ingredientsPrice - action.productPrice,
          totalPrice: state.bunsPrice + state.ingredientsPrice - action.productPrice
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  const [state, dispatch] = useReducer(reducer, initialPrice);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <PriceContext.Provider value={contextValue}>  {/*{ state, dispatch }*/}
      <IngredientsContext.Provider value={{ allIngredients }}>
        <ConstructorContext.Provider value={{ burgerIngredients, setBurgerIngredients }}>
          <div className={Styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </PriceContext.Provider>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;
