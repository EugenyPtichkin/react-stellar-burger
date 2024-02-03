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

export type TIngredient = TBun & { readonly uuid: string };

export type TBurger = {
  readonly bun: TBun | null;
  readonly ingredients: Array<TIngredient>;
};

export type TIngredientsSet = {
  ingredients: TBurger | null;
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
  email: string;
  name: string;
};

export type TUserSet = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthError: boolean;
};

export type TUserForm = TUser &  {  password: string;};

export type TWSMEssage = {
  messages: [];
};

export type TWSMessages = {
  wsConnected: boolean;
  messages: Array<TWSMEssage>
};