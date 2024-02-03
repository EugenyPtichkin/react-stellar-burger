export type TBun = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
};

export type TIngredient = TBun & { readonly uuid?: string };

export type TBurger = {
  readonly bun: TBun | null;
  readonly ingredients: Array<TIngredient>;
};

export type TIngredientsSet = {
  ingredients: Array<TIngredient> | null;
  ingredientsLoading: boolean;
  ingredientsError: boolean;
  ingredientsErrorType: string;
};

export type TOrderSet = {
  Ids: Array<string> | null;
  orderName: string;
  orderNumber: number;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderIsError: boolean;
  orderErrorType: string;
};

export type TSingleOrder = {
  order: TBurger | null,
  errorType: boolean,
};

export type TUser = {
  email: string | null;
  name: string | null;
};

export type TUserSet = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthError: boolean;
};

export type TUserForm = TUser & { password: string; };

//типизация ответов с сервера по интерфейсу WS
export type TWSOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TWSMessage = {
  orders: Array<TWSOrder>;
  total: number;
  totalToday: number;
  timestamp: number;
  message? : string;
};

export type TWSAnswer = {
  wsConnected: boolean;
  messages: Array<TWSMessage>
};