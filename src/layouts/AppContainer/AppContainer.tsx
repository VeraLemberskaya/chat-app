import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';

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
