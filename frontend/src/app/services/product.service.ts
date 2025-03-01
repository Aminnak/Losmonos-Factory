import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
    private baseUrl = 'http://localhost:8000/api/products/'

    constructor(
        private http : HttpClient ,
    ) { }

    getProducts(url : string = this.baseUrl) : Observable<any> {
        return this.http.get(`${url}`)
    }
}
