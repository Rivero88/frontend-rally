import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-contrasenna-mod',
  imports: [ReactiveFormsModule],
  templateUrl: './contrasenna-mod.component.html',
  styleUrl: './contrasenna-mod.component.css'
})
export class ContrasennaModComponent {

  public formContrasennaMod: FormGroup;
  idUsuario: number = 0;

  constructor(private fb: FormBuilder, private rutaActiva: ActivatedRoute, private ruta: Router, private usuarioService: UsuarioService) {
    this.formContrasennaMod = this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)]),
      passwordRep: this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit() { 
    this.idUsuario = this.rutaActiva.snapshot.params['idUsuario']; // Recoge el id del usuario de la url
   }

  editar(){
    if (this.formContrasennaMod.valid) { // Si el formulario es valido
      if (this.formContrasennaMod.value.password == this.formContrasennaMod.value.passwordRep) { // Si las contraseñas son iguales
        this.usuarioService.modificarContrasenna(this.idUsuario, this.formContrasennaMod.value.password).subscribe({
          next: () => {
            alert("Contraseña modificada correctamente"); // Mensaje de exito
            this.ruta.navigate(['/']); // Vuelve a la lista de usuarios
          },
          error: () => {
            alert("Error al modificar la contraseña"); // Mensaje de error
          },          
        });
      } else {
        alert("Las contraseñas no coinciden"); // Mensaje de error si las contraseñas no coinciden
      }
    } else {
      alert("Formulario invalido"); // Mensaje de error si el formulario no es valido
    }
  }

  // Metodo para volver a la lista de usuarios si se le da al boton cancelar
  cancelar(){
    this.ruta.navigate(['/']);
  }

}
