import { api } from "../../utils/burger-api";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_AUTH_ERROR: 'SET_AUTH_ERROR' = 'SET_AUTH_ERROR';

import { TUser, TUserSet} from '../types/data'; 
import { DispatchType } from '../hooks/hooks';

export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setAuthError = (value: boolean) => ({
  type: SET_AUTH_ERROR,
  payload: value,
});

export const setUser = (user: TUser | null) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return async (dispatch: DispatchType) => {
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    }).catch(res => console.log(res));
  };
};

export const updateUser = (data) => {
  return async (dispatch: DispatchType) => {
    return await api.updateUser(data).then((res) => {
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    }).catch(res => console.log(res));
  };
};

export const login = (data) => {
  return async (dispatch: DispatchType) => {
    return await api.login(data).then((res) => {
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
};

export const register = (data) => {
  return async (dispatch: DispatchType) => {
    return await api.register(data).then((res) => {
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
};

export const checkUserAuth = () => {
  return (dispatch: DispatchType) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = () => {
  return async (dispatch: DispatchType) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    }).catch(res => console.log(res));
  };
};