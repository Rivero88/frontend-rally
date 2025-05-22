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

  // Para verificar si el rol es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isParticipante(): boolean {
    return this.authService.isParticipante();
  }

  isGeneral(): boolean {
    return this.authService.isGeneral();
  }

  // Devuelve true si hay token
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminamos el token
    localStorage.removeItem('rol'); // Eliminamos el rol
    localStorage.removeItem('idUsuario'); // Eliminamos el rol
    this.router.navigate(['/']);
  }

}
