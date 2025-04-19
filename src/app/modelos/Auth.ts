import { Rol } from "./Rol";

export interface Auth {
    token: string,
    rol: Rol// admin o participante
}
