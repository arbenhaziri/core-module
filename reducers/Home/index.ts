import { HomePageIState } from "models";
import { home } from "actions";
import Fuse from "fuse.js";

const initialState: HomePageIState = {
  merchantData: null,
  products: [],
  filteredProducts: [],
  fuseSearch: new Fuse([], { keys: [], threshold: 0 }),
  fuseOptions: {
    keys: ["name", "price"],
    // threshold: 0,
  },
  searchKeyword: "",
  action: {
    isLoading: true,
    error: null,
    message: "",
    isSuccess: false,
  },
};

export const filterById = (data: any, products: any) => {
  let selectTestType = data.menuItems.filter((item: any) => item.product_category_id.toString() === data.id);
  return products?.filter((item: any) => selectTestType[0]?.product_test_types?.includes(item.type_of_test));
};

const homePageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case home.GET_MARCHANTS_BEGIN:
      return {
        ...state,
        action: {
          ...state.action,
          isLoading: true,
        },
      };
    case home.GET_MARCHANTS_FAILED:
      return {
        ...state,
        action: {
          ...state.action,
          isLoading: false,
          error: action.payload ? action.payload : "Unknown error",
        },
      };
    case home.GET_MARCHANTS_SUCCESS:
      return {
        ...state,
        merchantData: action.payload,
        products: action.payload.products,
        filteredProducts: action.payload.products,
        fuseSearch: new Fuse(action.payload.products, state.fuseOptions),
        action: {
          ...state.action,
          isLoading: false,
          isSuccess: true,
        },
      };
    case home.FILTER_BY_ID:
      const filteredProducts = filterById(action.payload, state.products);
      return {
        ...state,
        filteredProducts: filteredProducts,
        fuseSearch: new Fuse(filteredProducts, state.fuseOptions),
      };
    case home.CLEAR_FILTER:
      return {
        ...state,
        filteredProducts: state.products,
        fuseSearch: new Fuse(state.products, state.fuseOptions),
      };
    case home.SEARCH_DATA:
      return {
        ...state,
        searchKeyword: action.keyword,
        filteredProducts:
          action.keyword !== "" ? state.fuseSearch.search(action.keyword).map((el) => el.item) : [...state.products],
      };
    default: {
      return state;
    }
  }
};

export default homePageReducer;
