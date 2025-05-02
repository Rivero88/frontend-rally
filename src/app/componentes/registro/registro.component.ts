import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  public formUsuarioNuevo: FormGroup;
  mensajeError: string | null = null;
  registroCorrecto: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private ruta: Router) {
    this.formUsuarioNuevo = this.fb.group({
      nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      apellidos: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      alias:this.fb.control('', [Validators.required, Validators.minLength(3)]),
      fNacimiento: this.fb.control('', [Validators.required]),
      numTelefono: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      // validacion para que la contraseña tenga al menos 6 caracteres, al menos una letra, un número y un caracter especial
      // (?=.*[a-zA-Z]) al menos una letra. (?=.*\d) al menos un número. `(?=.[!@#$%^&()_+-={};':"\ un caraceter especial
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
    });
  }

  ngOnInit() {  }


  nuevoUsuario(){
    if (this.formUsuarioNuevo.invalid) {
      this.formUsuarioNuevo.markAllAsTouched();
      return;
    }
    this.usuarioService.nuevoUsuario(this.formUsuarioNuevo.value).subscribe({
      next: (resultado: Usuario) => {
        this.mensajeError = null;
        this.registroCorrecto = true;
        setTimeout(() => {
          this.ruta.navigate(['/']);
        }, 3000); // Navega después de 3 segundos
      },
      error: (error: any) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al registrar el usuario.';
        }
      }
    })
  }
}
