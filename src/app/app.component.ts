import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from './services/api.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  usuarios: User[] = [];
  cargando = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.obtenerUsuarios().subscribe({
      // Caso éxito
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      // Caso error
      error: (err) => {
        this.error = 'Error al cargar usuarios: ' + err.message;
        this.cargando = false;
        console.error('Error:', err);
      },
    });
  }
}
