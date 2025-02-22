import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home-component/home.component";
import { ServicesComponent } from './pages/service-component/services.component';
import { SignInComponent } from './pages/sign-in-component/sign-in.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LogInComponent } from './pages/log-in/log-in.component';

export const routes: Routes = [
    {path : '' , redirectTo : '/home' , pathMatch : 'full'},
    {path : 'home' , component : HomeComponent},
    {path : 'services' , component : ServicesComponent},
    {path : 'sign-in' , component : SignInComponent},
    {path : 'log-in' , component : LogInComponent},
    {path : 'not-found' , component : NotfoundComponent},
    {path : '**' , redirectTo : '/not-found' ,pathMatch : 'full'},
];
