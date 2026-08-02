import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  // Add Category
  addCategory(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.category.addCategory}`,
      data
    );
  }

  // Get Category
  getCategory() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.category.getCategory}`
    );
  }

  // Update Category
  updateCategory(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.category.updateCategory}`,
      data
    );
  }

  // Delete Category
  deleteCategory(id: string) {
    return this.http.delete(
      `${SummaryApi.baseUrl}${SummaryApi.category.deleteCategory}`,
      {
        body: {
          _id: id
        }
      }
    );
  }

  // Upload Image
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.upload.uploadImage}`,
      formData
    );
  }

}
