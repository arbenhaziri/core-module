import { ActionIState } from "./Action";

type fuseOptions = {
  keys: Array<string>;
  // threshold: Number;
};
export interface HomePageIState {
  action: ActionIState;
  merchantData?: any;
  products: any;
  filteredProducts: any;
  fuseSearch: any;
  fuseOptions: fuseOptions;
  searchKeyword: String;
}
