import { createReducer, on } from '@ngrx/store';
import * as AddressActions from './address.actions';

export interface AddressState {
  _id: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  mobile: string;
  is_default: boolean;
}

export interface AddressStoreState {
  addresses: AddressState[];
}

export const initialState: AddressStoreState = {
  addresses: []
};

export const addressReducer = createReducer(

  initialState,

  // Set all addresses
  on(AddressActions.setAddresses, (state, { addresses }) => ({
    ...state,
    addresses
  })),

  // Add new address
  on(AddressActions.addAddress, (state, { address }) => ({
    ...state,
    addresses: [...state.addresses, address]
  })),

  // Update address
  on(AddressActions.updateAddress, (state, { address }) => ({
    ...state,
    addresses: state.addresses.map(item =>
      item._id === address._id ? address : item
    )
  })),

  // Delete address
  on(AddressActions.deleteAddress, (state, { _id }) => ({
    ...state,
    addresses: state.addresses.filter(item => item._id !== _id)
  })),

  // Clear addresses
  on(AddressActions.clearAddresses, () => initialState)

);