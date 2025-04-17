import { Rol } from './rol';

export interface Auth {
    token: string,
    rol: Rol// admin o participante
}
