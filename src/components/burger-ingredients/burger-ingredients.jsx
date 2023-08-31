import React from 'react';
import styles from './burger-ingredients.module.css';
import { data } from './../../utils/data';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContent } from './burger-content/burger-content';
import { ScrollBar } from './../scrollbar/scrollbar';
/*import { CustomScroll} from '@ya.praktikum/react-developer-burger-ui-components';*/

const bunsName = ['bun', 'Булки'];
const saucesName = ['sauce', 'Соусы'];
const mainsName = ['main', 'Начинки'];

function ShowTab() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent} >
        {bunsName[1]}
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        {saucesName[1]}
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        {mainsName[1]}
      </Tab>
    </div>
  )
}

function DisplayItem({dataItem, quantity}) {
  return (
    <div>
      {       
        <BurgerContent key={dataItem._id} name={dataItem.name} price={dataItem.price} quantity={quantity}>
          <img src={dataItem.image} alt={dataItem.name} />
        </BurgerContent>        
      } 
    </div>
    
  );
};

export class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data };
  }
  render() {    
    return (
      <>
        <h1 className={styles.title}>Соберите бургер</h1>
        <section className={styles.tab}>
          <ShowTab />
        </section>
        <section className={styles.item}>
          <ScrollBar/>          
          <section>
            <h2 className={styles.subtitle}>{bunsName[1]}</h2>
            <div className={styles.layout}> 
              {data.map( (dataItem) => ( (dataItem.type === bunsName[0]) &&
                <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v}/>
                ))
              }
            </div>
          </section>

          <section>
            <h2 className={styles.subtitle}>{saucesName[1]}</h2>
            <div className={styles.layout}> 
              {data.map( (dataItem) => ( (dataItem.type === saucesName[0]) &&
                <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v}/>
                ))
              }
            </div>
          </section>

          <section>
            <h2 className={styles.subtitle}>{mainsName[1]}</h2>
            <div className={styles.layout}> 
              {data.map( (dataItem) => ( (dataItem.type === mainsName[0]) &&
                <DisplayItem dataItem={dataItem} key={dataItem._id} quantity={dataItem.__v}/>
                ))
              }
            </div>
          </section>

        </section>
      </>
    );
  };
}
