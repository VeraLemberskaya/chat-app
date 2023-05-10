import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ISignInData, ISignUpData, IUser, authService } from 'services/auth';

import { getToken, removeToken, setToken } from 'helpers/tokens';

import { AuthContext, AuthActionsContext } from './context';

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = getToken();
      setIsAuth(Boolean(token));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      setUser(user);
    };

    const token = getToken();
    if (token) {
      setIsAuth(true);
      getCurrentUser();
    }
  }, []);

  const signIn = useCallback(async (data: ISignInData) => {
    const { user, token } = await authService.signIn(data);

    setToken(token);
    setUser(user);
  }, []);

  const signUp = useCallback(async (data: ISignUpData) => {
    const { user, token } = await authService.signUp(data);

    setToken(token);
    setUser(user);
  }, []);

  const logOut = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuth,
      user,
    }),
    [isAuth, user],
  );

  const actions = useMemo(
    () => ({
      signIn,
      signUp,
      logOut,
    }),
    [logOut, signIn, signUp],
  );

  return (
    <AuthContext.Provider value={value}>
      <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
