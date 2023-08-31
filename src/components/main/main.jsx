import styles from './main.module.css';
import { BurgerIngredients } from './../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './../burger-constructor/burger-constructor';

function Main() {
  return (
    <div className={styles.main}>
      <section>
        <BurgerIngredients>
        </BurgerIngredients>
        
      </section>

      <section>
        <BurgerIngredients>
        </BurgerIngredients>
      </section>
    </div>
  )
}

export default Main;