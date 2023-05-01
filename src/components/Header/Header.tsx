import React from 'react';
import { LogoutIcon } from 'assets/icons';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>🦄 Team Unicorns</div>
      <div className={styles.logout}>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default Header;
