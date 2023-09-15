import styles from './main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

function Main(props) {
  console.log(props);
  return (
    <div className={styles.main}>
      <section>
        <BurgerIngredients ingredients={data}>
        </BurgerIngredients>
      </section>
      <section>
        <BurgerConstructor ingredients={data}>
        </BurgerConstructor>
      </section>
    </div>

  )
}

export default Main;