import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => loadRemoteModule('login' , './Component')
    .then((m) => m.LoginComponent)
  },
  {
    path: 'system',
    loadComponent: () => loadRemoteModule('system' , './Component')
    .then((m) => m.SystemComponent)
  }
];
