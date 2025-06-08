import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-contrasenna-mod',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contrasenna-mod.component.html',
  styleUrl: './contrasenna-mod.component.css'
})
export class ContrasennaModComponent {

  public formContrasennaMod: FormGroup;
  idUsuario: number = 0;
  mensajeError: string | null = null;
  contrasennaModificada: boolean = false;
  contrasennaNoConciden: string | null = null;
  showPassword = false;
  showPasswordRep = false;

  constructor(private fb: FormBuilder, private rutaActiva: ActivatedRoute, private ruta: Router, private usuarioService: UsuarioService, private authService: AuthService) {
    this.formContrasennaMod = this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
      passwordRep: this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.idUsuario = this.rutaActiva.snapshot.params['idUsuario']; // Recoge el id del usuario de la url
  }

  editar() {
    if (this.formContrasennaMod.value.password == this.formContrasennaMod.value.passwordRep) { // Si las contraseñas son iguales
      this.usuarioService.modificarContrasenna(this.idUsuario, this.formContrasennaMod.value.password).subscribe({
        next: () => {
          this.mensajeError = null;
          this.contrasennaModificada = true;
          let idUsuarioLogueado = localStorage.getItem('idUsuario');
          setTimeout(() => {
            if(this.isAdmin()){
              if (idUsuarioLogueado === this.idUsuario.toString()) {
                // Admin cambiando su propia contraseña
                this.ruta.navigate(['/perfil']);
              } else {
                // Admin cambiando la contraseña de otro usuario
                this.ruta.navigate(['/listar-usuarios']);
              }
            }else{
              // Usuario participante cambiando su propia contraseña
              this.ruta.navigate(['/perfil']);
            }
          }, 3000); // Navega después de 1 segundo
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.mensajeError = error.error.message;
            setTimeout(() => {
                this.mensajeError = null;
            }, 3000);
          } else {
            this.mensajeError = 'Error inesperado al modificar la contraseña.';
            setTimeout(() => {
                this.mensajeError = null;
            }, 3000);
          }
        },
      });
    } else {
      this.contrasennaNoConciden = "Las contraseñas no coinciden";
      setTimeout(() => {
          this.contrasennaNoConciden = null;
      }, 4000);
    }
  }

  // Metodo para volver a la lista de usuarios si se le da al boton cancelar
  cancelar() {
    if(this.isAdmin()){
      this.ruta.navigate(['/listar-usuarios']);
    }else{
      this.ruta.navigate(['/perfil']);
    }
  }

  // Para verificar si el rol es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
