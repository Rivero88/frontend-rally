import { Categoria } from "./categoria";

export interface Parametro {
    id: number;
    numMaxFotografias: number;
    tema: string;
    fInicioInscripcion: Date;
    fFinInscripcion: Date;
    fInicioVotacion: Date;
    fFinVotacion: Date;
    fGanador: Date;
    categorias: Categoria[];
}
