import Styles from './feed.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { WS_FEED_CONNECTION_STOP } from '../../services/actions/wsFeedActionTypes';
import { wsFeedConnectAction } from '../../services/actions/wsFeedActions';
import { wsUrl } from '../../utils/data';

const maxListNum = 20; //максимальное число отображаемых заказов в списках
export const FeedPage = () => {
  const { wsConnected, messages } = useSelector(store => store.wsFeed);
  const dispatch = useDispatch();

  //Открыть соединение по WS при переходе на страницу Feed
  useEffect(() => {
    if (!wsConnected) {
      console.log('WebSocket FEED connection to be established');
      dispatch(wsFeedConnectAction(`${wsUrl}/orders/all`));
    }
    return () => {
      console.log('WebSocket FEED connection to be closed');
      dispatch({ type: WS_FEED_CONNECTION_STOP });
    }
    // eslint-disable-next-line
  }, []);

  const { ingredients } = useSelector(store => store.ingredients);
  const location = useLocation();

  let last_order = {};
  let status_done, status_pending;
  if (messages) {
    last_order = messages[messages.length - 1];
    //console.log(`#${messages.length}`);
    //console.log(last_order);
    if (last_order) { //отрисовать списки заказов если существует информация о последнем списке заказов
      status_done = last_order.orders.filter(item => (item.status === 'done')).map(item => item.number).reverse();
      status_pending = last_order.orders.filter(item => (item.status === 'pending')).map(item => item.number).reverse();
    }
  }

  const zerofill = (number, digits) => {
    return ("0".repeat(digits) + number).slice(-digits);
  }

  const DisplayCard = (props) => {
    const current_order = props.data;
    //сформировать массивы картинок и цен из стора   
    const dataImages = [];
    const dataPrices = [];
    current_order.ingredients.forEach((ingredient_id) => {
      const currentIngredient = ingredients.find(item => item._id === ingredient_id);
      if (currentIngredient) { //если с сервера пришел известный ингредиент или не-null
        const currentImage = currentIngredient.image_mobile;
        const currentPrice = currentIngredient.price;
        //console.log(`Image: ${currentImage} Price: ${currentPrice}`);
        dataImages.push(...[currentImage]);
        dataPrices.push(...[currentPrice]);
      }
    })
    //console.log(`Images: ${dataImages} Prices: ${dataPrices}`);

    return (
      <div className={Styles.order_card}>
        <div className={Styles.details}>
          <p className={Styles.digit}>#{zerofill(current_order.number, 6)}</p>
          <div className={Styles.time}>
            <FormattedDate date={new Date(current_order.createdAt)} />
            <span> i-GMT+3</span>
          </div>
        </div>

        <p className={Styles.info} >{current_order.name}</p>

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

  if (last_order) { //отрисовать списки заказов если существует информация о последнем списке заказов
    return (
      <>
        <p className={Styles.title}>Лента заказов</p>
        <div className={Styles.content}>
          <div className={Styles.scrollbar}>
            <ul className={Styles.orders} id="order_cards" >
              {
                last_order.orders.map((item, index) =>
                  <Link
                    key={index}
                    to={`/feed/${item.number}`}
                    state={{ background: location }}
                    className={Styles.link}>
                    <DisplayCard data={item} />
                  </Link>
                )
              }
            </ul>
          </div>
          <section className={Styles.stats}>
            <div className={Styles.orders_numbers}>
              <p className={Styles.text}>Готовы:</p>
              <p className={Styles.text}>В работе:</p>
              {(wsConnected && last_order) &&
                <>
                  {status_done && status_done.length <= maxListNum &&
                    <div className={Styles.list}>
                      {status_done.map((item, index) => <div key={index}>{zerofill(item, 6)} </div>)}
                    </div>
                  }
                  {status_done && status_done.length > maxListNum &&
                    <div className={Styles.list}>
                      {status_done.slice(-maxListNum).map((item, index) => <div key={index}>{zerofill(item, 6)}</div>)}
                    </div>
                  }
                  {status_pending && status_pending.length <= maxListNum &&
                    <div className={`${Styles.list} ${Styles.pending}`}>
                      {status_pending.map((item, index) => <div key={index}>{zerofill(item, 6)}</div>)}
                    </div>
                  }
                  {status_pending && status_pending.length > maxListNum &&
                    <div className={`${Styles.list} ${Styles.pending}`}>
                      {status_pending.slice(-maxListNum).map((item, index) => <div key={index}>{zerofill(item, 6)}</div>)}
                    </div>
                  }
                </>
              }
            </div>
            <div>
              <p className={Styles.text}>Выполнено за все время:</p>
              <p className={Styles.digits}>{(wsConnected && last_order) ? last_order.total : 0}</p>
            </div>
            <div>
              <p className={Styles.text}>Выполнено за сегодня:</p>
              <p className={Styles.digits}>{(wsConnected && last_order) ? last_order.totalToday : 0}</p>
            </div>
          </section>
        </div>
      </>
    )
  } else {
    return null;
  }
};