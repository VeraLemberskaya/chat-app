import React from 'react';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';

import styles from './AppContainer.module.scss';

const AppContainer = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppContainer;
