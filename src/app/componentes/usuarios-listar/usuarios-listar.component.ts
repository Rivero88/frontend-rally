import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-listar',
  imports: [CommonModule],
  templateUrl: './usuarios-listar.component.html',
  styleUrl: './usuarios-listar.component.css'
})
export class UsuariosListarComponent {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private ruta: Router) {
  }

  ngOnInit() {

    this.usuarioService.listarUsuarios().subscribe({
      next: (resultado: any) => {
        this.usuarios = resultado;
      },
      error: (err: any) => {
        console.error('Error al cargar obtener los usuarios:', err);
      },
    });

  }


}
