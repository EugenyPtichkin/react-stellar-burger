import Styles from './navigation-link.module.css';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function NavigationLink(props) {
  return (
    <Link to={props.link} className={Styles.navigation_link}>
      {props.children}
      <p className={Styles.navigation_link_text}>{props.text}</p>     
    </Link>
  );
}
NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};

export default NavigationLink;