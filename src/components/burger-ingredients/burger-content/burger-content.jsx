import styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function CollapsableTextContent(props) {
  if (props.quantity === 0) {
    return null;
  }
  return < Counter count={props.quantity} size="default" extraClass='m-1'/>
          {/*<div className={styles.quantity}>           
            <p className={styles.quantity_value}>
             {props.quantity}
           </p>
         </div>*/}
}  

export function BurgerContent(props) {
  return (
  <section className={styles.item}>
    <div className={styles.image} >
      {props.children}
    </div>
    <div className={styles.price}>
      <div className={styles.price_value}>
        {props.price}      
      </div>
      <CurrencyIcon type="primary"></CurrencyIcon>
    </div>
    <p className={styles.name}>{props.name}</p>
    <CollapsableTextContent quantity={props.quantity} ></CollapsableTextContent> 
  </section>
  )
}