import React, { Component } from 'react';
import NavigationItem from './navigationItems/NavigationItem';
import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    return (
      <ul className={styles.navigation}>
        <NavigationItem link='/'>STATISTICS</NavigationItem>
        <NavigationItem link='/map'>MAP</NavigationItem>
      </ul>
    );
  }
}

export default Navigation;
