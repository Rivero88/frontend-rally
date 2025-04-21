import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  // Obtiene todos los usuarios
  listarUsuarios() {
    return this.http.get<Usuario>(`${this.apiUrl}`);
  }

  // Elimina un usuario por su id
  eliminarUsuario(idUsuario: number) {
    return this.http.delete<Usuario>(`${this.apiUrl}/${idUsuario}`);
  }

  // Seleccionar un usuario por su id
  seleccionarUsuario(idUsuario: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/${idUsuario}`);
  }

  editarUsuario(usuario: Usuario){
    return this.http.put<Usuario>(`${this.apiUrl}`, usuario);
  }

  modificarContrasenna(idUsuario: number, contrasennaNueva: string){
    let params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('contrasennaNueva', contrasennaNueva);
    return this.http.put(`${this.apiUrl}
      /modificarContrasenna`, null, { params });
  }
}
