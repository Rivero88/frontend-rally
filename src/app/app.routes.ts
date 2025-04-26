import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { ParametrosModComponent } from './componentes/parametros-mod/parametros-mod.component';
import { UsuariosListarComponent } from './componentes/usuarios-listar/usuarios-listar.component';
import { UsuariosModComponent } from './componentes/usuarios-mod/usuarios-mod.component';
import { ContrasennaModComponent } from './componentes/contrasenna-mod/contrasenna-mod.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ImagenesListarComponent } from './componentes/imagenes-listar/imagenes-listar.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'registro', component: RegistroComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'parametros-mod', component: ParametrosModComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'listar-usuarios', component: UsuariosListarComponent},
    { path: 'mod-usuarios/:idUsuario', component: UsuariosModComponent},
    { path: 'mod-contrasenna/:idUsuario', component: ContrasennaModComponent},
    { path: 'imagen', component: ImagenesListarComponent},
];
