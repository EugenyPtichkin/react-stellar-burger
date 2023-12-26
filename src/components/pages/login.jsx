import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';

export const LoginPage = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  
  const onChange = e => {
    e.preventDefault();
    setForm({...form, [e.target.name]: e.target.value});
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Вход</p>
      <EmailInput 
        placeholder='E-mail'
        name='email'
        value= {form.email}
        onChange={onChange}
        isIcon={false}
        extraClass={"mb-6"}
      />
      <PasswordInput 
        placeholder='Пароль'
        name='password'        
        value= {form.password}
        onChange={onChange}
        icon={"ShowIcon"}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={onSubmit} extraClass="mb-20">
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