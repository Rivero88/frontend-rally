import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent }, 
    { path: 'registro', component: RegistroComponent }
];
