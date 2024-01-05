import Styles from './feed.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const maxListNum = 10; //максимальное число отображаемых заказов в списках
export const FeedPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { messages, wsConnected } = useSelector(store => store.websocket);
  const location = useLocation();

  let last_order = {};
  let status_all, status_done, status_pending, status_canceled;
  if (wsConnected) {
    last_order = messages[messages.length - 1];
    console.log(`#${messages.length}`);
    console.log(last_order);
    
    if (last_order) {
      status_all = last_order.orders.map((item) => {
        return ({ number: item.number, status: item.status });
      }).reverse();
      status_done = last_order.orders.filter(item => (item.status === 'done')).map(item => item.number).reverse();
      status_pending = last_order.orders.filter(item => (item.status === 'pending')).map(item => item.number).reverse();
      status_canceled = last_order.orders.filter(item => (item.status === 'canceled')).map(item => item.number).reverse();
    }
  }

  const DisplayCard = (props) => {
    const current_order = props.data;
    //сформировать массивы картинок и цен из стора   
    const dataImages = [];
    const dataPrices = [];
    current_order.ingredients.forEach((ingredient_id) => {
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

  return (
    <>
      <p className={Styles.title}>Лента заказов</p>
      <div className={Styles.content}>
        <div className={Styles.scrollbar}>
          <ul className={Styles.orders} id="order_cards" >
            {(wsConnected && last_order) &&
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
                    {status_done.map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)} </div>)}
                  </div>
                }
                {status_done && status_done.length > maxListNum &&
                  <div className={Styles.list}>
                    {status_done.slice(-maxListNum).map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
                  </div>
                }
                {status_pending && status_pending.length <= maxListNum &&
                  <div className={`${Styles.list} ${Styles.pending}`}>
                    {status_pending.map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
                  </div>
                }
                {status_pending && status_pending.length > maxListNum &&
                  <div className={`${Styles.list} ${Styles.pending}`}>
                    {status_pending.slice(-maxListNum).map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
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
};