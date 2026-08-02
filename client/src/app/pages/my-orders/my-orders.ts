import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/oder-service';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrdersPage implements OnInit {

  selectedTab = 'All';
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data || [];
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  get filteredOrders() {
    if (this.selectedTab === 'All') {
      return this.orders;
    }
  
    if (this.selectedTab === 'Cash') {
      return this.orders.filter(
        (x: any) => x.payment_status === 'CASH ON DELIVERY'
      );
    }
  
    if (this.selectedTab === 'Online') {
      return this.orders.filter(
        (x: any) => x.payment_status === 'paid'
      );
    }
  
    return this.orders;
  }

  getPaymentType(order: any): string {
    return order.payment_status === 'CASH ON DELIVERY'
      ? 'Cash'
      : 'Online';
  }
}