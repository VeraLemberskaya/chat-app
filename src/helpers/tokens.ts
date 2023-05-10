const TOKEN_KEY = 'auth_token';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new StorageEvent('storage'));
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new StorageEvent('storage'));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
