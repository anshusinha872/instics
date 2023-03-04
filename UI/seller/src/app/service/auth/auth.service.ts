import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private token = sessionStorage.getItem('token');
  public isAuthenticated(): boolean {
    // console.log('token', this.router.url);
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
