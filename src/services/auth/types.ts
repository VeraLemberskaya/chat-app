export interface IUser {
  id: number;
  userName: string;
}

export interface ISignInData {
  userName: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: IUser;
}

export interface ISignUpData {
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpResponse {
  token: string;
  user: IUser;
}
