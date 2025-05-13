import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon,
  IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonTabButton, IonFooter,
  IonTabBar, IonLabel, IonSearchbar, IonTabs, IonMenu, IonTextarea, IonItem, IonSelect, IonSelectOption, IonInput
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
  imports: [
    IonButton, IonHeader, IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle,
    IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonIcon,
    IonLabel, IonSearchbar, RouterLink, IonMenu, IonTextarea, IonItem, IonSelect, IonSelectOption, IonInput,
    CommonModule, ReactiveFormsModule // Agrega ReactiveFormsModule aquí
  ],
})
export class ComentarioComponent implements OnInit {
  mostrarFormulario = false;
  reporteForm: FormGroup;
  reportes: any[] = [];
  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder, private reporteService: ReporteService) {
    this.reporteForm = this.fb.group({
      tipo: [''],
      descripcion: [''],
      ubicacion: [''],
      imagen: [null]
    });
  }

  ngOnInit() {
    this.obtenerReportes();
  }

  onFileChange(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('tipo', this.reporteForm.get('tipo')?.value);
    formData.append('descripcion', this.reporteForm.get('descripcion')?.value);
    formData.append('ubicacion', this.reporteForm.get('ubicacion')?.value);
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    console.log('Datos enviados al backend:', {
      tipo: this.reporteForm.get('tipo')?.value,
      descripcion: this.reporteForm.get('descripcion')?.value,
      ubicacion: this.reporteForm.get('ubicacion')?.value,
      imagen: this.imagenSeleccionada,
    });

    this.reporteService.crearReporte(formData).subscribe({
      next: (response) => {
        console.log('Reporte creado:', response);
        this.mostrarFormulario = false;
        this.obtenerReportes();
      },
      error: (error) => {
        console.error('Error al crear el reporte:', error);
      }
    });
  }

  obtenerReportes() {
    this.reporteService.getReportes().subscribe(response => {
      this.reportes = response;
    });
  }
}


