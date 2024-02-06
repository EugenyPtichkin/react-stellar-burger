import Styles from './info.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { translate } from '../../utils/data';
import { getSingleOrder, SET_ORDER_SUCCESS } from '../../services/actions/singleOrder';
import { WS_USER_CONNECTION_STOP } from '../../services/actions/wsUserActionTypes';
import { WS_FEED_CONNECTION_STOP } from '../../services/actions/wsFeedActionTypes';
import { wsUrl } from '../../utils/data';
import { wsUserConnectAction } from '../../services/actions/wsUserActions';
import { wsFeedConnectAction } from '../../services/actions/wsFeedActions';
import { refreshToken } from '../../utils/burger-api';
import { IIsModal, TIngredient, TIngredientPairs } from '../../services/types/data';

export const InfoPage = ( {isModal}: IIsModal ) => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { order } = useSelector(store => store.singleOrder);
  const dispatch = useDispatch();
  const { number } = useParams();//текущий номер заказа из адреса страницы в текстовом виде
  console.log(`number= ${number}`);
  const location = useLocation();

  useEffect(() => {
    if (!isModal) { //если открыто модальное окно, то не открывать соединение webSocket повторно
      if (location.pathname.includes('/feed')) { //переход со страницы /feed - запустить websocket feed
        console.log('WebSocket FEED connection to be established');
        dispatch(wsFeedConnectAction(`${wsUrl}/orders/all`));
      }
      else { //переход со страницы /orders - запустить websocket order
        console.log('WebSocket USER connection to be established');
        dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken")?.replace('Bearer ', '')}`)));
      }
    }
    if (!isModal) { //если открыто модальное окно, то не закрывать соединение webSocket
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
  }, [location, isModal, dispatch]);

  const wsFeed = useSelector(store => store.wsFeed);
  const messagesFeed = wsFeed.messages;
  const wsConnectedFeed = wsFeed.wsConnected;
  //console.log(wsConnectedFeed);

  const wsUser = useSelector(store => store.wsUser);
  const messagesUser = wsUser.messages;
  const wsConnectedUser = wsUser.wsConnected;
  //console.log(wsConnectedUser);

  const messages = useMemo(() => {
    return (wsConnectedFeed ? messagesFeed : wsConnectedUser ? messagesUser : []);
  }, [wsConnectedFeed, wsConnectedUser, messagesFeed, messagesUser]
  );

  console.log(messages);

  const last_orders_list = useMemo(() => {
    if (messages) { //отображать страницу только если есть списки заказов
      return (messages[messages.length - 1]);
    }
  }, [messages]
  );

  useEffect(() => {
    if (last_orders_list && last_orders_list.message === 'Invalid or missing token') {
      dispatch(refreshToken); //обновить токен и перезапросить подключение по webSocket
      dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken")?.replace('Bearer ', '')}`)));
    }
  }, [last_orders_list, dispatch]
  );

  /*const last_orders_list = {};
  if (messages) { //отображать страницу только если есть списки заказов
    last_orders_list = messages[messages.length - 1];
    //console.log(last_orders_list);
    if (last_orders_list && last_orders_list.message === 'Invalid or missing token') {
      dispatch(refreshToken); //обновить токен и перезапросить подключение по webSocket
      dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`)));
    }
  }*/

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
      const dataPrices: Array<number> = [];
      order.ingredients.forEach((order_ingredient) => {

        const currentIngredient: TIngredient | null = ingredients?.find(item => item._id === order_ingredient) || null;
        if (currentIngredient) { //если с сервера пришел известный ингредиент или не-null
          const currentPrice: number = currentIngredient.price;
          dataPrices.push(...[currentPrice]);
        }
      })

      //список id ингредиентов с их количеством в заказе
      const ingredientsPairs: Array<TIngredientPairs> = [];
      ingredients?.forEach((ingredient) => {
        const orderQuantity: number = order.ingredients.filter(item => item === ingredient._id).length;
        if (orderQuantity !== 0) {
          ingredientsPairs.push({ ingredient_id: ingredient._id, quantity: orderQuantity });
        }
      })

      //отобразить одну строчку ингредиентов из заказа
      const DisplayIngredient = ({ingredient_id, quantity}:{ingredient_id:string, quantity:number}) => {
        const currentIngredient = ingredients?.find(item => item._id === ingredient_id);
        if (currentIngredient) { //если с сервера пришел известный ингредиент или не-null
          const ingredientImage: string = currentIngredient.image_mobile;
          const ingredientName: string = currentIngredient.name;
          const ingredientPrice: number = currentIngredient.price;
          const ingredientNumber: number = quantity;
          //console.log(`Image: ${ingredientImage} Price: ${ingredientPrice} Number: ${ingredientNumber}`);

          return (
            <div className={Styles.ingredient}>
              <div className={Styles.image_name}>
                <div className={Styles.image_circle}   >
                  <img className={Styles.image} src={ingredientImage} alt='компонент бургера' />
                </div>
                <p className={Styles.ingredient} >{ingredientName}</p>
              </div>
              <div className={Styles.price}>
                <p className={Styles.digit}>{ingredientNumber} x {ingredientPrice}</p>
                <CurrencyIcon type='primary'/>
              </div>
            </div>
          )
        }
        else { return null; }
      }

      return (
        <section className={isModal ? `${Styles.container} ${Styles.modal}` : Styles.container}>
          <div className={Styles.details}>
            <p className={isModal ? `${Styles.number} ${Styles.number_modal}` : Styles.number}>#{order.number}</p>
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
                  <DisplayIngredient ingredient_id={item.ingredient_id} quantity={item.quantity} key={index} />
                )}
              </ul>
            </div>
            <div className={Styles.time_price}>
              <div className={Styles.time}>
                <FormattedDate date={new Date(order.createdAt)} />
              </div>
              <div className={Styles.price}>
                <p className={Styles.digit}>{dataPrices.reduce((acc, current) => acc + current, 0)}</p>
                <CurrencyIcon type='primary'/>
              </div>
            </div>
          </div>
        </section>
      );
    } else { return null; }
  }
  else { return null; }
}