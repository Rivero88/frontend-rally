import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; //para configurar HttpClient con interceptores
import { jwtInterceptor } from './app/interceptors/jwt.interceptor';//importación del interceptor JWT
import { errorInterceptor } from './app/interceptors/error.interceptor';//importación del interceptor de errores
import { routes } from './app/app.routes'; 
import { provideRouter } from '@angular/router';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs); // Registra el español

bootstrapApplication(AppComponent, {
  ...appConfig,
  //Registro del interceptor JWT en el módulo principal de la aplicación
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),//Añade el token a las peticiones, maneja los errroes de respuesta
    { provide: LOCALE_ID, useValue: 'es' }// Sete el idioma por defecto a español
  ]
})
  .catch((err) => console.error(err));
