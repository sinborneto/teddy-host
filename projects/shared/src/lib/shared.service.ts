import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private userSource = new ReplaySubject<any>(1);
  private clientSource = new ReplaySubject<any>(1);

  currentUser = this.userSource.asObservable();
  clientsSelected = this.clientSource.asObservable();

  constructor() {
    const storedUser = this.getStoredUser();
    const storedClient = this.getStoredClient()
    if (storedUser) {
      this.userSource.next(storedUser);
    }
    if (storedClient) {
      this.clientSource.next(storedClient);
    }
  }

  private getStoredUser() {
    return JSON.parse(sessionStorage.getItem('userData') || 'null');
  }

  getStoredClient() {
    const clients = sessionStorage.getItem('clientModel');
    return clients ? JSON.parse(clients) : [];
  }


  setUser(user: any) {
    sessionStorage.setItem('userData', JSON.stringify(user));
    this.userSource.next(user);
  }

  setClient(newClient: any) {
    let currentClients = JSON.parse(sessionStorage.getItem('clientModel') || '[]');
    if (!Array.isArray(currentClients)) {
      console.warn('currentClients não é um array válido:', currentClients);
      currentClients = [];
    }
    const clientExists = currentClients.some((client: any) => client.id === newClient.id);
    if (!clientExists) {
      currentClients.push(newClient);
      sessionStorage.setItem('clientModel', JSON.stringify(currentClients));
      this.clientSource.next(currentClients);
    }
  }

  updateClient(clientsSelected: any) {
    sessionStorage.setItem('clientModel', JSON.stringify(clientsSelected));
    this.clientSource.next(clientsSelected);
  }

  removeClientById(clientId: string) {
    let currentClients = this.getStoredClient();
    if (!Array.isArray(currentClients)) {
      console.warn('currentClients não é um array válido:', currentClients);
      return;
    }
    const updatedClients = currentClients.filter((client: any) => client.id !== clientId);
    this.updateClient(updatedClients);
  }

  clearClients() {
    sessionStorage.removeItem('clientModel');
    this.clientSource.next([]);
  }

  clearUser() {
    sessionStorage.removeItem('userData');
    this.userSource.next(null);
  }
}
