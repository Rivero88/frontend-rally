import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      apellidos: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      alias:this.fb.control('', [Validators.required, Validators.minLength(3)]),
      fnacimiento: this.fb.control('', [Validators.required]),
      telefono: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      // validacion para que la contraseña tenga al menos 6 caracteres, al menos una letra, un número y un caracter especial
      // (?=.*[a-zA-Z]) al menos una letra. (?=.*\d) al menos un número. `(?=.[!@#$%^&()_+-={};':"\ un caraceter especial
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
    });
  }

  ngOnInit() {

  }

}
