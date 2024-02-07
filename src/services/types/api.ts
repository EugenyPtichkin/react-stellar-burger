import { TIngredient, TUser, TWSOrder } from "./data";

export type THeadersInitAuth = HeadersInit & { Authorization?: string | null };

export interface IOptions extends RequestInit {
  headers: THeadersInitAuth;
}

export interface IArrayIngredients extends IResponse {
  data: Array<TIngredient>;
};

export interface ISingleOrder extends IResponse {
  orders: Array<TWSOrder>;
}

export interface IOrderResponse extends IResponse {
  order: TWSOrder;
}

export interface IResponse extends Response {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  message: string;
}

export interface IUserResponse extends IResponse {
  user: TUser;
}