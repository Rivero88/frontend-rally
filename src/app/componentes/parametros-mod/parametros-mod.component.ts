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
  
  public form: FormGroup;

  constructor(private fb: FormBuilder, private parametroService: ParametroService, private ruta: Router) {
    this.form = this.fb.group({
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
      next: (parametro: Parametro) => {
        //console.log(parametro);
        this.form.patchValue({
          id: parametro.id,
          numMaxFotografias: parametro.numMaxFotografias,
          tema: parametro.tema,
          fInicioInscripcion: this.formatDate(parametro.fInicioInscripcion),
          fFinInscripcion: this.formatDate(parametro.fFinInscripcion),
          fInicioVotacion: this.formatDate(parametro.fInicioVotacion),
          fFinVotacion: this.formatDate(parametro.fFinVotacion),
          fGanador: this.formatDate(parametro.fGanador),
        });
        // Cargamos categorías al FormArray
        let categoriasParaEditar = this.form.get('categorias') as FormArray;
        parametro.categorias.forEach(cat => {
          categoriasParaEditar.push(this.fb.group({
            id: [cat.id],
            nombre: [cat.nombre, Validators.required],
            descripcion: [cat.descripcion, Validators.required]
          }));
        });
      },
      error: (err: any) => {
        console.error('Error al cargar los parámetros del rally:', err);
      },
    });
  }

  get categorias(): FormArray {
    return this.form.get('categorias') as FormArray;
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  editar(){
    this.parametroService.editarParametros(this.form.value).subscribe({
      next: (parametro: Parametro) => {
        console.log('Parámetros editados:', parametro);
        this.ruta.navigate(['/']);
      }
      , error: (err: any) => {
        console.error('Error al editar los parámetros:', err);
      }
    });
  }

  cancelar(){
    this.ruta.navigate(['/']);
  }

}
