import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';


export interface CartState {

  cart: any[];

}


export const initialState: CartState = {

  cart: []

};



export const cartReducer = createReducer(

  initialState,


  on(
    CartActions.setCartItems,

    (state, { cart }) => ({

      ...state,

      cart: [...cart]

    })

  ),



  on(
    CartActions.clearCart,

    () => ({

      ...initialState

    })

  )


);