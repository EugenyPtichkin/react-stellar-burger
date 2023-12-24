import { useState } from 'react';
//import { Link, Navigate } from 'react-router-dom';
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
//    <Navigate to='/login' />
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Вход</p>
      <EmailInput 
        onChange={onChangeEmail}
        value= {email}
        name={'email'}
        placeholder={"E-mail"}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput 
        onChange={onChangePassword}
        value= {password}
        name={'password'}
        placeholder={"Пароль"}
        icon="ShowIcon"
        extraClass="mb-6"
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleLogin} extraClass="mb-20">
          Войти      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вы - новый пользователь? 
        {/* <Link to='/register' className={Styles.link} >
            Зарегистрироваться
        </Link> */}
        <a href='/register' className={Styles.link}> Зарегистрироваться</a>
      </p>      
      <p className={Styles.additionalActions}>
        Забыли пароль? 
        {/* <Link to='/forgot-password' className={Styles.link} >
            Восстановить пароль
        </Link> */}
        <a href='/forgot-password' className={Styles.link}> Восстановить пароль</a>
      </p>      
    </div>
  </>
)};