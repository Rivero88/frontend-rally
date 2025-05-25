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
        let blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Ajusta el tipo si es PNG u otro
        let objectURL = URL.createObjectURL(blob);
        this.imagenSeleccionadaUrl = objectURL;

        if (isPlatformBrowser(this.platformId)) {
          import('bootstrap').then(bootstrap => {
            let modalElement = document.getElementById('verImagenModal');
            if (modalElement) {
              let modal = new bootstrap.Modal(modalElement, {
                backdrop: false    // No se muestra el fondo difuso
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
    this.votoService.comprobarVotoUsuario(imagenId, idUsuario).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.tipoMensaje = 'danger';
          this.mensajeVoto = "Ya has votado esta imagen.";
          setTimeout(() => {
            this.mensajeVoto = null;
          }, 3000);
        } else {
          this.votoService.votarImagen(imagenId, idUsuario).subscribe({
            next: () => {
              // Actualizar la imagen votada para reflejar el nuevo voto
              this.imagenService.seleccionarImagen(imagenId).subscribe({
                next: (resultadoImg) => {
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

  isParticipante(): boolean {
    return this.authService.isParticipante();
  }

  isGeneral(): boolean {
    return this.authService.isGeneral();
  }
}
