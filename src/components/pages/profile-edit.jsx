import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './profile-edit.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';

export const ProfileEditPage = () => {
  const user = useSelector(store => store.user.user);
  const [form, setForm] = useState({ email: user.email, password: '', name: user.name });
  const dispatch = useDispatch();
  const enableButtonsDisplay = (form.email !== user.email) || (form.name !== user.name) || (form.password !== '');

  const onChange = e => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(updateUser(form));
  }

  const onReset = (e) => {
    e.preventDefault();
    setForm({ ...form, email: user.email, password: '', name: user.name });
  }

  return (
    <>
      <div className={Styles.content}>
        <form className={Styles.form} onSubmit={onSubmit} onReset={onReset}>
          <Input
            type={'text'}
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={onChange}
            size={'default'}
            icon={"EditIcon"}
          />
          <EmailInput
            placeholder='Логин'
            name='email'
            value={form.email}
            onChange={onChange}
            isIcon={false}
            icon={"EditIcon"}
          />
          <PasswordInput
            placeholder="Пароль"
            name='password'
            value={form.password}
            onChange={onChange}
            icon={"EditIcon"}
          />
          {enableButtonsDisplay &&
            <div className={Styles.buttons}>
              <div className={Styles.cancel_button}>
                <Button htmlType="reset" type="secondary" size="medium" >
                  Отмена
                </Button>
              </div>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          }
        </form >
      </div >
    </>
  )
};