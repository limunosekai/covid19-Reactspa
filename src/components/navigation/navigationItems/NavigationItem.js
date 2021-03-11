import React from 'react';
import styles from './NavigationItem.module.css';
import Button from 'react-bootstrap/Button';

const NavigationItem = (props) => {
  return (
    <li className={styles.navigationItem}>
      <Button variant='primary'>{props.children}</Button>
    </li>
  );
};

export default NavigationItem;
