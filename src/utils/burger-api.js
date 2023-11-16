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
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredientsData = () => request('ingredients');

export const getOrderNumber = (data) => request('orders', {
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