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
  mensajeError: string | null = null;

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

    // Para verificar si el rol es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isParticipante(): boolean {
    return this.authService.isParticipante();
  }

  isGeneral(): boolean {
    return this.authService.isGeneral();
  }

  // Devuelve true si hay token
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Para obtener los parámetros de la bbdd
  obtenerParametros(){
    this.parametroService.listarParametros().subscribe({
      next: (parametro: any) => {
        this.parametros = parametro;
      },
      error: () => {
        this.mensajeError = 'Error al cargar los parámetros del rally.';
      },
    });
  }

  // Para redirigir al componente de edición de parámetros
  editarParametros(){
    this.ruta.navigate(['/parametros-mod']);
  }
}
