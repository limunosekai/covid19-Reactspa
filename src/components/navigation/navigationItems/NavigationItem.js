import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className={styles.navigationItem}>
      <NavLink to={props.link}>
        <button>{props.children}</button>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
