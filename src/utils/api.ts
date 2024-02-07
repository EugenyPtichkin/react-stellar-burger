import { IArrayIngredients, IOptions, IOrderResponse, IResponse, ISingleOrder, IUserResponse, THeadersInitAuth } from '../services/types/api';
import { TUserForm } from '../services/types/data';
import { baseUrl } from './data';


// создаем универсальную фукнцию запроса с проверкой ответа `ok` и `success`
const request = async <T extends Response, I extends RequestInit>(endpoint: string, options?: I): Promise<T> => {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(res => res.json(), err => Promise.reject(err))
    .catch(err =>  Promise.reject(err))
};

export const refreshToken = async () => {
  return request<IResponse, IOptions>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const fetchWithRefresh = async <T extends IResponse>(endpoint: string, options: RequestInit & IOptions): Promise<T> => {
  try {
    const res = await request<T, IOptions>(endpoint, options);
    if (res.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      return await request<T, IOptions>(`${endpoint}`, options);//повторяем запрос     
    }
    return (res);
  }
  catch (err) {
    return Promise.reject(err);
  };
};

const getIngredientsData = async () => {
  return request<IArrayIngredients, IOptions>('ingredients');
}

const getSingleOrderData = async (number: number) => {
  return request<ISingleOrder, IOptions>(`orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const getOrderNumber = (data: Array<string>) => {
  return fetchWithRefresh<IOrderResponse>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("accessToken")
    } as THeadersInitAuth,
    body: JSON.stringify({
      'ingredients': data
    })
  });
}

const getUser = async () => {
  return fetchWithRefresh<IUserResponse>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("accessToken")
    } as THeadersInitAuth,
  });
}

const updateUser = async (data: TUserForm) => {
  return fetchWithRefresh<IUserResponse>('auth/user', {
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
}
const login = async (data: TUserForm) => {
  return request<IUserResponse, IOptions>('auth/login', {
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

const logout = async () => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.getItem("refreshToken"),
    }),
  });
}

const register = (data: TUserForm) => {
  return request<IUserResponse, IOptions>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': data.email,
      'password': data.password,
      'name': data.name,
    }),
  });
}

const askPasswordReset = async (email: string) => {
  request<IUserResponse, IOptions>('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email,
    }),
  });
}

const resetPassword = async (data: { password: string, code: string }) => {
  request<IUserResponse, IOptions>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': data.password,
      'token': data.code
    }),
  });
}

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
  getSingleOrderData
}