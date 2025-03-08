import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { user_data } from '../../app.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers : [DatePipe]
})
export class ProfileComponent implements OnInit{
    user! : user_data;

    constructor(private userDetail : UserService , private dateP : DatePipe){}

    ngOnInit(): void {
        this.userDetail.getUser$.subscribe(value => {
            this.user = value
            this.user.date_joined = this.dateP.transform(this.user.date_joined, 'fullDate');
        })
    }

}
