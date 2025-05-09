import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImagenService } from '../../servicios/imagen.service';
import { Router } from '@angular/router';
import { Imagen } from '../../modelos/imagen';

@Component({
  selector: 'app-imagenes-listar',
  imports: [CommonModule],
  templateUrl: './imagenes-listar.component.html',
  styleUrl: './imagenes-listar.component.css'
})
export class ImagenesListarComponent implements OnInit {

  @Input() idUsuario!:number; 
  imagenes: Imagen[] = [];
  imagenSeleccionadaUrl: string = '';  //Se guarda la URL de la imagen seleccionada

  constructor(private imagenService: ImagenService, private ruta: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.imagenService.obtenerImagenesUsuario(this.idUsuario).subscribe({
      next: (resultado) => {
        this.imagenes = resultado;
      },
      error: (error: any) => {
        console.error("Error al obtener las imágenes del usuario:", error);
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

  modificarImagen(imagenId: number){
    this.ruta.navigate(['/imagen-mod', imagenId]);
  }

  // Para eliminar una imagen
  eliminarImagen(imagenId: number, imagenNombre: string, imagenCategoria: string){
    if(confirm("¿Está seguro de que desea eliminar la imagen de la categoria " + imagenCategoria + " con nombre " + imagenNombre + "?")){ 
      this.imagenService.eliminarImagen(imagenId).subscribe({
        next: () => {
          this.imagenes = this.imagenes.filter(img => img.id !== imagenId);
        },
        error: (error: any) => {
          console.error('Error al eliminar la fotografía:', error);
        },
      })
    }
  }
}
