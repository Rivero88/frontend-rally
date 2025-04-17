import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(alias: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { alias: alias,
      password: password });
  }

  // Devuelve true si hay token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Devuelve true si el rol es admin y false si es participante
  isAdmin(): boolean {
    const rol = localStorage.getItem('rol');
    return rol === 'admin'; 
  }
}