import { baseUrl } from "./data";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Код ошибки HTTP: ${res.status}`)
}

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
const request =  async (endpoint, options) => {
  return await fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
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

/*
function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const getIngredientsData = () => {
  return request(`${baseUrl}/ingredients`)    
}

export const getOrderNumber = (data) => {
  return request(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': data
    })
  })    
}*/

const getUser = () => request('auth/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorisation: localStorage.getItem("accessToken"),
  }
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

export const api = {
  getIngredientsData,
  getOrderNumber,
  getUser,
  login,
  logout
};
