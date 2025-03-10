import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators, AbstractControlOptions} from "@angular/forms";
import { UserService } from '../../services/user.service';
import { user_data } from '../../app.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers : [DatePipe]
})
export class ProfileComponent implements OnInit{
    user! : user_data;
    putForm! : FormGroup;
    telephoneInputDisable : boolean = true;
    postalCodeInputDsiable : boolean = true;

    constructor(private userDetail : UserService , private dateP : DatePipe , private authService : AuthService , private formBuilder : FormBuilder){}

    ngOnInit(): void {
        this.userDetail.getUser$.subscribe(value => {
            this.user = value
            console.log(this.user.date_joined)
            this.user.date_joined = this.dateP.transform(this.user.date_joined, 'fullDate');
        })

        this.putForm = this.formBuilder.group({
            telephone_number : [{value : this.user.telephone_number ? this.user.telephone_number : ''  , disabled : true},[Validators.pattern(/^09\d{9}$/)]],
            postal_code : [{value : this.user.postal_code ? this.user.postal_code : '' , disabled : true},Validators.pattern(/^\d{10}$/)]
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

}
