import React, { Component } from 'react';
import styles from './Header.module.css';

import Navigation from '../navigation/Navigation';
import Logo from '../logo/Logo';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Logo />
        <Navigation />
      </header>
    );
  }
}

export default Header;
