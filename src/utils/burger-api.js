import { baseUrl } from './data';

// создаем функцию проверки ответа на `ok`, не анализирую success, т.к. нужен выше для анализа нагрузки
const checkResponse = (res) => { //возвращается либо res.json либо Promise.reject(res.json())
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

// создаем функцию проверки ответа на `ok`
/*const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Код ошибки HTTP: ${res.status}`);
  }
  return res.json();
}
// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (!(res && res.success)) {// не забываем выкидывать ошибку, чтобы она попала в `catch`
    throw new Error(`Ответ не success: ${res.message}`);
  }  
  return res;  
};*/

// создаем универсальную фукнцию запроса с проверкой ответа `ok` и `success`
const request = async (endpoint, options) => {
  return await fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
  //.then(checkSuccess)
};

const refreshToken = () => request('auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  }),
});

const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    //console.log(res);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      //console.log(refreshData);
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${baseUrl}${endpoint}`, options); //повторяем запрос
      //console.log(res);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getIngredientsData = () => request('ingredients');

const getOrderNumber = (data) => request('orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'ingredients': data
  })
});

const getUser = async () => fetchWithRefresh('auth/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  }
});

const updateUser = (data) => fetchWithRefresh('auth/user', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password,
    'name': data.name,
  })
});

const login = (data) => request('auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password
  })
});

const logout = () => request('auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'token': localStorage.getItem("refreshToken"),
  })
});

const register = (data) => request('auth/register', {
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

const askPasswordReset = (email) => request('password-reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': email,
  })
});

const resetPassword = (data) => request('password-reset/reset', {
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
  fetchWithRefresh
};