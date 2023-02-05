export default interface OrderProduct {
  account_number: string;
  merchant_account_number: string;
  items: Item[];
  passport_number?: string;
  delivery_note?: string;
  delivery_date?: string;
  nationality?: string;
  appointment?: Appointment;
  payment_method?: string;
  voucher_code?: string;
  package_memo?: string;
}

export interface Item {
  quantity: number;
  product_id: number;
  languages: string[];
  test_reason_id?: number;
  method_taken_id?: number;
}

export interface Appointment {
  start: string;
  end: string;
}
