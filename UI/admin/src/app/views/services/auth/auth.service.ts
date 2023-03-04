import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = sessionStorage.getItem('token');

  constructor(private router: Router, private sessionService: SessionService) {}
  public isAuthenticated(): boolean {
    console.log('token', this.router.url);
    if (this.token) {
      if (this.tokenExpired(this.token)) {
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  public tokenExpired(token: string) {
    if (token == null) return true;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
