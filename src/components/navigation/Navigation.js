import React, { Component } from 'react';
import NavigationItem from './navigationItems/NavigationItem';
import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    return (
      <ul className={styles.navigation}>
        <NavigationItem link='/'>통계</NavigationItem>
        <NavigationItem link='/floating-list'>유동인구</NavigationItem>
      </ul>
    );
  }
}

export default Navigation;
