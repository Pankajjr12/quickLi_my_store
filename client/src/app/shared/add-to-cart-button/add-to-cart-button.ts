import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '../services/global-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-to-cart-button',
  standalone: false,
  templateUrl: './add-to-cart-button.html',
  styleUrl: './add-to-cart-button.scss',
})
export class AddToCartButton implements OnInit {
  @Input() data: any;

  qty = 1;
  loading = false;
  isAvailableCart = false;
  cartId = '';

  constructor(
    private globalService: GlobalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkCartItem();
  }

  checkCartItem() {
    this.globalService.cartItems.subscribe((cart) => {
      const item = cart.find(
        (x: any) => x.productId._id === this.data._id
      );

      if (item) {
        this.isAvailableCart = true;
        this.qty = item.quantity;
        this.cartId = item._id;
      } else {
        this.isAvailableCart = false;
        this.qty = 1;
        this.cartId = '';
      }
    });
  }

  addToCart() {

    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.toastr.warning('Please login first');
      return;
    }

    // 👇 Add these logs here
    console.log('Cart Items:', this.globalService.cartItems.value);
    console.log('Current Product ID:', this.data._id);

    const cart = this.globalService.cartItems.value;

    const exists = cart.some((item: any) => {
      console.log('Cart Product ID:', item.productId._id);
      return item.productId._id === this.data._id;
    });

    console.log('Exists:', exists);

    if (exists) {
      this.toastr.info('Item already in cart.');
      return;
    }

    this.loading = true;

    this.globalService.addToCart(this.data._id).subscribe({
      next: () => {
        this.loading = false;
        this.globalService.fetchCartItem();
        this.toastr.success('Item added to cart.');
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      }
    });
  }

  increaseQty() {
    this.globalService
      .updateCartItem(this.cartId, this.qty + 1)
      .subscribe(() => {
        this.globalService.fetchCartItem();
        this.toastr.success('Item quantity increased.');
      });
  }

  decreaseQty() {
    if (this.qty > 1) {
      this.globalService
        .updateCartItem(this.cartId, this.qty - 1)
        .subscribe(() => {
          this.globalService.fetchCartItem();
          this.toastr.success('Item quantity decreased.');
        });
    } else {
      this.globalService
        .deleteCartItem(this.cartId)
        .subscribe(() => {
          this.globalService.fetchCartItem();
          this.toastr.success('Item removed from cart.');
        });
    }
  }
}