import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ParametroService } from '../../servicios/parametro.service';
import { Parametro } from '../../modelos/parametro';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatoFecha } from '../../../util';
import { CategoriaService } from '../../servicios/categoria.service';
declare var bootstrap: any; 

@Component({
  selector: 'app-parametros-mod',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parametros-mod.component.html',
  styleUrl: './parametros-mod.component.css'
})
export class ParametrosModComponent {
  
  public formParametrosMod: FormGroup;
  mensajeError: string | null = null;
  categoriaBorradaCorrectamente: boolean = false;
  parametroModificado: boolean = false;
  categoriaIdAEliminar: number | null = null;
  indexAEliminar: number = 0;

  constructor(private fb: FormBuilder, private parametroService: ParametroService, private categoriaService: CategoriaService, private ruta: Router) {
    this.formParametrosMod = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      numMaxFotografias: this.fb.control('', [Validators.required, Validators.min(1)]),
      tema: this.fb.control('', [Validators.required]),
      fInicioInscripcion: this.fb.control('', [Validators.required]),
      fFinInscripcion: this.fb.control('', [Validators.required]),
      fInicioVotacion: this.fb.control('', [Validators.required]),
      fFinVotacion: this.fb.control('', [Validators.required]),
      fGanador: this.fb.control('', [Validators.required]),
      categorias: this.fb.array([])
    });
  }

  ngOnInit(){
    // Petición al servicio parametro para obtener los datos del rally
    this.parametroService.listarParametros().subscribe({
      next: (resultado: Parametro) => {
        this.formParametrosMod.patchValue({
          id: resultado.id,
          numMaxFotografias: resultado.numMaxFotografias,
          tema: resultado.tema,
          fInicioInscripcion: formatoFecha(resultado.fInicioInscripcion),
          fFinInscripcion: formatoFecha(resultado.fFinInscripcion),
          fInicioVotacion: formatoFecha(resultado.fInicioVotacion),
          fFinVotacion: formatoFecha(resultado.fFinVotacion),
          fGanador: formatoFecha(resultado.fGanador),
        });
        // Carga las categorías a un FormArray
        let categoriasParaEditar = this.formParametrosMod.get('categorias') as FormArray;
        resultado.categorias.forEach(cat => {
          categoriasParaEditar.push(this.fb.group({
            id: [cat.id],
            nombre: [cat.nombre, Validators.required],
            descripcion: [cat.descripcion, Validators.required]
          }));
        });
      },
      error: () => {
        this.mensajeError = 'Error al cargar los parámetros del rally.';
      },
    });
  }

  // Getter para acceder fácilmente al FormArray de categorías
  get categorias(): FormArray {
    return this.formParametrosMod.get('categorias') as FormArray;
  }

  // Metodo para realizar la edición de los parámetros
  editar(){
    this.parametroService.editarParametros(this.formParametrosMod.value).subscribe({
      next: () => {
        this.mensajeError = null;
        this.parametroModificado = true;
        setTimeout(() => {
          this.ruta.navigate(['/']);
        }, 2000); // Navega después de 1 segundo
      }
      , error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al modificar el parámetro.';
        }
      }
    });
  }

  //Método para eliminar una categoría
  eliminarCategoria(categoriaId: number,  index: number){
    this.mostrarModalEliminarCategoria();
    this.categoriaIdAEliminar = categoriaId;
    this.indexAEliminar = index;
  }

  confirmarEliminarCategoria() {
    if (this.categoriaIdAEliminar !== null && this.indexAEliminar !== null) {
      this.categoriaService.eliminarCategoria(this.categoriaIdAEliminar).subscribe({
        next: () => {
          this.mensajeError = null;
          this.categoriaBorradaCorrectamente = true;
          this.ocultarModalEliminarCategoria();
          // Elimina del FormArray también
          this.categorias.removeAt(this.indexAEliminar);
          setTimeout(() => {
            this.categoriaBorradaCorrectamente = false;
          }, 2000);
        },
        error: error => {
          this.ocultarModalEliminarCategoria();
          if (error.error && error.error.message) {
            this.mensajeError = error.error.message;
            setTimeout(() => {
              this.mensajeError = null;
            }, 3000);
          } else {
            this.mensajeError = 'Error inesperado al eliminar la categoría.';
            setTimeout(() => {
              this.mensajeError = null;
            }, 3000);
          }
        }
      });
    }
  }

  mostrarModalEliminarCategoria(){
    let modalEliminar = document.getElementById('modalEliminarCategoria');
      if (modalEliminar) {
        let modal = new bootstrap.Modal(modalEliminar, {
          backdrop: false    // No se muestra el fondo difuso
        });
        modal.show();
      } 
  }

  ocultarModalEliminarCategoria(){
    let modalEliminar = document.getElementById('modalEliminarCategoria');
      if (modalEliminar) {
        let modal = bootstrap.Modal.getInstance(modalEliminar);
        modal?.hide();
    }
  }

  // Metodo para volver a home cuando le demos al boton cancelar
  cancelar(){
    this.ruta.navigate(['/']);
  }

}
