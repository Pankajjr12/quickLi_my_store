import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SearchPage } from './pages/search/search';
import { RegisterPage } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { OtpVerfication } from './pages/otp-verfication/otp-verfication';
import { ResetPassword } from './pages/reset-password/reset-password';
import { UserMenuMobile } from './pages/user-menu-mobile/user-menu-mobile';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { ProfilePage } from './pages/profile/profile';
import { AddressPage } from './pages/address/address';
import { MyOrdersPage } from './pages/my-orders/my-orders';
import { CategoryPage } from './pages/category/category';
import { SubCategoryPage } from './pages/sub-category/sub-category';
import { UploadProductPage } from './pages/upload-product/upload-product';

import { ProductAdmin } from './pages/product-admin/product-admin';
import { adminGuard } from './layouts/guards/admin-guard';
import { ProductListPage } from './pages/product-list-page/product-list-page';
import { ProductDisplayPage } from './pages/product-display-page/product-display-page';
import { CartMobilePage } from './pages/cart-mobile-page/cart-mobile-page';
import { CheckoutPage } from './pages/checkout-page/checkout-page';
import { SuccessPage } from './pages/success-page/success-page';
import { CancelPage } from './pages/cancel-page/cancel-page';


const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'verification-otp', component: OtpVerfication },
  { path: 'reset-password', component: ResetPassword },
  { path: 'user', component: UserMenuMobile },
  { path: 'search', component: SearchPage },

  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: 'profile', component: ProfilePage },
      { path: 'address', component: AddressPage },
      { path: 'myorders', component: MyOrdersPage, },

      { path: 'category', component: CategoryPage, canActivate: [adminGuard] },
      { path: 'subcategory', component: SubCategoryPage, canActivate: [adminGuard] },
      { path: 'upload-product', component: UploadProductPage, canActivate: [adminGuard] },
      { path: 'product', component: ProductAdmin, canActivate: [adminGuard] }
    ]
  },

  {
    path: 'product/:product',
    component: ProductDisplayPage
  },
  {
    path: ':category/:subCategory',
    component: ProductListPage
  },
  {
    path: 'cart',
    component: CartMobilePage,
  },
  {
    path: 'checkout',
    component: CheckoutPage,
  },
  {
    path: 'success',
    component: SuccessPage,
  },
  {
    path: 'cancel',
    component: CancelPage,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
