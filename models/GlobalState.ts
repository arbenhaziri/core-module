import { AuthenticationIState } from "./Authentication";
import { HomePageIState, ModalIState, NavbarIState } from ".";

export interface GlobalIState {
  modalReducer?: ModalIState;
  homePageReducer?: HomePageIState;
  layoutReducer?: NavbarIState;
  authenticationReducer?: AuthenticationIState;
}
