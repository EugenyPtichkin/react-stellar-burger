import { combineReducers } from 'redux';

// Редьюсер ингредиентов
import {ingredientsReducer} from './ingredients';

// Редьюсер бургера
import {constructorReducer} from './constructor';

// Редьюсер просматриваемого ингредиента
import {ingredientReducer} from './ingredient';

// Редьюсер созданного заказа
import {orderReducer} from './order';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer
}) 