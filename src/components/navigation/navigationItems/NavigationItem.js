import React from 'react';
import styles from './NavigationItem.module.css';
import Button from 'react-bootstrap/Button';

const NavigationItem = (props) => {
  return (
    <li className={styles.navigationItem}>
      <Button variant='light' size='lg'>
        {props.children}
      </Button>
    </li>
  );
};

export default NavigationItem;
