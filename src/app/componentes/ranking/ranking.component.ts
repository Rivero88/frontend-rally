import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { VotoService } from '../../servicios/voto.service';


@Component({
  selector: 'app-ranking',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  rankingImagenes: any[] = [];
  mensajeError: string | null = null;
  // Referencias a los elementos canvas para los gráficos
  @ViewChild('canvasRanking', { static: false }) canvasRef!: ElementRef;
  @ViewChild('canvasLinea', { static: false }) canvasLineaRef!: ElementRef;
  //Instancias de graficos para poder destuirlos, crearlos de nuevo y evitar errores
  chartInstance: any;
  chartInstanceLinea: any;
 
  constructor(private imagenService: ImagenService, private authService: AuthService, private votoService: VotoService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.obtenerRanking();
    this.obtenerVotosPorDia();
  }

  // Para obtener el ranking según los votos de cada fotografía
  obtenerRanking(): void {
    this.imagenService.rankingImagenes().subscribe({
      next: (resultado) => {
        this.rankingImagenes = resultado;
        setTimeout(() => {
          this.crearGraficoBarras();
        }, 0);
      },
      error: () => {
        this.mensajeError = "Error al obtener ranking de imágenes.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para obtener los votos por día
  obtenerVotosPorDia(): void {
    this.votoService.votosPorFecha().subscribe({
      next: (resultado) => {
        // Se extraen los resultados que alimentarán el gráfico
        let fechas = resultado.map(res => res.fecha);
        let votos = resultado.map(res => res.votos);
        setTimeout(() => {
        this.crearGraficoLinea(fechas, votos);
        }, 0);
      },
      error: () => {
        this.mensajeError = "Error al obtener votos por día.";
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);
      }
    });
  }

  // Para verificar si el rol es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Para crear gráfico de barras
  crearGraficoBarras(): void {
    // Verifica si se está ejecutando en el navegador la creación del gráfico 
    if (isPlatformBrowser(this.platformId)) {
      //Etiquetas para el gráfico
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

      // Obtiene el elemento canvas para dibujar el gráfico
      let canvas = this.canvasRef?.nativeElement as HTMLCanvasElement;

      // Si ya hay un gráfico creado, lo destruye para no duplicar
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Crea gráfico de barra
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
      this.mensajeError = "El gráfico solo se puede crear en el navegador.";
        setTimeout(() => {
          this.mensajeError = null;
      }, 3000);
    }
  }

  // Para crear gráfico de linea
  crearGraficoLinea(fechas: string[], votos: number[]): void {
    // Verifica si se está ejecutando en el navegador la creación del gráfico 
    if (isPlatformBrowser(this.platformId)) {
      // Obtiene el elemento canvas para dibujar el gráfico
      let canvas = this.canvasLineaRef?.nativeElement as HTMLCanvasElement;

      // Si ya hay un gráfico creado, lo destruye para no duplicar
      if (this.chartInstanceLinea) {
        this.chartInstanceLinea.destroy();
      }

      this.chartInstanceLinea = new Chart(canvas, {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [{
            label: 'Votos por día',
            data: votos,
            borderColor: '#00ACC1',
            backgroundColor: '#00ACC1',
            pointBackgroundColor: '#D2A734',
            pointBorderColor: '#D2A734',
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2,
            tension: 0.3,
            fill: false
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
}