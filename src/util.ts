
export function formatoFecha(fecha: string | Date): string {
    const d = new Date(fecha);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
}