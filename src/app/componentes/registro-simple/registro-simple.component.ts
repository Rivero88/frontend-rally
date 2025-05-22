import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-simple',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro-simple.component.html',
  styleUrl: './registro-simple.component.css'
})
export class RegistroSimpleComponent {
  public formUsuarioVoto: FormGroup;
  mensajeError: string | null = null;
  registroCorrecto: boolean = false;

  constructor(private fb: FormBuilder,private usuarioService: UsuarioService, private ruta: Router) {
    this.formUsuarioVoto = this.fb.group({
      alias: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
    });
  }

  ngOnInit() {

  }

  // Para nuevo usuario
  nuevoUsuario() {
    if (this.formUsuarioVoto.invalid) {
      this.formUsuarioVoto.markAllAsTouched();
      return;
    }
    this.usuarioService.nuevoUsuarioVoto(this.formUsuarioVoto.value).subscribe({
      next: (resultado: Usuario) => {
        this.mensajeError = null;
        this.registroCorrecto = true;
        setTimeout(() => {
          this.ruta.navigate(['/']);
        }, 1000); // Navega después de 1 segundo
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
