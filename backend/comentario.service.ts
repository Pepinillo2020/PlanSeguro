import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  
  private apiUrl = 'http://localhost:3000/comentarios'; // URL de la API

  constructor(private http: HttpClient) { }
  getComentarios() {
    return this.http.get(this.apiUrl);
  }
}
