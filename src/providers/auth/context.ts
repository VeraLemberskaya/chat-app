import { createContext, useContext } from 'react';
import { ISignInData, ISignUpData, IUser } from 'services/auth';

interface IAuthContext {
  isAuth: boolean;
  user: IUser | null;
}

interface IAuthActionsContext {
  signIn: (data: ISignInData) => void;
  signUp: (data: ISignUpData) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({ isAuth: false, user: null });

export const AuthActionsContext = createContext<IAuthActionsContext>({
  signIn: () => undefined,
  signUp: () => undefined,
  logOut: () => undefined,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthActions = () => {
  return useContext(AuthActionsContext);
};
