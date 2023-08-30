import styles from './main.module.css';
import { BurgerIngredients } from './../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './../burger-constructor/burger-constructor';

export default function Main() {
  return (
    <div className={styles.main}>
      <section className={styles.main_first}>
        <BurgerIngredients>

        </BurgerIngredients>
      </section>

      <section>
        <BurgerConstructor>

        </BurgerConstructor>
      </section>
    </div>
  )
}