import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.API_URL}/usuarios`;

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

  // Edita un usuario
  editarUsuario(usuario: Usuario){
    return this.http.put<Usuario>(`${this.apiUrl}`, usuario);
  }

  // Modifica contraseña por su id
  modificarContrasenna(idUsuario: number, contrasennaNueva: string){
    let params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('contrasennaNueva', contrasennaNueva);
    return this.http.put(`${this.apiUrl}/modificarContrasenna`, null, { params });
  }

  // Crea un nuevo usuario
  nuevoUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.apiUrl}/registrar`, usuario);
  }

}
