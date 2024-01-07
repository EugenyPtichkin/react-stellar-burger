import Styles from './info.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { translate, colorCalc } from './../../utils/data';
import { getOrderIngredientsData } from '../../services/actions/ingredients';
import { UnderConstructionPage } from './under-construction';

export function InfoPage(props) {
  const { ingredients } = useSelector(store => store.ingredients);
  const wsFeed = useSelector(store => store.wsFeed);
  const messagesFeed = wsFeed.messages;
  const wsConnectedFeed = wsFeed.wsConnected;
  console.log(wsConnectedFeed);

  const wsUser = useSelector(store => store.wsUser);
  const messagesUser = wsUser.messages;
  const wsConnectedUser = wsUser.wsConnected;
  console.log(wsConnectedUser);

  const messages = (wsConnectedFeed ? messagesFeed : wsConnectedUser ? messagesUser : []);
  const wsConnected = wsConnectedFeed || wsConnectedUser;
  console.log(messages);

  const { number } = useParams();//текущий номер заказа из адреса страницы в текстовом виде
  //console.log(number);

  const dispatch = useDispatch();
  //dispatch(getOrderIngredientsData(number)); //заранее считать параметры заказа

  let current_order = {};
  if (messages) { //отображать страницу только если есть списки заказов
    current_order = messages[messages.length - 1];
    //console.log(`#${messages.length}`);
    //console.log(current_order);

    if (current_order) {//отображать страницу только если получен текущий заказ по webSocket
      const orderItem = current_order.orders.find(item => item.number === Number(number));
      console.log(orderItem);
      if (!orderItem) { //если в последних 50 заказах по webSocket такого нет, то запросить по https:// но здесь (под условием) уже нельзя!
        console.log('Не найден заказ!');
        /*dispatch(getOrderIngredientsData(number)); */
        return (
          <UnderConstructionPage />
        );
      }
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
              <p className={Styles.ingredient} >{ingredientName}</p>
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
            <p className={props.isModal ? `${Styles.number} ${Styles.number_modal}` : Styles.number}>#{orderItem.number}</p>
            <div className={Styles.info}>
              <p className={Styles.name}>{orderItem.name}</p>
              <p className={colorCalc(orderItem.status)==='cyan'? `${Styles.status} ${Styles.cyan}`:
                            colorCalc(orderItem.status)==='blue'? `${Styles.status} ${Styles.blue}`:
                            colorCalc(orderItem.status)==='red'? `${Styles.status} ${Styles.red}`:
                            Styles.status}>{translate(orderItem.status)}</p>
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
    } else { return null; }
  }
  else { return null; }
}