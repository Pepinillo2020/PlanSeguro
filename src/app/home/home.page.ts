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

declare module 'leaflet' {
  export function heatLayer(latlngs: [number, number, number][], options?: any): any;
}

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
    setTimeout(() => {
      // Coordenadas del centro de Valparaíso
      const valparaisoCenter: L.LatLngExpression = [-33.0458, -71.6197];

      // Límites geográficos (bounding box) para el centro de Valparaíso
      const bounds: L.LatLngBoundsExpression = [
        [-33.065, -71.64], // Suroeste
        [-33.03, -71.6],   // Noreste
      ];

      // Inicializa el mapa en el contenedor con ID 'map'
      this.map = L.map('map', {
        center: valparaisoCenter, // Centra el mapa en Valparaíso
        zoom: 14,                // Nivel de zoom inicial
        maxBounds: bounds,       // Establece los límites
        maxBoundsViscosity: 1.0, // Evita que el usuario salga de los límites
      });

      // Agrega una capa de mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Datos de ejemplo para el mapa de calor
      const heatData: [number, number, number][] = [
        [-33.0458, -71.6197, 0.5], // Latitud, Longitud, Intensidad
        [-33.0465, -71.6220, 0.8],
        [-33.0440, -71.6170, 0.3],
      ];

      // Agrega la capa de mapa de calor
      const heatLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
      });

      heatLayer.addTo(this.map);

      // Geolocalización del usuario
      this.map.locate({ setView: true, maxZoom: 16 });

      // Ícono personalizado para la ubicación del usuario
      const userIcon = L.icon({
        iconUrl: 'assets/icon/user-location.png', // Ruta al ícono personalizado
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto del ícono que se ancla al mapa
        popupAnchor: [0, -32], // Punto desde donde se abre el popup
      });

      // Evento para manejar la ubicación encontrada
      this.map.on('locationfound', (e: L.LocationEvent) => {
        const userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(this.map);
        userMarker.bindPopup('Estás aquí').openPopup();
      });

      // Evento para manejar errores de geolocalización
      this.map.on('locationerror', (e: L.ErrorEvent) => {
        console.error('Error al obtener la ubicación:', e.message);
        alert('No se pudo obtener tu ubicación.');
      });

      // Fuerza a Leaflet a recalcular el tamaño del mapa
      this.map.invalidateSize();
    }, 500); // Retraso de 500ms para asegurar que el contenedor esté listo
  }
}
