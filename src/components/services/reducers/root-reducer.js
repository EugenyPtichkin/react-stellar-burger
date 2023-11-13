import { combineReducers } from 'redux';

// Редьюсер ингредиентов
import {ingredientsList} from './../reducers/igredients';

// Редьюсер бургера
import {constructorList} from './../reducers/constructor';

// Редьюсер просматриваемого ингредиента
import {ingredientList} from './../reducers/igredient';

// Редьюсер созданного заказа
import {orderList} from './../reducers/order';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsList,
    constructorList,
    ingredientList,
    orderList
}) 