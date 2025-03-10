import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { getUserType } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers : [DatePipe]
})
export class ProfileComponent implements OnInit{
    user? : getUserType;
    putForm! : FormGroup;
    telephoneInputDisable : boolean = true;
    postalCodeInputDsiable : boolean = true;

    constructor(
        private dateP : DatePipe ,
        private authService : AuthService ,
        private formBuilder : FormBuilder
    ){}

    ngOnInit(): void {
        this.putForm = this.formBuilder.group({
            telephone_number : [{value : '', disabled : true},[Validators.pattern(/^09\d{9}$/)]],
            postal_code : [{value : '', disabled : true},Validators.pattern(/^\d{10}$/)]
        })
        this.authService.getUser().subscribe({
            next : res => {
                this.user = res
                this.user.date_joined = this.dateP.transform(this.user.date_joined, 'fullDate');
                this.putForm.patchValue({
                    telephone_number: this.user.telephone_number,
                    postal_code: this.user.postal_code
                });
            },
            error : err => console.log(err)
        })


    }

    toggleTelephone(){
        const telephoneNumberControl = this.putForm.get('telephone_number');
        if(telephoneNumberControl?.disabled){
            telephoneNumberControl.enable()
        }else {
            telephoneNumberControl?.disable()
        }
    }

    togglePostalCode() {
        const postalCodeControl = this.putForm.get('postal_code');
        if (postalCodeControl?.disabled) {
          postalCodeControl.enable()
        } else {
          postalCodeControl?.disable()
        }
    }

    logOut(){
        this.authService.logout()
    }

    apply(){
        const updateValues = this.putForm.value
        const userID = this.user?.pk
        if (userID) {
            this.authService.updateUserProfile(userID,updateValues).subscribe({
                next : res => console.log(res),
                error : err => console.log(err)
            })
        }

    }

}
