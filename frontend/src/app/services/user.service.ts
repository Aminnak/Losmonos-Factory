import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user_data } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private user = new BehaviorSubject<user_data>({
        full_name : '',
        email : '',
        postal_code : null,
        telephone_number : null,
        is_active : null

    })

    getUser$ = this.user.asObservable()

    constructor() { }

    set setUser(status : any) {
        this.user.next(status)
    }

}
