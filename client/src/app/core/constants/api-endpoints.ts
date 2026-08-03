// import { environment } from "../../../environments/environment.prod";

import { environment } from "../../../environments/environment";

export const SummaryApi = {
  baseUrl: environment.apiUrl,

  auth: {
    register: '/api/user/register',
    login: '/api/user/login',
    forgotPassword: '/api/user/forgot-password',
    verifyForgotPasswordOtp: '/api/user/verify-forgot-password-otp',
    resetPassword: '/api/user/reset-password',
    refreshToken: '/api/user/refresh-token',
    logout: '/api/user/logout',
  },

  user: {
    details: '/api/user/user-details',
    uploadAvatar: '/api/user/upload-avatar',
    update: '/api/user/update-user',
  },

  category: {
    addCategory: '/api/category/add-category',
    getCategory: '/api/category/get',
    deleteCategory: '/api/category/delete',
    updateCategory: '/api/category/update',
  },
  upload: {
    uploadImage: '/api/file/upload'
  },

  subCategory: {
    addSubCategory: '/api/subcategory/create',
    getSubCategory: '/api/subcategory/get',
    deleteSubCategory: '/api/subcategory/delete',
    updateSubCategory: '/api/subcategory/update',
  },

  product: {
    createProduct: '/api/product/create',
    getAllProducts: '/api/product/get',
    getProductsByCategory: '/api/product/get-product-by-category',
    getProductsByCategoryAndSubCategory: '/api/product/get-product-by-category-and-subcategory',
    getProductDetails: '/api/product/get-product-details',
    updateProduct: '/api/product/update-product-details',
    deleteProduct: '/api/product/delete-product',
    searchProduct: '/api/product/search-product'
  },
  cart: {
    addToCart: '/api/cart/create',
    getCart: '/api/cart/get',
    updateCartQty: '/api/cart/update-qty',
    deleteCartItem: '/api/cart/delete-cart-item',
  },

  address: {
    createAddress: '/api/address/create',
    getAddress: '/api/address/get',
    updateAddress: '/api/address/update',
    deleteAddress: '/api/address/disable',
  },
  order : {
    cashOnDeliveryOrder: '/api/order/cash-on-delivery',
    payment_url: '/api/order/checkout',
    get_order_details: '/api/order/order-list'
  }

}