import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Imagen } from '../../modelos/imagen';
import { ImagenService } from '../../servicios/imagen.service';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

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

  constructor(private imagenService: ImagenService, @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {
    this.imagenService.listarImagenesTotales().subscribe({
      next: (resultado:any) => {
        console.log("Resultado de la galería:", resultado);
        this.imagenes = resultado;
      },
      error: (error: any) => {
        console.error("Error al obtener las imágenes del usuario:", error);
      }
    });
  }

  // Método para ver la imagen en grande
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

  // Para ver más o menos de la descipción de la imagen
  minimizarDescripcion(id: number) {
    this.estadoDescripcion[id] = !this.estadoDescripcion[id];
  }

   // Para vertificar si el rol es admin o no
   get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
