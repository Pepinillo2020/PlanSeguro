import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon,
  IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonTabButton, IonFooter,
  IonTabBar, IonLabel, IonSearchbar, IonTabs, IonMenu, MenuController, IonTextarea, IonItem, IonSelect, IonSelectOption, IonInput
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
  imports: [IonButton, IonHeader, 
    IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle,
    IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    IonFooter, IonTabBar, IonIcon, IonLabel, IonSearchbar, RouterLink, IonMenu, IonTextarea, IonItem, IonSelect,IonSelectOption, IonInput, CommonModule],
})
export class ComentarioComponent  implements OnInit {
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario

  constructor() { }

  ngOnInit() {}

}
