import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  title = 'frontend-rally';
  tokenR = '';
  public form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.form = new FormBuilder().group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  login() {
    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next:(response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.tokenR = token.token;
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Credenciales incorrectas.');
      }
    });
  }
}
