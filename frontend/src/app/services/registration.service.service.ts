import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
    private baseUrl = 'http://localhost:8000/api/'


    constructor(private http : HttpClient)  { }

//  responsible for creating user
    registerUser<T> (data : T) : Observable<any> {
        return this.http.post(`${this.baseUrl}register/` , data)
    }

    getUserInfo(){
        return this.http.get(`${this.baseUrl}user/1`)
    }
}
