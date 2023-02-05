import { SignupResendIState } from "./../../models/Authentication";
import { LoginParams } from "core-module/models";
import api from "core-module/services/api";
import StorageService from "core-module/services/storage.service";

export const AUTHORIZE_BEGIN = "AUTHORIZE_BEGIN";
export const AUTHORIZE_SUCCESS = "AUTHORIZE_SUCCESS";
export const AUTHORIZE_FAILED = "AUTHORIZE_FAILED";
export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_BEGIN = "LOGOUT_BEGIN";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const SIGNUP_RESEND_BEGIN = "SIGNUP_RESEND_BEGIN";
export const SIGNUP_RESEND_SUCCESS = "SIGNUP_RESEND_SUCCESS";
export const SIGNUP_RESEND_FAILED = "SIGNUP_RESEND_FAILED";
export const SIGNUP_BEGIN = "SIGNUP_BEGIN";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SET_PASSWORD_BEGIN = "SET_PASSWORD_BEGIN";
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_FAILED = "SET_PASSWORD_FAILED";
export const SET_PERSONAL_DETAILS_BEGIN = "SET_PERSONAL_DETAILS_BEGIN";
export const SET_PERSONAL_DETAILS_SUCCESS = "SET_PERSONAL_DETAILS_SUCCESS";
export const SET_PERSONAL_DETAILS_FAILED = "SET_PERSONAL_DETAILS_FAILED";
export const SET_PERSONAL_ADDRESS_BEGIN = "SET_PERSONAL_ADDRESS_BEGIN";
export const SET_PERSONAL_ADDRESS_SUCCESS = "SET_PERSONAL_ADDRESS_SUCCESS";
export const SET_PERSONAL_ADDRESS_FAILED = "SET_PERSONAL_ADDRESS_FAILED";
export const AUTHORIZATION_BEGIN = "AUTHORIZATION_BEGIN";
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED";
export const GET_USER_DATA_BEGIN = "GET_USER_DATA_BEGIN";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const VERIFY_EMAIL_BEGIN = "VERIFY_EMAIL_BEGIN";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_FAILED = "VERIFY_EMAIL_FAILED";
export const SET_PERSONAL_DETAILS_ATRIBUTE = "SET_PERSONAL_DETAILS_ATRIBUTE";
export const VERIFY_PHONE_BEGIN = "VERIFY_PHONE_BEGIN";
export const VERIFY_PHONE_SUCCESS = "VERIFY_PHONE_SUCCESS";
export const VERIFY_PHONE_FAILED = "VERIFY_PHONE_FAILED";

const getUserDataBegin = () => ({
  type: GET_USER_DATA_BEGIN,
});

const getUserDataSuccess = (data) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: data,
});

const getUserDataFailed = (error) => ({
  type: GET_USER_DATA_FAILED,
  error: error,
});

export const authorizeBegin = () => ({
  type: AUTHORIZE_BEGIN,
});

export const authorizeSuccess = (data) => ({
  type: AUTHORIZE_SUCCESS,
  payload: data,
});

export const authorizeFail = (error) => ({
  type: AUTHORIZE_FAILED,
  payload: error,
});

export const loginBegin = () => ({
  type: LOGIN_BEGIN,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const logoutBegin = () => ({
  type: LOGOUT_BEGIN,
});

export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});

export const logoutFail = (error) => ({
  type: LOGOUT_FAILED,
  payload: error,
});

export const signupResendBegin = () => ({
  type: SIGNUP_RESEND_BEGIN,
});

export const signupResendSuccess = (data) => ({
  type: SIGNUP_RESEND_SUCCESS,
  payload: data,
});

export const signupResendFail = (error) => ({
  type: SIGNUP_RESEND_FAILED,
  payload: error,
});

export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupSuccess = (statusCode) => ({
  type: SIGNUP_SUCCESS,
  payload: statusCode,
});

export const signupFail = (error) => ({
  type: SIGNUP_FAILED,
  payload: error,
});

