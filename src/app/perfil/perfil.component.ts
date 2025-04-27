import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonTabButton, IonFooter, IonTabBar, IonLabel, IonSearchbar, IonTabs} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
<<<<<<< Updated upstream
  imports: [IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonIcon, IonLabel, IonSearchbar, ],
=======
  imports: [IonTabs, IonTabButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonIcon, IonLabel, IonSearchbar],
>>>>>>> Stashed changes

})
export class PerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
