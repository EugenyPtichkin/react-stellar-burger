import { api } from "../../utils/burger-api";

import { TUser, TUserForm } from '../types/data';
import { AppDispatch, AppThunk } from "../types";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_AUTH_ERROR: 'SET_AUTH_ERROR' = 'SET_AUTH_ERROR';


interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}
interface ISetAuthError {
  readonly type: typeof SET_AUTH_ERROR;
  payload: boolean;
}
interface ISetUser {
  readonly type: typeof SET_USER;
  payload: TUser | null;
}

export type TUserActions =
  | ISetAuthChecked
  | ISetAuthError
  | ISetUser;

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setAuthError = (value: boolean): ISetAuthError => ({
  type: SET_AUTH_ERROR,
  payload: value,
});

export const setUser = (user: TUser | null): ISetUser => ({
  type: SET_USER,
  payload: user,
});

export const getUser: AppThunk = () => async (dispatch: AppDispatch) => {
  api.getUser()
    .then((res) => {
      dispatch(setUser(res.user));
    })
    .catch(res => console.log(res));
};

export const updateUser: AppThunk = (data: TUserForm) => async (dispatch: AppDispatch) => {
  console.log(data);
  await api.updateUser(data)
    .then((res) => {
      console.log(res)
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    })
    .catch(res => console.log(res));
};

export const login: AppThunk = (data: TUserForm) => async (dispatch: AppDispatch) => {
  await api.login(data).then((res) => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
      console.log(res);
    }
    else {
      dispatch(setAuthError(true));
    }
  }).catch(res => {
    console.log(res);
    dispatch(setAuthError(true));
  });
};

export const register: AppThunk = (data: TUserForm) => async (dispatch: AppDispatch) => {
  await api.register(data).then((res) => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
      console.log(res);
    }
    else {
      dispatch(setAuthError(true));
    }
  }).catch(res => {
    console.log(res);
    dispatch(setAuthError(true));
  });
}

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    try {
      getUser();
    } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true))
    }
  } else {
    dispatch(setAuthChecked(true));
  }
};

export const logout: AppThunk = () => async (dispatch: AppDispatch) => {
  api.logout().then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUser(null));
  }).catch(res => console.log(res));
};