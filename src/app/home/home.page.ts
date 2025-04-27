import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTabButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
=======
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonTabButton, IonFooter, IonTabBar, IonLabel, IonSearchbar, IonTabs, IonMenu, MenuController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { personOutline, homeOutline, settingsOutline, chatboxEllipsesOutline, cameraOutline, reorderFourOutline, optionsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle,
    IonContent, IonFooter, IonTabBar, IonIcon, IonLabel, IonSearchbar, RouterLink, IonMenu
  ],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController  // Asegúrate de inyectar MenuController
  ) {
    addIcons({
      personOutline, homeOutline, settingsOutline, chatboxEllipsesOutline, cameraOutline, reorderFourOutline, optionsOutline
    });
  }

  cerrarSesion() {
    this.authService.eliminarToken(); // Método para eliminar el token
    console.log('Token eliminado del almacenamiento local'); // Mensaje en consola
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para abrir y cerrar el menú
  toggleMenu() {
    this.menu.toggle(); // Método para abrir y cerrar el menú
  }
>>>>>>> Stashed changes
}
