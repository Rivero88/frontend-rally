import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imagenes-mod',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './imagenes-mod.component.html',
  styleUrl: './imagenes-mod.component.css'
})
export class ImagenesModComponent {
  public formImagenMod: FormGroup;
  idImagen: number = 0;
  mensajeError: string | null = null;
  imagenEncontrada: boolean = false;
  imagenModificada: boolean = false;

  constructor(private fb: FormBuilder, private rutaActiva: ActivatedRoute, private ruta: Router, private imagenService: ImagenService) {
    this.formImagenMod = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      descripcion: this.fb.control('', [Validators.required, Validators.minLength(10)])
    })
  }

  ngOnInit() {
    this.idImagen = this.rutaActiva.snapshot.params['idImagen']; // Recoge el id de la fotografía de la url
    this.imagenService.seleccionarImagen(this.idImagen).subscribe({
      next: (resultado: any) => {
        this.mensajeError = null;
        this.imagenEncontrada = true;
        this.formImagenMod.patchValue(resultado);
      },
      error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al cargar la imagen.';
        }
      }
    });
  }

  editar(){
    this.imagenService.modificarImagen(this.formImagenMod.value).subscribe({
      next: (resultado: any) => {
        this.mensajeError = null;
        this.imagenModificada = true;
        setTimeout(() => {
            this.ruta.navigate(['/perfil']);
          }, 1000); // Navega después de 1 segundo
      },
      error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al modificar la imagen.';
        }
      }
    });
  }

  // Para volver al perfil
  cancelar(){
    this.ruta.navigate(['/perfil']);
  }
}
