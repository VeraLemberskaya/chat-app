import React from 'react';
import { Route, Routes } from 'react-router-dom';
//TODO: fix linter import/order
import Login from 'pages/Login';
import AppContainer from 'layouts/AppContainer';

import { routes } from 'constants/routes';

const Router = () => {
  return (
    <Routes>
      <Route element={<AppContainer />}>
        <Route element={<Login />} path={routes.SIGN_IN} />
      </Route>
    </Routes>
  );
};

export default Router;
