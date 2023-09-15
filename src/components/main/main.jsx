import styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data } from './../../utils/data';

const Main = (props) => {
  return (
    <div className={styles.main}>
      <section>
        <BurgerIngredients ingredients={props.ingredients}>
        </BurgerIngredients>
      </section>
      <section>
        <BurgerConstructor ingredients={data}> {/* {props.ingredients} */}
        </BurgerConstructor>
      </section>
    </div>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;
