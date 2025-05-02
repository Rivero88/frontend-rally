import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ImagenService } from '../../servicios/imagen.service';
import { Router } from '@angular/router';
import { Imagen } from '../../modelos/imagen';

@Component({
  selector: 'app-imagenes-listar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './imagenes-listar.component.html',
  styleUrl: './imagenes-listar.component.css'
})
export class ImagenesListarComponent implements OnInit {

  @Input() idUsuario!:number; 
  imagenes: Imagen[] = [];

  constructor(private fb: FormBuilder, private imagenService: ImagenService, private ruta: Router) {
  }

  ngOnInit() {
    this.imagenService.obtenerImagenesUsuario(this.idUsuario).subscribe({
      next: (resultado) => {
        console.log("Imagenes del usuario para lista:", resultado);
        this.imagenes = resultado;
      },
      error: (error: any) => {
        console.error("Error al obtener las imágenes del usuario:", error);
      }
    });
  }

  verImagen(imagenId: number){

  }

  modificarImagen(imagenId: number){

  }

  eliminarImagen(imagenId: number, imagenNombre: string){
    console.log("Eliminar imagen con id:", imagenId);
    console.log("Eliminar imagen de la categoria:", imagenNombre);
    if(confirm("¿Está seguro de que desea eliminar la imagen con nombre " + imagenNombre + " ?")){ 
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
