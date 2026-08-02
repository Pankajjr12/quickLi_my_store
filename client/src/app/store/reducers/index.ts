import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from '../user/user.reducer';
import { productReducer, ProductState } from '../product/product.reducer';
import { cartReducer, CartState } from '../cart/cart.reducers';
import { addressReducer, AddressStoreState } from '../address/address.reducer';
import { orderReducer, OrderState } from '../order/order.reducers';


export interface AppState {
  user: UserState;
  product: ProductState,
  cart: CartState,
  address: AddressStoreState,
  order: OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
};