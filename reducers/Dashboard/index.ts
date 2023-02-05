import {
  GET_PRODUCT_ORDERS_BEGIN,
  GET_PRODUCT_ORDERS_SUCCESS,
  GET_PRODUCT_ORDERS_FAILED,
  DASHBOARD_SEARCH_DATA,
  SET_DATA_TO_RENDER,
  SET_SEARCH_KEYS,
  SET_COLUMN_PER_PAGE,
  SET_ORDER,
} from "../../actions/dashboard/dashboard";
import produce from "immer";
import { filterByProductGroup } from "core-module/utils/utils";
import Fuse from "fuse.js";
import shortUUID from "short-uuid";

const initialState: any = {
  data: [],
  filteredData: [],
  orderedProducts: [],
  diagnosticsData: [],
  consultationsData: [],
  testResultsData: [],
  columndPerPage: 10,
  order: "",
  filterByStatus: [
    {
      value: "",
      checked: false,
    },
  ],
  fuseSearch: new Fuse([], { keys: [], threshold: 0 }),
  searchKeyword: "",
  fuseOptions: {
    keys: [],
    threshold: 0,
  },
  action: {
    isLoading: true,
    error: null,
    message: "",
    isSuccess: false,
    actionName: null,
  },
};

const setId = (data) => {
  return data.map((el) => {
    return {
      ...el,
      uid: shortUUID.generate(),
    };
  });
};

const sortData = (filteredData: any, order: string) => {
  // const dataWithoutDate = filteredData.filter((el) => el.result_date === "");
  // const dataWithDate = filteredData.filter((el) => el.result_date !== "");

  if (order == "asc") {
    return filteredData.slice().sort((a, b) => Date.parse(b.booking_date) - Date.parse(a.booking_date));
    // .concat(dataWithoutDate);
  }
  if (order == "desc") {
    return filteredData.slice().sort((a, b) => Date.parse(a.booking_date) - Date.parse(b.booking_date));
  }
  // .concat(dataWithoutDate);
};

const dashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PRODUCT_ORDERS_BEGIN:
        draft.action.isLoading = true;
        draft.action.isSuccess = false;
        draft.action.error = null;
        break;
      case GET_PRODUCT_ORDERS_FAILED:
        draft.action.isLoading = false;
        draft.action.error = action.payload ? action.payload : "Unknown error";
        draft.action.isSuccess = false;
        draft.action.actionName = action.type;
        break;
      case GET_PRODUCT_ORDERS_SUCCESS: {
        return {
          ...state,
          orderedProducts: action.payload,
          diagnosticsData: setId(filterByProductGroup(action.payload, "D")),
          consultationsData: setId(filterByProductGroup(action.payload, "C")),
          testResultsData: action.payload.filter((e) => e.diagnose_result),
          action: {
            ...state.action,
            isLoading: false,
            isSuccess: true,
          },
        };
      }
      case SET_DATA_TO_RENDER: {
        return {
          ...state,
          data: action.payload,
          filteredData: action.payload,
          fuseSearch: new Fuse(action.payload, state.fuseOptions),
        };
      }
      case SET_SEARCH_KEYS: {
        return {
          ...state,
          fuseOptions: {
            ...state.fuseOptions,
            keys: action.payload,
          },
        };
      }
      case DASHBOARD_SEARCH_DATA: {
        return {
          ...state,
          filteredData:
            action.keyword !== "" ? state.fuseSearch.search(action.keyword).map((el) => el.item) : [...state.data],
          searchKeyword: action.keyword,
        };
      }
      case SET_COLUMN_PER_PAGE: {
        return {
          ...state,
          columndPerPage: action.payload,
        };
      }
      case SET_ORDER: {
        return {
          ...state,
          order: action.payload,
          filteredData: sortData(state.filteredData, action.payload),
        };
      }
      default:
        break;
    }
  });

export default dashboardReducer;
