import Styles from './feed.module.css';
import { data, ready, in_progress } from './../../utils/data';

export const FeedPage = () => {

  return (
    <>
      <p className={Styles.title}>Лента заказов</p>
      <div className={Styles.content}>
        <secton className={Styles.orders}>
        </secton>
        <secton className={Styles.stats}>
          <div className={Styles.orders_numbers}>
            <p className={Styles.text}>Готовы:</p>
            <p className={Styles.text}>В работе:</p>
            <div className={Styles.done}>
              {ready[0]}
              {ready[1]}
{/*              {ready[2]}
              {ready[3]}
              {ready[4]} */}
            </div>
            <div className={Styles.in_progress}>
              {in_progress[0]}
              {in_progress[1]}
              {in_progress[2]}
            </div>
          </div>
        </secton>
      </div>
    </>
  )
};