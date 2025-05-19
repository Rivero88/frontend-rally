import { Parametro } from "./parametro";

export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    parametro: Parametro;
}
