import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  // Create Product (Admin)
  createProduct(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.product.createProduct}`,
      data
    );
  }

  getProducts(page: number, limit: number, search: string) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.product.getAllProducts}`,
      {
        page,
        limit,
        search
      }
    );
  }

  getProductsByCategory(id: string) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.product.getProductsByCategory}`,
      { id }   // <-- send an object
    );
  }

  // Get Products By Category & SubCategory
  getProductsByCategoryAndSubCategory(data: {
    categoryId: string;
    subCategoryId: string;
    page: number;
    limit: number;
  }) {
    return this.http.post<any>(
      `${SummaryApi.baseUrl}${SummaryApi.product.getProductsByCategoryAndSubCategory}`,
      data
    );
  }

  getProductDetails(productId: string) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.product.getProductDetails}`,
      {
        productId
      }
    );
  }

  // Update Product (Admin)
  updateProduct(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.product.updateProduct}`,
      data
    );
  }

  // Delete Product (Admin)
  deleteProduct(data: any) {
    return this.http.delete(
      `${SummaryApi.baseUrl}${SummaryApi.product.deleteProduct}`,
      {
        body: data,
      }
    );
  }

  searchProduct(page: number, limit: number, search: string) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.product.searchProduct}`,
      {
        page,
        limit,
        search
      }
    );
  }
}