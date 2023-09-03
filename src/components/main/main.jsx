import styles from './main.module.css';
import { BurgerIngredients } from './../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

export const bunsName = ['bun', 'Булки'];
export const saucesName = ['sauce', 'Соусы'];
export const mainsName = ['main', 'Начинки'];

function Main() {
  return (
    <div className={styles.main}>
      <section>
        <BurgerIngredients props={data}>
        </BurgerIngredients>
        
      </section>

      <section>
        <BurgerConstructor props={data}>
        </BurgerConstructor>
      </section>
    </div>
  )
}

export default Main;