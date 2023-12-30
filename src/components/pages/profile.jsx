import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import Styles from './profile.module.css';
import { logout } from '../../services/actions/user';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <>
      <div className={Styles.container}>
        <section className={Styles.profile}>
          <nav className={Styles.nav}>
            <NavLink to={''} className={Styles.link} end>
              {({ isActive }) => (
                <span className={isActive ? Styles.active : ''}>Профиль</span>
              )}
            </NavLink>
            <NavLink to={'orders'} className={Styles.link} end>
              {({ isActive }) => (
                <span className={isActive ? Styles.active : ''}>История заказов</span>
              )}
            </NavLink>
            <NavLink to={'/'} className={Styles.link} onClick={onClick}>
              {({ isActive }) => (
                <span className={isActive ? Styles.active : ''}>Выход</span>
              )}
            </NavLink>
          </nav>
          <p className={Styles.caption}>В этом разделе вы можете&nbsp;изменить свои персональные данные</p>
        </section>
        <Outlet />
      </div>
    </>
  )
};