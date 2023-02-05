import { CLEAR_ACTION, ORDER_BEGIN, ORDER_FAILED, ORDER_SUCCESS } from "./../../actions/checkout/checkout";
import produce from "immer";

const initialState: any = {
  orderData: null,
  action: {
    isLoading: false,
    error: null,
    message: "",
    isSuccess: false,
    actionName: null,
  },
};

const checkoutReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ORDER_BEGIN:
        draft.action.isLoading = true;
        draft.action.isSuccess = false;
        draft.action.error = null;
        break;
      case ORDER_FAILED:
        draft.action.isLoading = false;
        draft.action.error = action.payload ? action.payload : "Unknown error";
        draft.action.isSuccess = false;
        draft.action.actionName = action.type;
        break;
      case ORDER_SUCCESS:
        draft.action.isLoading = false;
        draft.action.isSuccess = true;
        break;
      case CLEAR_ACTION:
        draft.action = initialState.action;
        break;
      default:
        break;
    }
  });

export default checkoutReducer;
