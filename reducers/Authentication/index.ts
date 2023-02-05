import produce from "immer";
import { AuthenticationIState } from "./../../models/Authentication";
import { authentication } from "actions";
import { reMapUserProfile } from "utils/utils";

const initialState: AuthenticationIState = {
  userProfile: null,
  exp: null,
  idp_state: null,
  isLoggedIn: false,
  action: {
    isLoading: true,
    error: null,
    message: "",
    isSuccess: false,
    actionName: null,
    statusCode: null,
  },
  userData: null,
};

const authenticationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case authentication.LOGIN_BEGIN:
      case authentication.AUTHORIZE_BEGIN:
      case authentication.LOGOUT_BEGIN:
      case authentication.SIGNUP_RESEND_BEGIN:
      case authentication.SIGNUP_BEGIN:
      case authentication.SET_PASSWORD_BEGIN:
      case authentication.SET_PERSONAL_DETAILS_BEGIN:
      case authentication.SET_PERSONAL_ADDRESS_BEGIN:
      case authentication.AUTHORIZATION_BEGIN:
      case authentication.GET_USER_DATA_BEGIN:
      case authentication.VERIFY_EMAIL_BEGIN:
      case authentication.VERIFY_PHONE_BEGIN:
        draft.action.isLoading = true;
        draft.action.isSuccess = false;
        draft.action.error = null;
        draft.action.actionName = action.type;
        break;
      case authentication.AUTHORIZATION_FAILED:
        draft.action.isLoading = false;
        draft.action.error = action.payload ? action.payload : "Unknown error";
        draft.action.isSuccess = false;
        draft.isLoggedIn = false;
        break;
      case authentication.LOGIN_FAILED:
      case authentication.AUTHORIZE_FAILED:
      case authentication.LOGOUT_FAILED:
      case authentication.SIGNUP_RESEND_FAILED:
      case authentication.SIGNUP_FAILED:
      case authentication.SET_PASSWORD_FAILED:
      case authentication.SET_PERSONAL_DETAILS_FAILED:
      case authentication.SET_PERSONAL_ADDRESS_FAILED:
      case authentication.VERIFY_EMAIL_FAILED:
      case authentication.VERIFY_PHONE_FAILED:
        draft.action.isLoading = false;
        draft.action.error = action.payload ? action.payload : "Unknown error";
        draft.action.isSuccess = false;
        draft.action.actionName = action.type;
        break;
      case authentication.AUTHORIZE_SUCCESS:
        draft.exp = action.payload.exp;
        draft.idp_state = action.payload.idp_state;
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        break;
      case authentication.LOGIN_SUCCESS:
        draft.isLoggedIn = true;
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        break;
      case authentication.LOGOUT_SUCCESS:
        draft.isLoggedIn = false;
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        break;
      case authentication.AUTHORIZATION_SUCCESS:
        draft.isLoggedIn = true;
        draft.action.isLoading = true;
        draft.action.isSuccess = true;
        break;
      case authentication.GET_USER_DATA_SUCCESS: {
        return {
          ...state,
          userProfile: reMapUserProfile(action.payload),
          action: {
            ...state.action,
            isLoading: false,
            isSuccess: true,
          },
        };
      }
      case authentication.SET_PERSONAL_ADDRESS_SUCCESS:
      case authentication.SIGNUP_RESEND_SUCCESS:
      case authentication.VERIFY_EMAIL_SUCCESS:
      case authentication.VERIFY_PHONE_SUCCESS:
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        draft.action.statusCode = 200;
        break;
      case authentication.SIGNUP_SUCCESS:
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        draft.action.statusCode = null;
        draft.action.statusCode = action.payload;
        break;
      case authentication.SET_PERSONAL_DETAILS_SUCCESS:
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        draft.action.statusCode = null;
        draft.action.statusCode = 204;
        break;
      case authentication.SET_PERSONAL_DETAILS_ATRIBUTE:
        draft.userData = {
          ...draft.userData,
          [action.key]: action.value,
        };
        break;
      case authentication.SET_PASSWORD_SUCCESS:
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        draft.action.statusCode = null;
        draft.isLoggedIn = true;
        break;
      default:
        break;
    }
  });

export default authenticationReducer;
