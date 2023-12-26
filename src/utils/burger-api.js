import { baseUrl } from "./data";

// создаем функцию проверки ответа на `ok` и на 'success'
/*const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  else { //!res.ok
    let status = res.status; //запомнить статус ошибки от сервера в переменной
    res.json().then((res) => { //распарсить ответ - вытащить поля success и message
      if (!res.success) {      //!res.success
        return Promise.reject(`Код ошибки HTTP: ${status} Сообщение сервера: ${res.message}`);
      }
      else {  //а вдруг res.success, все равно здесь присутствует код ошибки с сервера
        return Promise.reject(`Код ошибки HTTP: ${status}`);
      }
    })
  }
}*/

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (!res.ok) {
    Promise.reject(`Код ошибки HTTP: ${res.status}`);    
  }
  return res.json();
}
// создаем функцию проверки на `success` 
const checkSuccess = (res) => {
  if (!(res && res.success)) {// не забываем выкидывать ошибку, чтобы она попала в `catch`
    Promise.reject(`Ответ не success: ${res.message}`);
  }  
  return res;  
};

// создаем универсальную фукнцию запроса с проверкой ответа `ok` и `success`
const request = async (endpoint, options) => {
  return await fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
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

export const api = {
  getIngredientsData,
  getOrderNumber,
  getUser,
  login,
  logout,
  register
};
