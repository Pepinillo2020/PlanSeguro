import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonAvatar, IonFooter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonFooter, IonAvatar, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
usuario: any = {};
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario(); // Obtén los datos del usuario
    console.log('Usuario cargado en home:', this.usuario); // Verifica aquí
  }

  cerrarSesion() {
    this.authService.eliminarToken(); // Método para eliminar el token
    console.log('Token eliminado del almacenamiento local'); // Mensaje en consola
    this.router.navigate(['/login']); // Redirige al login
  }
}
