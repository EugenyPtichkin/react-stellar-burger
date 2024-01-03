import Styles from './feed.module.css';
import { order_data, completed, in_progress, all_time, today } from './../../utils/data';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector } from 'react-redux';

const maxListNum = 10;
export const FeedPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);

  const DisplayCard = (data) => {
    const data_ids = data.data.orders[0].ingredients;
    //console.log(data_ids);
    const dataImages = [];
    const dataPrices = [];
    data_ids.forEach((ingredient_id) => {
      //console.log(ingredient_id);
      const currentIngredient = ingredients.find(item => item._id === ingredient_id);
      //console.log(currentIngredient);
      const currentImage = currentIngredient.image_mobile;
      const currentPrice = currentIngredient.price;
      //console.log(`Image: ${currentImage} Price: ${currentPrice}`);
      dataImages.push(...[currentImage]);
      dataPrices.push(...[currentPrice]);
    })
    console.log(`Images: ${dataImages} Prices: ${dataPrices}`);
    return (
      <div className={Styles.order_card}>
        <div className={Styles.details}>
          <p className={Styles.digit}>{data.data.orders[0].number}</p>
          <div className={Styles.time}>
            <FormattedDate date={new Date(data.data.orders[0].createdAt)} />
          </div>
        </div>
        <p className={Styles.info}>{data.data.orders[0]._id}</p>
        <div className={Styles.components}>
          <div className={Styles.ingredients}>
            <div className={Styles.images}>
              {dataImages.map((image, index) => {
                if (index < 5) return (
                  <div key={index}  >
                    <img className={`${Styles.image} ${Styles.image_circle}`} src={image} alt='компонент бургера' />
                  </div>
                )
                if (index === 5) return (
                <div key={index} className={Styles.last_circle} >
                    <img className={`${Styles.image} ${Styles.image_circle} ${Styles.image_last}`} src={image} alt='компонент бургера' />
                    <p className={Styles.text_last}>+{dataImages.length - 5}</p>
                  </div>
                )
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
            {
              order_data.map((item, index) => <DisplayCard data={item} key={index} />)
            }
          </ul>
        </div>
        <section className={Styles.stats}>
          <div className={Styles.orders_numbers}>
            <p className={Styles.text}>Готовы:</p>
            <p className={Styles.text}>В работе:</p>
            {completed.length <= maxListNum &&
              <div className={Styles.list}>
                {completed.map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)} </div>)}
              </div>
            }
            {completed.length > maxListNum &&
              <div className={Styles.list}>
                {completed.slice(-maxListNum).map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
              </div>
            }
            {in_progress.length <= maxListNum &&
              <div className={`${Styles.list} ${Styles.in_progress}`}>
                {in_progress.map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
              </div>
            }
            {in_progress.length > maxListNum &&
              <div className={`${Styles.list} ${Styles.in_progress}`}>
                {in_progress.slice(-maxListNum).map((item, index) => <div key={index}>{("0".repeat(6) + item).slice(-6)}</div>)}
              </div>
            }
          </div>
          <div>
            <p className={Styles.text}>Выполнено за все время:</p>
            <p className={Styles.digits}>{all_time}</p>
          </div>
          <div>
            <p className={Styles.text}>Выполнено за сегодня:</p>
            <p className={Styles.digits}>{today}</p>
          </div>
        </section>
      </div>
    </>
  )
};