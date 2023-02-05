import api from "core-module/services/api";
import StorageService from "core-module/services/storage.service";

/***************
 * ACTION TYPES
 ***************/
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const HIDE_MODAL_HEADER = "HIDE_MODAL_HEADER";
export const FILTER_BY_ID = "FILTER_BY_ID";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const GET_MARCHANTS_BEGIN = "GET_MARCHANTS_BEGIN";
export const GET_MARCHANTS_SUCCESS = "GET_MARCHANTS_SUCCESS";
export const GET_MARCHANTS_FAILED = "GET_MARCHANTS_FAILED";
export const SEARCH_DATA = "SEARCH_DATA";

export const openModal = ({ content, modalStyle = {}, type = "xl" }) => {
  return { type: OPEN_MODAL, payload: { content, type, modalStyle } };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const hideModalHeader = () => {
  return { type: HIDE_MODAL_HEADER };
};

export const getMarchantsBegin = () => ({
  type: GET_MARCHANTS_BEGIN,
});

export const getMarchantsSuccess = (data) => ({
  type: GET_MARCHANTS_SUCCESS,
  payload: data,
});

export const getMarchantsFailed = (error) => ({
  type: GET_MARCHANTS_FAILED,
  payload: error,
});

export const getMarchants = (account_number: String) => {
  return async (dispatch: any) => {
    try {
      dispatch(getMarchantsBegin());
      const response = await api.get(`/core/public/merchant/${account_number}/merchant_data`);
      account_number &&
        StorageService.setKeyValue("merchantData", {
          merchantNumber: account_number,
          calendar: response.data.calendar,
          city: response.data.city,
          street: response.data.street,
          merchant_name: response.data.merchant_name,
          longitude: response.data.longitude,
          latitude: response.data.latitude,
          opening_hours: response.data.opening_hours,
        });
      dispatch(getMarchantsSuccess(response.data));
    } catch (error) {
      dispatch(getMarchantsFailed(error));
    }
  };
};

export const filterByGroupId = (data: object) => {
  return { type: FILTER_BY_ID, payload: data };
};

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const SET_SEARCH_KEYS_INVOICES_AND_TIMEOFF = "SET_SEARCH_KEYS_INVOICES_AND_TIMEOFF";
export const setSearchKeys = (keys) => {
  return {
    type: SET_SEARCH_KEYS_INVOICES_AND_TIMEOFF,
    payload: keys,
  };
};

export const searchData = (keyword: String) => {
  return {
    type: SEARCH_DATA,
    keyword,
  };
};
