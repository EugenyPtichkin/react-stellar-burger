import { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeName = e => {
    setName(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleRegister = () => {
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Регистрация</p>
      <Input 
        type={'text'}       
        name={'Имя'}
        placeholder={'Имя'}
        value= {name}
        onChange={onChangeName}
        size={'default'}
        extraClass={"mb-6"}
      />
      <EmailInput        
        name={'E-mail'}
        placeholder={"E-mail"}
        value= {email}
        onChange={onChangeEmail}
        isIcon={false}
        extraClass={"mb-6"}
      />
      <PasswordInput 
        name={'Пароль'}
        placeholder={"Пароль"}
        value= {password}
        onChange={onChangePassword}
        icon={"ShowIcon"}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleRegister} extraClass="mb-20">
          Зарегистрироваться      
        </Button>
      </div>
      <p className={Styles.additionalActions}>
        Уже зарегистрированы? 
        <Link to='/login' className={Styles.link} > Войти
        </Link>
      </p>        
    </div>
  </>
)};