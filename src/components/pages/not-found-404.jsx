//import { Link, Navigate } from 'react-router-dom';
import Styles from './not-found-page.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const NotFound404Page = () => {

    const handleLogin = () => {
//    <Navigate to='/login' />
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Такой страницы нет</p>
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleLogin} extraClass="mb-20">
          Войти      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вернуться обратно?
        {/* <Link to='/login' className={Styles.link} >
            Войти
        </Link> */}
        <a href='/login' className={Styles.link}> Войти</a>
      </p>      
    </div>
  </>
)};