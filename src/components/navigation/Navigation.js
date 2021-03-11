import React, { Component } from 'react';
import NavigationItem from './navigationItems/NavigationItem';
import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    return (
      <ul className={styles.navigation}>
        <NavigationItem>통계</NavigationItem>
        <NavigationItem>지도</NavigationItem>
      </ul>
    );
  }
}

export default Navigation;
