import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private user = new BehaviorSubject<any>(this.getDataFromStorage())

    constructor() { }

    getUser$ = this.user.asObservable()

    setUser(tempData: any): void {
        let mainData = {
            ...tempData ,
        }
        this.user.next(mainData);
        sessionStorage.setItem('user', JSON.stringify(mainData)); // Save to sessionStorage
    }

    private getDataFromStorage(): any {
        const storedData = sessionStorage.getItem('user');
        return storedData ? JSON.parse(storedData) : null; // Return parsed data or null
    }
}
