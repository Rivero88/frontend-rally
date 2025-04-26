import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-listar',
  imports: [CommonModule],
  templateUrl: './usuarios-listar.component.html',
  styleUrl: './usuarios-listar.component.css'
})
export class UsuariosListarComponent {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private ruta: Router) {  }

  ngOnInit() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (resultado: any) => {
        this.usuarios = resultado;
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  // Metodo que te lleva a la vista de modificar usuario
  editarUsuario(idUsuario: number){
    this.ruta.navigate(['/mod-usuarios', idUsuario]);
  }

  // Metodo para eliminar un usuario
  eliminarUsuario(idUsuario: number){
    if(confirm("¿Está seguro de que desea eliminar el usuario con ID " + idUsuario + " ?")){ 
      this.usuarioService.eliminarUsuario(idUsuario).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== idUsuario);
        },
        error: (error: any) => {
          console.error('Error al eliminar el usuario:', error);
        },
      })
    }
  }

  // Metodo que te lleva a la vista de modificar contraseña
  editarContrasenna(idUsuario: number){
    this.ruta.navigate(['/mod-contrasenna', idUsuario]);
  }

}
