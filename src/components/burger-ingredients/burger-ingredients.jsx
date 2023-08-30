import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import cratorPan  from './../../images/name=Краторная булка N-200inormal.png';
import fluoPan  from './../../images/name=Флюоресцентная булка R2-D3normal.png';

export default function BurgerIngredients() {
  return (
    <>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        <Tab>
        </Tab>
      </section>
      <section className={styles.pans}>
        <h2 className={styles.subtitle}>Булки</h2>
        <div className={styles.layout} >
          <BurgerContent name='Краторная булка N-200i' price='20' quantity='0'> 
            <img src={cratorPan} alt='Краторная булка N-200i'/>
          </BurgerContent>          
          <BurgerContent name='Флуоресцентная булка R2-D3' price='20' quantity='0'> 
            <img src={fluoPan} alt='Флуоресцентная булка R2-D3' />
          </BurgerContent>          
        </div>
      </section>
      
    </>
    )
}