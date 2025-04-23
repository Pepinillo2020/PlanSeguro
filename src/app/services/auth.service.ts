import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';  // Aquí debes usar la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap(response => {
        if (response.token) {
          this.guardarToken(response.token);  // Guarda el token en localStorage
        }
      })
    );
  }
  
  // Guardar el token en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }  

  // Obtener el token desde localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar el token de localStorage
  eliminarToken(): void {
    localStorage.removeItem('token');
  }
}
