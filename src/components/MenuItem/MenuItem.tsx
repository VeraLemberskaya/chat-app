import React, { FC, ReactNode } from 'react';

import styles from './MenuItem.module.scss';

interface IMenuItem {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

const MenuItem: FC<IMenuItem> = ({ children, icon, onClick }) => {
  return (
    <li className={styles.menuItem} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </li>
  );
};

export default MenuItem;
