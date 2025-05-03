import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  // Obtiene todas las categorias
  listarCategorias() {
    return this.http.get<Categoria>(`${this.apiUrl}`);
  }

  // Obtiene las categorias ocupadas por un usuario
  obtenerCategoriasConImagen(usuarioId: number){
    return this.http.get<number[]>(`${this.apiUrl}/cargar/categorias_ocupadas/${usuarioId}`);
  }
}
