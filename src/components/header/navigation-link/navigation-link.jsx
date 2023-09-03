import styles from './navigation-link.module.css';

export function NavigationLink(props) {
  return (
    <a href="#" className={styles.navigation_link}>
      {props.children}
      <p className={styles.navigation_link_text}>{props.text}</p>     
    </a>
  );
}