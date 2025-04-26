import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarCategorias() {
    return this.http.get<Categoria>(`${this.apiUrl}`);
  }
}
