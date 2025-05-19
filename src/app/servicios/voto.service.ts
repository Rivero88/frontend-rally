import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voto } from '../modelos/voto';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  private apiUrl = 'http://localhost:8080/votos';
  //private apiUrl = `${environment.API_URL}/votos`;

  constructor(private http: HttpClient) { }

  // Votar una imagen por su id
  votarImagen(imagenId: number, idUsuario: any) {
    return this.http.put<Voto>(`${this.apiUrl}/${imagenId}/${idUsuario}`, null);
  }

  // Comprobar votos de un usuario
  comprobarVotoUsuario(imagenId: number, idUsuario: any) {
    let params = new HttpParams()
      .set('imagenId', imagenId)
      .set('idUsuario', idUsuario);
    return this.http.get<boolean>(`${this.apiUrl}/comprobar`, { params });
  }
}
