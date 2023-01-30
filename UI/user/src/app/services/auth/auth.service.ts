import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = sessionStorage.getItem('token');
  constructor() {}
  public isAuthenticated(): boolean {
    if (this.token) {
      console.log('token is present');
      console.log(this.token);
      return true;
    } else {
      return false;
    }
  }
  public tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
    
  }
}
