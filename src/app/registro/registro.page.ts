import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink],
})
export class RegistroPage {
  correo: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService) {}

  registrar() {
    // Aquí puedes hacer la lógica para registrar al usuario
    console.log('Correo:', this.correo);
    console.log('Contraseña:', this.contrasena);
    // Aquí debes integrar tu lógica de registro con el servicio de autenticación
  }
}
