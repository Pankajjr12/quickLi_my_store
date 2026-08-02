import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  get accessToken(): string | null {
    return localStorage.getItem('accesstoken');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveAccessToken(token: string): void {
    localStorage.setItem('accesstoken', token);
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.saveAccessToken(accessToken);
    this.saveRefreshToken(refreshToken);
  }

  clear(): void {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshToken');
  }
}