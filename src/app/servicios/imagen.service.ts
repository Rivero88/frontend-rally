import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../modelos/imagen';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'http://localhost:8080/imagenes';
  //private apiUrl = `${environment.API_URL}/imagenes`;

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

  // Obtiene una imagen por su id para mostrarla en el modal
  obtenerImagen(imagenId: number){
    return this.http.get(`${this.apiUrl}/obtenerImagen/${imagenId}`, {responseType: 'arraybuffer'});
  }

  // Buscamos una imagen por su id
  seleccionarImagen(imagenId: number) {
    return this.http.get<Imagen>(`${this.apiUrl}/seleccionar/${imagenId}`); 
  }

  // Obtiene todas las imágenes de la galería
  listarImagenesTotales() {
    return this.http.get<Imagen[]>(`${this.apiUrl}/listar`);
  }

  // Modifica el estado de la imagen a validado
  cambiarEstadoValidado(imagenId: number) {
    return this.http.patch<Imagen>(`${this.apiUrl}/validar/${imagenId}`, null);
  }

   // Modifica el estado de la imagen a rechazado
  cambiarEstadoRechazado(imagenId: number) {
    return this.http.patch<Imagen>(`${this.apiUrl}/rechazar/${imagenId}`, null);
  }

  // Modifica el nombre y/o descripción de la imagen
  modificarImagen(imagen: Imagen) {
    return this.http.put<Imagen>(`${this.apiUrl}`, imagen);
  }

  // Obtiene el ranking de imagenes segun los votos
  rankingImagenes() {
    return this.http.get<Imagen[]>(`${this.apiUrl}/ranking`);
  }
}
