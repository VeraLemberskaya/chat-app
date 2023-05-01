import React, { FC } from 'react';

import styles from './AuthContainer.module.scss';

interface IAuthContainer {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthContainer: FC<IAuthContainer> = ({ children, footer }) => {
  return (
    <div className={styles.authContainer}>
      {children}
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default AuthContainer;
