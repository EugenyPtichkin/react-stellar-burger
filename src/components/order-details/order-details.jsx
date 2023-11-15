import Styles from './order-details.module.css';
import imageDone from './../../images/done.png';
import imageAlmostDone from './../../images/done.svg';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { orderNumber, orderRequest } = useSelector(store => store.order);
  return (
    <div className={Styles.order_details}>

      <p className='text text_type_digits-large pb-8'>
        {orderRequest ? '000000' : orderNumber.toString().padStart(6, '0')} </p>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      {orderRequest ?
        <img className='pb-15' src={imageAlmostDone} /> :
        <img className='pb-15' src={imageDone} />
      }
      <p className='text text_type_main-small pb-2'> Ваш заказ начали готовить</p>
      <p className='text text_type_main-small text_color_inactive'> Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;