import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet.heat';
import { ReporteService } from '../services/reporte.service';

// 🔍 Importa el control de búsqueda
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// Ionic standalone components
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonInput, IonSearchbar, IonTabButton, IonFooter, IonTabBar, IonTabs, IonMenu, MenuController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  personOutline, homeOutline, settingsOutline, chatboxEllipsesOutline,
  cameraOutline, reorderFourOutline, optionsOutline,
  search
} from 'ionicons/icons';
// ... imports sin cambios ...
declare module 'leaflet' {
  export function heatLayer(latlngs: [number, number, number][], options?: any): any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonInput,
    IonSearchbar,
  ],
})
export class HomePage implements OnInit {
  private map: any;
  private heatLayer: any; // ✅ Declaración aquí
  mostrarFormulario = false;
  reporteForm: FormGroup;
  private heatLayersByTipo: {[tipo: string]: any} = {}; // para guardar capas heatmap por tipo

  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private fb: FormBuilder,
    private reporteService: ReporteService
  ) {
    this.reporteForm = this.fb.group({
      tipo: [''],
      descripcion: [''],
      ubicacion: [''],
    });

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

private obtenerGradientePorTipo(tipo: string) {
  switch (tipo.toLowerCase()) {
    case 'robo':
      return { 0.0: 'rgba(255,0,0,0.2)', 0.4: 'rgba(255,0,0,0.7)', 1.0: 'rgba(255,0,0,1)' }; // rojo más visible
    case 'accidente':
      return { 0.0: 'rgba(0,0,255,0.2)', 0.4: 'rgba(0,0,255,0.7)', 1.0: 'rgba(0,0,255,1)' }; // azul fuerte
    case 'incendio':
      return { 0.0: 'rgba(255,100,0,0.2)', 0.4: 'rgba(255,100,0,0.7)', 1.0: 'rgba(255,80,0,1)' }; // naranja más intenso
    case 'violencia':
      return { 0.0: 'rgba(180,0,180,0.2)', 0.4: 'rgba(180,0,180,0.7)', 1.0: 'rgba(128,0,128,1)' }; // púrpura saturado
    default:
      return { 0.0: 'rgba(100,100,100,0.2)', 0.4: 'rgba(100,100,100,0.7)', 1.0: 'rgba(80,80,80,1)' }; // gris fuerte
  }
}


 private initMap(): void {
    setTimeout(() => {
      // 📍 Coordenadas de Quintero
      const valparaisoCenter: L.LatLngExpression = [-33.0458, -71.6197];
      const bounds: L.LatLngBoundsExpression = [
        [-33.065, -71.64],
        [-33.03, -71.6],
      ];


      this.map = L.map('map', {
        center: valparaisoCenter,
        zoom: 14,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      });

      // 🗺️ Capa base OSM
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // 🔥 Datos de calor iniciales por tipo
const initialHeatDataByTipo: { [key: string]: [number, number, number][] } = {
  robo: [[-33.0458, -71.6197, 0.5]],
  accidente: [[-33.0465, -71.6220, 0.8]],
  incendio: [[-33.0440, -71.6170, 0.5]],
};


      for (const tipo in initialHeatDataByTipo) {
        const gradient = this.obtenerGradientePorTipo(tipo);
        const heatLayer = L.heatLayer(initialHeatDataByTipo[tipo], {
          radius: 25,
          blur: 15,
          maxZoom: 17,
          gradient
        }).addTo(this.map);

        this.heatLayersByTipo[tipo] = heatLayer;
      }

      // 📍 Geolocalización del usuario
      this.map.locate({ setView: true, maxZoom: 16 });

      const userIcon = L.icon({
        iconUrl: 'assets/icon/user-location.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      this.map.on('locationfound', (e: L.LocationEvent) => {
        const userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(this.map);
        userMarker.bindPopup('Estás aquí').openPopup();
      });

      this.map.on('locationerror', (e: L.ErrorEvent) => {
        console.error('Error al obtener la ubicación:', e.message);
        alert('No se pudo obtener tu ubicación.');
      });

      this.map.invalidateSize();

      // 🔍 Barra de búsqueda centrada en Quintero
      const provider = new OpenStreetMapProvider({
        params: {
          countrycodes: 'CL', // Solo Chile
          viewbox: '-71.674, -33.002, -71.540, -33.101', // [lngLeft, latTop, lngRight, latBottom]
          bounded: 1, // Limita la búsqueda al área
        },
      });

      const searchControl = new (GeoSearchControl as any)({
        provider,
        style: 'bar',
        searchLabel: '¿Dónde quieres ir?',
        autoClose: true,
        showMarker: true,
        retainZoomLevel: false,
      }) as L.Control;

      this.map.addControl(searchControl);
    }, 500);
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;

    if (this.mostrarFormulario) {
      this.obtenerUbicacionActual();
    }
  }

  obtenerUbicacionActual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const ubicacion = `${lat}, ${lng}`;
          this.reporteForm.patchValue({ ubicacion });

          // Agrega el punto al heatLayer del tipo seleccionado
          const tipo = this.reporteForm.get('tipo')?.value || 'default';
          if (!this.heatLayersByTipo[tipo]) {
            const gradient = this.obtenerGradientePorTipo(tipo);
            this.heatLayersByTipo[tipo] = L.heatLayer([], {
              radius: 25,
              blur: 15,
              maxZoom: 17,
              gradient
            }).addTo(this.map);
          }
          this.heatLayersByTipo[tipo].addLatLng([lat, lng, 0.7]);

          this.map.setView([lat, lng], 16);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
          alert('No se pudo obtener la ubicación actual.');
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  }

  onSubmit() {
    if (this.reporteForm.valid) {
      const nuevoReporte = this.reporteForm.value;
      const tipo = nuevoReporte.tipo || 'default';

      this.reporteService.crearReporte(nuevoReporte).subscribe({
        next: (res) => {
          console.log('Reporte enviado:', res);
          alert('Reporte enviado con éxito.');

          // Parsear lat y lng del string ubicacion "lat, lng"
          const [latStr, lngStr] = nuevoReporte.ubicacion.split(',').map((s: string) => s.trim());
          const lat = parseFloat(latStr);
          const lng = parseFloat(lngStr);

          if (!this.heatLayersByTipo[tipo]) {
            const gradient = this.obtenerGradientePorTipo(tipo);
            this.heatLayersByTipo[tipo] = L.heatLayer([], {
              radius: 25,
              blur: 15,
              maxZoom: 17,
              gradient
            }).addTo(this.map);
          }
          this.heatLayersByTipo[tipo].addLatLng([lat, lng, 0.7]);

          this.mostrarFormulario = false;
          this.reporteForm.reset();
        },
        error: (err) => {
          console.error('Error al enviar reporte:', err);
          alert('Error al enviar el reporte. Intenta nuevamente.');
        }
      });
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }
}