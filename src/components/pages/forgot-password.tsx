import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from '../../utils/burger-api';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(email);
    api.askPasswordReset(email).then((res) => {
      console.log(res);
      sessionStorage.setItem('forgotPasswordPageVisited', 'yes');
      navigate('/reset-password', { replace: false });
    }).catch(res => console.log(res));
  };

  return (
    <>
      <div className={Styles.content}>
        <h1 className={Styles.title}>Восстановление пароля</h1>
        <form className={Styles.form} onSubmit={onSubmit}>
          <EmailInput
            placeholder='Укажите e-mail'
            name='email'
            value={email}
            onChange={onChange}
            isIcon={false}
          />
          <div className={Styles.button}>
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
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