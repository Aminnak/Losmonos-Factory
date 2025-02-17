import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterOutlet , RouterModule ,Router , NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';
import { UserStatusService } from './services/user-status.service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , RouterModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    // properties :
    currentRoute : string = '';
    isVisible :boolean = false;
    isBtnActive :boolean = false;
    userName : string | null= ''

    // elements :
    @ViewChild('sidenav') sidenav! : ElementRef;
    @ViewChild('hamburgurMenu') hamburgurMenu! : ElementRef;


    // host listeners :
    @HostListener('document:click' , ['$event'])
    sideNavOutsideClick(event : MouseEvent) : void{
        if (this.isVisible && !this.sidenav.nativeElement.contains(event.target) && !this.hamburgurMenu.nativeElement.contains(event.target)) {
            this.isVisible = !this.isVisible
        }
    }


    constructor(
        private router : Router,
        private userStatus : UserStatusService,
    ){}

    // hooks :
    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.currentRoute = this.router.url
        })

        this.userStatus.getIsLoggedIn$.subscribe(value => this.userName = value )
    }


}
