
//Método que se ejecuta para formatear y validar un fecha
export function formatoFecha(fecha: string | Date): string {
    const d = new Date(fecha);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
}

//Método que se ejecuta para obtener el usuario logueado por el id del localStorage
export function obtenerUsuarioLogueado(){
    let id = Number(localStorage.getItem("idUsuario"));
    return id ? +id : 0;
}