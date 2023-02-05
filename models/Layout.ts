import { ActionIState } from "./Action";
export interface NavbarIState {
  action: ActionIState;
  selectedMenu?: { parent: String; child: String };
  selectedSidebar: String;
  productCategoryId?: String;
  isNavExpanded?: Boolean;
  isSubMenuExpanded?: Boolean;
  shoppingCart?: any[];
  isHovering?: Boolean;
  menuItems?: any[];
  showShoppingCartView?: Boolean;
  unBookedItems: any;
}
