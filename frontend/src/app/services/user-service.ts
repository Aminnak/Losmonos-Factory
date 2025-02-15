import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:8000/api/register/'; // Your API endpoint

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
        return this.http.post(this.apiUrl, userData).pipe(
        catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Handle the error and return a user-friendly message
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
        } else {
        // Server-side error
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
}
