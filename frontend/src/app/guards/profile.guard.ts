import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const profileGuard: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.verifyUserToken().pipe(
        map((response) => {
          if (Object.keys(response).length === 0 && response.constructor === Object) {
            return true;
          } else {
            router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
            router.navigate(['/login']);
          return of(false);
        })
      );
  };
