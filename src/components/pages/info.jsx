import Styles from './info.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { order_data } from './../../utils/data';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { translate, colorCalc } from './../../utils/data';

export function InfoPage(props) {
  const { ingredients } = useSelector(store => store.ingredients);
//const { current_order } = useSelector(store => store.order.order);    
  const current_order = order_data[0];//жестко только первый номер заказа (пока)
  console.log(current_order);
  const { number } = useParams();//текущий номер заказа из адреса страницы
  console.log(number);

  if (!current_order) {
    return null;
  }
  const orderItem = current_order.orders.find(item => item.number === number);
  console.log(orderItem);

  //список цен для вычисления суммы заказа
  const dataPrices = [];
  orderItem.ingredients.forEach((ingredient_id) => {
    const currentIngredient = ingredients.find(item => item._id === ingredient_id);
    const currentPrice = currentIngredient.price;
    dataPrices.push(...[currentPrice]);
  })

  //список id ингредиентов с их количеством в заказе
  const ingredientsPairs = [];
  ingredients.forEach((ingredient) => {
    const orderQuantity = orderItem.ingredients.filter(item => item === ingredient._id).length;
    if (orderQuantity !== 0) {
      ingredientsPairs.push({ ingredient: ingredient._id, quantity: orderQuantity });
    }
  })
  //console.log(ingredientsPairs);

  //отобразить одну строчку ингредиентов из заказа
  const DisplayIngredient = (ingredient) => {
    const currentIngredient = ingredients.find(item => item._id === ingredient.ingredient.ingredient);
    const ingredientImage = currentIngredient.image_mobile;
    const ingredientName = currentIngredient.name;
    const ingredientPrice = currentIngredient.price;
    const ingredientNumber = ingredient.ingredient.quantity;
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
    <section className={props.isModal ? `${Styles.container} ${Styles.modal}` : Styles.container}>
      <div className={Styles.details}>
        <p className={Styles.number}>#{orderItem.number}</p>
        <div className={Styles.info}>
          <p className={Styles.id}>{orderItem._id}</p>
          <p className={`${Styles.status} ${colorCalc(orderItem.status)}`}>{translate(orderItem.status)}</p>
        </div>
        <p className={Styles.text}>Состав:</p>
        <div className={Styles.scrollbar}>
          <ul className={Styles.orders} id="ingredient_items" > {
            ingredientsPairs.map((item, index) =>
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