import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../servicios/categoria.service';
import { ParametroService } from '../../servicios/parametro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  public formCategoria: FormGroup;
  mensajeError: string | null = null;
  registroCorrecto: boolean = false;

  constructor(private fb: FormBuilder, private ruta: Router, private categoriaService: CategoriaService, private parametroService: ParametroService){
    this.formCategoria = this.fb.group({
      id: this.fb.control(''),
      nombre: this.fb.control('', [Validators.required]),
      descripcion:this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(){
  }

  // Para crear una nueva categoría
  nuevaCategoria(){
    if (this.formCategoria.invalid) {
      this.formCategoria.markAllAsTouched();
      return;
    }
    this.categoriaService.nuevaCategoria(this.formCategoria.value).subscribe({
      next: () => {
        this.mensajeError = null;
        this.registroCorrecto = true;
        setTimeout(() => {
          this.ruta.navigate(['/']);
        }, 1000);
      },
      error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
          setTimeout(() => {
              this.mensajeError = null;
          }, 3000);
        } else {
          this.mensajeError = 'Error al crear nueva categoria.';
          setTimeout(() => {
              this.mensajeError = null;
          }, 3000);
        }
      }
    })
  }

  // Metdodo para volver a home cuando le demos al boton cancelar
  cancelar(){
    this.ruta.navigate(['/']);
  }

}
