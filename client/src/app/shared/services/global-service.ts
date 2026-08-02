import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CartService } from '../../core/services/cart';
import { AddressService } from '../../core/services/address-service';
import { OrderService } from '../../core/services/oder-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import * as AddressActions from '../../store/address/address.actions'


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  cartItems = new BehaviorSubject<any[]>([]);
  totalPrice = new BehaviorSubject<number>(0);
  totalQty = new BehaviorSubject<number>(0);
  notDiscountTotalPrice = new BehaviorSubject<number>(0);

  addresses = new BehaviorSubject<any[]>([]);
  orders = new BehaviorSubject<any[]>([]);

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private store: Store<AppState>,
    private orderService: OrderService
  ) { }

  fetchCartItem() {
    this.cartService.getCart().subscribe((res: any) => {
      if (res.success) {
        this.cartItems.next(res.data);
        this.calculateCart(res.data);
      }
    });
  }

  addToCart(productId: string) {
    return this.cartService.addToCart(productId);
  }
  updateCartItem(id: string, qty: number) {
    return this.cartService.updateCartQty(id, qty);
  }

  deleteCartItem(id: string) {
    return this.cartService.deleteCartItem(id);
  }


  cartOpen = new BehaviorSubject<boolean>(false);


  openCart(){
    this.cartOpen.next(true);
  }


  closeCart(){
    this.cartOpen.next(false);
  }

  fetchAddress() {
    this.addressService.getAddress().subscribe((res: any) => {
      if (res.success) {
        this.store.dispatch(
          AddressActions.setAddresses({
            addresses: res.data
          })
        );
      }
    });
  }

  fetchOrder() {
    this.orderService.getOrders()
      .subscribe((res: any) => {
        if (res.success) {
          this.orders.next(res.data);
        }
      });
  }

  logout() {
    localStorage.clear();

    this.cartItems.next([]);
    this.totalPrice.next(0);
    this.totalQty.next(0);
    this.notDiscountTotalPrice.next(0);

    this.addresses.next([]);
    this.orders.next([]);
  }

  calculateCart(cart: any[]) {

    let qty = 0;
    let total = 0;
    let original = 0;

    cart.forEach(item => {

      qty += item.quantity;

      const discountPrice =
        item.productId.price -
        (item.productId.price * item.productId.discount) / 100;

      total += discountPrice * item.quantity;
      original += item.productId.price * item.quantity;
    });

    this.totalQty.next(qty);
    this.totalPrice.next(total);
    this.notDiscountTotalPrice.next(original);
  }
}