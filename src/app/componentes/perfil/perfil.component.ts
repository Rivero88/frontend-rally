import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ImagenService } from '../../servicios/imagen.service';
import { Imagen } from '../../modelos/imagen';
import { ImagenesListarComponent } from "../imagenes-listar/imagenes-listar.component";
import { ImagenesValidarComponent } from "../imagenes-validar/imagenes-validar.component";


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ImagenesListarComponent, ImagenesValidarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuario!: Usuario;
  imagenesUsuario: Imagen[] = [];
  mensajeError: string | null = null;
  @Input() idUsuario!:number; 

  constructor(private usuarioService: UsuarioService, private ruta: Router, private imagenService: ImagenService) {}

  ngOnInit(): void {
    let idUsuario = Number(localStorage.getItem("idUsuario"));
    // Verifica si el idUsuario existe en el localStorage
    if (idUsuario) {
      this.usuarioService.seleccionarUsuario(idUsuario).subscribe({
        next: (resultado_usuario) => {
          this.usuario = resultado_usuario;
          this.imagenService.obtenerImagenesUsuario(this.usuario.id).subscribe({
            next: (resultado_imagenes) => {
              this.imagenesUsuario = resultado_imagenes;
            },
            error: () => {
              this.mensajeError = 'Error al obtener las imágenes del usuario.';
              setTimeout(() => {
                this.mensajeError = null;
              }, 3000);
            }
          });
        },
        error: () => {
          this.mensajeError = 'Error al obtener el perfil.';
          setTimeout(() => {
            this.mensajeError = null;
          }, 3000);
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
