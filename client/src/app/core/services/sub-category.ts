import { Injectable } from '@angular/core';
import { SummaryApi } from '../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  // Add Sub Category
  createSubCategory(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.subCategory.addSubCategory}`,
      data
    );
  }

  // Get Sub Category
  getSubCategory(search: string = '') {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.subCategory.getSubCategory}?search=${search}`
    );
  }

  // Update Sub Category
  updateSubCategory(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.subCategory.updateSubCategory}`,
      data
    );
  }

  // Delete Sub Category
  deleteSubCategory(id: string) {
    return this.http.delete(
      `${SummaryApi.baseUrl}${SummaryApi.subCategory.deleteSubCategory}`,
      {
        body: {
          _id: id
        }
      }
    );
  }
}
