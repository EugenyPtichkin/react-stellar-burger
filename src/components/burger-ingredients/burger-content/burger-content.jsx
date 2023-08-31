import styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

function CollapsableTextContent(props) {
  if (props.quantity === 0) {
    return null;
  }
  return <div className={styles.quantity}>
           <p className={styles.quantity_value}>
             {props.quantity}
           </p>  
          </div>
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