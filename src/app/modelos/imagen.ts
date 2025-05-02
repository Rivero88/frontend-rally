import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export interface Imagen {
    id: number;
    nombre: string;
    descripcion: string;
    formato: string;
    tamanno: number;
    votos: number;
    estadoValidacion: string;
    url: string;
    categorias: Categoria;
    usuario: Usuario;
    file?: File; // Propiedad opcional para almacenar el archivo de imagen
}
