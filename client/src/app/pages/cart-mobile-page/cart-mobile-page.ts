import { Component } from '@angular/core';
import { GlobalService } from '../../shared/services/global-service';

@Component({
  selector: 'app-cart-mobile-page',
  standalone: false,
  templateUrl: './cart-mobile-page.html',
  styleUrl: './cart-mobile-page.scss',
})
export class CartMobilePage {

  totalQty = 0;
  constructor(
    private globalService: GlobalService
  ) {
    this.globalService.totalQty.subscribe(res => {
      this.totalQty = res;
    });

  }


  openCart() {

    this.globalService.openCart();

  }
}
