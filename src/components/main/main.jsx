import Styles from './main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';

const Main = () => {
  return (
    <div className={Styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  )
}

export default Main;
