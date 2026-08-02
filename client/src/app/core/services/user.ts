import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  updateUser(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.user.update}`,
      data
    );
  }
  
  uploadAvatar(formData: FormData) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.user.uploadAvatar}`,
      formData
    );
  }
  
  getUserDetails() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.user.details}`
    );
  }

}
