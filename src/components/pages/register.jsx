import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';

export const RegisterPage = () => {
  const [form, setForm] = useState({email: '', password: '', name: '' });
  const dispatch = useDispatch();
  
  const onChange = e => {
    e.preventDefault();
    setForm({...form, [e.target.name]: e.target.value});
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Регистрация</p>
      <Input 
        type={'text'}       
        placeholder='Имя'
        name='name'
        value= {form.name}
        onChange={onChange}
        size={'default'}
        extraClass={"mb-6"}
      />
      <EmailInput        
        placeholder='E-mail'
        name='email'
        value= {form.email}
        onChange={onChange}
        isIcon={false}
        extraClass={"mb-6"}
      />
      <PasswordInput 
        placeholder="Пароль"
        name='password'
        value= {form.password}
        onChange={onChange}
        icon={"ShowIcon"}
        extraClass={"mb-6"}
      />
      <div className={Styles.button}>
        <Button htmlType="button" type="primary" size="medium" onClick={onSubmit} extraClass="mb-20">
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