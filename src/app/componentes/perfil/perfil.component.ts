import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ImagenService } from '../../servicios/imagen.service';
import { Imagen } from '../../modelos/imagen';
import { ImagenesListarComponent } from "../imagenes-listar/imagenes-listar.component";


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ImagenesListarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuario!: Usuario;
  imagenesUsuario: Imagen[] = [];
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
            error: (error: any) => {
              console.error("Error al obtener las imágenes del usuario:", error);
            }
          });
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
