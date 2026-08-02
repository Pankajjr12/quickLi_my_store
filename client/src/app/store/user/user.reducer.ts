import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  mobile: string;
  verify_email: string;
  last_login_date: string;
  status: string;
  address_details: any[];
  shopping_cart: any[];
  orderHistory: any[];
  role: string;
}

export const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  avatar: '',
  mobile: '',
  verify_email: '',
  last_login_date: '',
  status: '',
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: ''
};

export const userReducer = createReducer(

  initialState,

  on(UserActions.setUserDetails, (state, { user }) => {

    console.log("Reducer received", user);

    return {
        ...state,
        ...user
    };

}),

  on(UserActions.updatedAvatar, (state, { avatar }) => ({
    ...state,
    avatar
  })),

  on(UserActions.logout, () => ({
    ...initialState
  }))
);