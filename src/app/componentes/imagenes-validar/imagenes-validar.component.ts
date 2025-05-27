import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Imagen } from '../../modelos/imagen';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-imagenes-validar',
  imports: [CommonModule],
  templateUrl: './imagenes-validar.component.html',
  styleUrl: './imagenes-validar.component.css'
})
export class ImagenesValidarComponent {

  imagenes: Imagen[] = [];
  imagenSeleccionadaUrl: string = '';
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  imagenIdAEliminar: number | null = null;
  imagenNombreModal: string = '';
  imagenCategoriaModal: string = '';
  imagenEstadoModal: string = '';
  @ViewChild('modalEliminar') modalEliminar!: ElementRef;

  constructor(private imagenService: ImagenService, private ruta: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.imagenService.listarImagenesTotales().subscribe({
      next: (resultado) => {
        this.imagenes = resultado;
      },
      error: () => {
        this.mensajeError = "Error al obtener las imágenes";
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
        this. mensajeError = "Error al obtener la imagen como archivo.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para validar la imagen
  validarImagen(imagenId: number){
    this.imagenService.cambiarEstadoValidado(imagenId).subscribe({
      next: (resultado) => {
        let imagenEstadoMod = this.imagenes.findIndex(img => img.id === resultado.id);
        if (imagenEstadoMod !== -1) {
          this.imagenes[imagenEstadoMod] = resultado; // reemplaza el objeto entero
          this.mensajeExito = 'Imagen validada.';
          setTimeout(() => {
            this.mensajeExito = null;
          }, 3000);
        }
      },
      error: () => {
        this. mensajeError = "Error al validar la imagen.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para rechazar la imagen
  rechazarImagen(imagenId: number){
    this.imagenService.cambiarEstadoRechazado(imagenId).subscribe({
      next: (resultado) => {
        let imagenEstadoMod = this.imagenes.findIndex(img => img.id === resultado.id);
        if (imagenEstadoMod !== -1) {
          this.imagenes[imagenEstadoMod] = resultado; // reemplaza el objeto entero
          this.mensajeExito = 'Imagen rechazada.';
          setTimeout(() => {
            this.mensajeExito = null;
          }, 3000);
        }
      },
      error: () => {
        this.mensajeError = "Error al rechazar la imagen.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    })
  }

  // Para eliminar una imagen
  eliminarImagen(imagenId: number, imagenNombre: string, imagenCategoria: string, imagenEstado: string){
    this.imagenIdAEliminar = imagenId;
    this.imagenNombreModal = imagenNombre;
    this.imagenCategoriaModal = imagenCategoria;
    this.imagenEstadoModal = imagenEstado;
    this.mostrarModalEliminarImagen();    
  }

  //Confirmar la eliminación de la imagen
  confirmarEliminarImagen() {
    if (this.imagenIdAEliminar !== null) {
      this.imagenService.eliminarImagen(this.imagenIdAEliminar).subscribe({
        next: () => {
          this.imagenes = this.imagenes.filter(img => img.id !== this.imagenIdAEliminar);
          this.imagenIdAEliminar = null;
          this.ocultarModalEliminarImagen();
          this.mensajeExito = 'Fotografía eliminada correctamente.';
          setTimeout(() => {
            this.mensajeExito = null;
          }, 3000);
        },
        error: () => {
          this.ocultarModalEliminarImagen();
          this.mensajeError = 'Error al eliminar la fotografía.';
          setTimeout(() => {
            this.mensajeError = null;
          }, 3000);
        }
      });
    }
  }

   mostrarModalEliminarImagen(){
    let modalEliminar = document.getElementById('modalEliminarImagen');
    if (modalEliminar) {
      let modal = new bootstrap.Modal(modalEliminar, {
        backdrop: false    // No se muestra el fondo difuso
      });
      modal.show();
    }
   }

  ocultarModalEliminarImagen() {
    let modalEliminar = document.getElementById('modalEliminarImagen');
    if (modalEliminar) {
      let modal = bootstrap.Modal.getInstance(modalEliminar);
      modal?.hide();
    }
  }

  // Metodo que te lleva a la lista de votos de una imagen
  verVotos(idImagen: number){
    this.ruta.navigate(['/votos', idImagen]);
  }

}
