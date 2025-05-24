import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuarios-mod',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuarios-mod.component.html',
  styleUrl: './usuarios-mod.component.css'
})
export class UsuariosModComponent {

  public formUsuarioMod: FormGroup;
  idUsuario: number = 0;
  mensajeError: string | null = null;
  usuarioEditadoCorrectamente: boolean = false;


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService, private ruta: Router, private rutaActiva: ActivatedRoute) {
    this.formUsuarioMod = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      rol: this.fb.control('', [Validators.required]),
      alias:this.fb.control('', [Validators.required, Validators.minLength(3)]),
      nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      apellidos: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      fNacimiento: this.fb.control('', [Validators.required]),
      numTelefono: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', []),
    })
  }

  ngOnInit() {
    this.idUsuario = this.rutaActiva.snapshot.params['idUsuario']; // Recoge el id del usuario de la url
    this.usuarioService.seleccionarUsuario(this.idUsuario).subscribe({
      next: (resultado: any) => {
        this.formUsuarioMod.patchValue(resultado);
      },
      error: () => {
        this.mensajeError = 'Error al cargar los datos del usuario.';
      }
    });
  }

  // Para editar el usuario
  editar(){
    this.usuarioService.editarUsuario(this.formUsuarioMod.value).subscribe({
      next: () => {
        this.mensajeError = null;
        this.usuarioEditadoCorrectamente = true;
        let idUsuarioLogueado = localStorage.getItem('idUsuario');
        let idUsuarioEditado = this.formUsuarioMod.value.id
        setTimeout(() => {
          if(this.isAdmin()){
            if (idUsuarioLogueado === idUsuarioEditado.toString()) {
              // Admin editando su propio perfil
              this.ruta.navigate(['/perfil']);
            } else {
              // Admin editando otro usuario
              this.ruta.navigate(['/listar-usuarios']);
            }
          } else {
            // Usuario participante editando su propio perfil
            this.ruta.navigate(['/perfil']);
          }
        }, 1000);
      },
      error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al modificar el usuario.';
        }
      }
    });
  }

  // Para volver donde corresponda al dar al botón de cancelar
  cancelar(){
    if(this.isAdmin()) {
      this.ruta.navigate(['/listar-usuarios']);
    } else {
      this.ruta.navigate(['/perfil']);
    }
  }

  // Para verificar si el rol es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Para verificar si el rol es participante
  isParticipante(): boolean {
    return this.authService.isParticipante();
  }

  
}
