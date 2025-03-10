import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormBuilder ,FormGroup } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LogInComponent implements OnInit{
    logInForm! : FormGroup;
    imageUrl = ''

    constructor(
        private formBuilder : FormBuilder,
        private authService : AuthService,
        private userService : UserService,
    ){}

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group({
            email : '',
            password : ''
        })
    }

    submitLogInForm(){
        this.authService.loginUser(this.logInForm.value).subscribe({
            next : res => {
                console.log(res)
                this.userService.setUser(res.user)
                // this.Router.navigate(['/home'])
            },
            error : err => console.log(err)
        })
    }
}
