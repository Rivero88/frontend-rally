import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../servicios/categoria.service';
import { ImagenService } from '../../servicios/imagen.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { obtenerUsuarioLogueado } from '../../../util';

@Component({
  selector: 'app-imagenes-subir',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './imagenes-subir.component.html',
  styleUrl: './imagenes-subir.component.css'
})
export class ImagenesSubirComponent {
  public formImagen: FormGroup;

  categorias: Categoria[] = []; // Se rellena con las categorias de la base de datos
  imagenesSeleccionadas: any[] = []; // Se rellena con las imagenes seleccionar por el usuario para cargarlas
  categoriasConFoto: number[] = []; // Se rellena con las categorias que ya tienen imagenes cargadas
  todasCategoriasOcupadas: boolean = false;
  descripcionCategoriaSeleccionada: string = '';
  mensajeError: string | null = null;
  cargaCorrecta: boolean = false;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private imagenService: ImagenService, private ruta: Router) {
    this.formImagen = this.fb.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    //Obtener el usuario logueado
    const usuarioId = obtenerUsuarioLogueado();
    //Listar categorías para el select
    this.categoriaService.listarCategorias().subscribe({
      next: (resultado: any) => {
        this.categorias = resultado;
        //Obtener las categorias rellenas para el usuario logueado
        this.categoriaService.obtenerCategoriasConImagen(usuarioId).subscribe({
          next: (resultado: number[]) => {
            this.categoriasConFoto = resultado;
            this.verificarCategoriasDisponibles(); // Verifica si hay categorías disponibles
          },
          error: (error: any) => {
            console.error('Error al obtener las categorías con imagen:', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Error al obtener las categorías:', error);
      },
    }); 
  }

  // Para mostrar la descripción de la categoría seleccionada
  mostrarDescripcionCategoriaSeleccionada(){
    let categoriaIdSeleccionada = this.formImagen.value.categoriaId;
    //Busca en el array de categorías  totos los id de categorias y compara con el id de la categoría seleccionada. El + delate del categoriasIdSeleccionada convierte el string a number
    let categoria = this.categorias.find(categoria => categoria.id === +categoriaIdSeleccionada);

    // Si encuentra la categoría, asigna la descripción y si no la deja vacía
    if (categoria) {
      this.descripcionCategoriaSeleccionada = categoria.descripcion;
    } else {
      this.descripcionCategoriaSeleccionada = '';
    }
  }

  // Se ejecuta al seleccionar una imagen
  seleccionarImagen(evento: any){
    let archivos = evento.target.files;
    for (let archivo of archivos) {
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

  verificarCategoriasDisponibles() {
    let categoriasDisponibles = this.categorias.filter(categoria => !this.categoriasConFoto.includes(categoria.id));
    this.todasCategoriasOcupadas = categoriasDisponibles.length === 0;
  }

  guardarImagen(){
      let formData = new FormData();
      formData.append('nombre', this.formImagen.value.nombre);
      formData.append('descripcion', this.formImagen.value.descripcion);
      formData.append('categoriaId', this.formImagen.value.categoriaId.toString());
      formData.append('usuarioId', obtenerUsuarioLogueado().toString());
      formData.append('file', this.imagenesSeleccionadas[0].file);
  
      this.imagenService.subirImagen(formData).subscribe({
        next: (resultado) => {
          //console.log('Imagen subida correctamente:', resultado);
          this.imagenesSeleccionadas = [];
          this.formImagen.reset(); // Reinicia el formulario
          this.mensajeError = null;
          this.cargaCorrecta = true;
          setTimeout(() => {
            this.ruta.navigate(['/']);
          }, 1000); // Navega después de 3 segundos
        },
        error: (error: any) => {
          if (error.error && error.error.message) {
            this.mensajeError = error.error.message;
          } else {
            this.mensajeError = 'Error inesperado al cargar la fotografía.';
          }
        }
      });
  }
}
