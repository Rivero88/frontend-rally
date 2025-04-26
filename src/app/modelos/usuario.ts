import { Rol } from "./Rol";

export interface Usuario {
    id: number;
    alias: string;
    nombre: string;
    apellidos: string;
    fNacimiento:Date;
    numTelefono: number;
    email: string;
    password: string;
    rol: Rol;
}
