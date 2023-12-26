import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from './../../utils/burger-api';

export const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: '', code: '' });
  const navigate = useNavigate();

  const onChange = e => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    api.resetPassword(form).then((res) => {
      console.log(res);
      navigate('/login', { replace: false });
    }).catch(res => console.log(res));
  }

  return (
    <>
      <div className={Styles.content}>
        <p className={Styles.title}>Восстановление пароля</p>
        <PasswordInput
          placeholder='Введите новый пароль'
          name='password'
          value={form.password}
          onChange={onChange}
          icon={"ShowIcon"}
          extraClass={"mb-6"}
        />
        <Input
          type={'text'}
          placeholder='Введите код из письма'
          name='code'
          value={form.code}
          onChange={onChange}
          size={'default'}
          extraClass={"mb-6"}
        />
        <div className={Styles.button}>
          <Button htmlType="button" type="primary" size="medium" onClick={onSubmit} extraClass="mb-20">
            Сохранить
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