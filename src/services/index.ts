import axios, { AxiosError } from 'axios';

import { getToken, removeToken } from 'helpers/tokens';

const AUTH_HEADER = 'Authorization';
const UNAUTHORIZED_ERROR = 401;

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers[AUTH_HEADER] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    if (error.response?.status === UNAUTHORIZED_ERROR) {
      removeToken();
    }
    return Promise.reject(error);
  },
);

const get = <T>(url: string, params = {}, options = {}): Promise<T> =>
  axiosInstance
    .get<T>(url, {
      params,
      ...options,
    })
    .then((res) => res.data);

const post = <T, R>(url: string, data: T, params = {}, options = {}): Promise<R> =>
  axiosInstance.post<R>(url, data, { params, ...options }).then((res) => res.data);

export const API = { get, post };
