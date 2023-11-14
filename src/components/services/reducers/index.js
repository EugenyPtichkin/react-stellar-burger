import { combineReducers } from 'redux';

// Редьюсер ингредиентов
import {ingredientsReducer} from './ingredients';

// Редьюсер бургера
import {burgerReducer} from './burger';

// Редьюсер просматриваемого ингредиента
import {ingredientReducer} from './ingredient';

// Редьюсер созданного заказа
import {orderReducer} from './order';

import {positionReducer} from './position';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    coordinates: positionReducer
}) 