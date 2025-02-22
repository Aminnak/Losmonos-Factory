import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8000/api/'

    constructor(private http : HttpClient) { }

    getAccessToken() : string | null {
        return localStorage.getItem('access_token')
    }


    getRefreshToken() : string | null {
        return localStorage.getItem('refresh_token')
    }


    saveTokens(access: string, refresh: string): void {
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
    }

    createUser<T> (data : T) : Observable<any> {
        return this.http.post(`${this.baseUrl}register/` , data)
    }

    loginUser(data : {email : string , passwrod : string}): Observable<{refresh : string, access : string}>{
        return this.http.post<{refresh: string, access : string }>(`${this.baseUrl}login/` , data).pipe(
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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}
