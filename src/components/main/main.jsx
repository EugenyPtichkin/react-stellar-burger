import styles from './main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

function Main(props) {
  console.log(props);
  return (
    <div className={styles.main}>
      <section>
        {!props.isLoading && 
          <BurgerIngredients ingredients={props.ingredients}>
          </BurgerIngredients>
        }
      </section>

      <section>
        {!props.isLoading &&
          <BurgerConstructor ingredients={props.ingredients}>
          </BurgerConstructor>
        }
      </section>
    </div>

  )
}

export default Main;