import Styles from './navigation-link.module.css';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

export const NavigationLink = (props) => {
  return (
    <Link to={props.link} className={Styles.navigation_link}>
      {props.children}
      <p className={props.isActive? `${Styles.navlink} ${Styles.active}`: Styles.navlink}>{props.text}</p>
    </Link>
  );
}
NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};