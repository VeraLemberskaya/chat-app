import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Chat from 'pages/Chat';

import AppContainer from 'layouts/AppContainer';

import { routes } from 'constants/routes';

const Router = () => {
  return (
    <Routes>
      <Route element={<AppContainer />}>
        <Route element={<Login />} path={routes.SIGN_IN} />
        <Route element={<SignUp />} path={routes.SIGN_UP} />
        <Route element={<Chat />} path={routes.CHAT} />
      </Route>
    </Routes>
  );
};

export default Router;
