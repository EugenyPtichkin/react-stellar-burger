import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContent } from './burger-content/burger-content';
import { ScrollBar } from './../scrollbar/scrollbar';

import cratorPan from './../../images/name=Краторная булка N-200inormal.png';
import fluoriscentPan  from './../../images/name=Флюоресцентная булка R2-D3normal.png';
import spicyXSause from './../../images/name=Соус Spicy-Xnormal.png';
import spaceSause from './../../images/name=Соус фирменный Space Saucenormal.png';
import traditionalSause from './../../images/name=Соус традиционный галактическийnormal.png';
import spikesXSause from './../../images/name=Соус с шипами Антарианского плоскоходцаnormal.png';
import fillet from './../../images/name=Филе Люминесцентного тетраодонтимформаnormal.png';
import meat from './../../images/name=Мясо бессмертных моллюсков Protostomianormal.png';
import roastBeef from './../../images/name=Говяжий метеорит (отбивная)normal.png';
import bioCutlet from './../../images/name=Биокотлета из марсианской Магнолииnormal.png';
import fallenianFruits from './../../images/name=Плоды фалленианского дереваnormal.png';
import sugarCrystals from './../../images/name=Кристаллы марсианских альфа-сахаридовnormal.png';
import cryspyRings from './../../images/name=Хрустящие минеральные кольцаnormal.png';
import miniSalad from './../../images/name=Мини-салат Экзо-Плантагоnormal.png';
import mouldCheese from './../../images/name=Сыр с астероидной плесеньюnormal.png';

const pansName='Булки';
const sausesName='Соусы';
const contentsName='Начинки';
const cratorPanName='Краторная булка N-200';
const fluoriscentPanName='Флюоресцентная булка R2-D3';
const spicyXSauseName='Соус Spicy-X';
const spaceSauseName='Соус фирменный Space Sauce';
const traditionalSauseName='Соус традиционный галактический';
const spikesXSauseName='Соус с шипами Антарианского плоскоходца';
const filletName='Филе Люминесцентного тетраодонтимформа';
const meatName='Мясо бессмертных моллюсков Protostomia';
const roastBeefName='Говяжий метеорит (отбивная)';
const bioCutletName='Биокотлета из марсианской Магнолии';
const fallenianFruitsName='Плоды фалленианского дерева';
const sugarCrystalsName='Кристаллы марсианских альфа-сахаридов';
const cryspyRingsName='Хрустящие минеральные кольца';
const miniSaladName='Мини-салат Экзо-Плантаго';
const mouldCheeseName='Сыр с астероидной плесенью';

function ShowTab() {
/*const [current, setCurrent] = React.useState('one')*/
const current = 'one';
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} /*onClick={setCurrent}*/ >
        {pansName}
      </Tab>
      <Tab value="two" active={current === 'two'} /*onClick={setCurrent}*/>
        {sausesName}
      </Tab>
      <Tab value="three" active={current === 'three'} /*onClick={setCurrent}*/>
        {contentsName}
      </Tab>
    </div>
  )
} 
export function BurgerIngredients() {
  return (
    <>
      <h1 className={styles.title}>Соберите бургер</h1>
      
      <section className={styles.tab}>
        <ShowTab></ShowTab>
      </section>

      <section className={styles.item}>
        <ScrollBar/>

        <section>
          <h2 className={styles.subtitle}>{pansName}</h2>
          <div className={styles.layout} >
            <BurgerContent name={cratorPanName} price={20} quantity={1}> 
              <img src={cratorPan} alt={cratorPanName}/>
            </BurgerContent>          
            <BurgerContent name={fluoriscentPanName} price={20} quantity={0}> 
              <img src={fluoriscentPan} alt={fluoriscentPanName}/>
            </BurgerContent>  
          </div>
        </section>
      
      <section>
        <h2 className={styles.subtitle}>{sausesName}</h2>
        <div className={styles.layout} >
          <BurgerContent name={spicyXSauseName} price={30} quantity={0}> 
            <img src={spicyXSause} alt={spicyXSauseName}/>
          </BurgerContent>          
          <BurgerContent name={spaceSauseName} price={30} quantity={0}> 
            <img src={spaceSause} alt={spaceSauseName}/>
          </BurgerContent>  
          <BurgerContent name={traditionalSauseName} price={30} quantity={1}> 
            <img src={traditionalSause} alt={traditionalSauseName}/>
          </BurgerContent>          
          <BurgerContent name={spikesXSauseName} price={30} quantity={0}> 
            <img src={spikesXSause} alt={spikesXSauseName}/>
          </BurgerContent>  
        </div>
      </section>

      <section>
        <h2 className={styles.subtitle}>{contentsName}</h2>
        <div className={styles.layout} >
          <BurgerContent name={filletName} price={300} quantity={0}> 
            <img src={fillet} alt={filletName}/>
          </BurgerContent>          
          <BurgerContent name={meatName} price={300} quantity={0}> 
            <img src={meat} alt={meatName}/>
          </BurgerContent>  
          <BurgerContent name={roastBeefName} price={300} quantity={0}> 
            <img src={roastBeef} alt={roastBeefName}/>
          </BurgerContent>          
          <BurgerContent name={bioCutletName} price={300} quantity={0}> 
            <img src={bioCutlet} alt={bioCutletName}/>
          </BurgerContent>  

          <BurgerContent name={fallenianFruitsName} price={80} quantity={0}> 
            <img src={fallenianFruits} alt={fallenianFruitsName}/>
          </BurgerContent>          
          <BurgerContent name={sugarCrystalsName} price={80} quantity={0}> 
            <img src={sugarCrystals} alt={sugarCrystalsName}/>
          </BurgerContent>  
          <BurgerContent name={cryspyRingsName} price={80} quantity={0}> 
            <img src={cryspyRings} alt={cryspyRingsName}/>
          </BurgerContent>          
          <BurgerContent name={miniSaladName} price={80} quantity={0}> 
            <img src={miniSalad} alt={miniSaladName}/>
          </BurgerContent>  
          <BurgerContent name={mouldCheeseName} price={80} quantity={0}> 
            <img src={mouldCheese} alt={mouldCheeseName}/>
          </BurgerContent>          
        </div>        
      </section>      
      </section>
    </>
    )
}