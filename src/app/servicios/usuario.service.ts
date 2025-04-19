import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  // Obtiene los usuarios haciendo la petición al backend
  listarUsuarios() {
    return this.http.get<Usuario>(`${this.apiUrl}`);
  }
}
