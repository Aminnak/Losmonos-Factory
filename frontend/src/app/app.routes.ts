import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path : '' , redirectTo : '/home' , pathMatch : 'full'},
    {path : 'home' , loadComponent : () => import('./pages/home-component/home.component').then(m => m.HomeComponent)},
    {path : 'services' , loadComponent : () => import('./pages/service-component/services.component').then(m => m.ServicesComponent)},
    {path : 'sign-in' , loadComponent : () => import('./pages/sign-in-component/sign-in.component').then(m => m.SignInComponent)},
    {path : 'login' , loadComponent : () => import('./pages/log-in/login.component').then(m => m.LogInComponent)},
    {path : 'not-found' , component : NotfoundComponent},
    {path : '**' , redirectTo : '/not-found' ,pathMatch : 'full'},
];
