import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href='https://github.com/limunosekai'>Github</a>
        </li>
        <li>
          <a href='mailto:powerlsh0103@gmail.com'>powerlsh0103@gmail.com</a>
        </li>
      </ul>
      <div className={styles.ft_p}>
        <span>Made by : Limu</span>
        <span>Tel : 010-2605-9213</span>
      </div>
    </footer>
  );
}

export default Footer;
