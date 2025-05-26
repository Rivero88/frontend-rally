import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voto } from '../modelos/voto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  private apiUrl = `${environment.API_URL}/votos`;

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

  // Listar votos por imagen
  listarVotosPorImagen(imagenId: number) {
    return this.http.get<Voto[]>(`${this.apiUrl}/obtenerVotos/${imagenId}`);
  }

  // Eliminar un voto por su id
  eliminarVoto(votoId: number) {
    return this.http.delete(`${this.apiUrl}/${votoId}`);
  }

  // Obtiene una lista de votos
  votosPorFecha(){
    return this.http.get<any[]>(`${this.apiUrl}/votosRanking`);
  }

}
