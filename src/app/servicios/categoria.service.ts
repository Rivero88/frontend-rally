import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { environment } from '../../environments/environment';
import { Parametro } from '../modelos/parametro';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) { }

  // Obtiene todas las categorias
  listarCategorias() {
    return this.http.get<Categoria>(`${this.apiUrl}`);
  }

  // Obtiene las categorias ocupadas por un usuario
  obtenerCategoriasConImagen(usuarioId: number){
    return this.http.get<number[]>(`${this.apiUrl}/cargar/categorias_ocupadas/${usuarioId}`);
  }

  // Para crear una nueva categoria
  nuevaCategoria(categoria: Categoria){
    let parametro:Parametro = {
      id: 0,
      numMaxFotografias: 0,
      tema: '',
      fInicioInscripcion: new Date(),
      fFinInscripcion: new Date(),
      fInicioVotacion: new Date(),
      fFinVotacion: new Date(),
      fGanador: new Date(),
      categorias: []
    }
    categoria.parametro = parametro;
    return this.http.post<Categoria>(`${this.apiUrl}/nuevaCategoria`, categoria);
  }

  // Para eliminar una categoria
  eliminarCategoria(categoriaId: number){
    return this.http.delete<Categoria>(`${this.apiUrl}/eliminar/${categoriaId}`);
  }
}
