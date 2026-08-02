import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MobileService } from '../services/mobile';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { filter, Observable, Subscription } from 'rxjs';
import { UserState } from '../../store/user/user.reducer';
import { GlobalService } from '../services/global-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {


  isSearchPage = false;
  openUserMenu = false;
  openCartSection = false;

  user: UserState = {} as UserState;


  totalQty = 0;
  totalPrice = 0;

  private cartSubscription!: Subscription;


  constructor(
    private router: Router,
    public mobileService: MobileService,
    private store: Store<AppState>,
    private globalService: GlobalService,
    private cd: ChangeDetectorRef
  ) { }



  ngOnInit(): void {

    this.globalService.totalQty.subscribe(qty => {
      this.totalQty = qty;
    });

    this.globalService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    });
    // Search page detection

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        this.isSearchPage =
          this.router.url === '/search';

      });


    this.isSearchPage =
      this.router.url === '/search';



    // User

    this.store
      .select(state => state.user)
      .subscribe(user => {

        this.user = user;


        // Load cart after user is available
        if (user?._id) {
          this.loadCart();
        }

      });


  }

  handleMobileUser() {
    if (!this.user?._id) {
      this.router.navigate(['/login']); return;
    } this.router.navigate(['/user']);
  }
  toggleUserMenu() { this.openUserMenu = !this.openUserMenu; }
  closeUserMenu() { this.openUserMenu = false; }
  goToLogin() { this.router.navigate(['/login']); }

  loadCart() {

    this.cartSubscription =
      this.globalService.cartItems
        .subscribe({

          next: (res: any) => {

            const cart = res.data || [];


            this.totalQty = cart.reduce(
              (sum: any, item: any) =>
                sum + item.quantity,
              0
            );


            this.totalPrice = cart.reduce(
              (sum: any, item: any) =>
                sum + (item.productId.price * item.quantity),
              0
            );


            this.cd.detectChanges();

          },

          error: (err) => {

            console.log(err);

          }

        });

  }





  openCart() {

    this.globalService.openCart();

  }


  closeCart() {

    this.globalService.closeCart()

  }



  formatPrice(price: number) {

    return `₹${price.toLocaleString('en-IN')}`;

  }



  ngOnDestroy() {

    this.cartSubscription?.unsubscribe();

  }


}