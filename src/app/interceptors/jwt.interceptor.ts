import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http'; // Se importa el interceptor en forma de función

//Se crea el interceptor como un función que recibe la petición y el siguiente interceptor y se le asigna el nombre jwtInterceptor
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof window !== 'undefined') {
    // Se obtiene el token JWT desde el localStorage
    const token = localStorage.getItem('token');

    // Si el token existe, clonamos la petición original y le añadimos el header Authorization
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const cloned = req.clone({ headers });
      //console.log('Token recuperado: ', localStorage.getItem('token'));
      return next(cloned);
    }
  }
  // Si no hay token, enviamos la petición tal cual
  return next(req);
};
