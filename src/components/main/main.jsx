import Styles from './main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';

const Main = () => {
  return (
    <main className={Styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}

export default Main;
