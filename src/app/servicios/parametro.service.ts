import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parametro } from '../modelos/parametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private apiUrl = 'http://localhost:8080/parametros';
  
  constructor(private http: HttpClient) { }

  // Obtiene los parámetros del rally haciendo la petición al backend
  listarParametros(){
    return this.http.get<Parametro>(`${this.apiUrl}`);
  }

  // Editar los parámetros del rally
  editarParametros(parametro: Parametro) {
    return this.http.put<Parametro>(`${this.apiUrl}`, parametro);
  }
}
