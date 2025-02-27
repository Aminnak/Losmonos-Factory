import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormBuilder ,FormGroup } from "@angular/forms";
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
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
        private Router : Router,
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
                this.userService.setUser(res.user)
                // this.Router.navigate(['/home'])
            },
            error : err => console.log(err)
        })
    }
}
