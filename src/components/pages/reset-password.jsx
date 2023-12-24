import { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPasswordPage = () => {

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onChangeCode = e => {
    setCode(e.target.value)
  }

  const handleResetPassword = () => {
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Восстановление пароля</p>
      <PasswordInput 
        name={'password'}
        placeholder={"Введите новый пароль"}
        value= {password}
        onChange={onChangePassword}
        icon={"ShowIcon"}
        extraClass={"mb-6"}
      />
      <Input 
        type={'text'}
        name={'Код'}
        placeholder={'Введите код из письма'}        
        value= {code}
        onChange={onChangeCode}        
        size={'default'}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleResetPassword} extraClass="mb-20">
          Сохранить      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Вспомнили пароль?
        <Link to='/login' className={Styles.link} > Войти
        </Link> 
        {/* <a href='/login' className={Styles.link}> Войти</a> */}
      </p>      
    </div>
  </>
)};