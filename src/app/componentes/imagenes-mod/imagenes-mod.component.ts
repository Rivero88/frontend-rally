import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenService } from '../../servicios/imagen.service';

@Component({
  selector: 'app-imagenes-mod',
  imports: [ReactiveFormsModule],
  templateUrl: './imagenes-mod.component.html',
  styleUrl: './imagenes-mod.component.css'
})
export class ImagenesModComponent {
  public formImagenMod: FormGroup;
  idImagen: number = 0;

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
        console.log('Imagen seleccionada:', resultado);
        this.formImagenMod.patchValue(resultado);
      },
      error: (error: any) => {
        console.error('Error al cargar los datos de la imagen:', error);
      }
    });
  }

  editar(){
    this.imagenService.modificarImagen(this.formImagenMod.value).subscribe({
      next: (resultado: any) => {
        console.log('Imagen editada:', resultado);
        this.ruta.navigate(['/perfil']);
      },
      error: (error: any) => {
        console.error('Error al editar la imagen:', error);
      }
    });
  }

  // Para volver al perfil
  cancelar(){
    this.ruta.navigate(['/perfil']);
  }
}
