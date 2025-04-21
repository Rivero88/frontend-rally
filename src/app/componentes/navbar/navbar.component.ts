import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  idUsuario: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Para verificar si hay un token de inicio de sesión
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Para vertificar si el rol es admin o no
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminamos el token
    this.router.navigate(['/']);
  }

}
