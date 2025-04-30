import { Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],  // Protege la ruta de home
  },
  {
    path: 'comentario',
    loadComponent: () => import('./comentario/comentario.component').then(m => m.ComentarioComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'camara',
    loadComponent: () => import('./camara/camara.component').then(m => m.CamaraComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'ajustes',
    loadComponent: () => import('./ajustes/ajustes.component').then(m => m.AjustesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',  // Asegúrate de que redirige al login correctamente
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./recuperar-contrasena/recuperar-contrasena.page').then(m => m.RecuperarContrasenaPage),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
