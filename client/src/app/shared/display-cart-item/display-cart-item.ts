import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalService } from '../services/global-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-display-cart-item',
  standalone: false,
  templateUrl: './display-cart-item.html',
  styleUrl: './display-cart-item.scss',
})
export class DisplayCartItem {

  @Output() closeCart = new EventEmitter<void>();
  cartItems: any[] = [];
  loading = false;
  totalPrice = 0;
  totalQty = 0;
  notDiscountTotalPrice = 0;

  user: any = null;

  constructor(
    private globalService: GlobalService,
    private store: Store<AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.globalService.cartItems.subscribe(res => {
      this.cartItems = res;
    });

    this.globalService.totalPrice.subscribe(res => {
      this.totalPrice = res;
    });

    this.globalService.totalQty.subscribe(res => {
      this.totalQty = res;
    });

    this.globalService.notDiscountTotalPrice.subscribe(res => {
      this.notDiscountTotalPrice = res;
    });

    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  close() {
    this.closeCart.emit();
  }

  redirectToCheckoutPage() {

    this.store.select('user')
      .subscribe((user: any) => {

        if (user?._id) {
          this.loading = true;
          this.globalService.closeCart();
          this.router.navigate(['/checkout'])

            .finally(() => {
              this.loading = false;
            });

        }
        else {

          this.toastr.info('Please Login');

        }

      });

  }

  priceWithDiscount(price: number, discount: number) {

    return price - ((price * discount) / 100);

  }


  displayPrice(price: number) {

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);

  }

}
