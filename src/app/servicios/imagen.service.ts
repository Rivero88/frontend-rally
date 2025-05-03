import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../modelos/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'http://localhost:8080/imagenes';

  constructor(private http: HttpClient) { }

  // Cargar una imagen
  subirImagen(formData: FormData) {
    return this.http.post<Imagen>(`${this.apiUrl}/cargar`, formData);
  }

  // Obtiene las imágenes de un usuario
  obtenerImagenesUsuario(usuarioId: number) {
    return this.http.get<Imagen[]>(`${this.apiUrl}/listar/${usuarioId}`);
  }

  // Elimina una imagen por su id
  eliminarImagen(imagenId: number){
    return this.http.delete<Imagen>(`${this.apiUrl}/${imagenId}`);
  }

  // Obtiene una imagen por su id para mostrarla en un modal
  obtenerImagen(imagenId: number){
    return this.http.get(`${this.apiUrl}/obtenerImagen/${imagenId}`, {responseType: 'arraybuffer'});
  }

  // Obtiene todas las imágenes de la galería
  listarImagenesTotales() {
    return this.http.get<Imagen[]>(`${this.apiUrl}/listar`);
  }
}
