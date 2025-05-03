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
    fechaSubida: Date;
    url: string;
    categoria: Categoria;
    usuario: Usuario;
    file?: File; // Propiedad para almacenar el archivo de imagen
}
