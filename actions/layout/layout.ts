import api from "services/api";
import { menuItemsMapped } from "utils/utils";

/***************
 * ACTION TYPES
 ***************/
export const SET_IS_NAV_EXPANDED = "SET_IS_NAV_EXPANDED";
export const SET_SELECTED_MENU = "SET_SELECTED_MENU";
export const SET_IS_SUB_MENU_EXPANDED = "SET_IS_SUB_MENU_EXPANDED";
export const SET_SHOPPING_CART_STATE = "SET_SHOPPING_CART_STATE";
export const SET_IS_HOVERING = "SET_IS_HOVERING";
export const SET_MENU_ITEMS = "SET_MENU_ITEMS";
export const GET_MENUITEMS_BEGIN = "GET_MENUITEMS_BEGIN";
export const GET_MENUITEMS_SUCCESS = "GET_MENUITEMS_SUCCESS";
export const GET_MENUITEMS_FAILED = "GET_MENUITEMS_FAILED";
export const SET_SHOW_SHOPPING_CART_VIEW = "SET_SHOW_SHOPPING_CART_VIEW";
export const DELETE_SHOPPING_CART = "DELETE_SHOPPING_CART";
export const DELETE_SELECTED_CART = "DELETE_SELECTED_CART";
export const HANDLE_QUANTITY = "HANDLE_QUANTITY";
export const CLEAR_SHOPPING_CART = "CLEAR_SHOPPING_CART";
export const SELECT_CART_ITEM = "SELECT_CART_ITEM";
export const SET_BOOK_APPOINTMENT_PROPS = "SET_BOOK_APPOINTMENT_PROPS";
export const CLEAR_ACTION_LAYOUT = "CLEAR_ACTION_LAYOUT";
export const SET_UN_BOOKED_ITEMS = "SET_UN_BOOKED_ITEMS";
export const SELECT_SIDEBAR = "SELECT_SIDEBAR";
export const POPULATE_SHOPPING_CART = "POPULATE_SHOPPING_CART";

export const setSelectedMenu = (id: any, isChild: Boolean) => {
  return {
    type: SET_SELECTED_MENU,
    payload: { id, isChild },
  };
};

export const setIsNavExpanded = (data: Boolean) => {
  return {
    type: SET_IS_NAV_EXPANDED,
    payload: data,
  };
};

export const setIsSubMenuExpanded = (data: Boolean) => {
  return {
    type: SET_IS_SUB_MENU_EXPANDED,
    payload: data,
  };
};

export const setIsHovering = (data: Boolean) => {
  return {
    type: SET_IS_HOVERING,
    payload: data,
  };
};

export const getMenuItemsBegin = () => ({
  type: GET_MENUITEMS_BEGIN,
});

export const getMenuItemsSuccess = (data) => ({
  type: GET_MENUITEMS_SUCCESS,
  payload: data,
});

export const getMenuItemsFailed = (error: any) => ({
  type: GET_MENUITEMS_FAILED,
  payload: error,
});

export const setShowShoppingCartView = (data: Boolean) => {
  return {
    type: SET_SHOW_SHOPPING_CART_VIEW,
    payload: data,
  };
};

export const populateShoppingCart = (data: any) => {
  return {
    type: POPULATE_SHOPPING_CART,
    payload: data,
  };
};

export const getMenuItems = (id: number) => {
  return async (dispatch: any) => {
    try {
      dispatch(getMenuItemsBegin());
      const response = await api.get(`/core/public/merchant/product_categories?product_category_id=${id}`);
      dispatch(getMenuItemsSuccess(menuItemsMapped(response.data)));
    } catch (error) {
      dispatch(getMenuItemsFailed(error));
    }
  };
};

export const selectSidebar = (sidebar_nav: string) => {
  return {
    type: SELECT_SIDEBAR,
    sidebar_nav,
  };
};

// ******************
// CART_ITEM ACTIONS
// ******************

export const setShoppingCartState = (data: Boolean) => {
  return {
    type: SET_SHOPPING_CART_STATE,
    payload: data,
  };
};

export const deleteShoppingCart = (id: string) => {
  return {
    type: DELETE_SHOPPING_CART,
    payload: id,
  };
};

export const deleteSelectedCart = () => {
  return {
    type: DELETE_SELECTED_CART,
  };
};

export const handleQuantity = (operation: string, id: string) => {
  return {
    type: HANDLE_QUANTITY,
    payload: { operation, id },
  };
};

export const selectCartItem = (id: string) => {
  return {
    type: SELECT_CART_ITEM,
    payload: id,
  };
};

export const clearShoppingCart = () => {
  return {
    type: CLEAR_SHOPPING_CART,
  };
};

export const setBookAppointmentProps = (id: string, props: any) => {
  return {
    type: SET_BOOK_APPOINTMENT_PROPS,
    id,
    props,
  };
};

export const setUnBookedItems = (prducts: Array<object>) => {
  return {
    type: SET_UN_BOOKED_ITEMS,
    payload: prducts,
  };
};

export const clearAction = () => {
  return {
    type: CLEAR_ACTION_LAYOUT,
  };
};
// ***************
// ***************
