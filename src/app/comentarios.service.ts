import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient) { }

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  getComentario(id: string): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/${id}`);
  }

  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }

  actualizarComentario(id: string, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, comentario);
  }

  eliminarComentario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}