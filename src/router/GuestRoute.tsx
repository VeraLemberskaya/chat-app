import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'providers/auth';

interface IGuestRoute {
  redirect: string;
}

const GuestRoute: FC<IGuestRoute> = ({ redirect }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate replace to={redirect} /> : <Outlet />;
};

export default GuestRoute;
