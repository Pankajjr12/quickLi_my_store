import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { UserService } from '../../core/services/user';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getUserDetails().pipe(
    map((response: any) => {
      console.log(response);

      if (response.success && response.data.role === 'ADMIN') {
        return true;
      }

      router.navigate(['/dashboard/profile']);
      return false;
    })
  );
};