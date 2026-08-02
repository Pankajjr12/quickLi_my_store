import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';

export interface OrderState {
  order: OrderActions.Order[];
}

export const initialState: OrderState = {
  order: []
};

export const orderReducer = createReducer(

  initialState,

  on(OrderActions.setOrder, (state, { order }) => ({
    ...state,
    order: [...order]
  })),

  on(OrderActions.clearOrder, () => initialState)

);