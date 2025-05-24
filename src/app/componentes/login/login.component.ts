import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../modelos/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  public form: FormGroup;
  mensajeError: string | null = null;
  loginCorrecto: string | null = null;


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.form = new FormBuilder().group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  // Método para inicio de sesión
  login() {
    let { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next:(respuesta: Auth) => {
        let token = respuesta.token;
        let rol = respuesta.rol;
        let id = respuesta.idUsuario;
        localStorage.setItem('token', token); // Se guarda el token en el localStorage
        localStorage.setItem('rol', rol); // Se guarda el rol en el localStorage
        localStorage.setItem('idUsuario', id.toString()); // Se guarda el idUsuario en el localStorage
        this.mensajeError = null;
        this.loginCorrecto = "Inicio de sesión exitoso.";
         setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error inesperado al iniciar sesión.';
        }
      }
    });
  }
}
