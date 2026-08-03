import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global-service';
import { AddressService } from '../../core/services/address-service';
import { OrderService } from '../../core/services/oder-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../core/services/payment-service';

@Component({
  selector: 'app-checkout-page',
  standalone: false,
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage implements OnInit {

  openAddress = false;

  addressList: any[] = [];
  selectedAddress = 0;

  cartItemsList: any[] = [];

  notDiscountTotalPrice = 0;
  totalPrice = 0;
  totalQty = 0;

  loading = false;


  constructor(
    private globalService: GlobalService,
    private addressService: AddressService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.globalService.fetchCartItem();
  
    this.globalService.cartItems.subscribe(items => {
      this.cartItemsList = items;
    });
  
    this.globalService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    });
  
    this.globalService.notDiscountTotalPrice.subscribe(price => {
      this.notDiscountTotalPrice = price;
    });
  
    this.globalService.totalQty.subscribe(qty => {
      this.totalQty = qty;
    });
  
    this.fetchAddress();
  }



  fetchAddress() {

    this.addressService.getAddress()
      .subscribe((res: any) => {

        if (res.success) {

          this.addressList = res.data;

        }

      })

  }



  handleCashOnDelivery() {

    const addressId =
      this.addressList[this.selectedAddress]?._id;


    if (!addressId) {

      this.toastr.warning("Please select address");
      return;

    }


    this.loading = true;


    const data = {

      list_items: this.cartItemsList,

      addressId: addressId,

      subTotalAmt: this.totalPrice,

      totalAmt: this.totalPrice

    };


    this.orderService.cashOnDelivery(data)
      .subscribe({

        next: (res: any) => {


          if (res.success) {

            this.toastr.success(res.message);


            this.globalService.fetchCartItem();


            this.router.navigate(
              ['/success'],
              {
                state: {
                  text: "Order"
                }
              }
            );

          }

        },


        error: (err) => {

          console.log(err);

        },


        complete: () => {

          this.loading = false;

        }


      })


  }

  handleOnlinePayment() {
    const addressId = this.addressList[this.selectedAddress]?._id;

    if (!addressId) {
      this.toastr.warning('Please select an address');
      return;
    }

    this.loading = true;

    const data = {
      list_items: this.cartItemsList,
      addressId,
      subTotalAmt: this.totalPrice,
      totalAmt: this.totalPrice,
    };

    this.orderService.paymentUrl(data).subscribe({
      next: (res: any) => {
        console.log('Payment Response:', res);
        if (res.success && res.url) {
          window.location.href = res.url;
        } else {
          this.toastr.error('Unable to start payment.');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Payment failed.');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }



  displayPrice(price: number) {

    return `₹${price.toLocaleString('en-IN')}`;

  }


}
