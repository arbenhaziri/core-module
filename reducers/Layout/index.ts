import { NavbarIState } from "models";
import produce from "immer";
import { layout } from "actions";
import { handleQuantity } from "core-module/utils/utils";

const initialState: NavbarIState = {
  selectedMenu: { parent: "ALL PRODUCTS", child: "" },
  selectedSidebar: "",
  productCategoryId: null,
  isNavExpanded: null,
  isSubMenuExpanded: null,
  shoppingCart: [],
  isHovering: false,
  menuItems: [],
  unBookedItems: [],
  action: {
    isLoading: false,
    error: null,
    message: "",
    isSuccess: false,
    actionName: "",
  },
  showShoppingCartView: false,
};

const getSelectedMenu = (id, menuItems) => {
  if (id === "") return { parent: "ALL PRODUCTS", child: "" };
  let parent = menuItems.find((item: any) => item?.product_category_id.toString() === id?.toString())?.product_category;
  let child = menuItems
    .map((item) => item.childItems)
    .flat(2)
    .find((item: any) => item?.product_category_id.toString() === id?.toString())?.product_category;

  if (child)
    parent = menuItems.find((item: any) =>
      item.childItems.some((i) => i?.product_category_id.toString() === id?.toString())
    )?.product_category;

  return { parent, child };
};

const handleBookAppointmentProps = (id: string, shoppingCarts: any, props: any) => {
  return shoppingCarts.map((el) => {
    if (el.product_id === id) {
      return {
        ...el,
        _bookAppointment: props,
      };
    }
    return el;
  });
};

const layoutReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case layout.SET_SELECTED_MENU:
        const selectedMenu = getSelectedMenu(action.payload.id, state.menuItems);
        draft.selectedMenu = { parent: selectedMenu.parent, child: selectedMenu.child ? selectedMenu.child : "" };
        draft.productCategoryId = action.payload.id;
        break;
      case layout.SET_IS_NAV_EXPANDED:
        draft.isNavExpanded = null;
        draft.isNavExpanded = action.payload;
        break;
      case layout.SET_IS_SUB_MENU_EXPANDED:
        draft.isSubMenuExpanded = null;
        draft.isSubMenuExpanded = action.payload;
        break;
      case layout.SET_IS_HOVERING:
        draft.isHovering = null;
        draft.isHovering = action.payload;
        break;
      case layout.SET_MENU_ITEMS:
        draft.menuItems = null;
        draft.menuItems = action.payload;
        break;
      case layout.SET_SHOW_SHOPPING_CART_VIEW:
        draft.showShoppingCartView = action.payload;
        break;
      case layout.GET_MENUITEMS_BEGIN:
        return {
          ...state,
          action: {
            ...state.action,
            isLoading: true,
          },
        };
      case layout.GET_MENUITEMS_SUCCESS:
        return {
          ...state,
          action: {
            ...state.action,
            isLoading: false,
            isSuccess: true,
          },
          menuItems: action.payload,
        };
      case layout.GET_MENUITEMS_FAILED: {
        return {
          ...state,
          action: {
            ...state.action,
            isLoading: false,
            error: action.payload ? action.payload : "Unknown error",
          },
        };
      }
      case layout.SET_SHOPPING_CART_STATE: {
        if (draft.shoppingCart.length >= 1) break;
        const index = draft.shoppingCart.findIndex((product) => product.product_id === action.payload.product_id);
        if (index === -1) {
          const newCartItem = {
            ...action.payload,
            _selected: false,
            _quantity: 1,
            _subtotal: action.payload.price / 100,
            _bookAppointment: null,
          };
          draft.shoppingCart = [...draft.shoppingCart, newCartItem];
          localStorage.setItem("shoppingCart", JSON.stringify([...draft.shoppingCart]));
        } else console.log("Item is already in shopping cart");
        break;
      }
      case layout.DELETE_SHOPPING_CART: {
        const filteredData = state.shoppingCart.filter((el) => {
          return el.product_id !== action.payload;
        });
        localStorage.setItem("shoppingCart", JSON.stringify([...filteredData]));
        return {
          ...state,
          shoppingCart: [...filteredData],
        };
      }
      case layout.SELECT_CART_ITEM: {
        const data = state.shoppingCart.map((el) => {
          if (el.product_id === action.payload)
            return {
              ...el,
              _selected: !el._selected,
            };

          return el;
        });
        localStorage.setItem("shoppingCart", JSON.stringify([...data]));
        return {
          ...state,
          shoppingCart: [...data],
        };
      }
      case layout.DELETE_SELECTED_CART: {
        const filteredData = state.shoppingCart.filter((el) => !el._selected);
        localStorage.setItem("shoppingCart", JSON.stringify([...filteredData]));
        return {
          ...state,
          shoppingCart: [...filteredData],
        };
      }
      case layout.HANDLE_QUANTITY: {
        const data = handleQuantity(action.payload.id, action.payload.operation, state.shoppingCart);
        localStorage.setItem("shoppingCart", JSON.stringify([...data]));
        return {
          ...state,
          shoppingCart: [...data],
        };
      }
      case layout.POPULATE_SHOPPING_CART: {
        return {
          ...state,
          shoppingCart: action.payload,
        };
      }
      case layout.CLEAR_SHOPPING_CART: {
        localStorage.setItem("shoppingCart", JSON.stringify([]));
        return {
          ...state,
          shoppingCart: [],
        };
      }
      case layout.SET_BOOK_APPOINTMENT_PROPS: {
        const data = handleBookAppointmentProps(action.id, state.shoppingCart, action.props);
        localStorage.setItem("shoppingCart", JSON.stringify([...data]));
        return {
          ...state,
          shoppingCart: [...data],
          action: {
            ...state.action,
            actionName: action.type,
          },
        };
      }
      case layout.SET_UN_BOOKED_ITEMS: {
        return {
          ...state,
          unBookedItems: action.payload,
        };
      }
      case layout.CLEAR_ACTION_LAYOUT: {
        return {
          ...state,
          action: {
            ...initialState.action,
          },
        };
      }
      case layout.SELECT_SIDEBAR: {
        return {
          ...state,
          selectedSidebar: action.sidebar_nav,
        };
      }
      default: {
        return state;
      }
    }
  });

export default layoutReducer;
