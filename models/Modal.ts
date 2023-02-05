import { ReactNode } from "react";

export interface ModalIState {
  openModal?: boolean;
  closeModal?: boolean;
  modalContent?: ReactNode;
  modalStyle?: React.CSSProperties;
  type?: string;
  hideModalHeader?: boolean;
}

export enum modalTypes {
  sm = "sm",
  md = "md",
  xl = "xl",
}
