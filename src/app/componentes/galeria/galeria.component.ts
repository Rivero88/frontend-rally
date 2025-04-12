import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  imports: [],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  fotosFiltradas = [
    {
      id: 1,
      url: 'assets/Ejemplo-galeria/Coliseo.jpg',
      titulo: 'Coliseo Romano',
      autor: 'Ester Rodríguez',
      tematica: 'Paisaje'
    },
    {
      id: 2,
      url: 'assets/Ejemplo-galeria/Spaguettis.jpg',
      titulo: 'Spaguettis',
      autor: 'Ester Rodríguez',
      tematica: 'Gastronomía'
    },
    {
      id: 3,
      url: 'assets/Ejemplo-galeria/Mercado_Campo_Di_Fiori.jpg',
      titulo: 'Mercado di Campo di Fiori',
      autor: 'Ester Rodríguez',
      tematica: 'Viajeros en acción'
    },
    {
      id: 4,
      url: 'assets/Ejemplo-galeria/Fontana_di_Trevi.jpg',
      titulo: 'Fontana di Trevi',
      autor: 'Ester Rodríguez',
      tematica: 'Viviendo la cultura'
    }
  ];
}
