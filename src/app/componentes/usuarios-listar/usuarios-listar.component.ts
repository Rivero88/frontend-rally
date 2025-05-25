import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
declare var bootstrap: any; 

@Component({
  selector: 'app-usuarios-listar',
  imports: [CommonModule],
  templateUrl: './usuarios-listar.component.html',
  styleUrl: './usuarios-listar.component.css'
})

export class UsuariosListarComponent {

  usuarios: Usuario[] = [];
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  usuarioIdAEliminar: number | null = null;

  constructor(private usuarioService: UsuarioService, private ruta: Router) {  }

  ngOnInit() {
    // Se cargan los usuarios al iniciar el componente
    this.usuarioService.listarUsuarios().subscribe({
      next: (resultado: any) => {
        this.usuarios = resultado;
      },
      error: () => {
        this.mensajeError = "Error al cargar los usuarios.";
      },
    });
  }

  // Metodo que te lleva a la vista de modificar usuario
  editarUsuario(idUsuario: number){
    this.ruta.navigate(['/mod-usuarios', idUsuario]);
  }

  // Metodo que te lleva a la vista de modificar contraseña
  editarContrasenna(idUsuario: number){
    this.ruta.navigate(['/mod-contrasenna', idUsuario]);
  }

  // Metodo para eliminar un usuario
  eliminarUsuario(idUsuario: number){
    this.usuarioIdAEliminar = idUsuario;
    this.mostrarModalEliminarUsuario();
  }

  //Confirmar la eliminación del usuario
  confirmarEliminarUsuario() {
    if (this.usuarioIdAEliminar !== null) {
      this.usuarioService.eliminarUsuario(this.usuarioIdAEliminar).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== this.usuarioIdAEliminar);
          this.usuarioIdAEliminar = null;
          this.ocultarModalEliminarUsuario();
          this.mensajeExito = "Usuario eliminado correctamente.";
          setTimeout(() => {
            this.mensajeExito = null;
          }, 2000);
        },
        error: () => {
          this.ocultarModalEliminarUsuario();
          this.mensajeError = "Error al eliminar el usuario. Comprobar si el usuario tiene imágenes asociadas o votaciones.";
          setTimeout(() => {
            this.mensajeError = null;
          }, 3000);
        },
      })
    }
  }

  mostrarModalEliminarUsuario(){
    let modalEliminar = document.getElementById('modalEliminarUsuario');
      if (modalEliminar) {
        let modal = new bootstrap.Modal(modalEliminar, {
          backdrop: false    // No se muestra el fondo difuso
        });
        modal.show();
      } 
  }

  ocultarModalEliminarUsuario(){
    let modalEliminar = document.getElementById('modalEliminarUsuario');
      if (modalEliminar) {
        let modal = bootstrap.Modal.getInstance(modalEliminar);
        modal?.hide();
    }
  }
}
