import Styles from './info.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { order_data } from './../../utils/data';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';


export function InfoPage() {
  //  const order = useSelector(store => store.order.order);
  const { ingredients } = useSelector(store => store.ingredients);
  const order = order_data[0];
  console.log(order);
  const { id } = useParams();
  console.log(id);

  if (!order) {
    return null;
  }
  const orderItem = order.orders.find(item => item.number === id);
  console.log(orderItem);

  const translate = (item) => {
    if (item === 'done') return ('Выполнен');
    if (item === 'canceled') return ('Отменен');
    if (item === 'inprogress') return ('Готовится');
  }
  
  const dataPrices = [];
  const currentOrder = order.orders[0];
  //console.log(currentOrder);
  currentOrder.ingredients.forEach((ingredient_id) => {
    const currentIngredient = ingredients.find(item => item._id === ingredient_id);
    const currentPrice = currentIngredient.price;
    //console.log(`Price: ${currentPrice}`);
    dataPrices.push(...[currentPrice]);
  })     

  const DisplayIngredient = (ingredient) => {
    const currentIngredient = ingredients.find(item => item._id === ingredient.ingredient);
    //console.log(currentIngredient);
    const ingredientImage = currentIngredient.image_mobile;
    const ingredientName = currentIngredient.name;
    const ingredientPrice = currentIngredient.price;
    const ingredientNumber = (ingredients.filter(item => item._id === ingredient.ingredient)).length;
    //console.log(`Image: ${ingredientImage} Price: ${ingredientPrice} Number: ${ingredientNumber}`);

    return (
      <div className={Styles.ingredient}>
        <div className={Styles.image_name}>
          <div className={Styles.image_circle}>
            <img className={Styles.image} src={ingredientImage} alt='компонент бургера' />
          </div>
          <p className={Styles.name} >{ingredientName}</p>
        </div>
        <div className={Styles.price}>
          <p className={Styles.digit}>{ingredientNumber} x {ingredientPrice}</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
      </div>
    )
  }

  return (
    <section className={Styles.container}>
      <div className={Styles.details}>
        <p className={Styles.number}>#{orderItem.number}</p>
        <div className={Styles.info}>
          <p className={Styles.id}>{orderItem._id}</p>
          <p className={Styles.status}>{translate(orderItem.status)}</p>
        </div>
        <p className={Styles.text}>Состав:</p>
        <div className={Styles.scrollbar}>
          <ul className={Styles.orders} id="ingredient_items" > {
            orderItem.ingredients.map((item, index) =>
              <DisplayIngredient ingredient={item} key={index} />
            )}
          </ul>
        </div>
        <div className={Styles.time_price}>
          <div className={Styles.time}>
            <FormattedDate date={new Date(orderItem.createdAt)} />
          </div>
          <div className={Styles.price}>
            <p className={Styles.digit}>{dataPrices.reduce((acc, current) => acc + current, 0)}</p>
            <CurrencyIcon></CurrencyIcon>
          </div>
        </div>
      </div>
    </section>
  );
}