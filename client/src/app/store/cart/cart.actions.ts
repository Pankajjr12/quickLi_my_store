import { createAction, props } from '@ngrx/store';


export const setCartItems = createAction(
  '[Cart] Set Cart Items',
  props<{ cart: any[] }>()
);


export const clearCart = createAction(
  '[Cart] Clear Cart'
);