import produce from "immer";
import { ModalIState } from "models";
import { CLOSE_MODAL, HIDE_MODAL_HEADER, OPEN_MODAL } from "actions/home/home";

const initialState: ModalIState = {
  openModal: false,
  closeModal: false,
  modalContent: null,
  modalStyle: null,
  hideModalHeader: false,
  type: null,
};

const modalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPEN_MODAL:
        draft.openModal = null;
        draft.modalContent = null;
        draft.openModal = true;
        draft.modalContent = action.payload.content;
        draft.modalStyle = action.payload.modalStyle;
        draft.type = action.payload.type;
        break;
      case CLOSE_MODAL:
        draft.openModal = null;
        draft.openModal = false;
        draft.hideModalHeader = false;
        break;
      case HIDE_MODAL_HEADER:
        draft.hideModalHeader = true;
        break;
      default:
        break;
    }
  });

export default modalReducer;
