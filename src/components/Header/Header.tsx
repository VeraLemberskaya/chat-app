import React from 'react';

import { useAuth, useAuthActions } from 'providers/auth';

import { LogoutIcon } from 'assets/icons';

import styles from './Header.module.scss';

const Header = () => {
  const { isAuth } = useAuth();
  const { logOut } = useAuthActions();

  return (
    <div className={styles.header}>
      <div className={styles.logo}>🦄 Team Unicorns</div>
      {isAuth && (
        <div className={styles.logout} onClick={logOut}>
          <LogoutIcon />
        </div>
      )}
    </div>
  );
};

export default Header;
