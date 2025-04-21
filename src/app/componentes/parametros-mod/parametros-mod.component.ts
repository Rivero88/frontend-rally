import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ParametroService } from '../../servicios/parametro.service';
import { Parametro } from '../../modelos/parametro';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametros-mod',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parametros-mod.component.html',
  styleUrl: './parametros-mod.component.css'
})
export class ParametrosModComponent {
  
  public formParametrosMod: FormGroup;

  constructor(private fb: FormBuilder, private parametroService: ParametroService, private ruta: Router) {
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
    // Petición al servicio parametro para obtener los datos del rally por el id
    this.parametroService.listarParametros().subscribe({
      next: (resultado: Parametro) => {
        this.formParametrosMod.patchValue({
          id: resultado.id,
          numMaxFotografias: resultado.numMaxFotografias,
          tema: resultado.tema,
          fInicioInscripcion: this.formatDate(resultado.fInicioInscripcion),
          fFinInscripcion: this.formatDate(resultado.fFinInscripcion),
          fInicioVotacion: this.formatDate(resultado.fInicioVotacion),
          fFinVotacion: this.formatDate(resultado.fFinVotacion),
          fGanador: this.formatDate(resultado.fGanador),
        });
        // Carga las categorías al FormArray
        let categoriasParaEditar = this.formParametrosMod.get('categorias') as FormArray;
        resultado.categorias.forEach(cat => {
          categoriasParaEditar.push(this.fb.group({
            id: [cat.id],
            nombre: [cat.nombre, Validators.required],
            descripcion: [cat.descripcion, Validators.required]
          }));
        });
      },
      error: (error: any) => {
        console.error('Error al cargar los parámetros del rally:', error);
      },
    });
  }

  get categorias(): FormArray {
    return this.formParametrosMod.get('categorias') as FormArray;
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  // Metodo para realizar la edición de los parámetros
  editar(){
    this.parametroService.editarParametros(this.formParametrosMod.value).subscribe({
      next: () => {
        this.ruta.navigate(['/']);
      }
      , error: (error: any) => {
        console.error('Error al editar los parámetros:', error);
      }
    });
  }

  // Metdodo para volver a home cuando le demos al boton cancelar
  cancelar(){
    this.ruta.navigate(['/']);
  }

}
