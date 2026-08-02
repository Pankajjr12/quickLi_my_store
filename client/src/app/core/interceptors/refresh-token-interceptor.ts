import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';
import { SummaryApi } from '../constants/api-endpoints';



export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const http = inject(HttpClient);

  return next(req).pipe(

    catchError((error) => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return throwError(() => error);
      }

      return http.post<any>(
        `${SummaryApi.baseUrl}${SummaryApi.auth.refreshToken}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          },
          withCredentials: true
        }
      ).pipe(

        switchMap((response) => {

          const accessToken = response.data.accessToken;

          localStorage.setItem(
            'accessToken',
            accessToken
          );

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return next(retryRequest);

        })

      );

    })

  );

};
