import { Component } from '@angular/core';
import { Imagen } from '../../modelos/imagen';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imagenes-validar',
  imports: [CommonModule],
  templateUrl: './imagenes-validar.component.html',
  styleUrl: './imagenes-validar.component.css'
})
export class ImagenesValidarComponent {

  imagenes: Imagen[] = [];

  constructor(private imagenService: ImagenService) {
  }

  ngOnInit() {
    this.imagenService.listarImagenesTotales().subscribe({
      next: (resultado) => {
        this.imagenes = resultado;
      },
      error: (error: any) => {
        console.error("Error al obtener las imágenes del usuario:", error);
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
