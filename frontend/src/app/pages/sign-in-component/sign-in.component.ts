import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators, AbstractControlOptions} from "@angular/forms";
import { passValidator , confirmPassword} from '../../shared/Validations';
import { RegistrationService } from '../../services/registration.service.service';
import { UserStatusService } from '../../services/user-status.service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
    // Properties :
    isSumbitActive = true;
    response : any ;
    Form! : FormGroup;
    userName : boolean = false ;

    constructor(
        private formBuilder : FormBuilder,
        private RegisterService : RegistrationService,
        private router : Router,
        private userStatus : UserStatusService,
    ){}


    ngOnInit(): void {
        this.Form = this.formBuilder.group(
                {
                    full_name : ['',[Validators.required,Validators.minLength(4),Validators.pattern(/^(?=(.*[A-Za-z]{4})[A-Za-z0-9])/)]],
                    password : ['',[Validators.required,passValidator]],
                    confirm_password : ['',[Validators.required]],
                    postal_code : ['',[Validators.pattern(/^\d{10}$/)]],
                    email : ['',[Validators.required,Validators.email]],
                    telephone_number : ['',[Validators.pattern(/^09\d{9}$/)]]
                },
                {
                    validators : confirmPassword()
                } as AbstractControlOptions
        )
    }

    submitForm(){
        const formData = this.Form.value
        this.RegisterService.registerUser(formData)
            .subscribe ({
                next : (res) => {
                    console.log(res.refresh , res.access)
                    this.userName = res.user
                    this.router.navigate(['/home'])
                    this.userStatus.setIsLoggedIn = this.userName

                },
                error : (err) => {
                    console.log(err)
                }
            })

    }
}
