import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

const refreshTokenSubject = new BehaviorSubject<string | null>(null);
let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    let authReq = req;

    const accessToken = authService.getAccessToken();
    if (accessToken) {
        authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
        });
    }

    return next(authReq).pipe(
        catchError((err) => {
        if (err.status === 401) {
            return handle401Error(req, next, authService)
        }
        return throwError(() => err)
        })
    );
};

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
            switchMap((token) => {
                isRefreshing = false;
                refreshTokenSubject.next(token.access);

                return next(req.clone({ setHeaders: { Authorization: `Bearer ${token.access}` } }));
            }),
            catchError((err) => {
                isRefreshing = false;
                authService.logout();
                return throwError(() => err)
            })
        );
    } else {
        return refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
            next(req.clone({ setHeaders: { Authorization: `Bearer ${token!}` } }))
        )
        );
    }
}
