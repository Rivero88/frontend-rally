import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../servicios/categoria.service';
import { ImagenService } from '../../servicios/imagen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagenes-listar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './imagenes-listar.component.html',
  styleUrl: './imagenes-listar.component.css'
})
export class ImagenesListarComponent {

  public formImagen: FormGroup;

  categorias: Categoria[] = [];
  imagenesSeleccionadas: any[] = [];
  descripcionCategoriaSeleccionada: string = '';
  mensajeError: string | null = null;
  cargaCorrecta: boolean = false;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private imagenService: ImagenService, private ruta: Router) {
    this.formImagen = this.fb.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoriaService.listarCategorias().subscribe({
      next: (resultado: any) => {
        this.categorias = resultado;
      },
      error: (error: any) => {
        console.error('Error al obtener las categorías:', error);
      },
    });
  }

  mostrarDescripcionCategoriaSeleccionada(){
    let categoriaIdSeleccionada = this.formImagen.value.categoriaId;
    let categoria = this.categorias.find(categoria => categoria.id === +categoriaIdSeleccionada);

    if (categoria) {
      this.descripcionCategoriaSeleccionada = categoria.descripcion; // asigno la descripción
    } else {
      this.descripcionCategoriaSeleccionada = '';
    }
  }

  seleccionarImagen(evento: any){
    let archivos = evento.target.files;
    for (let archivo of archivos) {
      if (!this.validarFormato(archivo)) {
        alert("Formato de imagen no permitido");
        continue;
      }
      if (!this.validarTam(archivo)) {
        alert("La imagen supera el tamaño máximo permitido (2MB)");
        continue;
      }
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesSeleccionadas.push({
          file: archivo,
          url: e.target.result
        });
      };
      reader.readAsDataURL(archivo);
    }
  }

  validarFormato(archivo: File): boolean {
    let formatosPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
    return formatosPermitidos.includes(archivo.type);
  }

  validarTam(archivo: File): boolean {
    let maxTamMB = 2;
    return archivo.size <= maxTamMB * 1024 * 1024;
  }

  obtenerUsuarioLogueado(){
    let id = Number(localStorage.getItem("idUsuario"));
    return id ? +id : 0;
  }

  onSubmit(){
      let formData = new FormData();
      formData.append('nombre', this.formImagen.value.nombre);
      formData.append('descripcion', this.formImagen.value.descripcion);
      formData.append('categoriaId', this.formImagen.value.categoriaId.toString());
      formData.append('usuarioId', this.obtenerUsuarioLogueado().toString());
      formData.append('file', this.imagenesSeleccionadas[0].file);
  
      this.imagenService.subirImagen(formData).subscribe({
        next: (resultado) => {
          console.log('Imagen subida correctamente:', resultado);
          this.imagenesSeleccionadas = [];
          this.formImagen.reset();
          this.mensajeError = null;
          this.cargaCorrecta = true;
          setTimeout(() => {
            this.ruta.navigate(['/']);
          }, 3000); // Navega después de 3 segundos
        },
        error: (error: any) => {
          if (error.error && error.error.message) {
            this.mensajeError = error.error.message;
          } else {
            this.mensajeError = 'Error inesperado al carga la fotografía.';
          }
        }
      });
  }

  modificarImagen(imagenId: number){

  }

  eliminarImagen(imagenId: number){

  }
}
