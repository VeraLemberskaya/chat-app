import { API } from 'services';

import { ISignInData, ISignInResponse, ISignUpData, ISignUpResponse, IUser } from './types';

const AUTH_URL = 'Auth';
const SIGN_IN_URL = `${AUTH_URL}/login`;
const SIGN_UP_URL = `${AUTH_URL}/registration`;

const USER_URL = 'Users';
const CURRENT_USER_URL = `${USER_URL}/current`;

export const signIn = async (data: ISignInData) => {
  const response = await API.post<ISignInData, ISignInResponse>(SIGN_IN_URL, data);

  return response;
};

export const signUp = async (data: ISignUpData) => {
  const response = await API.post<ISignUpData, ISignUpResponse>(SIGN_UP_URL, data);

  return response;
};

export const getCurrentUser = async () => {
  const response = await API.get<IUser>(CURRENT_USER_URL);

  return response;
};
