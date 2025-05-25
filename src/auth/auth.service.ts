import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) {}

  login(alias: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { alias: alias, password: password });
  }

  // Devuelve true si hay token
  isAuthenticated(): boolean {
    return  typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  // Devuelve true si el rol es admin y false si es participante/general
  isAdmin(): boolean {
    const rol = localStorage.getItem('rol');
    return  typeof window !== 'undefined' && rol === 'admin'; 
  }

  // Devuelve true si el rol es participante y false si es admin/general
  isParticipante(): boolean {
    const rol = localStorage.getItem('rol');
    return  typeof window !== 'undefined' && rol === 'participante';
  }

  // Devuelve true si el rol es general y false si es admin/participante
  isGeneral(): boolean {
    const rol = localStorage.getItem('rol');
    return  typeof window !== 'undefined' && rol === 'general';
  }
}