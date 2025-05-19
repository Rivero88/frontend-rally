import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { ParametrosModComponent } from './componentes/parametros-mod/parametros-mod.component';
import { UsuariosListarComponent } from './componentes/usuarios-listar/usuarios-listar.component';
import { UsuariosModComponent } from './componentes/usuarios-mod/usuarios-mod.component';
import { ContrasennaModComponent } from './componentes/contrasenna-mod/contrasenna-mod.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ImagenesListarComponent } from './componentes/imagenes-listar/imagenes-listar.component';
import { ImagenesSubirComponent } from './componentes/imagenes-subir/imagenes-subir.component';
import { ImagenesValidarComponent } from './componentes/imagenes-validar/imagenes-validar.component';
import { ImagenesModComponent } from './componentes/imagenes-mod/imagenes-mod.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { RegistroSimpleComponent } from './componentes/registro-simple/registro-simple.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'registro', component: RegistroComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'parametros-mod', component: ParametrosModComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'listar-usuarios', component: UsuariosListarComponent},
    { path: 'mod-usuarios/:idUsuario', component: UsuariosModComponent},
    { path: 'mod-contrasenna/:idUsuario', component: ContrasennaModComponent},
    { path: 'imagen-cargar', component: ImagenesSubirComponent},
    { path: 'imagen-listar/:idUsuario', component: ImagenesListarComponent},
    { path: 'imagen-validar', component: ImagenesValidarComponent},
    { path: 'imagen-mod/:idImagen', component: ImagenesModComponent},
    { path: 'ranking', component: RankingComponent},
    { path: 'categoria', component: CategoriaComponent},
    { path: 'registro-simple', component: RegistroSimpleComponent},
        

];
