import Styles from './info.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { translate } from './../../utils/data';
import { getSingleOrder, SET_ORDER_SUCCESS } from '../../services/actions/singleOrder';
import { WS_USER_CONNECTION_STOP } from '../../services/actions/wsUserActionTypes';
import { WS_FEED_CONNECTION_STOP } from '../../services/actions/wsFeedActionTypes';
import { wsUrl } from '../../utils/data';
import { wsUserConnectAction } from '../../services/actions/wsUserActions';
import { wsFeedConnectAction } from '../../services/actions/wsFeedActions';
import { refreshToken } from '../../utils/burger-api';

export function InfoPage(props) {
  const { ingredients } = useSelector(store => store.ingredients);
  const { order } = useSelector(store => store.singleOrder);
  const dispatch = useDispatch();
  const { number } = useParams();//текущий номер заказа из адреса страницы в текстовом виде
  console.log(`number= ${number}`);
  const location = useLocation();

  useEffect(() => {
    if (!props.isModal) { //если открыто модальное окно, то не открывать соединение webSocket повторно
      if (location.pathname.includes('/feed')) { //переход со страницы /feed - запустить websocket feed
        console.log('WebSocket FEED connection to be established');
        dispatch(wsFeedConnectAction(`${wsUrl}/orders/all`));
      }
      else { //переход со страницы /orders - запустить websocket order
        console.log('WebSocket USER connection to be established');
        dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`)));
      }
    }
    if (!props.isModal) { //если открыто модальное окно, то не закрывать соединение webSocket
      if (location.pathname.includes('/feed')) { //выход со страницы feed
        return () => {
          console.log('WebSocket FEED connection to be closed');
          dispatch({ type: WS_FEED_CONNECTION_STOP });
        }
      } else { //выход со страницы order
        return () => {
          console.log('WebSocket USER connection to be closed');
          dispatch({ type: WS_USER_CONNECTION_STOP });
        };
      }
    }
  }, [location, props.isModal, dispatch]);

  const wsFeed = useSelector(store => store.wsFeed);
  const messagesFeed = wsFeed.messages;
  const wsConnectedFeed = wsFeed.wsConnected;
  //console.log(wsConnectedFeed);

  const wsUser = useSelector(store => store.wsUser);
  const messagesUser = wsUser.messages;
  const wsConnectedUser = wsUser.wsConnected;
  //console.log(wsConnectedUser);

  const messages = (wsConnectedFeed ? messagesFeed : wsConnectedUser ? messagesUser : []);
  console.log(messages);

  let last_orders_list = {};
  if (messages) { //отображать страницу только если есть списки заказов
    last_orders_list = messages[messages.length - 1];
    //console.log(last_orders_list);
    if (last_orders_list && last_orders_list.message === 'Invalid or missing token') {
      dispatch(refreshToken); //обновить токен и перезапросить подключение по webSocket
      dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`)));
    }
  }

  useEffect(() => {
    if (last_orders_list) {
      const orderItem = last_orders_list.orders.find(item => item.number === Number(number));
      if (orderItem) {
        dispatch({ //обновить стор заказом с выбранным номером
          type: SET_ORDER_SUCCESS,
          payload: orderItem
        })
      } else {//если в последних 50 заказах по webSocket такого нет, то запросить по https:// 
        dispatch(getSingleOrder(Number(number)));
      }
    }
  }, [dispatch, number, last_orders_list]);

  console.log(order);

  if (messages) { //отображать страницу только если есть списки заказов
    if (order) {//отображать страницу только если получен текущий заказ по webSocket

      //список цен для вычисления суммы заказа
      const dataPrices = [];
      order.ingredients.forEach((ingredient_id) => {
        const currentIngredient = ingredients.find(item => item._id === ingredient_id);
        const currentPrice = currentIngredient.price;
        dataPrices.push(...[currentPrice]);
      })

      //список id ингредиентов с их количеством в заказе
      const ingredientsPairs = [];
      ingredients.forEach((ingredient) => {
        const orderQuantity = order.ingredients.filter(item => item === ingredient._id).length;
        if (orderQuantity !== 0) {
          ingredientsPairs.push({ ingredient: ingredient._id, quantity: orderQuantity });
        }
      })

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
            <p className={props.isModal ? `${Styles.number} ${Styles.number_modal}` : Styles.number}>#{order.number}</p>
            <div className={Styles.info}>
              <p className={Styles.name}>{order.name}</p>
              <p className={order.status === 'done' ? `${Styles.status} ${Styles.cyan}` :
                order.status === 'created' ? `${Styles.status} ${Styles.blue}` :
                order.status === 'canceled' ? `${Styles.status} ${Styles.red}` :
                    Styles.status}>{translate(order.status)}</p>
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
                <FormattedDate date={new Date(order.createdAt)} />
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