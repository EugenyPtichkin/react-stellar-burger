import { Link, useNavigate } from 'react-router-dom';
import Styles from './not-found-page.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const NotFound404Page = () => {
  
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate('/', {replace: true});
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Такой страницы нет</p>
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={onClick} extraClass="mb-20">
          Конструктор      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вернуться обратно?
        <Link to='/' className={Styles.link} > Конструктор
        </Link> 
      </p>      
    </div>
  </>
)};