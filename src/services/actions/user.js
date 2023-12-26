import { api } from "../../utils/burger-api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setAuthError = (value) => ({
  type: SET_AUTH_ERROR,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return async (dispatch) => {
    return await api.getUser().then((res) => {
      dispatch(setUser(res.user));
    }).catch(res => console.log(res));
  };
};

export const login = (data) => {
  return async (dispatch) => {
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
  return async (dispatch) => {
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
  return (dispatch) => {
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
  return async (dispatch) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    }).catch(res => console.log(res));
  };
};

export const passwordReset = async (data) => {
  return async (data) => {
    return await api.passwordReset(data).then((res) => {
      if (res && res.success) {
        console.log(res);
      }
    }).catch(res => console.log(res));
  }
};