import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon,
  IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonTabButton, IonFooter,
  IonTabBar, IonLabel, IonSearchbar, IonTabs, IonMenu, MenuController
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  personOutline, homeOutline, settingsOutline, chatboxEllipsesOutline,
  cameraOutline, reorderFourOutline, optionsOutline
} from 'ionicons/icons';
import * as L from 'leaflet';
import 'leaflet.heat';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle,
    IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    IonFooter, IonTabBar, IonIcon, IonLabel, IonSearchbar, RouterLink, IonMenu
  ],
})
export class HomePage implements OnInit {
  private map: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController
  ) {
    addIcons({
      personOutline, homeOutline, settingsOutline,
      chatboxEllipsesOutline, cameraOutline, reorderFourOutline, optionsOutline
    });
  }

  ngOnInit() {
    this.initMap();
  }

  cerrarSesion() {
    this.authService.eliminarToken();
    console.log('Token eliminado del almacenamiento local');
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menu.toggle();
  }

  private initMap(): void {
    // Inicializa el mapa en el contenedor con ID 'map'
    this.map = L.map('map').setView([19.4326, -99.1332], 13); // Coordenadas iniciales (CDMX)

    // Agrega una capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Datos de ejemplo para el mapa de calor
    const heatData: [number, number, number][] = [
      [19.4326, -99.1332, 0.5], // Latitud, Longitud, Intensidad
      [19.4356, -99.1400, 0.8],
      [19.4300, -99.1200, 0.3],
    ];

    // Agrega la capa de mapa de calor
    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });

    heatLayer.addTo(this.map);

    // Fuerza a Leaflet a recalcular el tamaño del mapa
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}
