import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(alias: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { alias: alias, password: password });
  }

  // Devuelve true si hay token
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Devuelve true si el rol es admin y false si es participante/general
  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rol = localStorage.getItem('rol');
      return rol === 'admin';
    }
    return false;
  }

  // Devuelve true si el rol es participante y false si es admin/general
  isParticipante(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rol = localStorage.getItem('rol');
      return rol === 'participante';
    }
    return false;
  }

  // Devuelve true si el rol es general y false si es admin/participante
  isGeneral(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rol = localStorage.getItem('rol');
      return rol === 'general';
    }
    return false;
  }
}