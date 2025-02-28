import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8000/api/'

    constructor(
        private http : HttpClient,
        private router : Router,
    ) { }

    getAccessToken() : string | null {
        return sessionStorage.getItem('access_token')
    }


    getRefreshToken() : string | null {
        return sessionStorage.getItem('refresh_token')
    }

    saveTokens(access: string, refresh: string): void {
        sessionStorage.setItem('access_token', access)
        sessionStorage.setItem('refresh_token', refresh)
    }

    createUser<T> (data : T) : Observable<any> {
        return this.http.post(`${this.baseUrl}register/` , data)
    }

    loginUser<T>(data :T): Observable<any>{
        return this.http.post<any>(`${this.baseUrl}login/` , data).pipe(
            tap(token => this.saveTokens(token.access , token.refresh))
        )
    }

    refreshToken() : Observable<{access : string}> {
        return this.http.post<{access : string}>(`${this.baseUrl}token/refresh/` , {
            refresh : this.getRefreshToken()
        }).pipe(
            tap((tokens) => {
                this.saveTokens(tokens.access , this.getRefreshToken()!);
            })
        )
    }

    logout(): void {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user');
        this.router.navigate(['/login'])
    }
}
