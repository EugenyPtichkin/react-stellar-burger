import { TIngredient, TUser, TUserForm, TWSOrder } from '../services/types/data';
import { baseUrl } from './data';

type THeadersInitAuth = HeadersInit & { Authorization?: string | null };

export interface IOptions extends RequestInit {
  headers: THeadersInitAuth;
}

interface IArrayIngredients extends Response {
  data: Array<TIngredient>;
};

interface ISingleOrder extends Response {
  orders: Array<TWSOrder>;
}

export interface IResponse extends Response {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  message: string;
}

export interface IUserResponse extends IResponse {
  user: TUser;
}

// создаем функцию проверки ответа на `ok`, не анализирую success, т.к. нужен выше для анализа нагрузки
const checkResponse = (res: Response): Promise<any> => { //возвращается либо res.json либо Promise.reject(res.json())
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

// создаем универсальную фукнцию запроса с проверкой ответа `ok` и `success`
const request = async <T extends Response, I extends RequestInit>(endpoint: string, options?: I): Promise<T> => {
  return await fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse);
};

export const refreshToken = async () => {
  return request<IResponse,IOptions>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

const fetchWithRefresh = async (endpoint: string, options: RequestInit & IOptions) => {
  try {
    //    const res: Response = await fetch(`${baseUrl}${endpoint}`, options);
    //    return await checkResponse(res);
    //  } catch (err) {
    //    if (err.message === 'jwt expired') {
    const res = await request<IResponse,IOptions>(`${baseUrl}${endpoint}`, options)
      .then(checkResponse);
    if (res.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(`${baseUrl}${endpoint}`, options); //повторяем запрос     
      return await checkResponse(res);
      //} else {
    }
  }
  catch (err) {
    return Promise.reject(err);
  }
};

const getIngredientsData = () => request<IArrayIngredients,IOptions>('ingredients');

const getSingleOrderData = (number: number) => request<ISingleOrder,IOptions>(`orders/${number}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
});

const getOrderNumber = (data: Array<string>) => fetchWithRefresh('orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  } as THeadersInitAuth,
  body: JSON.stringify({
    'ingredients': data
  })
});

const getUser = async () => fetchWithRefresh('auth/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  } as THeadersInitAuth,
});

const updateUser = (data: TUserForm) => fetchWithRefresh('auth/user', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  } as THeadersInitAuth,
  body: JSON.stringify({
    'email': data.email,
    'password': data.password,
    'name': data.name,
  })
});

const login = (data: TUserForm) => {
  return request<IUserResponse,IOptions>('auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password
  })
});
}

const logout = () => request('auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'token': localStorage.getItem("refreshToken"),
  })
});

const register = (data: TUserForm) => {
  return request<IUserResponse,IOptions>('auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password,
    'name': data.name,
  })
});
}

const askPasswordReset = (email: string) => request('password-reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': email,
  })
});

const resetPassword = (data: { password: string, code: string }) => request('password-reset/reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'password': data.password,
    'token': data.code
  })
});

export const api = {
  getIngredientsData,
  getOrderNumber,
  getUser,
  updateUser,
  login,
  logout,
  register,
  askPasswordReset,
  resetPassword,
  refreshToken,
  fetchWithRefresh,
  getSingleOrderData
};