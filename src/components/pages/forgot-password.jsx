import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { askPasswordReset } from './../../services/actions/user';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    askPasswordReset(email).then((res) => {
      navigate('/reset-password', { replace: true });
    });
  };

  return (
    <>
      <div className={Styles.content}>
        <p className={Styles.title}>Восстановление пароля</p>
        <EmailInput
          placeholder='Укажите e-mail'
          name='email'
          value={email}
          onChange={onChange}
          isIcon={false}
          extraClass={"mb-6"}
        />
        <div className={Styles.button}>
          <Button htmlType="button" type="primary" size="medium" onClick={onSubmit} extraClass="mb-20">
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
  )
};