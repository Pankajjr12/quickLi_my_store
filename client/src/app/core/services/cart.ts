import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  /**
   * Add Product To Cart
   */
  addToCart(productId: string) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.cart.addToCart}`,
      {
        productId,
      }
    );
  }

  /**
   * Get Cart Items
   */
  getCart() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.cart.getCart}`
    );
  }

  /**
   * Update Quantity
   */
  updateCartQty(_id: string, qty: number) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.cart.updateCartQty}`,
      {
        _id,
        qty,
      }
    );
  }

  /**
   * Delete Cart Item
   */
  deleteCartItem(_id: string) {
    return this.http.delete(
      `${SummaryApi.baseUrl}${SummaryApi.cart.deleteCartItem}`,
      {
        body: {
          _id,
        },
      }
    );
  }
}