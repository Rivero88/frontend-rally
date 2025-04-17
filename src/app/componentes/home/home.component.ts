import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) { }

  // Para verificar si hay un token de inicio de sesión
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Para vertificar si el rol es admin o no
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
