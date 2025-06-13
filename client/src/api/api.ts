import { ApiResult } from 'types/api';
import { User } from 'types/user';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  CHECKUSERNAME: `${API_BASE_URL}/auth/checkusername`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  UPLOAD_FILE: `${API_BASE_URL}/file/upload`,
  DOWNLOAD_FILE: `${API_BASE_URL}/file/download`,
};

export const login = async (
  username: string,
  password: string
): Promise<ApiResult> => {
  const response = await fetch(API_ROUTES.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  var result: ApiResult = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return result;
};

export const checkUsername = async (username: string): Promise<ApiResult> => {
  const response = await fetch(API_ROUTES.CHECKUSERNAME, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  var result: ApiResult = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return result;
};

export const register = async (user: User): Promise<ApiResult> => {
  const response = await fetch(API_ROUTES.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });

  var result: ApiResult = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return result;
};

export const logout = async (username: string): Promise<ApiResult> => {
  const response = await fetch(API_ROUTES.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  var result: ApiResult = {
    status: response.status,
    statusText: response.statusText,
    data: await response.json(),
  };
  return result;
};

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  let res = await fetch(url, {
    ...options,
    headers: { ...options.headers, 'Content-Type': 'application/json' },
  });

  if (res.status === 401) {
    const refreshRes = await fetch('/api/refresh', { method: 'POST' });
    if (refreshRes.ok) {
      res = await fetch(url, options); // Retry original request
    } else {
      throw new Error('Session expired');
    }
  }
  return res;
};
