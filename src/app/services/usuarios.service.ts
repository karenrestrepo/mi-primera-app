import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@email.com', rol: 'Admin' },
    { id: 2, nombre: 'Carlos López', email: 'carlos@email.com', rol: 'Developer' },
    { id: 3, nombre: 'María Torres', email: 'maria@email.com', rol: 'Designer' },
  ];

  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }
}
