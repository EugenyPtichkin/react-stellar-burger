import Styles from './orders.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { translate } from './../../utils/data';
import { WS_USER_CONNECTION_STOP } from '../../services/actions/wsUserActionTypes';
import { wsUserConnectAction } from '../../services/actions/wsUserActions';
import { wsUrl } from '../../utils/data';
import { refreshToken } from '../../utils/burger-api';

export const OrdersPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { wsConnected, messages } = useSelector(store => store.wsUser);
  const location = useLocation();
  const dispatch = useDispatch();

  //Открыть соединение по WS при переходе на страницу Orders
  useEffect(() => {
    if (!wsConnected) {
      console.log('WebSocket USER connection to be established');
      dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ','')}`)));
    }
    return () => {
      console.log('WebSocket USER connection to be closed');
      dispatch({ type: WS_USER_CONNECTION_STOP });
    };
    // eslint-disable-next-line
  }, []);

  let last_order_list = {};
  if (messages) {
    last_order_list = messages[messages.length - 1];
    //console.log(`#${messages.length}`);
    console.log(last_order_list);
    if (last_order_list && last_order_list.message.includes('Invalid or missing token')) {
      console.log(last_order_list.message);
      dispatch(refreshToken);
      dispatch(wsUserConnectAction((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ','')}`)));    
    }
  }

  const DisplayCard = (props) => {
    const current_order = props.data;
    const data_ids = current_order.ingredients;
    const dataImages = [];
    const dataPrices = [];
    data_ids.forEach((ingredient_id) => {
      const currentIngredient = ingredients.find(item => item._id === ingredient_id);
      const currentImage = currentIngredient.image_mobile;
      const currentPrice = currentIngredient.price;
      //console.log(`Image: ${currentImage} Price: ${currentPrice}`);
      dataImages.push(...[currentImage]);
      dataPrices.push(...[currentPrice]);
    })
    //console.log(`Images: ${dataImages} Prices: ${dataPrices}`);

    return (
      <div className={Styles.order_card}>
        <div className={Styles.details}>
          <p className={Styles.digit}>#{current_order.number}</p>
          <div className={Styles.time}>
            <FormattedDate date={new Date(current_order.createdAt)} />
          </div>
        </div>
        <div className={Styles.info}>
          <p className={Styles.name}>{current_order.name}</p>
          <p className={current_order.status === 'done' ? `${Styles.status} ${Styles.cyan}` :
            current_order.status === 'created' ? `${Styles.status} ${Styles.blue}` :
              current_order.status === 'canceled' ? `${Styles.status} ${Styles.red}` :
                Styles.status}>{translate(current_order.status)}</p>
        </div>
        <div className={Styles.components}>
          <div className={Styles.ingredients}>
            <div className={Styles.images}>
              {dataImages.map((image, index) => {
                if (index < 5) return (
                  <div key={index} className={Styles.image_circle}>
                    <img className={Styles.image} src={image} alt='компонент бургера' />
                  </div>
                )
                else if (index === 5) return (
                  <div key={index} className={Styles.image_circle} >
                    <img className={`${Styles.image} ${Styles.image_last}`} src={image} alt='компонент бургера' />
                    <p className={Styles.text_last}>+{dataImages.length - 5}</p>
                  </div>
                )
                else return (null);
              }
              )}
            </div>
          </div>
          <div className={Styles.price}>
            <p className={Styles.digit}>{dataPrices.reduce((acc, current) => acc + current, 0)}</p>
            <CurrencyIcon></CurrencyIcon>
          </div>
        </div>
      </div>
    )
  };

  if (messages && last_order_list) {
    return (
      <>
        <div className={Styles.content}>
          <div className={Styles.scrollbar}>
            <ul className={Styles.orders} id="order_cards" >
              {
                (last_order_list.orders).map((item, index) =>
                  <Link
                    key={index}
                    to={`/profile/orders/${item.number}`}
                    state={{ background: location }}
                    className={Styles.link}>
                    <DisplayCard data={item} />
                  </Link>
                )
              }
            </ul>
          </div>
        </div>
      </>
    )
  }
  else {
    return null;

  }
};