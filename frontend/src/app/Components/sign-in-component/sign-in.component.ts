import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators, AbstractControlOptions} from "@angular/forms";
import { passValidator , passMatch} from '../../shared/Validations';
@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    isSumbitActive = false
    Form : FormGroup;
    tempFormError :Boolean = false
    constructor(private formBuilder : FormBuilder){
        this.Form = this.formBuilder.group(
            {
            username : ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=(.*[A-Za-z]{4})[A-Za-z0-9])/)]],
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
}
