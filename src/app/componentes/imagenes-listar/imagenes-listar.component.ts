import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImagenService } from '../../servicios/imagen.service';
import { Router } from '@angular/router';
import { Imagen } from '../../modelos/imagen';
import { ViewChild, ElementRef } from '@angular/core';
declare var bootstrap: any;

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
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  @ViewChild('modalEliminar') modalEliminar!: ElementRef;
  imagenIdAEliminar: number | null = null;
  imagenNombreModal: string = '';
  imagenCategoriaModal: string = '';

  constructor(private imagenService: ImagenService, private ruta: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.imagenService.obtenerImagenesUsuario(this.idUsuario).subscribe({
      next: (resultado) => {
        this.imagenes = resultado;
      },
      error: () => {
        this.mensajeError = "Error al obtener las imágenes del usuario.";
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
            let modalVerImagen = document.getElementById('verImagenModal');
            if (modalVerImagen) {
              let modal = new bootstrap.Modal(modalVerImagen, {
                backdrop: false    // No se muestra el fondo difuso
              });
              modal.show();
            }
          });
        }
      },
      error: () => {
        this.mensajeError = 'Error al obtener la imagen como archivo.';
      }
    });
  }

  // Para modificar una imagen. Redirecciona al componente
  modificarImagen(imagenId: number){
    this.ruta.navigate(['/imagen-mod', imagenId]);
  }

  // Para eliminar una imagen
  eliminarImagen(imagenId: number, imagenNombre: string, imagenCategoria: string){
    this.imagenIdAEliminar = imagenId;
    this.imagenNombreModal = imagenNombre;
    this.imagenCategoriaModal = imagenCategoria;
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
}
