import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'providers/auth';

import { routes } from 'constants/routes';

const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  return !isAuth ? <Navigate replace to={routes.SIGN_IN} /> : <Outlet />;
};

export default ProtectedRoute;
