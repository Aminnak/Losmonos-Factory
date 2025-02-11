import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterOutlet , RouterModule ,Router , NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , RouterModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    currentRoute : string = '';
    isVisible = false;
    isBtnActive = false;

    @ViewChild('sidenav') sidenav! : ElementRef;
    @ViewChild('hamburgurMenu') hamburgurMenu! : ElementRef;


    @HostListener('document:click' , ['$event'])
    sideNavOutsideClick(event : MouseEvent) : void{
        if (this.isVisible && !this.sidenav.nativeElement.contains(event.target) && !this.hamburgurMenu.nativeElement.contains(event.target)) {
            this.sideNavToggle()
        }
    }

    constructor(private router : Router){}

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.currentRoute = this.router.url
        })
    }

    sideNavToggle(){
        this.isVisible = !this.isVisible
    }
}
