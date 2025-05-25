import { Usuario } from "./usuario";

export interface Voto {
    id: number;
    usuario: Usuario;
    fecha: Date;
}
