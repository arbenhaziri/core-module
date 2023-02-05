import { ActionIState } from "./Action";
export interface AuthenticationIState {
  userProfile: any;
  exp: number;
  idp_state: string;
  isLoggedIn: boolean;
  action: ActionIState;
  userData: any;
}

export interface LoginParams {
  idp_state?: string;
  username: string;
  password: string;
}
export interface SignupResendIState {
  idp_state?: string;
  email_address?: string;
}
export interface PhoneIState {
  phone_number: string;
  default_region?: string;
}
export interface AddressIState {
  address_type?: string;
  street?: string;
  building_identifier?: string;
  suite_identifier?: string;
  floor_identifier?: string;
  district_name?: string;
  post_box?: string;
  post_code?: string;
  city: string;
  country_subentity?: string;
  country: string;
  longitude?: number;
  latitude?: number;
  webaddress?: string;
}
export default interface SignUpIState {
  idp_state: string;
  sex?: string;
  given_name: string;
  name: string;
  email_address: string;
  phone: PhoneIState;
  address?: AddressIState;
  referral_code?: string;
  language: string;
  testlanguage?: string[];
  companion_code?: string;
  birth_date?: string;
  birth_city?: string;
  account_number?: string;
  person_id?: number;
  passport?: string;
  nationality?: string;
  newsletter?: boolean;
}
