import PropTypes from 'prop-types';
import Styles from './order-details.module.css';
import imageDone from './../../images/done.png';

function OrderDetails(props) {
  return (
    <div className={Styles.order_details}>
      <p className='text text_type_digits-large pb-8'>{props.orderNumber.toString().padStart(6, '0')}</p>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      <img className='pb-15' src={imageDone}/>
      <p className='text text_type_main-small pb-2'> Ваш заказ начали готовить</p>
      <p className='text text_type_main-small text_color_inactive'> Дождитесь готовности на орбитальной станции</p>
    </div>    
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;