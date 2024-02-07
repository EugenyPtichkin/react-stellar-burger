import { useState } from 'react';
import { useDispatch } from '../../services/hooks/hooks';
import { Link } from 'react-router-dom';
import Styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';

export const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form));
  }

  return (
    <>
      <div className={Styles.content}>
        <h1 className={Styles.title}>Регистрация</h1>
        <form className={Styles.form} onSubmit={onSubmit}>
          <Input
            type={'text'}
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={onChange}
            size={'default'}
            autoComplete="on"
          />
          <EmailInput
            placeholder='E-mail'
            name='email'
            value={form.email}
            onChange={onChange}
            isIcon={false}
            autoComplete="on"
          />
          <PasswordInput
            placeholder="Пароль"
            name='password'
            value={form.password}
            onChange={onChange}
            icon={"ShowIcon"}
            autoComplete="off"
          />
          <div className={Styles.button}>
            <Button htmlType="submit" type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className={Styles.additionalActions}>
          Уже зарегистрированы?
          <Link to='/login' className={Styles.link} > Войти
          </Link>
        </p>
      </div>
    </>
  )
};