import { createAction, props } from '@ngrx/store';
import { AddressState } from './address.reducer';

export const setAddresses = createAction(
  '[Address] Set Addresses',
  props<{ addresses: AddressState[] }>()
);

export const addAddress = createAction(
  '[Address] Add Address',
  props<{ address: AddressState }>()
);

export const updateAddress = createAction(
  '[Address] Update Address',
  props<{ address: AddressState }>()
);

export const deleteAddress = createAction(
  '[Address] Delete Address',
  props<{ _id: string }>()
);

export const clearAddresses = createAction(
  '[Address] Clear Addresses'
);