import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormBuilder ,FormGroup } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LogInComponent implements OnInit{
    logInForm! : FormGroup
    constructor(
        private formBuilder : FormBuilder,
        private authService : AuthService,
    ){}

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group({
            email : '',
            password : ''
        })
    }

    submitLogInForm(){
        this.authService.loginUser(this.logInForm.value).subscribe({
            next : res => console.log(res),
            error : err => console.log(err)
        })
    }
}
