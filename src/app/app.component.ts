import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from './services/api.service';
import { User } from './models/user.interface';
import { Post } from './models/post.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // --- Usuarios (como estaba) ---
  usuarios: User[] = [];
  cargando = true;
  error = '';

  // --- Posts con signals ---
  posts = signal<Post[]>([]);
  cargandoPosts = signal(true);
  errorPosts = signal('');

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Suscripción usuarios (como estaba)
    this.apiService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios: ' + err.message;
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });

    // Suscripción posts
    this.apiService.obtenerPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.cargandoPosts.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorPosts.set('Error al cargar posts: ' + err.message);
        this.cargandoPosts.set(false);
        this.cdr.detectChanges();
      },
    });
  }
}
