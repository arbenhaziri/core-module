import api from "core-module/services/api";
export const GET_PRODUCT_ORDERS_BEGIN = "GET_PRODUCT_ORDERS_BEGIN";
export const GET_PRODUCT_ORDERS_SUCCESS = "GET_PRODUCT_ORDERS_SUCCESS";
export const GET_PRODUCT_ORDERS_FAILED = "GET_PRODUCT_ORDERS_FAILED";

const getProductOrdersBegin = () => ({
  type: GET_PRODUCT_ORDERS_BEGIN,
});

const getProductOrdersSuccess = (data) => ({
  type: GET_PRODUCT_ORDERS_SUCCESS,
  payload: data,
});

const getProductOrdersFailed = (error) => ({
  type: GET_PRODUCT_ORDERS_FAILED,
  error: error,
});

export const getProductOrders = (accountNumber: string, dateFrom: string, dateTo: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(getProductOrdersBegin());
      const response = await api.get(`/core/account/${accountNumber}/product_orders`, {
        params: {
          date_from: dateFrom,
          date_to: dateTo,
        },
      });
      dispatch(getProductOrdersSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(getProductOrdersFailed(error.response));
    }
  };
};

export const DASHBOARD_SEARCH_DATA = "DASHBOARD_SEARCH_DATA";
export const dashboardSearchData = (keyword: string) => {
  return {
    type: DASHBOARD_SEARCH_DATA,
    keyword,
  };
};

export const SET_SEARCH_KEYS = "SET_SEARCH_KEYS";
export const setSearchKeys = (keys: Array<string>) => {
  return {
    type: SET_SEARCH_KEYS,
    payload: keys,
  };
};

export const SET_DATA_TO_RENDER = "SET_DATA_TO_RENDER";
export const setDataToRender = (dataToRender: any) => {
  return {
    type: SET_DATA_TO_RENDER,
    payload: dataToRender,
  };
};

export const SET_COLUMN_PER_PAGE = "SET_COLUMN_PER_PAGE";
export const setColumnPerPage = (value: number) => {
  return {
    type: SET_COLUMN_PER_PAGE,
    payload: value,
  };
};

export const SET_ORDER = "SET_ORDER";
export const setOrder = (value: string) => {
  return {
    type: SET_ORDER,
    payload: value,
  };
};
