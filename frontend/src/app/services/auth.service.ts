import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

export interface getUserType {

    date_joined : string | null,
    email : string,
    full_name : string,
    is_active : boolean,
    pk : number,
    postal_code : string,
    telephone_number : string

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8000/api/'

    constructor(
        private http : HttpClient,
        private router : Router,
        private userService : UserService
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

    getUser(): Observable<getUserType>{
        return this.http.get<getUserType>(`${this.baseUrl}user/`)
    }

    verifyUserToken() : Observable<any>{
        return this.http.post(`${this.baseUrl}token/verify/` , {
            token : this.getAccessToken()
        })
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
        this.userService.setUser(false)
        this.router.navigate(['/login'])
    }

    updateUserProfile(pk : number, updatedData : object){
        return this.http.patch(`${this.baseUrl}user/${pk}/update/` , updatedData)
    }
}
