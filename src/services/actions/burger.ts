import { v4 as uuidv4 } from 'uuid';

import { TBun, TIngredient} from '../types/data';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUNS: 'ADD_BUNS' = 'ADD_BUNS';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENTS: 'UPDATE_INGREDIENTS' = 'UPDATE_INGREDIENTS';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' = 'DELETE_ALL_INGREDIENTS';

interface IAddBuns {
  readonly type: typeof ADD_BUNS;
  data: TBun;
  uuid: string;
}

interface IAddIngredients {
  readonly type: typeof ADD_INGREDIENT;
  data: TIngredient;
  uuid: string;
}

interface IDeleteIngredients {
  readonly type: typeof DELETE_INGREDIENT;
  uuid: string;
}

interface IUpdateIngredients {
  readonly type: typeof UPDATE_INGREDIENTS;
  data: Array<TIngredient>;
}

interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export type TBurgerActions =
  | IAddBuns
  | IAddIngredients
  | IDeleteIngredients
  | IUpdateIngredients
  | IDeleteAllIngredients;

export const addBuns = (item: TBun): IAddBuns => ({
  type: ADD_BUNS,
  data: item,
  uuid: uuidv4()
});

export const addIngredient = (item: TIngredient): IAddIngredients => ({
  type: ADD_INGREDIENT,
  data: item,
  uuid: uuidv4()
});

export const deleteIngredient = (uuid: string): IDeleteIngredients => ({
  type: DELETE_INGREDIENT,
  uuid: uuid
});

export const updateIngredients = (ingredients: Array<TIngredient>): IUpdateIngredients => ({
  type: UPDATE_INGREDIENTS,
  data: ingredients
});

export const deleteAllIngredients = (): IDeleteAllIngredients => ({
  type: DELETE_ALL_INGREDIENTS
});