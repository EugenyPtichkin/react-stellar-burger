import { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const handleLogin = () => {
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Вход</p>
      <EmailInput 
        name={'email'}
        placeholder={"E-mail"}
        value= {email}
        onChange={onChangeEmail}
        isIcon={false}
        extraClass={"mb-6"}
      />
      <PasswordInput 
        name={'password'}
        placeholder={"Пароль"}
        value= {password}
        onChange={onChangePassword}
        icon={"ShowIcon"}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleLogin} extraClass="mb-20">
          Войти      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вы - новый пользователь?
        <Link to='/register' className={Styles.link} > Зарегистрироваться
        </Link> 
      </p>      
      <p className={Styles.additionalActions}>
        Забыли пароль?
        <Link to='/forgot-password' className={Styles.link} > Восстановить пароль
        </Link> 
      </p>      
    </div>
  </>
)};