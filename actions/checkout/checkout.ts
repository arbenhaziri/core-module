import api from "core-module/services/api";

export const ORDER_BEGIN = "ORDER_BEGIN";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";
export const CLEAR_ACTION = "CLEAR_ACTION";

const orderBegin = () => ({
  type: ORDER_BEGIN,
});

const orderSuccess = (data) => ({
  type: ORDER_SUCCESS,
  payload: data,
});

const orderFailed = (error) => ({
  type: ORDER_FAILED,
  error: error,
});

export const clearAction = () => ({
  type: CLEAR_ACTION,
});

export const order = (product: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(orderBegin());
      const response = await api.post("/core/payments/order_product", product);
      dispatch(orderSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(orderFailed(error.response));
    }
  };
};
