import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormBuilder ,FormGroup } from "@angular/forms";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
    logInForm! : FormGroup
    constructor(private formBuilder : FormBuilder){}

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group({
            email : '',
            password : ''
        })
    }


}
