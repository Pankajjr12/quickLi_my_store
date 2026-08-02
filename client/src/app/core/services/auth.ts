import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryApi } from '../constants/api-endpoints';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.auth.register}`,
      data
    );
  }

  login(data: any) {
    return this.http.post(
      `${SummaryApi.baseUrl}${SummaryApi.auth.login}`,
      data
    );
  }

  forgotPassword(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.auth.forgotPassword}`,
      data
    )
  }

  verifyOtpforgotPassword(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.auth.verifyForgotPasswordOtp}`,
      data
    )
  }

  resetPassword(data: any) {
    return this.http.put(
      `${SummaryApi.baseUrl}${SummaryApi.auth.resetPassword}`,
      data
    )
  }
  logout() {
    return this.http.get(
      `${SummaryApi.baseUrl}${SummaryApi.auth.logout}`
    );
  }


}