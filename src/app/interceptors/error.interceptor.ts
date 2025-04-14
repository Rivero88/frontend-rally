import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      // Si el error es 401 (token invalido o caducado), redirigimos al login
      if (error.status === 401) {
        console.warn('No autorizado. Redirigiendo a la página de inicio de sesión...');
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        router.navigate(['/login']); // Redirigir a la página de inicio de sesión

        //usuario autenticado pero sin permisos
      } else if (error.status === 403) {
        console.warn('Acceso denegado.');

        //errores del servidor, es decir, del backend
      } else if(error.status >= 500) {
        console.error('Ups, algo salió mal.');

        //Otro errores
      }else{
        console.warn('Error inesperado. Por favor, inténtalo de nuevo más tarde.');
      }
      return throwError(() => error);
    })
  )
}
