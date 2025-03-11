import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userSource = new ReplaySubject<any>(1);
  currentUser = this.userSource.asObservable();

  constructor() {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.userSource.next(storedUser);
    }
  }

  private getStoredUser() {
    return JSON.parse(sessionStorage.getItem('userData') || 'null');
  }

  setUser(user: any) {
    sessionStorage.setItem('userData', JSON.stringify(user));
    this.userSource.next(user);
  }

  clearUser() {
    sessionStorage.removeItem('userData'); 
    this.userSource.next(null);
  }
}
