import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Search } from './search/search';
import { AppRoutingModule } from "../app-routing-module";
import { UserMenu } from './user-menu/user-menu';
import { UserProfileAvatarEdit } from './user-profile-avatar-edit/user-profile-avatar-edit';
import { UploadCategory } from './upload-category/upload-category';
import { EditCategory } from './edit-category/edit-category';
import { ConfirmBox } from './confirm-box/confirm-box';
import { Loading } from './loading/loading';
import { NoData } from './no-data/no-data';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSubCategory } from './edit-sub-category/edit-sub-category';
import { UploadSubCategory } from './upload-sub-category/upload-sub-category';
import { ViewImage } from './view-image/view-image';
import { DisplayTable } from './display-table/display-table';
import { AddField } from './add-field/add-field';
import { ProductCardAdmin } from './product-card-admin/product-card-admin';
import { EditProductAdmin } from './edit-product-admin/edit-product-admin';
import { CategoryWiseProductDisplay } from './category-wise-product-display/category-wise-product-display';
import { CardProduct } from './card-product/card-product';
import { CardLoading } from './card-loading/card-loading';
import { CategorySidebar } from './category-sidebar/category-sidebar';
import { AddToCartButton } from './add-to-cart-button/add-to-cart-button';
import { DisplayCartItem } from './display-cart-item/display-cart-item';
import { AddAddress } from './add-address/add-address';
import { EditAddressDetails } from './edit-address-details/edit-address-details';

@NgModule({
  declarations: [
    Header,
    Footer,
    Search,
    UserMenu,
    UserProfileAvatarEdit,
    UploadCategory,
    EditCategory,
    ConfirmBox,
    Loading,
    NoData,
    EditSubCategory,
    UploadSubCategory,
    ViewImage,
    DisplayTable,
    AddField,
    ProductCardAdmin,
    EditProductAdmin,
    CategoryWiseProductDisplay,
    CardProduct,
    CardLoading,
    CategorySidebar,
    AddToCartButton,
    DisplayCartItem,
    AddAddress,
    EditAddressDetails,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    Header,
    Footer,
    Search,
    UserMenu,
    UserProfileAvatarEdit,
    UploadCategory,
    EditCategory,
    ConfirmBox,
    Loading,
    NoData,
    EditSubCategory,
    UploadSubCategory,
    DisplayTable,
    AddField,
    ProductCardAdmin,
    CategoryWiseProductDisplay,
    CardProduct,
    CardLoading,
    CategorySidebar,
    AddToCartButton,
    EditProductAdmin,
    DisplayCartItem,
    AddAddress,
    EditAddressDetails,
  ]
})
export class SharedModule {}