import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SearchPage } from './pages/search/search';
import { RegisterPage } from './pages/register/register';
import { CategoryPage } from './pages/category/category';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token-interceptor';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { OtpVerfication } from './pages/otp-verfication/otp-verfication';
import { ResetPassword } from './pages/reset-password/reset-password';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { UserMenuMobile } from './pages/user-menu-mobile/user-menu-mobile';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { ProfilePage } from './pages/profile/profile';
import { AddressPage } from './pages/address/address';
import { MyOrdersPage } from './pages/my-orders/my-orders';
import { SubCategoryPage } from './pages/sub-category/sub-category';
import { ProductAdmin } from './pages/product-admin/product-admin';
import { UploadProductPage } from './pages/upload-product/upload-product';
import { ProductDisplayPage } from './pages/product-display-page/product-display-page';
import { ProductListPage } from './pages/product-list-page/product-list-page';
import { CheckoutPage } from './pages/checkout-page/checkout-page';
import { CartMobilePage } from './pages/cart-mobile-page/cart-mobile-page';
import { SuccessPage } from './pages/success-page/success-page';
import { CancelPage } from './pages/cancel-page/cancel-page';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    SearchPage,
    RegisterPage,
    ForgotPassword,
    OtpVerfication,
    ResetPassword,
    UserMenuMobile,
    DashboardLayout,
    ProfilePage,
    AddressPage,
    MyOrdersPage,
    CategoryPage,
    SubCategoryPage,
    ProductAdmin,
    ProductDisplayPage,
    ProductListPage,
    UploadProductPage,
    CheckoutPage,
    CartMobilePage,
    SuccessPage,
    CancelPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    StoreModule.forRoot(reducers),

    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(

      withInterceptors([

        authInterceptor,

        refreshTokenInterceptor

      ])

    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }