import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Parametro } from '../../modelos/parametro';
import { ParametroService } from '../../servicios/parametro.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  parametros!: Parametro;

  constructor(private authService: AuthService, private ruta: Router, private parametroService: ParametroService) { 
    this.parametros ={
      id: 0,
      numMaxFotografias: 0,
      tema: "",
      fInicioInscripcion: new Date(),
      fFinInscripcion: new Date(),
      fInicioVotacion: new Date(),
      fFinVotacion: new Date(),
      fGanador: new Date(),
      categorias: [],
    }
  }

  ngOnInit() { 
    this.obtenerParametros();
   }


  // Para verificar si hay un token de inicio de sesión
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Para vertificar si el rol es admin o no
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Para obtener los parámetros de la bbdd
  obtenerParametros(){
    this.parametroService.listarParametros().subscribe({
      next: (parametro: any) => {
        this.parametros = parametro;
      },
      error: (err: any) => {
        console.error('Error al cargar los parámetros del rally:', err);
      },
    });
  }

  // Para redirigir al componente de edición de parámetros
  editarParametros(){
    this.ruta.navigate(['/parametros-mod']);
  }
}
