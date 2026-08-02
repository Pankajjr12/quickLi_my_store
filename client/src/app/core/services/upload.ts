import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryApi } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${SummaryApi.baseUrl}${SummaryApi.upload.uploadImage}`, formData);
  }
}
