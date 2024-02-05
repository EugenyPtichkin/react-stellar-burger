import Styles from './navigation-link.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TNavigationLink } from '../../../services/types/data';

export const NavigationLink: FC<TNavigationLink> = ({ link, isActive, text, children }: TNavigationLink) => {
  return (
    <Link to={link} className={Styles.navigation_link} >
      {children}
      {text &&
        <p className={isActive ? `${Styles.navlink} ${Styles.active}` : Styles.navlink}>{text}</p>
      }
    </Link>
  );
}