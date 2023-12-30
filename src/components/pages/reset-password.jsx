import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from './../../utils/burger-api';

export const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: '', code: '' });
  const navigate = useNavigate();
  const isForgotPasswordPageVisited = sessionStorage.getItem('forgotPasswordPageVisited');
  console.log(`Страница сброса пароля посещена: ${isForgotPasswordPageVisited}`);

  useEffect(() => {
    if (!isForgotPasswordPageVisited) {
      navigate('/forgot-password', { replace: true });
    }
  }, [isForgotPasswordPageVisited, navigate]);

  const onChange = e => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    api.resetPassword(form).then((res) => {
      console.log(res);
      sessionStorage.removeItem('forgotPasswordPageVisited');
      navigate('/login', { replace: false });
    }).catch(res => console.log(res));
  }
  return (
    <>
      <div className={Styles.content}>
        <h1 className={Styles.title}>Восстановление пароля</h1>
        <form className={Styles.form} onSubmit={onSubmit}>
          <PasswordInput
            placeholder='Введите новый пароль'
            name='password'
            value={form.password}
            onChange={onChange}
            icon={"ShowIcon"}
          />
          <Input
            type={'text'}
            placeholder='Введите код из письма'
            name='code'
            value={form.code}
            onChange={onChange}
            size={'default'}
          />
          <div className={Styles.button}>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
        <p className={Styles.additionalActions}>
          Вспомнили пароль?
          <Link to='/login' className={Styles.link} > Войти
          </Link>
        </p>
      </div>
    </>

  )
};