import styles from './main.module.css';
import { BurgerIngredients } from './../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './../burger-constructor/burger-constructor';
/*import { data } from './../../utils/data';*/

export const bunsName = ['bun', 'Булки'];
export const saucesName = ['sauce', 'Соусы'];
export const mainsName = ['main', 'Начинки'];

function Main(props) {
  /*console.log(props.ingredients);*/
  return (
    <div className={styles.main}>
      <section>
        <BurgerIngredients props={props.ingredients}>
        </BurgerIngredients>

      </section>

      <section>
        <BurgerConstructor props={props.ingredients}>
        </BurgerConstructor>
      </section>
    </div>

  )
}

export default Main;