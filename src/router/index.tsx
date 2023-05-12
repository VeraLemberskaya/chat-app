import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ChatProvider from 'providers/chat';

import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Chat from 'pages/Chat';

import AppContainer from 'layouts/AppContainer';

import { routes } from 'constants/routes';

import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

const Router = () => {
  return (
    <Routes>
      <Route element={<Navigate replace to={routes.CHAT} />} path="/" />
      <Route element={<AppContainer />}>
        <Route element={<GuestRoute redirect={routes.CHAT} />}>
          <Route element={<Login />} path={routes.SIGN_IN} />
          <Route element={<SignUp />} path={routes.SIGN_UP} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <ChatProvider>
                <Chat />
              </ChatProvider>
            }
            path={routes.CHAT}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
