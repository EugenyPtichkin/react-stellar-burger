import Styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

const Main = (props) => {

  const localIngredients = props.ingredients.slice(); /*data.slice();*/
  localIngredients.forEach((item) => item.quantity = 0);  
  
  const handleIncrementQuantity = (itemId) => {
    const itemIndex = localIngredients.findIndex(item => item._id == itemId);
    localIngredients[itemIndex].quantity++;
    console.log(`Increment itemIndex: ${itemIndex}, itemQuantity: ${localIngredients[itemIndex].quantity}`);
    console.log(localIngredients.map(item => item.quantity));
  }
  const handleResetQuantity = (itemId) => {
    const itemIndex = localIngredients.findIndex(item => item._id == itemId);
    localIngredients[itemIndex].quantity = 0;
    console.log(`Reset itemIndex: ${itemIndex}, itemQuantity: ${localIngredients[itemIndex].quantity}`);
    console.log(localIngredients.map(item => item.quantity));
  }

  return (
    <div className={Styles.main}>
      <section>
        <BurgerIngredients ingredients={localIngredients} handleIncrementQuantity={handleIncrementQuantity}>
        </BurgerIngredients>
      </section>
      <section>
        <BurgerConstructor ingredients={localIngredients} handleIncrementQuantity={handleIncrementQuantity} handleResetQuantity={handleResetQuantity}>
        </BurgerConstructor>
      </section>
    </div>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;
