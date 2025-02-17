import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
    private userName = new BehaviorSubject<string | null>(null)

    getIsLoggedIn$ = this.userName.asObservable()

    constructor() { }

    set setIsLoggedIn(status : any) {
        this.userName.next(status)
    }

}
