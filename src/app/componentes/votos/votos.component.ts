import { Component } from '@angular/core';
import { Voto } from '../../modelos/voto';
import { VotoService } from '../../servicios/voto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-votos',
  imports: [CommonModule, RouterLink],
  templateUrl: './votos.component.html',
  styleUrl: './votos.component.css'
})
export class VotosComponent {

  votos: Voto[] = [];
  idImagen: number = 0;
  mensajeError: string | null = null;
  votoIdAEliminar: number | null = null;
  mensajeExito: string | null = null;

  constructor( private votoService: VotoService, private rutaActiva: ActivatedRoute) {

  }

  ngOnInit() {
    this.idImagen = this.rutaActiva.snapshot.params['idImagen'];
    this.votoService.listarVotosPorImagen(this.idImagen).subscribe({
      next: (resultado: Voto[]) => {
        this.votos = resultado;
      },
      error: () => {
        this.mensajeError = "Error al obtener los votos.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  eliminarVoto(votoId: number) {
    this.votoIdAEliminar = votoId;
    this.mostrarModalEliminarVoto();
  }

  //Confirmar la eliminación del voto
  confirmarEliminarVoto() {
    if (this.votoIdAEliminar !== null) {
      this.votoService.eliminarVoto(this.votoIdAEliminar).subscribe({
        next: () => {
          this.votos = this.votos.filter(voto => voto.id !== this.votoIdAEliminar);
          this.votoIdAEliminar = null;
          this.ocultarModalEliminarVoto();
          this.mensajeExito = 'Voto eliminado correctamente.';
          setTimeout(() => {
            this.mensajeExito = null;
          }, 2000);
        },
        error: () => {
          this.ocultarModalEliminarVoto();
          this.mensajeError = 'Error al eliminar el voto.';
          setTimeout(() => {
            this.mensajeError = null;
          }, 3000);
        }
      });
    }
  }

   mostrarModalEliminarVoto(){
    let modalEliminar = document.getElementById('modalEliminarVoto');
    if (modalEliminar) {
      let modal = new bootstrap.Modal(modalEliminar, {
        backdrop: false    // No se muestra el fondo difuso
      });
      modal.show();
    }
   }

  ocultarModalEliminarVoto() {
    let modalEliminar = document.getElementById('modalEliminarVoto');
    if (modalEliminar) {
      let modal = bootstrap.Modal.getInstance(modalEliminar);
      modal?.hide();
    }
  }

}
