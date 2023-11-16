import Styles from './order-details.module.css';
import imageDone from './../../images/done.png';
import loader from './../../images/loader.gif';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { orderNumber, orderRequest} = useSelector(store => store.order);
  return (
    <div className={Styles.order_details}>

      {!orderRequest && <p className='text text_type_digits-large pb-8'> {orderNumber.toString().padStart(6, '0')} </p>}
      {!orderRequest && <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>}
      {orderRequest ?
        <img className='pb-15' src={loader} alt={'Загружается...'} /> :
        <img className='pb-15' src={imageDone} alt={'Загружено'} />
      }
      {!orderRequest && <p className='text text_type_main-small pb-2'> Ваш заказ начали готовить</p>}
      {!orderRequest && <p className='text text_type_main-small text_color_inactive'> Дождитесь готовности на орбитальной станции</p> }      
    </div >
  );
}

export default OrderDetails;