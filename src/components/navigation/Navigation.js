import React, { Component } from 'react';
import NavigationItem from './navigationItems/NavigationItem';
import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    return (
      <ul className={styles.navigation}>
        <NavigationItem link='/'>그래프</NavigationItem>
        <NavigationItem link='/floating-list'>서울시확진자</NavigationItem>
      </ul>
    );
  }
}

export default Navigation;
