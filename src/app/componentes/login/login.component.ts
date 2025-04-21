import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../modelos/Auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  public form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.form = new FormBuilder().group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  // Método para inicio de sesión
  login() {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next:(respuesta: Auth) => {
        const token = respuesta.token;
        const rol = respuesta.rol;
        const id = respuesta.idUsuario;
        localStorage.setItem('token', token); // Se guarda el token en el localStorage
        localStorage.setItem('rol', rol); // Se guarda el rol en el localStorage
        localStorage.setItem('idUsuario', id.toString()); // Se guarda el idUsuario en el localStorage
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Credenciales incorrectas.');
      }
    });
  }
}
