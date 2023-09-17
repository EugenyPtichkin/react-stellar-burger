import Styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

const Main = (props) => {
  const localIngredients = props.ingredients.slice(); /*data.slice();*/
  localIngredients.forEach((item) => item.quantity = 0);
  
  return (
    <div className={Styles.main}>
      <section>
        <BurgerIngredients ingredients={localIngredients}>
        </BurgerIngredients>
      </section>
      <section>
        <BurgerConstructor ingredients={localIngredients}>
        </BurgerConstructor>
      </section>
    </div>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;
