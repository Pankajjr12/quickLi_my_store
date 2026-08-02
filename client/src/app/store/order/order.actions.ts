import { createAction, props } from '@ngrx/store';

export interface Order {
  _id: string;
  orderId: string;
  totalAmt: number;
  status: string;
  createdAt: string;
  // Add other fields returned by your API
}

export const setOrder = createAction(
  '[Order] Set Order',
  props<{ order: Order[] }>()
);

export const clearOrder = createAction(
  '[Order] Clear Order'
);