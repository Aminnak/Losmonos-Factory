import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators, AbstractControlOptions} from "@angular/forms";
import { passValidator , passMatch} from '../../shared/Validations';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    isSumbitActive = true;
    response : any ;
    Form : FormGroup;
    constructor(private formBuilder : FormBuilder, private http : HttpClient){
        this.Form = this.formBuilder.group(
            {
            fullName : ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=(.*[A-Za-z]{4})[A-Za-z0-9])/)]],
            password : ['',[Validators.required,passValidator]],
            confirmPassword : ['',[Validators.required]],
            postalCode : ['',[Validators.pattern(/^\d{10}$/)]],
            email : ['',[Validators.required,Validators.email]],
            phoneNumber : ['',[Validators.pattern(/^09\d{9}$/)]]
        },
        {
            validators : passMatch()
        } as AbstractControlOptions
    )
    }


    submitForm(){
        const endpoint = 'http://localhost:8000/api/create-user/'
        const tempObj = {
            email : 'amir@gmail.com',
            full_name : 'aminnak',
            password : '@amin'
        }
        this.http.post(endpoint,tempObj ).subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err)
          });
    }
}
