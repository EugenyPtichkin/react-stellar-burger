import styles from "./desktop.module.css";
import { NavigationLink } from "./navigation-link/navigation-link";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function Desktop() {
  return (
    <div className={styles.desktop}>
        <NavigationLink>
          "Ссылка"
        </NavigationLink>
        
        <NavigationLink>
          "Ссылка2"
        </NavigationLink>
        
        <Logo />
        
        <NavigationLink>
        </NavigationLink>
    </div>
  );
}

export default Desktop;