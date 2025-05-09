import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-usuarios-mod',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios-mod.component.html',
  styleUrl: './usuarios-mod.component.css'
})
export class UsuariosModComponent {

  public formUsuarioMod: FormGroup;
  idUsuario: number = 0;


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
    // Se seleccionan los datos de la bbdd con el id del usuario para cargarlo en el formulario de modificación
    this.usuarioService.seleccionarUsuario(this.idUsuario).subscribe({
      next: (resultado: any) => {
        this.formUsuarioMod.patchValue(resultado);
      },
      error: (error: any) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    });
  }

  // Para editar el usuario
  editar(){
    this.usuarioService.editarUsuario(this.formUsuarioMod.value).subscribe({
      next: (resultado: any) => {
        console.log('Usuario editado:', resultado)
          this.ruta.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error al editar el usuario:', error);
      }
    });

  }

  // Para volver a la lista de usuarios si se le da al boton cancelar
  cancelar(){
    this.ruta.navigate(['/']);
  }

  // Para vertificar si el rol es admin o no
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
}
