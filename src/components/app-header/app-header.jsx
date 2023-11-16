import Styles from './app-header.module.css';
import NavigationLink from './navigation-link/navigation-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { isActive } from '../app/app';

function AppHeader() {
  return (
    <header>
      <section className={Styles.header}>
        <nav className={Styles.header_nav}>
          <div className={Styles.header_nav_first}>
            <NavigationLink text='Конструктор'>
              <BurgerIcon type={isActive ? "primary" : "secondary"}></BurgerIcon>
            </NavigationLink>
          </div>
          <NavigationLink text='Лента заказов'>
            <ListIcon type={isActive ? "primary" : "secondary"}></ListIcon>
          </NavigationLink>
        </nav>

        <Logo className='header_logo'/>

        <nav className={Styles.header_profile}>
          <NavigationLink text='Личный кабинет'>
            <ProfileIcon type={isActive ? "primary" : "secondary"}></ProfileIcon>
          </NavigationLink>
        </nav>
      </section>
    </header>
  );
};

export default AppHeader;