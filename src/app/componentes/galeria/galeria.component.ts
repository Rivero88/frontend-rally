import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Imagen } from '../../modelos/imagen';
import { ImagenService } from '../../servicios/imagen.service';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { VotoService } from '../../servicios/voto.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

  imagenes: Imagen[] = [];
  imagenSeleccionadaUrl: string = '';
  estadoDescripcion: { [key: number]: boolean } = {};
  mensajeVoto: string | null = null;
  mensajeError: string | null = null;
  tipoMensaje: 'success' | 'danger' | 'info' = 'info';

  constructor(private imagenService: ImagenService, @Inject(PLATFORM_ID) private platformId: Object, private votoService: VotoService, private authService: AuthService, private ruta: Router) {

  }

  ngOnInit() {
    // Para listar todas las imagenes de todos los usuarios
    this.imagenService.listarImagenesTotales().subscribe({
      next: (resultado: any) => {
        this.imagenes = resultado;
      },
      error: () => {
        this.tipoMensaje = 'danger';
        this.mensajeError ="Error al obtener las imágenes.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para ver la imagen en grande
  verImagen(imagenId: number) {
    this.imagenService.obtenerImagen(imagenId).subscribe({
      next: (arrayBuffer) => {
        // Convierte el arrayBuffer recibido en un Blob con tipo de imagen
        let blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Ajusta el tipo si es necesario
         // Crea una URL que puede usarse en el src de una etiqueta <img>
        let objectURL = URL.createObjectURL(blob);
        this.imagenSeleccionadaUrl = objectURL;// Actualiza la URL para mostrar la imagen

        // Si estamos en navegador, carga el modal usando Bootstrap dinámicamente
        if (isPlatformBrowser(this.platformId)) {
          import('bootstrap').then(bootstrap => {
            let modalElement = document.getElementById('verImagenModal');
            if (modalElement) {
              // Crea y muestra el modal de Bootstrap sin fondo difuso (backdrop false)
              let modal = new bootstrap.Modal(modalElement, {
                backdrop: false 
              });
              modal.show();
            }
          });
        }
      },
      error: () => {
        this.tipoMensaje = 'danger';
        this.mensajeError ="Error al obtener la imagen como archivo.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para votar una imagen
  votarImagen(imagenId: number) {
    let idUsuario = localStorage.getItem('idUsuario');
    // Primero se comprueba si el usuario ya ha votado esta imagen
    this.votoService.comprobarVotoUsuario(imagenId, idUsuario).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.tipoMensaje = 'danger';
          this.mensajeVoto = "Ya has votado esta imagen.";
          setTimeout(() => {
            this.mensajeVoto = null;
          }, 3000);
        } else {
          // Si no ha votado, se proce al voto
          this.votoService.votarImagen(imagenId, idUsuario).subscribe({
            next: () => {
              // Actualizar la imagen votada para reflejar el nuevo voto
              this.imagenService.seleccionarImagen(imagenId).subscribe({
                next: (resultadoImg) => {
                  // Busca la imagen en el array y actualiza sus votos
                  let index = this.imagenes.findIndex(img => img.id === resultadoImg.id);
                  if (index !== -1) {
                    this.imagenes[index].votosImagen = resultadoImg.votosImagen;
                  }
                  this.tipoMensaje = 'success';
                  this.mensajeVoto = "Tu voto ha sido registrado.";
                  setTimeout(() => {
                    this.mensajeVoto = null;
                  }, 3000);
                },
                error: () => {
                  this.tipoMensaje = 'danger';
                  this.mensajeError ="Error al añadir el voto en la imagen.";
                  setTimeout(() => {
                    this.mensajeError = null;
                  }, 3000);
                }
              });
            },
            error: () => {
              this.tipoMensaje = 'danger';
                  this.mensajeError ="El voto no ha podido ser registrado.";
                  setTimeout(() => {
                    this.mensajeError = null;
                  }, 3000);
            }
          });
        }
      }
    });
  }

  // Para ver más o menos de la descripción de la imagen
  minimizarDescripcion(id: number) {
    this.estadoDescripcion[id] = !this.estadoDescripcion[id];
  }

  // Para verificar si el rol es participante
  isParticipante(): boolean {
    return this.authService.isParticipante();
  }

  // Para verificar si el rol es general
  isGeneral(): boolean {
    return this.authService.isGeneral();
  }
}
