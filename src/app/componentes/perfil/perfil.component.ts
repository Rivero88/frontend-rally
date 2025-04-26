import { Component } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService, private ruta: Router) {}

  ngOnInit(): void {
    let idUsuario = Number(localStorage.getItem("idUsuario"));
    // Verifica si el idUsuario existe en el localStorage
    if (idUsuario) {
      this.usuarioService.seleccionarUsuario(idUsuario).subscribe({
        next: (resultado) => {
          this.usuario = resultado;
        },
        error: (error) => {
          console.error("Error al obtener el perfil:", error);
        }
      });
    }
  }

  // Metodo que te lleva a la vista de modificar usuario
  editarUsuario(idUsuario: number){
    this.ruta.navigate(['/mod-usuarios', idUsuario]);
  }

  // Metodo que te lleva a la vista de modificar contraseña
  editarContrasenna(idUsuario: number){
    this.ruta.navigate(['/mod-contrasenna', idUsuario]);
  }
}
