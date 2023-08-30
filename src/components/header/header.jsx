import styles from './header.module.css';
import navStyles from './navigation/navigation.module.css';

import { NavigationLink } from './navigation-link/navigation-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

import { isActive } from '../app/app';

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_nav}>
          <div className={navStyles.navigation} >
            <NavigationLink text='Конструктор'>
              <BurgerIcon type={isActive ? "primary" : "secondary"}></BurgerIcon>
            </NavigationLink>

            <NavigationLink text='Лента заказов'>
              <ListIcon type={isActive ? "primary" : "secondary"}></ListIcon>
            </NavigationLink>
          </div>
        </div>

        <Logo />

        <div className={styles.header_profile}>
          <NavigationLink text='Личный кабинет'>
            <ProfileIcon type={isActive ? "primary" : "secondary"}></ProfileIcon>
          </NavigationLink>
        </div>


      </div>



    </>
  );
}
