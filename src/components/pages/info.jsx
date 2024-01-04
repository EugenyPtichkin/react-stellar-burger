import Styles from './info.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { order_data } from './../../utils/data';

export function InfoPage() {
  //  const order = useSelector(store => store.order.order);
  const order = order_data[1];
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

  const DisplayIngredient = (data) => {
    const image = '';
    return (
      <div className={Styles.ingredient}>
        <div className={Styles.image_circle}>
          <img className={Styles.image} src={image} alt='компонент бургера' />
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
              <DisplayIngredient data={item} key={index} />
            )}
          </ul>
        </div>

      </div>
    </section>
  );
}