import styles from './burger-content.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

export default function BurgerContent(props) {
  return (
  <section className={styles.item}>
    <div className={styles.product_image} >
      {props.children}
    </div>
    <div className={styles.product_price}>
        {props.quantity}
        <BurgerIcon type="primary"></BurgerIcon>
    </div>
    <div className={styles.product_name}>
      <p> {props.name} </p>
    </div>
    <div className={styles.product_quantity}>
      {props.quantity}
    </div>
  </section>
  )
}