export const setPasswordBegin = () => ({
  type: SET_PASSWORD_BEGIN,
});

export const setPasswordSuccess = (data) => ({
  type: SET_PASSWORD_SUCCESS,
  payload: data,
});

export const setPasswordFailed = (error) => ({
  type: SET_PASSWORD_FAILED,
  payload: error,
});

export const setPersonalDetailsBegin = () => ({
  type: SET_PERSONAL_DETAILS_BEGIN,
});

export const setPersonalDetailsSuccess = (data) => ({
  type: SET_PERSONAL_DETAILS_SUCCESS,
  payload: data,
});

export const setPersonalDetailsFailed = (error) => ({
  type: SET_PERSONAL_DETAILS_FAILED,
  payload: error,
});

export const setPersonalAddresBegin = () => ({
  type: SET_PERSONAL_ADDRESS_BEGIN,
});

export const setPersonalAddresSuccess = (data) => ({
  type: SET_PERSONAL_ADDRESS_SUCCESS,
  payload: data,
});

export const setPersonalAddresFailed = (error) => ({
  type: SET_PERSONAL_ADDRESS_FAILED,
  payload: error,
});

export const authorizationBegin = () => ({
  type: AUTHORIZATION_BEGIN,
});

export const authorizationSuccess = (response) => ({
  type: AUTHORIZATION_SUCCESS,
  payload: response,
});

export const authorizationFailed = (error) => ({
  type: AUTHORIZATION_FAILED,
  payload: error,
});

export const verifyEmailBegin = () => ({
  type: VERIFY_EMAIL_BEGIN,
});

export const verifyEmailSuccess = (response) => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload: response,
});

export const verifyEmailFailed = (error) => ({
  type: VERIFY_EMAIL_FAILED,
  payload: error,
});

export const setPersonalDetailsAtribute = (key, value) => {
  return {
    type: SET_PERSONAL_DETAILS_ATRIBUTE,
    key,
    value,
  };
};

export const verifyPhoneBegin = () => ({
  type: VERIFY_PHONE_BEGIN,
});

export const verifyPhoneSuccess = (response) => ({
  type: VERIFY_PHONE_SUCCESS,
  payload: response,
});

export const verifyPhoneFailed = (error) => ({
  type: VERIFY_PHONE_FAILED,
  payload: error,
});

export const authorize = () => {
  return async (dispatch: any) => {
    try {
      dispatch(authorizeBegin());
      const response = await api.get("/ident/oauth/authorize");
      dispatch(authorizeSuccess(response.data));
      return response.data.idp_state;
    } catch (error) {
      dispatch(authorizeFail(error.response.data));
    }
  };
};

