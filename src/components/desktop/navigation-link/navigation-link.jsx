import styles from "./navigation-link.module.css";
import textStyles from "./../menu-item/menu-item.module.css";

import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

function NavigationLink() {
  return (
    <div>
        <a href="#" className={styles.navigation_link}>
          <BurgerIcon type="primary"></BurgerIcon>
          <p className={textStyles.menu_item}>Конструктор</p>     
        </a>

        <a href="#" className={styles.navigation_link}>
          <ListIcon type="primary"></ListIcon>
          <p className={textStyles.menu_item}>Лента заказов</p>
        </a>

        <a href="#" className={styles.navigation_link}>
          <ProfileIcon > type="primary"</ProfileIcon>
          <p className={textStyles.menu_item}>Личный кабинет</p>
        </a>        
    </div>
  );
}

export default NavigationLink;