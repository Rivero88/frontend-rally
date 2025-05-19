import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametro } from '../modelos/parametro';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private apiUrl = 'http://localhost:8080/parametros';
  //private apiUrl = `${environment.API_URL}/parametros`;
  
  constructor(private http: HttpClient) { }

  // Obtiene los parámetros del rally
  listarParametros(){
    return this.http.get<Parametro>(`${this.apiUrl}`);
  }

  // Editar los parámetros del rally
  editarParametros(parametro: Parametro) {
    return this.http.put<Parametro>(`${this.apiUrl}`, parametro);
  }
}