export const login = (loginData: LoginParams) => {
  return async (dispatch: any) => {
    try {
      const idpState = await dispatch(authorize());
      dispatch(loginBegin());
      let request = {
        idp_state: idpState,
        username: loginData.username,
        password: loginData.password,
      };
      const response = await api.post("/ident/oauth/login", request);
      StorageService.setKeyValue("loginInterface", {
        exp: response.data.exp,
        idp_state: response.data.idp_state,
      });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    try {
      dispatch(logoutBegin());
      const response = await api.post("/ident/oauth/logout");
      dispatch(logoutSuccess(response.data));
    } catch (error) {
      dispatch(logoutFail(error.response.data));
    }
  };
};

export const signupResend = (data: SignupResendIState) => {
  return async (dispatch: any) => {
    try {
      dispatch(signupResendBegin());
      const response = await api.post("/ident/oauth/signup_email", data);
      dispatch(signupResendSuccess(response.data));
    } catch (error) {
      dispatch(signupResendFail(error.response.data));
    }
  };
};

export const signup = (data: any) => {
  return async (dispatch: any) => {
    try {
      const idpState = await dispatch(authorize());
      dispatch(signupBegin());
      await api.post("/ident/oauth/signup", {
        ...data,
        idp_state: idpState,
      });
    } catch (error) {
      if (error.response.status === 401) {
        StorageService.setKeyValue("tokenidp", error.response.data.idp_state);
        dispatch(signupSuccess(error.response.status));
      } else dispatch(signupFail(error.response.data));
    }
  };
};

export const verify = (data: any) => {
  return async (dispatch: any) => {
    const idpState = await dispatch(authorize());
    dispatch(verifyEmailBegin());
    try {
      await api.post("/ident/oauth/verify", {
        ...data,
        idp_state: idpState,
      });
    } catch (error) {
      if (error.response.status === 401) {
        StorageService.setKeyValue("tokenidp", error.response.data.idp_state);
        dispatch(verifyEmailSuccess(error.response.data));
      } else dispatch(verifyEmailFailed(error.response.data));
    }
  };
};

export const setPassword = (data: any) => {
  return async (dispatch: any) => {
    try {
      await dispatch(authorize());
      dispatch(setPasswordBegin());
      const response = await api.post("/ident/oauth/set_password", {
        ...data,
        idp_state: StorageService.getDataByKey("tokenidp"),
      });
      dispatch(setPasswordSuccess(response.data));
      StorageService.removeCookie("tokenidp");
    } catch (error) {
      dispatch(setPasswordFailed(error.response.data));
    }
  };
};

export const setPersonalDetails = (data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setPersonalDetailsBegin());
      const response = await api.put("/ident/self/person", data);
      dispatch(setPersonalDetailsSuccess(response.data));
    } catch (error) {
      dispatch(setPersonalDetailsFailed(error.response.data));
    }
  };
};

export const setPersonalAddress = (data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setPersonalAddresBegin());
      const response = await api.post("/ident/self/address", data);
      dispatch(setPersonalAddresSuccess(response.data));
    } catch (error) {
      dispatch(setPersonalAddresFailed(error.response.data));
    }
  };
};

export const verifyPhone = (phone_number: string) => {
  return async (dispatch: any) => {
    dispatch(verifyPhoneBegin());
    try {
      const response = await api.post("/ident/self/phone", phone_number);
      dispatch(verifyPhoneSuccess(response));
    } catch (error) {
      dispatch(verifyPhoneFailed(error.response.data));
    }
  };
};

export const authorization = () => {
  return async (dispatch: any) => {
    dispatch(authorizationBegin());
    try {
      const response = await api.get("/core/person/authorization");
      dispatch(authorizationSuccess(response));
    } catch (error) {
      dispatch(authorizationFailed(error?.response?.data));
    }
  };
};

export const getAccount = () => {
  return async () => {
    try {
      return await api.get("/core/account");
    } catch (error) {
      console.debug("error", error);
    }
  };
};

export const getAddress = () => {
  return async () => {
    try {
      return await api.get("/ident/self/address");
    } catch (error) {
      console.debug("error", error);
    }
  };
};

export const getPhone = () => {
  return async () => {
    try {
      return await api.get("/ident/self/phone");
    } catch (error) {
      console.debug("error", error);
    }
  };
};

export const getPerson = () => {
  return async () => {
    try {
      return await api.get("/ident/person");
    } catch (error) {
      console.debug("error", error);
    }
  };
};

export const getSettings = () => {
  return async () => {
    try {
      return await api.get("/ident/self/settings");
    } catch (error) {
      console.debug("error", error);
    }
  };
};

export const getUserData = () => {
  return (dispatch: any) => {
    try {
      dispatch(getUserDataBegin());
      Promise.all([
        dispatch(getAccount()),
        dispatch(getAddress()),
        // dispatch(getPhone()),
        // dispatch(getPerson()),
        // dispatch(getSettings()),
      ]).then((value) => {
        dispatch(getUserDataSuccess(value));
      });
    } catch (error) {
      dispatch(getUserDataFailed(error));
    }
  };
};

export const getSelfToken = () => {
  return async () => {
    try {
      const response = await api.get("/ident/self/token");
      return response?.data?.token;
    } catch (error) {
      console.debug(error);
    }
  };
};
