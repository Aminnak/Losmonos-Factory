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


    // getUserData(id : number): Observable<any> {
    //     const token = localStorage.getItem('access_token');
    //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //     return this.http.get(`${this.baseUrl}user/${id}`, { headers });
    //   }
}
