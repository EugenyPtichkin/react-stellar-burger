import { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPasswordPage = () => {

  const [email, setEmail] = useState('');
  
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const handleForgotPassword = () => {
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Восстановление пароля</p>
      <EmailInput 
        name={'email'}
        placeholder={"Укажите e-mail"}
        value= {email}
        onChange={onChangeEmail}
        isIcon={false}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleForgotPassword} extraClass="mb-20">
          Восстановить      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вспомнили пароль?
        <Link to='/login' className={Styles.link} > Войти
        </Link>
      </p>      
    </div>
  </>
)};