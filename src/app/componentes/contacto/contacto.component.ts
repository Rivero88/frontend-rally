import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: this.fb.control('', [Validators.required]),
      apellidos: this.fb.control('', [Validators.required]),
      mensaje: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

}
