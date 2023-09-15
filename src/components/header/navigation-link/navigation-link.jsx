import styles from './navigation-link.module.css';
import PropTypes from "prop-types";

function NavigationLink(props) {
  return (
    <a href="#" className={styles.navigation_link}>
      {props.children}
      <p className={styles.navigation_link_text}>{props.text}</p>     
    </a>
  );
}
NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};

export default NavigationLink;