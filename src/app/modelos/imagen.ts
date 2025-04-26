export interface Imagen {
    id: number;
    nombre: string;
    descripcion: string;
    categoriaId: number;
    usuarioId: number;
    file?: File; // Propiedad opcional para almacenar el archivo de imagen
}
