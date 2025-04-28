import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonFooter, IonTabBar, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Agregar Router aquí
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  imports: [
    IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, 
=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  imports: [IonIcon, IonTabBar, IonFooter, 
    IonButton, IonInput, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar,
>>>>>>> Stashed changes
    CommonModule, FormsModule, RouterLink, HttpClientModule // Aquí agregas HttpClientModule
  ]
})
export class LoginPage implements OnInit {

  correo: string = '';  // Variable para el correo
  contrasena: string = '';  // Variable para la contraseña

  constructor(
    private authService: AuthService,
    private router: Router  // Inyectar el router aquí
  ) { }

  ngOnInit() { }

  // Método que se ejecuta cuando el usuario hace click en el botón de login
  login() {
    this.authService.login(this.correo, this.contrasena).subscribe(response => {
      if (response && response.token) {
        // Si el login es exitoso, guarda el token en el localStorage
        this.authService.guardarToken(response.token);
        // Redirige a otra página después del login exitoso
        this.router.navigate(['/home']); // Cambia '/home' por la ruta a la que deseas redirigir
        console.log('Inicio de sesión exitoso', response.usuario);
      }
    }, error => {
      console.error('Error al iniciar sesión', error);
    });
  }
}
