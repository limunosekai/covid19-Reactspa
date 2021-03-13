import React from 'react';
import styles from './NavigationItem.module.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className={styles.navigationItem}>
      <NavLink to={props.link}>
        <Button variant='light' size='lg'>
          {props.children}
        </Button>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
