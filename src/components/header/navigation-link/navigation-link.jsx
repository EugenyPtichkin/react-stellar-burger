import styles from './navigation-link.module.css';
import textStyles from './../menu-item/menu-item.module.css';

export function NavigationLink(props) {
  return (
    <div>
        <a href="#" className={styles.navigation_link}>
          {props.children}
          <p className={textStyles.menu_item}>{props.text}</p>     
        </a>
    </div>
  );
}