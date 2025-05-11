import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  rankingImagenes: any[] = [];
  @ViewChild('canvasRanking', { static: false }) canvasRef!: ElementRef;
  chartInstance: any;

  constructor(private imagenService: ImagenService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.obtenerRanking();
  }

  // Para obtener el ranking según los votos del backend
  obtenerRanking(): void {
    this.imagenService.rankingImagenes().subscribe({
      next: (resultado) => {
        this.rankingImagenes = resultado;
        setTimeout(() => {
          this.crearGrafico();
        }, 0);
      },
      error: (error) => {
        console.error("Error al obtener ranking de imágenes", error);
      }
    });
  }

  // Para crear gráfico de barras
  crearGrafico(): void {
    // Verifica si se está ejecutando en el navegador la creación del gráfico 
    if (isPlatformBrowser(this.platformId)) {
      // Etiquetas para el gráfico
      let categorias = this.rankingImagenes.map(i => i.categoria);
      let nombres = this.rankingImagenes.map(i => i.nombre);
      let votos = this.rankingImagenes.map(i => i.votos);

      // Asignación de colores según categoría
      let colorPorCategoria: { [key: string]: string } = {
        'Paisaje': '#4CAF50',
        'Gastronomía': '#D2A734',
        'Viajeros en acción': '#F54B69',
        'Viviendo la cultura': '#9C27B0',
        'Detalles':'#00ACC1',
        'Otro': '#D47F62' // color por defecto
      };

      // Se asigna color por categoría si no el color por defecto
      let colores = categorias.map(categoria => colorPorCategoria[categoria] || '#D47F62');

      let canvas = this.canvasRef?.nativeElement as HTMLCanvasElement;

      // Limpia gráfico anterior si existe
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Crea gráfico nuevo
      this.chartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: nombres,
          datasets: [{
            label: 'Votos',
            data: votos,
            backgroundColor: colores
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                //Nombre para cuando pasamos el cursor por la barra
                title: (tooltipItems: any) => {
                  let index = tooltipItems[0].dataIndex;
                  let nombre = nombres[index];
                  let categoria = categorias[index];
                  return `${nombre} (${categoria})`;
                }
              }
            }
          }
        }
      });
    } else {
      console.error("El gráfico solo se puede crear en el navegador.");
    }
  }

}