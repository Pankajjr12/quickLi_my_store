import { Injectable } from '@angular/core';
import { SummaryApi } from '../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) { }


  /**
   * Create Address
   */
  createAddress(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.address.createAddress}`,
      data
    );
  }


  /**
   * Get Address List
   */
  getAddress() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.address.getAddress}`
    );
  }


  /**
   * Update Address
   */
  updateAddress(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.address.updateAddress}`,
      data
    );
  }


  /**
   * Delete / Disable Address
   */
  deleteAddress(_id: string) {
    return this.http.delete(
      `${SummaryApi.baseUrl}${SummaryApi.address.deleteAddress}`,
      {
        body: {
          _id
        }
      }
    );
  }

}
