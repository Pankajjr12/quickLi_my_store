import { Component, OnInit, signal } from '@angular/core';
import { UserService } from './core/services/user';
import { AppState } from './store/reducers';
import { Store } from '@ngrx/store';
import { setUserDetails } from './store/user/user.actions';
import { CategoryService } from './core/services/category';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/product/product.actions';
import { SubCategoryService } from './core/services/sub-category';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './shared/services/global-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  showCartButton = true;
  cartOpen=false;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private store: Store<AppState>,
    private router: Router,
    private toastr: ToastrService,
    private globalService: GlobalService
  ) {
    this.globalService.cartOpen.subscribe(value=>{

      this.cartOpen=value;
    
    });

  }

  ngOnInit() {
    this.fetchUser();
    this.fetchCategory();
    this.fetchSubCategory();
    this.globalService.fetchCartItem();
  }

  

  closeCartDrawer(){

    this.globalService.closeCart();
  
  }

  fetchUser() {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {

        this.store.dispatch(
          setUserDetails({
            user: response.data
          })
        );

      }
    });
  }

  fetchCategory() {
    this.store.dispatch(setLoadingCategory({ loading: true }));

    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        if (response.success) {
          const sorted = response.data.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );

          this.store.dispatch(
            setAllCategory({
              categories: sorted
            })
          );
        }
      },
      error: () => {
        this.store.dispatch(setLoadingCategory({ loading: false }));
      },
      complete: () => {
        this.store.dispatch(setLoadingCategory({ loading: false }));
      }
    });
  }

  fetchSubCategory() {
    this.subCategoryService.getSubCategory().subscribe({
      next: (response: any) => {
        if (response.success) {
          const sorted = response.data.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );

          this.store.dispatch(
            setAllSubCategory({
              subCategories: sorted
            })
          );
        }
      }
    });
  }

}
