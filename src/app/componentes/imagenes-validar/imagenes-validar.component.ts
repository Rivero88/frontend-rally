import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Imagen } from '../../modelos/imagen';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-imagenes-validar',
  imports: [CommonModule],
  templateUrl: './imagenes-validar.component.html',
  styleUrl: './imagenes-validar.component.css'
})
export class ImagenesValidarComponent {

  imagenes: Imagen[] = [];
  imagenSeleccionadaUrl: string = '';  //Se guarda la URL de la imagen seleccionada

  constructor(private imagenService: ImagenService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.imagenService.listarImagenesTotales().subscribe({
      next: (resultado) => {
        this.imagenes = resultado;
      },
      error: (error: any) => {
        console.error("Error al obtener las imágenes", error);
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
      error: (error) => {
        console.error('Error al obtener la imagen como archivo:', error);
      }
    });
  }

  validarImagen(imagenId: number){
    this.imagenService.cambiarEstadoValidado(imagenId).subscribe({
      next: (resultado) => {
        console.log("Imagen validada:", resultado);
        let imagenEstadoMod = this.imagenes.findIndex(img => img.id === resultado.id);
        if (imagenEstadoMod !== -1) {
          this.imagenes[imagenEstadoMod] = resultado; // reemplaza el objeto entero
          //this.imagenes[imagenEstadoMod].estadoValidacion = resultado.estadoValidacion; // Actualiza el campo estadoValidacion
        }
      },
      error: (error: any) => {
        console.error("Error al validar la imagen:", error);
      }
    });
  }

  rechazarImagen(imagenId: number){
    this.imagenService.cambiarEstadoRechazado(imagenId).subscribe({
      next: (resultado) => {
        console.log("Imagen rechazada:", resultado);
        let imagenEstadoMod = this.imagenes.findIndex(img => img.id === resultado.id);
        if (imagenEstadoMod !== -1) {
          this.imagenes[imagenEstadoMod] = resultado; // reemplaza el objeto entero
          //this.imagenes[imagenEstadoMod].estadoValidacion = resultado.estadoValidacion; // Actualiza el campo estadoValidacion
        }
      },
      error: (error: any) => {
        console.error("Error al rechazar la imagen:", error);
      }
    })
  }

}
