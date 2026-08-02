import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private http: HttpClient) { }

  /**
   * Cash On Delivery Order
   */
  cashOnDelivery(data: {
    list_items: any[];
    totalAmt: number;
    subTotalAmt: number;
    addressId: string;
  }) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.order.cashOnDeliveryOrder}`,
      data
    );
  }

  /**
   * Stripe Checkout Payment
   */
  paymentUrl(data: {
    list_items: any[];
    totalAmt: number;
    subTotalAmt: number;
    addressId: string;
  }) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.order.payment_url}`,
      data
    );
  }

  getOrders() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.order.get_order_details}`
    );
  }
}
