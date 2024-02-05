import Styles from './app-header.module.css';
import { NavigationLink } from './navigation-link/navigation-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useLocation, Link } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();
  return (
    <header>
      <section className={Styles.header}>
        <nav className={Styles.nav}>
          <div className={Styles.nav_first}>
            <NavigationLink text='Конструктор' link='/' isActive={location.pathname === '/'} >
              <BurgerIcon type={(location.pathname === '/') ? "primary" : "secondary"} />
            </NavigationLink>
          </div>
          <NavigationLink text='Лента заказов' link='/feed' isActive={location.pathname === '/orders'} >
            <ListIcon type={(location.pathname === '/feed') ? "primary" : "secondary"} />
          </NavigationLink>
        </nav>

        <nav>
          <Link to='/' className={Styles.header_logo}>
            <Logo />
          </Link>
        </nav>

        <nav className={Styles.profile}>
          <NavigationLink text='Личный кабинет' link='/profile' isActive={location.pathname === '/profile'} >
            <ProfileIcon type={(location.pathname === '/profile') ? "primary" : "secondary"} />
          </NavigationLink>
        </nav>
      </section>
    </header >
  );
};
export default AppHeader;