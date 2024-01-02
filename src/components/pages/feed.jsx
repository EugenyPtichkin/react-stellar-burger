import Styles from './feed.module.css';
import { completed, in_progress, all_time, today } from './../../utils/data';

const maxListNum = 10;
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
            {completed.length <= maxListNum && <div className={Styles.list}>
              {completed.map(item => <div>{("0".repeat(6) + item).slice(-6)}</div>)}
            </div>}
            {completed.length > maxListNum && <div className={Styles.list}>
              {completed.slice(-maxListNum).map(item => <div>{("0".repeat(6) + item).slice(-6)}</div>)}
            </div>}
            {in_progress.length <= maxListNum && <div className={`${Styles.list} ${Styles.in_progress}`}>
              {in_progress.map(item => <div>{("0".repeat(6) + item).slice(-6)}</div>)}
            </div>}
            {in_progress.length > maxListNum && <div className={`${Styles.list} ${Styles.in_progress}`}>
              {in_progress.slice(-maxListNum).map(item => <div>{("0".repeat(6) + item).slice(-6)}</div>)}
            </div>}
          </div>
          <div>
            <p className={Styles.text}>Выполнено за все время:</p>
            <p className={Styles.digits}>{all_time}</p>
          </div>
          <div>
            <p className={Styles.text}>Выполнено за сегодня:</p>
            <p className={Styles.digits}>{today}</p>
          </div>
        </secton>
      </div>
    </>
  )
};