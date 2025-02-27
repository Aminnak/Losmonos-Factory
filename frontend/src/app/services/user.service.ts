import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user_data } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private user = new BehaviorSubject<any>(this.getDataFromStorage())

    constructor() { }

    getUser$ = this.user.asObservable()

    setUser(tempData: any): void {
        const mainData = {
            ...tempData ,
            isLoggedIn : true
        }
        this.user.next(mainData);
        localStorage.setItem('user', JSON.stringify(mainData)); // Save to localStorage
    }

    private getDataFromStorage(): any {
        const storedData = localStorage.getItem('user');
        return storedData ? JSON.parse(storedData) : null; // Return parsed data or null
    }
}
