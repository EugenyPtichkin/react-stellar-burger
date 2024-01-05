import { combineReducers } from 'redux';

// Редьюсер ингредиентов
import {ingredientsReducer} from './ingredients';

// Редьюсер бургера
import {burgerReducer} from './burger';

// Редьюсер созданного заказа
import {orderReducer} from './order';

// Редьюсер пользователя
import {userReducer} from './user';

// Редьюсер для WebSocket
import { wsReducer } from './wsReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    user: userReducer,
    websock: wsReducer,
}) 