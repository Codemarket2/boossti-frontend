export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER';
export const INITIAL_AUTHED_USER = 'INITIAL_AUTHED_USER';
export const USER_SUBSCRIPTION_DATA = 'USER_SUBSCRIPTION_DATA';

export interface IAttributes {
  sub: string;
  email: string;
  name: string;
  picture: string;
  email_verified?: boolean;
}

export interface IUserPayload {
  admin: boolean;
  attributes: IAttributes;
}

export function setAuthUser(user: IUserPayload) {
  return {
    type: SET_AUTHED_USER,
    user,
  };
}

export function unsetAuthUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}

export function initialAuthUser() {
  return {
    type: INITIAL_AUTHED_USER,
  };
}

export function userSubscriptionData(user: any) {
  return {
    type: USER_SUBSCRIPTION_DATA,
    user,
  };
}
