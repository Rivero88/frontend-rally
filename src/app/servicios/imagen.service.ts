import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../modelos/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'http://localhost:8080/imagenes';

  constructor(private http: HttpClient) { }

  subirImagen(formData: FormData) {
    return this.http.post<Imagen>(`${this.apiUrl}/cargar`, formData);
  }
}
